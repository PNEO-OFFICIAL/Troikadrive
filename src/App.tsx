/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import DataDeletion from './pages/DataDeletion';
import { 
  Users, 
  TrendingUp, 
  Rocket, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Shield, 
  Globe, 
  Zap,
  BarChart3,
  Mail,
  Linkedin,
  Twitter,
  Languages,
  Instagram,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Language = 'en' | 'ko';

const translations = {
  en: {
    nav: {
      about: "About",
      leadership: "Leadership",
      future: "Future",
      performance: "Performance",
      investments: "Investments",
      contact: "Contact"
    },
    hero: {
      title: "THREE MINDS. ONE VISION. UNSTOPPABLE DRIVE.",
      subtitle: "Troika Drive is a premier strategic consulting and technology firm founded on the principles of family legacy, technical precision, and relentless growth."
    },
    about: {
      tag: "About Troika Drive",
      title: "A Legacy of Excellence, Built on Brotherhood.",
      p1: "Troika Drive represents the convergence of three distinct professional journeys into a single, high-performance engine. Founded by the Vance brothers, our firm was born from a realization that the most resilient businesses are those built on unbreakable trust and complementary expertise.",
      p2: "Our core values—Integrity, Innovation, and Interdependence—guide every engagement. What differentiates us is our \"Troika\" model: every client benefits from the combined oversight of strategy, technology, and growth experts who share a common DNA.",
      trust: "Unbreakable Trust",
      trustDesc: "Family-owned governance ensuring long-term stability.",
      innovation: "Rapid Innovation",
      innovationDesc: "Cutting-edge tech integration for immediate impact."
    },
    leadership: {
      tag: "The Founding Brothers",
      title: "THE ARCHITECTS OF DRIVE",
      expertise: "Key Expertise",
      responsibilities: "Core Responsibilities"
    },
    future: {
      tag: "Strategic Direction",
      title: "THE ROAD AHEAD",
      subtitle: "We are constantly evolving. Our future initiatives focus on the intersection of human leadership and machine intelligence.",
      roadmap: "View Roadmap",
      active: "Active Project",
      alignment: "Strategic Alignment:"
    },
    performance: {
      tag: "Brand Identity",
      title: "PROJECT1 APPAREL",
      p1: "Project1 focuses on the basics and proposes daily items that can be worn for a long time. We believe that true style comes from simplicity and enduring quality.",
      p2: "Meet our simple designs and high-quality products at reasonable prices. Our mission is to provide apparel that seamlessly integrates into your daily life.",
      visit: "Visit SmartStore",
      featured: "Featured Collection",
      collection: "Essential Daily Wear 2026"
    },
    investments: {
      tag: "Track Record",
      title: "INVESTMENT LOGS & ACHIEVEMENTS",
      subtitle: "Our team has a proven history of identifying and scaling high-potential ventures across diverse sectors.",
      metrics: {
        aum: "Assets Under Management",
        exits: "Successful Exits",
        roi: "Average ROI",
        portfolio: "Portfolio Companies"
      },
      log: "Recent Activity",
      confidential: "Confidential Data",
      authorized: "Authorized Partners Only"
    },
    footer: {
      desc: "Empowering organizations through the power of brotherhood, innovation, and strategic excellence.",
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
      future: "미래",
      performance: "성과",
      investments: "투자",
      contact: "문의"
    },
    hero: {
      title: "세 개의 지성. 하나의 비전. 멈추지 않는 동력.",
      subtitle: "Troika Drive는 가족의 유산, 기술적 정밀함, 그리고 끊임없는 성장의 원칙 위에 세워진 최고의 전략 컨설팅 및 기술 기업입니다."
    },
    about: {
      tag: "Troika Drive 소개",
      title: "형제애로 구축된 탁월함의 유산.",
      p1: "Troika Drive는 세 명의 서로 다른 전문적 여정이 하나의 고성능 엔진으로 수렴된 결과물입니다. Vance 형제에 의해 설립된 당사는 가장 회복력 있는 비즈니스가 깨지지 않는 신뢰와 상호 보완적인 전문 지식을 바탕으로 구축된다는 깨달음에서 시작되었습니다.",
      p2: "우리의 핵심 가치인 정직, 혁신, 상호 의존성은 모든 프로젝트의 지침이 됩니다. 우리를 차별화하는 것은 '트로이카' 모델입니다. 모든 고객은 공통된 DNA를 공유하는 전략, 기술, 성장 전문가들의 통합된 감독으로부터 혜택을 받습니다.",
      trust: "깨지지 않는 신뢰",
      trustDesc: "장기적인 안정성을 보장하는 가족 소유 거버넌스.",
      innovation: "신속한 혁신",
      innovationDesc: "즉각적인 영향을 위한 최첨단 기술 통합."
    },
    leadership: {
      tag: "설립자 형제",
      title: "동력의 설계자들",
      expertise: "주요 전문 분야",
      responsibilities: "핵심 책임"
    },
    future: {
      tag: "전략적 방향",
      title: "앞으로의 길",
      subtitle: "우리는 끊임없이 진화합니다. 우리의 미래 이니셔티브는 인간의 리더십과 기계 지능의 교차점에 초점을 맞춥니다.",
      roadmap: "로드맵 보기",
      active: "진행 중인 프로젝트",
      alignment: "전략적 정렬:"
    },
    performance: {
      tag: "브랜드 정체성",
      title: "PROJECT1 어패럴",
      p1: "Project1은 기본에 집중하며 오랫동안 입을 수 있는 데일리 아이템을 제안합니다. 우리는 진정한 스타일이 단순함과 지속적인 품질에서 나온다고 믿습니다.",
      p2: "합리적인 가격의 심플한 디자인과 고품질 제품을 만나보세요. 우리의 미션은 일상 생활에 자연스럽게 스며드는 의류를 제공하는 것입니다.",
      visit: "스마트스토어 방문",
      featured: "추천 컬렉션",
      collection: "에센셜 데일리 웨어 2026"
    },
    investments: {
      tag: "실적",
      title: "투자 기록 및 성과",
      subtitle: "우리 팀은 다양한 분야에서 잠재력이 높은 벤처를 발굴하고 확장한 입증된 역사를 가지고 있습니다.",
      metrics: {
        aum: "운용 자산",
        exits: "성공적인 엑시트",
        roi: "평균 ROI",
        portfolio: "포트폴리오 기업"
      },
      log: "최근 활동",
      confidential: "기밀 데이터",
      authorized: "승인된 파트너 전용"
    },
    footer: {
      desc: "형제애, 혁신, 그리고 전략적 탁월함의 힘을 통해 조직에 역량을 부여합니다.",
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
    image: "https://picsum.photos/seed/daniel/400/500"
  },
  {
    name: "Samuel",
    role: lang === 'en' ? "Chief Operating Officer" : "최고 운영 책임자 (COO)",
    background: lang === 'en'
      ? "Samuel specializes in operational strategy and organizational development. He ensures that Troika Drive's internal processes are optimized for scale and efficiency."
      : "Samuel은 운영 전략과 조직 개발을 전문으로 합니다. 그는 Troika Drive의 내부 프로세스가 규모 확장과 효율성에 최적화되도록 보장합니다.",
    expertise: lang === 'en' ? ["Operations", "Strategy", "Human Resources"] : ["운영", "전략", "인사 관리"],
    responsibilities: lang === 'en' ? "Samuel leads the firm's day-to-day operations, organizational growth, and strategic planning." : "Samuel은 회사의 일상적인 운영, 조직 성장 및 전략적 계획을 주도합니다.",
    image: "https://picsum.photos/seed/samuel/400/500"
  },
  {
    name: "Tom",
    role: lang === 'en' ? "Chief Technology Officer" : "최고 기술 책임자 (CTO)",
    background: lang === 'en'
      ? "Tom drives the technical vision of the firm. With deep expertise in engineering, he oversees the development of robust systems and innovative technical solutions for our clients."
      : "Tom은 회사의 기술적 비전을 주도합니다. 엔지니어링에 대한 깊은 전문 지식을 바탕으로 고객을 위한 견고한 시스템과 혁신적인 기술 솔루션 개발을 감독합니다.",
    expertise: lang === 'en' ? ["Engineering"] : ["엔지니어링"],
    responsibilities: lang === 'en' ? "Tom manages the technology stack, engineering teams, and technical project delivery." : "Tom은 기술 스택, 엔지니어링 팀 및 기술 프로젝트 제공을 관리합니다.",
    image: "https://picsum.photos/seed/tom/400/500"
  }
];

const futureProjects = (lang: Language) => [
  {
    title: lang === 'en' ? "Project 1 Apparel: New AI ChatBot Implementation" : "Project 1 어패럴: 신규 AI 챗봇 구현",
    description: lang === 'en'
      ? "We are currently deploying a sophisticated AI-driven customer experience platform for Project 1 apparel. This initiative leverages advanced NLP to provide real-time styling consultations and automated tracking."
      : "현재 Project 1 어패럴을 위한 정교한 AI 기반 고객 경험 플랫폼을 개발 및 배포하고 있습니다. 이 이니셔티브는 고급 자연어 처리를 활용하여 실시간 스타일링 상담 및 자동 추적을 제공합니다.",
    timeline: lang === 'en' ? "Ongoing Implementation" : "진행 중인 구현",
    alignment: lang === 'en' ? "Directly supports our mission to bridge the gap between high-quality apparel and cutting-edge technology." : "고품질 의류와 최첨단 기술 사이의 가교 역할을 한다는 우리의 미션을 직접적으로 지원합니다.",
    qrCode: "https://ik.imagekit.io/hanjully/auto_dm_bot_qr.png",
    instagram: "@auto_dm_bot",
    instagramUrl: "https://www.instagram.com/auto_dm_bot/"
  },
  {
    title: lang === 'en' ? "Coming Soon... Project 2: AI Consumer Interaction App" : "커밍순... Project 2: AI 소비자 상호작용 앱",
    description: lang === 'en'
      ? "Project 2 is an upcoming interactive application designed to revolutionize how brands communicate with consumers. Powered by advanced AI, it provides personalized, human-like interaction at scale."
      : "Project 2는 브랜드가 소비자와 소통하는 방식을 혁신하기 위해 설계된 차세대 상호작용 애플리케이션입니다. 고급 AI를 기반으로 대규모의 개인화된 인간 중심 상호작용을 제공합니다.",
    timeline: lang === 'en' ? "Development Phase" : "개발 단계",
    alignment: lang === 'en' ? "Aligns with our vision of creating intelligent systems that enhance human connection and business efficiency." : "인간의 연결성과 비즈니스 효율성을 향상시키는 지능형 시스템을 구축한다는 우리의 비전과 일치합니다."
  }
];

const projectImages = [
  "https://ca.gymshark.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwl6q2in9o7k3%2F3TEs4m42UBtBFwWEx3MZdK%2Fe98683b64630390ea4c396a9b0d885a5%2FHeadless_Desktop_-_25876105.jpeg&w=1920&q=85",
  "https://www.youngla.com/cdn/shop/files/YLA9.25.25D-BFBATCAVE_SOCIAL_099_170e850a-e9ca-48fd-b8fb-54e0fd6a90e7.jpg?v=1762471310&width=1200",
  "https://breathedivinity.com/cdn/shop/files/DSC06274-3_1100x.jpg?v=1774327866",
  "https://breathedivinity.com/cdn/shop/files/DSC06544_5fe8dc33-0de7-4e7b-9dca-5402d172df65_1100x.jpg?v=1774340570",
  "https://www.youngla.com/cdn/shop/files/YLA9.25.25D-BFBATCAVE_SOCIAL_105.jpg?v=1762823654&width=1200",
  "https://cdn.shopify.com/s/files/1/2446/8477/files/images-ShadowLSMuscleFitTeeGSBlackGSBrandBlueA1B5B_BC8K_0389_V1_1920x.jpg?v=1770286684"
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
  const [lang, setLang] = useState<Language>('en');
  const [currentImg, setCurrentImg] = useState(0);
  const t = translations[lang];
  const location = useLocation();
  const projectsRef = React.useRef<HTMLDivElement>(null);

  const scrollProjects = (direction: 'left' | 'right') => {
    if (projectsRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      projectsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % projectImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-lg italic">T</span>
            </div>
            <span className="font-bold text-xl tracking-tighter uppercase">Troika Drive</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest opacity-60">
            <a href="#about" className="hover:opacity-100 transition-opacity">{t.nav.about}</a>
            <a href="#leadership" className="hover:opacity-100 transition-opacity">{t.nav.leadership}</a>
            <a href="#projects" className="hover:opacity-100 transition-opacity">{t.nav.future}</a>
            <a href="#performance" className="hover:opacity-100 transition-opacity">{t.nav.performance}</a>
            <a href="#investments" className="hover:opacity-100 transition-opacity">{t.nav.investments}</a>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLang(lang === 'en' ? 'ko' : 'en')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/10 text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all"
            >
              <Languages className="w-3 h-3" />
              {lang === 'en' ? 'Korean' : 'English'}
            </button>
            <button className="bg-black text-white px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-emerald-600 transition-colors">
              {t.nav.contact}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            key={lang}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
              {t.hero.title.split('. ').map((part, i) => (
                <React.Fragment key={i}>
                  {part}{i < 2 ? '.' : ''}<br />
                </React.Fragment>
              ))}
            </h1>
            <p className="text-xl md:text-2xl text-black/60 leading-relaxed max-w-2xl">
              {t.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-white border-y border-black/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px w-12 bg-emerald-600" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">{t.about.tag}</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight mb-8">{t.about.title}</h2>
            <div className="space-y-6 text-lg text-black/70 leading-relaxed">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-12">
              <div className="flex flex-col gap-2">
                <Shield className="w-6 h-6 text-emerald-600" />
                <h3 className="font-bold uppercase text-xs tracking-widest">{t.about.trust}</h3>
                <p className="text-sm text-black/50">{t.about.trustDesc}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Zap className="w-6 h-6 text-emerald-600" />
                <h3 className="font-bold uppercase text-xs tracking-widest">{t.about.innovation}</h3>
                <p className="text-sm text-black/50">{t.about.innovationDesc}</p>
              </div>
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

      {/* Future Projects Section */}
      <section id="projects" className="py-24 px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-500 mb-4 block">{t.future.tag}</span>
              <h2 className="text-5xl font-bold tracking-tighter uppercase">{t.future.title}</h2>
              <p className="mt-6 text-white/60 text-lg">
                {t.future.subtitle}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => scrollProjects('left')}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-emerald-500 hover:text-black transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollProjects('right')}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-emerald-500 hover:text-black transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div 
            ref={projectsRef}
            className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {futureProjects(lang).map((project, idx) => (
              <div 
                key={idx} 
                className="min-w-[320px] md:min-w-[600px] p-12 border border-white/10 rounded-3xl hover:border-emerald-500/50 transition-colors group bg-white/5 snap-center"
              >
                <div className="flex flex-col gap-12">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest rounded-full">{t.future.active}</span>
                      <span className="text-xs font-bold text-white/40">{project.timeline}</span>
                    </div>
                    <h3 className="text-3xl font-bold mb-6">{project.title}</h3>
                    <p className="text-white/60 text-lg leading-relaxed mb-8">
                      {project.description}
                    </p>
                    
                    {project.qrCode && (
                      <div className="flex flex-wrap items-center gap-8 mb-8">
                        <div className="bg-white p-3 rounded-2xl border border-white/10 shadow-lg">
                          <img 
                            src={project.qrCode} 
                            alt="Chatbot QR" 
                            className="w-40 h-40 object-cover rounded-lg"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              // Fallback if direct link fails
                              (e.target as HTMLImageElement).src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${project.instagramUrl}`;
                            }}
                          />
                        </div>
                        <a 
                          href={project.instagramUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-6 py-3 bg-white/10 rounded-full hover:bg-white/20 transition-all group/insta"
                        >
                          <Instagram className="w-5 h-5 text-pink-500 group-hover/insta:scale-110 transition-transform" />
                          <div className="text-left">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">Instagram</div>
                            <div className="text-sm font-bold">{project.instagram}</div>
                          </div>
                        </a>
                      </div>
                    )}

                    <div className="pt-8 border-t border-white/10">
                      <p className="text-sm text-white/40 italic">
                        <span className="text-emerald-500 font-bold not-italic uppercase text-[10px] tracking-widest mr-2">{t.future.alignment}</span>
                        {project.alignment}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section id="performance" className="py-24 px-6">
        {/* ... existing section content ... */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 mb-4 block">{t.performance.tag}</span>
              <h2 className="text-5xl font-bold tracking-tighter mb-8">{t.performance.title}</h2>
              <div className="space-y-6 text-lg text-black/70 leading-relaxed">
                <p>{t.performance.p1}</p>
                <p>{t.performance.p2}</p>
              </div>
              
              <div className="mt-12 flex items-center gap-4">
                <a 
                  href="https://smartstore.naver.com/project1/profile" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-emerald-600 text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-emerald-700 transition-colors flex items-center gap-2"
                >
                  {t.performance.visit} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="relative aspect-video bg-neutral-100 rounded-2xl overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentImg}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 1 }}
                  src={projectImages[currentImg]} 
                  alt="Project1 Apparel" 
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute bottom-8 left-8">
                <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-black/5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-1">{t.performance.featured}</p>
                  <p className="text-sm font-bold">{t.performance.collection}</p>
                </div>
              </div>
              <div className="absolute bottom-8 right-8 flex gap-2">
                {projectImages.map((_, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "w-1.5 h-1.5 rounded-full transition-all duration-500",
                      i === currentImg ? "bg-emerald-500 w-4" : "bg-white/50"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Logs & Achievements Section */}
      <section id="investments" className="py-24 px-6 bg-white border-y border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 mb-4 block">{t.investments.tag}</span>
            <h2 className="text-5xl font-bold tracking-tighter">{t.investments.title}</h2>
            <p className="mt-6 text-black/60 text-lg max-w-2xl mx-auto">
              {t.investments.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-20">
            {[
              { label: t.investments.metrics.aum, value: "$150M+", icon: Shield },
              { label: t.investments.metrics.exits, value: "12", icon: Rocket },
              { label: t.investments.metrics.roi, value: "3.5x", icon: TrendingUp },
              { label: t.investments.metrics.portfolio, value: "45+", icon: Users },
            ].map((metric, i) => (
              <div key={i} className="p-8 bg-neutral-50 rounded-2xl border border-black/5 text-center">
                <metric.icon className="w-8 h-8 text-emerald-600 mx-auto mb-4" />
                <div className="text-3xl font-bold tracking-tighter mb-1">{metric.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-black/40">{metric.label}</div>
              </div>
            ))}
          </div>

          <div className="bg-black text-white rounded-3xl p-12 overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-emerald-500" />
                {t.investments.log}
              </h3>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8 relative">
                  <div className="absolute inset-0 z-20 backdrop-blur-md bg-black/40 flex items-center justify-center rounded-2xl border border-white/10">
                    <div className="text-center">
                      <Shield className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
                      <div className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-1">{t.investments.confidential}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-widest">{t.investments.authorized}</div>
                    </div>
                  </div>
                  {[
                    { company: "Nexus Robotics", sector: "AI/Automation", status: "Series B Lead", date: "Jan 2026" },
                    { company: "EcoFlow Energy", sector: "CleanTech", status: "Strategic Exit", date: "Nov 2025" },
                    { company: "Quantum Health", sector: "BioTech", status: "Seed Investment", date: "Aug 2025" },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-white/10 pb-4">
                      <div>
                        <div className="font-bold text-lg">{item.company}</div>
                        <div className="text-xs text-white/40 uppercase tracking-widest">{item.sector}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-emerald-500 font-bold text-sm">{item.status}</div>
                        <div className="text-[10px] text-white/30">{item.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                  <h4 className="font-bold mb-4 text-emerald-500">Achievement Spotlight</h4>
                  <p className="text-sm text-white/70 leading-relaxed mb-6">
                    Successfully facilitated the $450M acquisition of "AeroStream Logistics" by a Fortune 500 conglomerate, delivering a 5.2x return for our early-stage partners.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <Award className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest">Global M&A Award</div>
                      <div className="text-[10px] text-white/40">Deal of the Year 2025</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-50 py-20 px-6 border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-black rounded-sm flex items-center justify-center">
                  <span className="text-white font-bold text-lg italic">T</span>
                </div>
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
                  <Twitter className="w-4 h-4" />
                </div>
                <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer">
                  <Mail className="w-4 h-4" />
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold uppercase text-[10px] tracking-[0.2em] mb-6">{t.footer.company}</h4>
              <ul className="space-y-4 text-sm text-black/60">
                <li><a href="#about" className="hover:text-emerald-600 transition-colors">{t.nav.about}</a></li>
                <li><a href="#leadership" className="hover:text-emerald-600 transition-colors">{t.nav.leadership}</a></li>
                <li><a href="#projects" className="hover:text-emerald-600 transition-colors">{t.nav.future}</a></li>
                <li><a href="#performance" className="hover:text-emerald-600 transition-colors">{t.nav.performance}</a></li>
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
