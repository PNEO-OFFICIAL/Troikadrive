/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import DataDeletion from './pages/DataDeletion';
import {
  ArrowUpRight,
  Mail,
  Linkedin,
  Instagram,
  CheckCircle2,
  Shirt,
  TrendingUp,
  Globe,
  Sparkles,
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const LOGO = '/troikadrive.png';

type Language = 'en' | 'ko';

const translations = {
  en: {
    nav: {
      about: "About",
      leadership: "Leadership",
      ventures: "Ventures",
      contact: "Contact"
    },
    hero: {
      title: "THREE MINDS. ONE VISION. UNSTOPPABLE DRIVE.",
      subtitle: "Troika Drive runs a portfolio of ventures across apparel, community, and global investing — built on family legacy, technical precision, and relentless growth.",
      primaryCta: "Get in touch",
      secondaryCta: "Explore our ventures"
    },
    about: {
      tag: "About Troika Drive",
      title: "A Legacy of Excellence, Built on Brotherhood.",
      p1: "Troika Drive represents the convergence of three distinct professional journeys into a single, high-performance engine. Founded by the Vance brothers, our firm was born from a realization that the most resilient businesses are those built on unbreakable trust and complementary expertise."
    },
    leadership: {
      tag: "The Founding Brothers",
      title: "THE ARCHITECTS OF DRIVE",
      expertise: "Key Expertise",
      responsibilities: "Core Responsibilities"
    },
    ventures: {
      tag: "Our Portfolio",
      title: "Three minds, many ventures.",
      subtitle: "Each venture is built and run by the Troika — strategy, technology, and growth working as one engine.",
      explore: "Explore",
      cards: [
        {
          label: "Venture 01",
          name: "Project 1 Apparel",
          kicker: "Apparel · Dropshipping",
          desc: "$1 Million in Sales in 1 Year through dropshipping."
        },
        {
          label: "Venture 02",
          name: "Mintcast",
          kicker: "Community · Prediction",
          desc: "An issue-prediction community where people forecast what happens next."
        },
        {
          label: "Venture 03",
          name: "Seoul Tokyo",
          kicker: "Finance · Markets",
          desc: "Investing without Borders — bridging Korean and Japanese markets."
        },
        {
          label: "Venture 04",
          name: "Coming Soon",
          kicker: "In the making",
          desc: "A new venture is taking shape. Stay tuned."
        }
      ]
    },
    footer: {
      desc: "Empowering ventures through the power of brotherhood, innovation, and strategic excellence.",
      company: "Company",
      contact: "Contact",
      hq: "HQ: Gyeonggi-do",
      businessId: "Business Registration: 4083222247",
      repPhone: "Representative Phone: 010-4072-5072",
      rights: "© 2026 Troika Drive. All Rights Reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service"
    }
  },
  ko: {
    nav: {
      about: "소개",
      leadership: "리더십",
      ventures: "사업",
      contact: "문의"
    },
    hero: {
      title: "세 개의 지성. 하나의 비전. 멈추지 않는 동력.",
      subtitle: "Troika Drive는 의류, 커뮤니티, 글로벌 투자를 아우르는 사업 포트폴리오를 운영합니다. 가족의 유산, 기술적 정밀함, 그리고 끊임없는 성장 위에 세워졌습니다.",
      primaryCta: "문의하기",
      secondaryCta: "사업 보기"
    },
    about: {
      tag: "Troika Drive 소개",
      title: "형제애로 구축된 탁월함의 유산.",
      p1: "Troika Drive는 세 명의 서로 다른 전문적 여정이 하나의 고성능 엔진으로 수렴된 결과물입니다. Vance 형제에 의해 설립된 당사는 가장 회복력 있는 비즈니스가 깨지지 않는 신뢰와 상호 보완적인 전문 지식을 바탕으로 구축된다는 깨달음에서 시작되었습니다."
    },
    leadership: {
      tag: "설립자 형제",
      title: "동력의 설계자들",
      expertise: "주요 전문 분야",
      responsibilities: "핵심 책임"
    },
    ventures: {
      tag: "사업 포트폴리오",
      title: "세 개의 지성, 여러 개의 사업.",
      subtitle: "각 사업은 트로이카가 직접 만들고 운영합니다 — 전략, 기술, 성장이 하나의 엔진으로 움직입니다.",
      explore: "자세히",
      cards: [
        {
          label: "Venture 01",
          name: "Project 1 Apparel",
          kicker: "어패럴 · 드롭쉬핑",
          desc: "드롭쉬핑으로 1년 만에 매출 100만 달러 달성."
        },
        {
          label: "Venture 02",
          name: "Mintcast",
          kicker: "커뮤니티 · 예측",
          desc: "다음에 무슨 일이 일어날지 예측하는 이슈 예측 커뮤니티."
        },
        {
          label: "Venture 03",
          name: "Seoul Tokyo",
          kicker: "금융 · 마켓",
          desc: "국경 없는 투자 — 한국과 일본 시장을 잇다."
        },
        {
          label: "Venture 04",
          name: "Coming Soon",
          kicker: "준비 중",
          desc: "새로운 사업을 준비하고 있습니다. 곧 만나보세요."
        }
      ]
    },
    footer: {
      desc: "형제애, 혁신, 그리고 전략적 탁월함의 힘을 통해 사업에 역량을 부여합니다.",
      company: "회사",
      contact: "연락처",
      hq: "본사: 경기도",
      businessId: "사업자 번호: 4083222247",
      repPhone: "대표자 전화번호: 010-4072-5072",
      rights: "© 2026 Troika Drive. 모든 권리 보유.",
      privacy: "개인정보 처리방침",
      terms: "이용약관"
    }
  }
};

const brothers = (lang: Language) => [
  {
    name: "Daniel",
    role: lang === 'en' ? "Chief Executive Officer" : "최고 경영자 (CEO)",
    background: lang === 'en'
      ? "Daniel leads Troika Drive with a focus on holistic business growth and operational excellence. His leadership spans across marketing, production, and high-level business management."
      : "Daniel은 총체적인 비즈니스 성장과 운영 우수성에 중점을 두고 Troika Drive를 이끕니다. 그의 리더십은 마케팅, 생산 및 고도의 비즈니스 관리에 걸쳐 있습니다.",
    expertise: lang === 'en' ? ["Marketing", "Production", "Business Management", "Investment"] : ["마케팅", "생산", "비즈니스 관리", "투자"],
    responsibilities: lang === 'en' ? "Daniel oversees the firm's overall strategic direction, marketing initiatives, and investment portfolio." : "Daniel은 회사의 전반적인 전략적 방향, 마케팅 이니셔티브 및 투자 포트폴리오를 감독합니다.",
  },
  {
    name: "Samuel",
    role: lang === 'en' ? "Chief Operating Officer" : "최고 운영 책임자 (COO)",
    background: lang === 'en'
      ? "Samuel specializes in operational strategy and organizational development. He ensures that Troika Drive's internal processes are optimized for scale and efficiency."
      : "Samuel은 운영 전략과 조직 개발을 전문으로 합니다. 그는 Troika Drive의 내부 프로세스가 규모 확장과 효율성에 최적화되도록 보장합니다.",
    expertise: lang === 'en' ? ["Operations", "Strategy", "Human Resources"] : ["운영", "전략", "인사 관리"],
    responsibilities: lang === 'en' ? "Samuel leads the firm's day-to-day operations, organizational growth, and strategic planning." : "Samuel은 회사의 일상적인 운영, 조직 성장 및 전략적 계획을 주도합니다.",
  },
  {
    name: "Tom",
    role: lang === 'en' ? "Chief Technology Officer" : "최고 기술 책임자 (CTO)",
    background: lang === 'en'
      ? "Tom drives the technical vision of the firm. With deep expertise in engineering, he oversees the development of robust systems and innovative technical solutions for our clients."
      : "Tom은 회사의 기술적 비전을 주도합니다. 엔지니어링에 대한 깊은 전문 지식을 바탕으로 고객을 위한 견고한 시스템과 혁신적인 기술 솔루션 개발을 감독합니다.",
    expertise: lang === 'en' ? ["Engineering"] : ["엔지니어링"],
    responsibilities: lang === 'en' ? "Tom manages the technology stack, engineering teams, and technical project delivery." : "Tom은 기술 스택, 엔지니어링 팀 및 기술 프로젝트 제공을 관리합니다.",
  }
];

// Visual accents for the venture cards (photos to be added later)
const ventureVisuals = [
  { icon: Shirt, from: "from-amber-100", to: "to-orange-50", iconColor: "text-amber-700", status: "live" },
  { icon: TrendingUp, from: "from-emerald-100", to: "to-teal-50", iconColor: "text-emerald-700", status: "live" },
  { icon: Globe, from: "from-sky-100", to: "to-indigo-50", iconColor: "text-sky-700", status: "live" },
  { icon: Sparkles, from: "from-neutral-100", to: "to-neutral-50", iconColor: "text-neutral-500", status: "soon" },
];

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/data-deletion" element={<DataDeletion />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function NotFound() {
  useEffect(() => {
    document.title = '404 Not Found';
  }, []);
  return <div style={{ display: 'none' }}></div>;
}

function Landing() {
  const [lang] = useState<Language>('en');
  const t = translations[lang];
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-[#F4F3EF] text-[#1A1A1A] font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Hero Section — Cofounder-style, full-bleed pixel background */}
      <section id="top" className="relative w-full h-screen min-h-[640px] overflow-hidden bg-gradient-to-b from-sky-400 via-sky-300 to-indigo-300">
        {/* Pixel-art background image (replace public/seoul-hero.png) */}
        <img
          src="/seoul-hero.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
          style={{ imageRendering: 'pixelated' }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
        />
        {/* Legibility scrim for white text on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />

        {/* Transparent glassy nav */}
        <nav className="absolute top-0 left-0 right-0 z-20">
          <div className="max-w-[1800px] mx-auto px-6 md:px-10 lg:px-12 h-20 flex items-center justify-between">
            <a href="#top" className="text-white text-2xl font-serif tracking-tight drop-shadow-sm">Troika Drive</a>
            <div className="hidden md:flex items-center gap-2.5 text-sm">
              {/* Main box group with internal separators */}
              <div className="flex items-stretch bg-white/10 backdrop-blur-md rounded-xl border border-white/15 divide-x divide-white/15 overflow-hidden">
                {['How to', 'Start', 'Build', 'Sell', 'Scale'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className={cn(
                      "px-4 py-2.5 transition-colors whitespace-nowrap",
                      item === 'Start'
                        ? "bg-white/15 text-white font-medium"
                        : "text-white/90 hover:bg-white/10"
                    )}
                  >
                    {item}
                  </a>
                ))}
              </div>
              {/* Separate boxes */}
              {['Resources', 'Pricing', 'Log in'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-white/90 hover:bg-white/20 transition-colors whitespace-nowrap"
                >
                  {item}
                </a>
              ))}
              <a href="#" className="px-4 py-2.5 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-colors whitespace-nowrap">
                Run a company
              </a>
            </div>
          </div>
        </nav>

        {/* Hero copy — upper-left, cofounder sizing */}
        <div className="relative z-10 max-w-[1800px] mx-auto px-6 md:px-10 lg:px-12 h-full flex flex-col justify-start pt-28 md:pt-[15vh]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-[40rem]"
          >
            <h1 className="text-[2.5rem] md:text-[2.75rem] font-medium text-white leading-[1.12] tracking-tight mb-4 drop-shadow-md">
              Three Minds, One Vision, Unstoppable Drive.
            </h1>
            <p className="text-sm md:text-base text-white/85 mb-7 drop-shadow">
              Run engineering, sales, marketing, design, finance, and ops.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors">
                Run a company
              </a>
              <a href="#" className="px-5 py-2.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white text-sm font-medium hover:bg-white/25 transition-colors">
                Check out the launch
              </a>
            </div>
          </motion.div>
        </div>

        {/* Floating task chips */}
        <div className="hidden lg:flex flex-col gap-3 absolute right-[14%] top-1/2 -translate-y-1/2 z-10">
          {[
            { t: 'Task Completed', s: 'Marketing Campaign', done: true },
            { t: 'Task Completed', s: 'New webpage', done: true },
            { t: 'Task running', s: 'bug fix', done: false },
          ].map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
              className="flex items-center gap-2 bg-black/35 backdrop-blur-md rounded-lg px-3 py-2 border border-white/10 shadow-lg"
            >
              {c.done ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 animate-pulse" />
              )}
              <span className="text-[11px] text-white/55">{c.t}</span>
              <span className="text-[11px] text-white font-medium">{c.s}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section — left text, right image */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px w-12 bg-emerald-600" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">{t.about.tag}</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight mb-8">{t.about.title}</h2>
            <div className="space-y-6 text-lg text-black/70 leading-relaxed">
              <p>{t.about.p1}</p>
            </div>
          </div>
          <div className="relative aspect-square bg-neutral-100 overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000"
              alt="Modern Office"
              className="object-cover w-full h-full opacity-90 hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 mb-4 block">{t.leadership.tag}</span>
            <h2 className="text-5xl font-bold tracking-tighter">{t.leadership.title}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {brothers(lang).map((brother, idx) => (
              <motion.div
                key={`${lang}-${idx}`}
                whileHover={{ y: -5 }}
                className="group p-8 bg-white border border-black/5 rounded-2xl shadow-sm"
              >
                <h3 className="text-2xl font-bold mb-1">{brother.name}</h3>
                <p className="text-emerald-600 text-sm font-bold uppercase tracking-widest mb-6">{brother.role}</p>
                <p className="text-black/60 text-sm leading-relaxed mb-6 line-clamp-3">
                  {brother.background}
                </p>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-2">{t.leadership.expertise}</h4>
                    <div className="flex flex-wrap gap-2">
                      {brother.expertise.map((exp, i) => (
                        <span key={i} className="px-3 py-1 bg-black/5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-2">{t.leadership.responsibilities}</h4>
                    <p className="text-xs text-black/70 italic leading-relaxed">
                      {brother.responsibilities}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ventures Section — cofounder-style cards */}
      <section id="ventures" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-black/40 mb-4 block">{t.ventures.tag}</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-5">{t.ventures.title}</h2>
            <p className="text-black/50 text-lg leading-relaxed">{t.ventures.subtitle}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.ventures.cards.map((card, idx) => {
              const v = ventureVisuals[idx];
              const Icon = v.icon;
              return (
                <motion.div
                  key={`${lang}-${idx}`}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  className="bg-white rounded-2xl border border-black/5 shadow-sm hover:shadow-xl transition-shadow overflow-hidden flex flex-col"
                >
                  {/* Image placeholder (photos to be added later) */}
                  <div className={cn("relative aspect-[4/3] bg-gradient-to-br flex items-center justify-center", v.from, v.to)}>
                    <Icon className={cn("w-12 h-12", v.iconColor)} strokeWidth={1.5} />
                    <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest text-black/40 bg-white/70 backdrop-blur px-2.5 py-1 rounded-full">
                      {card.label}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/35 mb-2">{card.kicker}</div>
                    <h3 className="text-xl font-bold tracking-tight mb-2">{card.name}</h3>
                    <p className="text-sm text-black/55 leading-relaxed flex-1">{card.desc}</p>
                    {v.status === 'live' && (
                      <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-black/60 group-hover:text-black">
                        {t.ventures.explore}
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-black/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <img src={LOGO} alt="Troika Drive logo" className="w-9 h-9 object-contain" />
                <span className="font-bold text-xl tracking-tighter uppercase">Troika Drive</span>
              </div>
              <p className="text-black/50 max-w-sm mb-8">
                {t.footer.desc}
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer">
                  <Instagram className="w-4 h-4" />
                </div>
                <a
                  href="mailto:trinitycapital333@gmail.com"
                  className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold uppercase text-[10px] tracking-[0.2em] mb-6">{t.footer.company}</h4>
              <ul className="space-y-4 text-sm text-black/60">
                <li><a href="#about" className="hover:text-emerald-600 transition-colors">{t.nav.about}</a></li>
                <li><a href="#leadership" className="hover:text-emerald-600 transition-colors">{t.nav.leadership}</a></li>
                <li><a href="#ventures" className="hover:text-emerald-600 transition-colors">{t.nav.ventures}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase text-[10px] tracking-[0.2em] mb-6">{t.footer.contact}</h4>
              <ul className="space-y-4 text-sm text-black/60">
                <li>{t.footer.hq}</li>
                <li>{t.footer.businessId}</li>
                <li>{t.footer.repPhone}</li>
                <li>trinitycapital333@gmail.com</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-black/30">
              {t.footer.rights}
            </p>
            <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-black/30">
              <Link to="/privacy" className="hover:text-black cursor-pointer">{t.footer.privacy}</Link>
              <Link to="/terms" className="hover:text-black cursor-pointer">{t.footer.terms}</Link>
              <Link to="/data-deletion" className="hover:text-black cursor-pointer">Data Deletion</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
