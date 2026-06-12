import express from "express";
import { createServer as createViteServer } from "vite";
import { createClient as createRedisClient } from "redis";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CANONICAL_HOST = "troikadrive.com";
// When set, requests must carry this secret in X-Origin-Secret (injected by a
// Cloudflare Transform Rule). This blocks direct-to-origin traffic that bypasses
// Cloudflare's WAF/DDoS protection. Left unset = no-op, so deploying this before
// the Cloudflare rule exists cannot break the live site.
const ORIGIN_SHARED_SECRET = process.env.ORIGIN_SHARED_SECRET || "";

// Distributed rate limiting via Redis (defense-in-depth behind Cloudflare).
const REDIS_URL = process.env.REDIS_URL || "";
const REDIS_BURST_PER_SEC = Number(process.env.REDIS_BURST_PER_SEC || 10);
const REDIS_BAN_SECONDS = Number(process.env.REDIS_BAN_SECONDS || 600);
const REDIS_RATE_LIMIT_ENABLED = (process.env.REDIS_RATE_LIMIT_ENABLED ?? "true").toLowerCase() === "true";

let redis: ReturnType<typeof createRedisClient> | null = null;
let redisReady = false;
if (REDIS_URL && REDIS_RATE_LIMIT_ENABLED) {
  redis = createRedisClient({
    url: REDIS_URL,
    socket: { reconnectStrategy: (retries) => Math.min(retries * 100, 3000) },
  });
  redis.on("ready", () => { redisReady = true; });
  redis.on("end", () => { redisReady = false; });
  redis.on("error", () => { redisReady = false; });
  redis.connect().catch(() => { /* degrade open until reachable */ });
}

function getClientIp(req: express.Request): string {
  // Behind Cloudflare, cf-connecting-ip is the real client IP (unspoofable at edge).
  return String(req.headers["cf-connecting-ip"] || req.ip || "unknown");
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.disable("x-powered-by");
  app.set("trust proxy", true);

  // Distributed per-IP burst rate limit (10/s default). Degrades open when
  // Redis is unset/unreachable, so the site keeps serving regardless.
  app.use(async (req, res, next) => {
    if (req.path === "/api/health") return next();
    if (!redis || !redisReady) return next();
    const ip = getClientIp(req);
    try {
      if (await redis.get(`ban:ip:${ip}`)) {
        return res.status(429).json({ error: "IP temporarily blocked" });
      }
      const sec = Math.floor(Date.now() / 1000);
      const key = `rl:ip:${ip}:${sec}`;
      const hits = await redis.incr(key);
      if (hits === 1) await redis.expire(key, 2);
      if (hits > REDIS_BURST_PER_SEC) {
        await redis.set(`ban:ip:${ip}`, "1", { EX: REDIS_BAN_SECONDS });
        return res.status(429).json({ error: "Rate limit exceeded" });
      }
    } catch {
      /* Redis hiccup: fail open */
    }
    next();
  });

  // Security headers on every response (incl. static assets).
  app.use((_req, res, next) => {
    res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("Referrer-Policy", "no-referrer");
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    // Clickjacking + downgrade protection; intentionally does NOT restrict
    // script/style/img sources so the existing SPA keeps rendering.
    res.setHeader(
      "Content-Security-Policy",
      "frame-ancestors 'self'; base-uri 'self'; object-src 'none'; upgrade-insecure-requests"
    );
    next();
  });

  // Canonical host: 301 www.troikadrive.com -> troikadrive.com.
  app.use((req, res, next) => {
    const host = String(req.headers.host || "").toLowerCase().split(":")[0];
    if (host === "www.troikadrive.com") {
      return res.redirect(301, `https://${CANONICAL_HOST}${req.originalUrl}`);
    }
    next();
  });

  // Origin protection: reject direct origin hits that bypass Cloudflare.
  app.use((req, res, next) => {
    if (req.path === "/api/health") return next(); // never block health checks
    if (ORIGIN_SHARED_SECRET && req.headers["x-origin-secret"] !== ORIGIN_SHARED_SECRET) {
      return res.redirect(301, `https://${CANONICAL_HOST}${req.originalUrl}`);
    }
    next();
  });

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Troika Drive API is running" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "dist")));
    
    // Fallback to index.html for SPA routing
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
