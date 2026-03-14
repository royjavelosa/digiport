import React, { useState, useRef, useEffect } from "react";
import { PLDTIcon } from "./icons/PLDTIcon";
import { MITIcon } from "./icons/MITIcon";
import { AmdocsIcon } from "./icons/AmdocsIcon";
import { PowinIcon } from "./icons/PowinIcon";
import {
  HeroChart,
  JourneyChart,
  ImpactChart,
  VenturesChart,
  InlineRadarChart,
} from "./BackgroundCharts";
import {
  Mail,
  Linkedin,
  Code2,
  Zap,
  Users,
  Rocket,
  Award,
  BookOpen,
  ChevronRight,
  GraduationCap,
  ExternalLink,
  X,
  Globe,
} from "lucide-react";

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState("journey");
  const [showModal, setShowModal] = useState(false);
  const [focusedEdu, setFocusedEdu] = useState(null);
  const [isNavSticky, setIsNavSticky] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const navTop = navRef.current?.getBoundingClientRect().top ?? 1;
      setIsNavSticky(navTop <= 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleTabClick = (tab, openModal = false) => {
    setActiveTab(tab);
    if (openModal) setShowModal(true);
    if (navRef.current) {
      const navTop = navRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: navTop, behavior: "smooth" });
    }
  };

  const EDU_RADAR = {
    mit: {
      color: "#f87171",
      data: [
        { subject: "ML & AI", v: 92 },
        { subject: "Data Eng", v: 85 },
        { subject: "Statistics", v: 88 },
        { subject: "Python", v: 90 },
        { subject: "Research", v: 80 },
        { subject: "Cloud", v: 78 },
      ],
    },
    centro: {
      color: "#60a5fa",
      data: [
        { subject: "Algorithms", v: 90 },
        { subject: "Systems", v: 88 },
        { subject: "OOP", v: 92 },
        { subject: "Databases", v: 85 },
        { subject: "Soft Eng", v: 87 },
        { subject: "Math", v: 82 },
      ],
    },
    certs: {
      color: "#22d3ee",
      data: [
        { subject: "Agile", v: 95 },
        { subject: "Product", v: 88 },
        { subject: "Leadership", v: 92 },
        { subject: "Delivery", v: 90 },
        { subject: "Strategy", v: 85 },
        { subject: "Coaching", v: 87 },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"></div>
        <HeroChart />

        <div className="relative z-10 max-w-5xl w-full text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/50 mb-8 mt-4">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm">
              Available for new opportunities
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="block text-white">Jose Roy</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Javelosa
            </span>
          </h1>

          <p className="text-2xl md:text-3xl text-slate-300 mb-8">
            Software Engineering Manager & PSM-I
          </p>

          <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            15+ years leading global teams and building mission-critical
            platforms, from powering Super Bowls to connecting 65M+ users.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <a
              href="mailto:joseroyjavelosa@gmail.com"
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full hover:shadow-lg transition-all"
            >
              <Mail size={20} />
              <span className="font-semibold">Get in Touch</span>
            </a>
            <a
              href="https://linkedin.com/in/royjavelosa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-full hover:border-cyan-500 transition-all"
            >
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </a>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-8 py-4 bg-purple-600 rounded-full hover:bg-purple-700 transition-all"
            >
              <Code2 size={20} />
              <span>View Projects</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="p-8 md:p-10 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:border-cyan-500/50 transition-all">
              <div className="text-5xl md:text-6xl font-bold text-cyan-400 mb-3">
                15+
              </div>
              <div className="text-slate-300 text-base md:text-lg">
                Years Experience
              </div>
            </div>
            <div className="p-8 md:p-10 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:border-blue-500/50 transition-all">
              <div className="text-5xl md:text-6xl font-bold text-blue-400 mb-3">
                65M+
              </div>
              <div className="text-slate-300 text-base md:text-lg">
                Users Impacted
              </div>
            </div>
            <div className="p-8 md:p-10 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:border-purple-500/50 transition-all">
              <div className="text-5xl md:text-6xl font-bold text-purple-400 mb-3">
                27
              </div>
              <div className="text-slate-300 text-base md:text-lg">
                Team Size Led
              </div>
            </div>
            <div className="p-8 md:p-10 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:border-pink-500/50 transition-all">
              <div className="text-5xl md:text-6xl font-bold text-pink-400 mb-3">
                5+
              </div>
              <div className="text-slate-300 text-base md:text-lg">
                Countries
              </div>
            </div>
          </div>
        </div>
      </section>

      <div ref={navRef} className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 py-4 px-4">
            {/* Identity anchor — only visible when nav is pinned */}
            {isNavSticky && (
              <>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="w-7 h-7 rounded-full bg-cyan-500 flex items-center justify-center text-xs font-bold text-white">RJ</div>
                  <span className="hidden md:block text-sm font-semibold text-slate-200 whitespace-nowrap">Jose Roy Javelosa</span>
                </div>
                {/* Divider */}
                <div className="hidden md:block w-px h-5 bg-white/20 flex-shrink-0" />
              </>
            )}
            {/* Tabs */}
          <div className="flex flex-1 gap-2 overflow-x-auto scrollbar-hide py-1 pr-4 md:justify-center">
            {["journey", "impact", "ventures", "education"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition-all capitalize flex-shrink-0 ${
                  activeTab === tab
                    ? "bg-cyan-500 text-white"
                    : "bg-white/5 text-slate-400 hover:bg-white/10"
                }`}
              >
                {tab}
              </button>
            ))}
            <button
              onClick={() => handleTabClick("projects", true)}
              className={`relative px-6 py-2 rounded-full whitespace-nowrap transition-all flex items-center gap-2 flex-shrink-0 ${
                activeTab === "projects"
                  ? "bg-cyan-500 text-white"
                  : "bg-white/5 text-slate-200 hover:bg-white/10 ring-2 ring-cyan-400/80 shadow-[0_0_12px_2px_rgba(34,211,238,0.4)] animate-pulse"
              }`}
            >
              <Code2 size={18} />
              <span>Projects</span>
            </button>
          </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-slate-900 border-b border-white/10 p-6 flex items-center justify-between">
              <h2 className="text-3xl font-bold text-cyan-400">
                Live Projects
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-white/10 rounded-full"
              >
                <X size={24} className="text-slate-400" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <a
                href="https://www.elesi.app"
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="p-6 border border-white/10 rounded-2xl hover:border-cyan-500 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-cyan-500 rounded-xl">
                        <Code2 size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">Elesi</h3>
                        <p className="text-cyan-400 text-sm">
                          AI-Powered ATS CV Optimizer
                        </p>
                      </div>
                    </div>
                    <ExternalLink size={20} className="text-slate-400" />
                  </div>
                  <p className="text-slate-300 mb-4">
                    GenAI application that helps users optimize their CV for ATS
                    systems.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["GenAI", "NLP", "Python", "React"].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs text-cyan-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </a>

              <a
                href="https://fpna-ai-demo-6803067bb6e9.herokuapp.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="p-6 border border-white/10 rounded-2xl hover:border-purple-500 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-purple-500 rounded-xl">
                        <Code2 size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          FP&A AI Demo
                        </h3>
                        <p className="text-purple-400 text-sm">
                          Financial Planning & Analysis
                        </p>
                      </div>
                    </div>
                    <ExternalLink size={20} className="text-slate-400" />
                  </div>
                  <p className="text-slate-300 mb-4">
                    AI-powered financial analysis with Python, Pandas, and
                    Plotly.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "GenAI", "Pandas", "Plotly"].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-xs text-purple-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </a>

              <a
                href="https://www.mygreatlearning.com/eportfolio/jose-roy-javelosa"
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="p-6 border border-white/10 rounded-2xl hover:border-blue-500 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-500 rounded-xl">
                        <BookOpen size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          ML Portfolio
                        </h3>
                        <p className="text-blue-400 text-sm">
                          MIT IDSS Projects
                        </p>
                      </div>
                    </div>
                    <ExternalLink size={20} className="text-slate-400" />
                  </div>
                  <p className="text-slate-300 mb-4">
                    Machine learning projects from MIT Data Science program.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "scikit-learn", "ML", "MIT"].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-xs text-blue-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-3 md:px-6 pt-16 pb-20">
        {activeTab === "journey" && (
          <div className="relative overflow-hidden">
            <JourneyChart />
            <div className="relative z-10 space-y-8">
            <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Career Journey
            </h2>

            <div className="relative">
              {/* Vertical gradient line */}
              <div className="absolute left-3 md:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500" />

              {/* Powin Energy */}
              <div className="relative flex gap-3 md:gap-8 pb-12">
                <div className="relative z-10 flex-shrink-0 w-6 md:w-12 flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-cyan-500 ring-4 ring-cyan-500/20 mt-1" />
                </div>
                <div className="flex-1 p-4 md:p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm hover:border-cyan-500/50 transition-colors">
                  <div className="flex items-start gap-6">
                    <div className="p-4 bg-cyan-500 rounded-2xl flex items-center justify-center">
                      <PowinIcon size={32} color="white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-slate-400 text-sm">2023–2025</span>
                          <h3 className="text-2xl font-bold text-white">Powin Energy</h3>
                          <p className="text-cyan-400">Software Engineering Manager</p>
                        </div>
                      </div>
                      <ul className="space-y-2 text-slate-300">
                        <li className="flex gap-2">
                          <ChevronRight size={20} className="text-cyan-400 mt-0.5" />
                          Led Command Center UI for Super Bowl LVIII
                        </li>
                        <li className="flex gap-2">
                          <ChevronRight size={20} className="text-cyan-400 mt-0.5" />
                          Managed Waratah Super Battery operations
                        </li>
                        <li className="flex gap-2">
                          <ChevronRight size={20} className="text-cyan-400 mt-0.5" />
                          Built AWS serverless tools
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Amdocs — Engineering Manager */}
              <div className="relative flex gap-3 md:gap-8 pb-12">
                <div className="relative z-10 flex-shrink-0 w-6 md:w-12 flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-500 ring-4 ring-blue-500/20 mt-1" />
                </div>
                <div className="flex-1 p-4 md:p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm hover:border-blue-500/50 transition-colors">
                  <div className="flex items-start gap-6">
                    <div className="p-4 bg-blue-500 rounded-2xl flex items-center justify-center">
                      <AmdocsIcon size={32} color="white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-slate-400 text-sm">2022–2023</span>
                          <h3 className="text-2xl font-bold text-white">Amdocs</h3>
                          <p className="text-blue-400">Engineering Manager</p>
                        </div>
                      </div>
                      <ul className="space-y-2 text-slate-300">
                        <li className="flex gap-2">
                          <ChevronRight size={20} className="text-blue-400 mt-0.5" />
                          Led project for 65M subscribers
                        </li>
                        <li className="flex gap-2">
                          <ChevronRight size={20} className="text-blue-400 mt-0.5" />
                          Delivered eSIM and MNP features
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Amdocs — Team Lead R&D */}
              <div className="relative flex gap-3 md:gap-8 pb-12">
                <div className="relative z-10 flex-shrink-0 w-6 md:w-12 flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-purple-500 ring-4 ring-purple-500/20 mt-1" />
                </div>
                <div className="flex-1 p-4 md:p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm hover:border-purple-500/50 transition-colors">
                  <div className="flex items-start gap-6">
                    <div className="p-4 bg-purple-500 rounded-2xl flex items-center justify-center">
                      <AmdocsIcon size={32} color="white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-slate-400 text-sm">2019–2021</span>
                          <h3 className="text-2xl font-bold text-white">Amdocs</h3>
                          <p className="text-purple-400">Team Lead R&amp;D</p>
                        </div>
                      </div>
                      <ul className="space-y-2 text-slate-300">
                        <li className="flex gap-2">
                          <ChevronRight size={20} className="text-purple-400 mt-0.5" />
                          Led 3 Scrum teams (27 engineers)
                        </li>
                        <li className="flex gap-2">
                          <ChevronRight size={20} className="text-purple-400 mt-0.5" />
                          Global production support
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* PLDT */}
              <div className="relative flex gap-3 md:gap-8 pb-12">
                <div className="relative z-10 flex-shrink-0 w-6 md:w-12 flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-pink-500 ring-4 ring-pink-500/20 mt-1" />
                </div>
                <div className="flex-1 p-4 md:p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm hover:border-pink-500/50 transition-colors">
                  <div className="flex items-start gap-6">
                    <div className="p-4 bg-pink-500 rounded-2xl flex items-center justify-center">
                      <PLDTIcon size={32} color="white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-slate-400 text-sm">2008–2018</span>
                          <h3 className="text-2xl font-bold text-white">PLDT</h3>
                          <p className="text-pink-400">Lead Software Engineer</p>
                        </div>
                      </div>
                      <ul className="space-y-2 text-slate-300">
                        <li className="flex gap-2">
                          <ChevronRight size={20} className="text-pink-400 mt-0.5" />
                          Built first in-house billing system
                        </li>
                        <li className="flex gap-2">
                          <ChevronRight size={20} className="text-pink-400 mt-0.5" />
                          Led BI system development
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        )}

        {activeTab === "impact" && (
          <div className="relative overflow-hidden">
            <ImpactChart />
            <div className="relative z-10 space-y-8">
            <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Real-World Impact
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                <Zap className="text-cyan-400 mb-4" size={48} />
                <h3 className="text-2xl font-bold mb-4">Super Bowl LVIII</h3>
                <p className="text-slate-300">
                  First Super Bowl powered by renewable energy
                </p>
              </div>
              <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                <Globe className="text-blue-400 mb-4" size={48} />
                <h3 className="text-2xl font-bold mb-4">Waratah Battery</h3>
                <p className="text-slate-300">
                  One of world's largest batteries
                </p>
              </div>
              <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                <Users className="text-purple-400 mb-4" size={48} />
                <h3 className="text-2xl font-bold mb-4">65M Subscribers</h3>
                <p className="text-slate-300">
                  Southeast Asia telecom platform
                </p>
              </div>
              <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                <Code2 className="text-pink-400 mb-4" size={48} />
                <h3 className="text-2xl font-bold mb-4">
                  First Billing System
                </h3>
                <p className="text-slate-300">Philippines in-house platform</p>
              </div>
            </div>
            </div>
          </div>
        )}

        {activeTab === "ventures" && (
          <div className="relative overflow-hidden">
            <VenturesChart />
            <div className="relative z-10 space-y-8">
            <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Startup Ventures
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                <div className="flex items-center gap-4 mb-6">
                  <Rocket className="text-cyan-400" size={40} />
                  <div>
                    <h3 className="text-3xl font-bold">Historya</h3>
                    <p className="text-slate-400 text-sm">2015-2016</p>
                  </div>
                </div>
                <p className="text-slate-300 mb-6">
                  Cultural heritage tourism platform
                </p>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <Award size={20} className="text-cyan-400 mt-1" />
                    <p className="text-white">Echelon Asia Top 100</p>
                  </div>
                  <div className="flex gap-3">
                    <Award size={20} className="text-blue-400 mt-1" />
                    <p className="text-white">Global Social Venture Finalist</p>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                <div className="flex items-center gap-4 mb-6">
                  <Rocket className="text-blue-400" size={40} />
                  <div>
                    <h3 className="text-3xl font-bold">GIO</h3>
                    <p className="text-slate-400 text-sm">2015-2016</p>
                  </div>
                </div>
                <p className="text-slate-300 mb-6">
                  Employee monitoring platform
                </p>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <Award size={20} className="text-blue-400 mt-1" />
                    <p className="text-white">
                      IBM Cloud Competition 3rd Place
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Award size={20} className="text-purple-400 mt-1" />
                    <p className="text-white">Ideaspace Top 24 Finalist</p>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        )}

        {activeTab === "education" && (
          <div className="space-y-6">
            <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Education
            </h2>

            {/* MIT */}
            <div
              className="flex items-center gap-0 p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm hover:border-red-400/40 transition-all cursor-default"
              onMouseEnter={() => setFocusedEdu("mit")}
              onMouseLeave={() => setFocusedEdu(null)}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <MITIcon size={28} color="#f87171" />
                  <h3 className="text-3xl font-bold">MIT</h3>
                </div>
                <div className="pl-0">
                  <p className="text-cyan-400 mb-1">Data Science &amp; ML</p>
                  <p className="text-slate-400 text-sm mb-3">Jul–Nov 2024</p>
                  <p className="text-slate-300">IDSS program covering ML, PCA, clustering</p>
                </div>
              </div>
              <div
                className="flex-shrink-0 overflow-hidden transition-all duration-500 ease-out"
                style={{ width: focusedEdu === "mit" ? 220 : 0, height: 180, opacity: focusedEdu === "mit" ? 1 : 0 }}
              >
                {focusedEdu === "mit" && (
                  <InlineRadarChart key="mit" data={EDU_RADAR.mit.data} color={EDU_RADAR.mit.color} />
                )}
              </div>
            </div>

            {/* Centro Escolar */}
            <div
              className="flex items-center gap-0 p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm hover:border-blue-400/40 transition-all cursor-default"
              onMouseEnter={() => setFocusedEdu("centro")}
              onMouseLeave={() => setFocusedEdu(null)}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <GraduationCap className="text-blue-400 flex-shrink-0" size={28} />
                  <h3 className="text-3xl font-bold">Centro Escolar</h3>
                </div>
                <div className="pl-0">
                  <p className="text-cyan-400 mb-1">BS Computer Science</p>
                  <p className="text-slate-400 text-sm mb-3">Graduated 2007</p>
                  <p className="text-slate-300">Software engineering foundation</p>
                </div>
              </div>
              <div
                className="flex-shrink-0 overflow-hidden transition-all duration-500 ease-out"
                style={{ width: focusedEdu === "centro" ? 220 : 0, height: 180, opacity: focusedEdu === "centro" ? 1 : 0 }}
              >
                {focusedEdu === "centro" && (
                  <InlineRadarChart key="centro" data={EDU_RADAR.centro.data} color={EDU_RADAR.centro.color} />
                )}
              </div>
            </div>

            {/* Certifications */}
            <div
              className="flex items-center gap-0 p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm hover:border-cyan-400/40 transition-all cursor-default"
              onMouseEnter={() => setFocusedEdu("certs")}
              onMouseLeave={() => setFocusedEdu(null)}
            >
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-6">Certifications</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Award className="text-cyan-400 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-white font-semibold">Professional Scrum Master I</p>
                      <p className="text-slate-400 text-sm">Scrum.org</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Award className="text-cyan-400 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-white font-semibold">Google PM Professional</p>
                      <p className="text-slate-400 text-sm">Coursera</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="flex-shrink-0 overflow-hidden transition-all duration-500 ease-out"
                style={{ width: focusedEdu === "certs" ? 220 : 0, height: 180, opacity: focusedEdu === "certs" ? 1 : 0 }}
              >
                {focusedEdu === "certs" && (
                  <InlineRadarChart key="certs" data={EDU_RADAR.certs.data} color={EDU_RADAR.certs.color} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>



      <footer className="py-20 px-3 md:px-6 text-center max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 pb-1 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Let's Build Something Amazing
        </h2>
        <div className="flex gap-4 justify-center">
          <a
            href="mailto:joseroyjavelosa@gmail.com"
            className="px-8 py-4 bg-cyan-500 rounded-full hover:bg-cyan-600 transition-all"
          >
            Email Me
          </a>
          <a
            href="tel:+16197098744"
            className="px-8 py-4 bg-white/5 border border-white/10 rounded-full hover:border-cyan-500 transition-all"
          >
            +1 619 709 8744
          </a>
        </div>
        <p className="text-slate-500 mt-8">
          San Diego, CA • © 2025 Jose Roy Javelosa
        </p>
      </footer>
    </div>
  );
};

export default Portfolio;
