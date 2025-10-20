import React, { useState } from "react";
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"></div>

        <div className="relative z-10 max-w-5xl w-full text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-8">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-400 text-sm">
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

      <div className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto py-4">
            {["journey", "impact", "ventures", "education"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition-all capitalize ${
                  activeTab === tab
                    ? "bg-cyan-500 text-white"
                    : "bg-white/5 text-slate-400 hover:bg-white/10"
                }`}
              >
                {tab}
              </button>
            ))}
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-2 rounded-full whitespace-nowrap bg-purple-600 text-white hover:bg-purple-700 transition-all flex items-center gap-2"
            >
              <Code2 size={18} />
              <span>Projects</span>
            </button>
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

      <div className="max-w-6xl mx-auto px-6 py-20">
        {activeTab === "journey" && (
          <div className="space-y-8">
            <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Career Journey
            </h2>

            <div className="space-y-6">
              <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-cyan-500 rounded-2xl">
                    <Zap size={32} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          Powin Energy
                        </h3>
                        <p className="text-cyan-400">
                          Software Engineering Manager
                        </p>
                      </div>
                      <span className="text-slate-400 text-sm">2023-2025</span>
                    </div>
                    <ul className="space-y-2 text-slate-300">
                      <li className="flex gap-2">
                        <ChevronRight
                          size={20}
                          className="text-cyan-400 mt-0.5"
                        />{" "}
                        Led Command Center UI for Super Bowl LVIII
                      </li>
                      <li className="flex gap-2">
                        <ChevronRight
                          size={20}
                          className="text-cyan-400 mt-0.5"
                        />{" "}
                        Managed Waratah Super Battery operations
                      </li>
                      <li className="flex gap-2">
                        <ChevronRight
                          size={20}
                          className="text-cyan-400 mt-0.5"
                        />{" "}
                        Built AWS serverless tools
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-blue-500 rounded-2xl">
                    <Globe size={32} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          Amdocs
                        </h3>
                        <p className="text-blue-400">Engineering Manager</p>
                      </div>
                      <span className="text-slate-400 text-sm">2022-2023</span>
                    </div>
                    <ul className="space-y-2 text-slate-300">
                      <li className="flex gap-2">
                        <ChevronRight
                          size={20}
                          className="text-blue-400 mt-0.5"
                        />{" "}
                        Led project for 65M subscribers
                      </li>
                      <li className="flex gap-2">
                        <ChevronRight
                          size={20}
                          className="text-blue-400 mt-0.5"
                        />{" "}
                        Delivered eSIM and MNP features
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-purple-500 rounded-2xl">
                    <Users size={32} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          Amdocs
                        </h3>
                        <p className="text-purple-400">Team Lead R&D</p>
                      </div>
                      <span className="text-slate-400 text-sm">2019-2021</span>
                    </div>
                    <ul className="space-y-2 text-slate-300">
                      <li className="flex gap-2">
                        <ChevronRight
                          size={20}
                          className="text-purple-400 mt-0.5"
                        />{" "}
                        Led 3 Scrum teams (27 engineers)
                      </li>
                      <li className="flex gap-2">
                        <ChevronRight
                          size={20}
                          className="text-purple-400 mt-0.5"
                        />{" "}
                        Global production support
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-pink-500 rounded-2xl">
                    <Code2 size={32} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white">PLDT</h3>
                        <p className="text-pink-400">Lead Software Engineer</p>
                      </div>
                      <span className="text-slate-400 text-sm">2008-2018</span>
                    </div>
                    <ul className="space-y-2 text-slate-300">
                      <li className="flex gap-2">
                        <ChevronRight
                          size={20}
                          className="text-pink-400 mt-0.5"
                        />{" "}
                        Built first in-house billing system
                      </li>
                      <li className="flex gap-2">
                        <ChevronRight
                          size={20}
                          className="text-pink-400 mt-0.5"
                        />{" "}
                        Led BI system development
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "impact" && (
          <div className="space-y-8">
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
        )}

        {activeTab === "ventures" && (
          <div className="space-y-8">
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
        )}

        {activeTab === "education" && (
          <div className="space-y-8">
            <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Education
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                <BookOpen className="text-red-400 mb-6" size={48} />
                <h3 className="text-3xl font-bold mb-2">MIT</h3>
                <p className="text-cyan-400 mb-2">Data Science & ML</p>
                <p className="text-slate-400 mb-4">Jul-Nov 2024</p>
                <p className="text-slate-300">
                  IDSS program covering ML, PCA, clustering
                </p>
              </div>

              <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                <GraduationCap className="text-blue-400 mb-6" size={48} />
                <h3 className="text-3xl font-bold mb-2">Centro Escolar</h3>
                <p className="text-cyan-400 mb-2">BS Computer Science</p>
                <p className="text-slate-400 mb-4">Graduated 2007</p>
                <p className="text-slate-300">
                  Software engineering foundation
                </p>
              </div>
            </div>

            <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
              <h3 className="text-2xl font-bold mb-6">Certifications</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <Award className="text-cyan-400 mt-1" size={20} />
                  <div>
                    <p className="text-white font-semibold">
                      Professional Scrum Master I
                    </p>
                    <p className="text-slate-400 text-sm">Scrum.org</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Award className="text-cyan-400 mt-1" size={20} />
                  <div>
                    <p className="text-white font-semibold">
                      Google PM Professional
                    </p>
                    <p className="text-slate-400 text-sm">Coursera</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Let's Build Something Great
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
