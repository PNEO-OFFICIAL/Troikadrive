import express from "express";
import { createServer as createViteServer } from "vite";
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

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.disable("x-powered-by");

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
