import { Link } from "react-router-dom";
import { ArrowRight, Brain, Globe2, ShieldCheck, MapPin, Languages, FileCheck, Briefcase, Globe, MessageCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { WhatWeDoCTA } from "@/components/whatwedo/WhatWeDoCTA";
import nursesGroup from "@/assets/nurses-group.png";

const highlights = [
  { icon: Brain, title: "AI-Powered Platform", desc: "Intelligent tools that personalise your pathway from assessment to placement." },
  { icon: Globe2, title: "Global Network", desc: "Partnerships with verified employers in Singapore, USA, Canada, Australia, and the Middle East." },
  { icon: ShieldCheck, title: "Ethical Recruitment", desc: "Zero fees to nurses. Full transparency. WHO Code of Practice compliant." },
];

const stats = [
  { value: "10+", label: "Destination Countries" },
  { value: "500+", label: "Nurses Supported" },
  { value: "50+", label: "Partner Employers" },
  { value: "24/7", label: "AI + Human Support" },
];

const candidateServices = [
  { icon: MapPin, title: "Personalized Learning Pathways", desc: "Customised learning plans tailored to your qualifications, goals, and target countries." },
  { icon: Languages, title: "IELTS & NCLEX Preparation", desc: "Guided preparation resources for English proficiency and licensing examinations." },
  { icon: FileCheck, title: "STR Verification Support", desc: "Assistance with STR/SIP verification and documentation processing." },
  { icon: Briefcase, title: "Job Matching", desc: "Ethical job matching with verified employers — transparently and with full consent." },
  { icon: Globe, title: "Visa & Relocation Assistance", desc: "Support with visa applications, relocation planning, and settling-in guidance." },
  { icon: MessageCircle, title: "Human + AI Support", desc: "24/7 AI assistance plus real mentors for 1:1 sessions when you need deeper guidance." },
];

const subPages = [
  { href: "/what-we-do/employers", label: "For Employers", desc: "Pre-qualified, credential-verified nurses ready to relocate internationally.", color: "#015779" },
  { href: "/what-we-do/dont-do", label: "What We Don't Do", desc: "We believe in full transparency. Here's what we will never do.", color: "#03989E" },
];

export default function WhatWeDoMain() {
  return (
    <Layout>
      {/* ── SECTION 1: What We Do Hero ── */}
      <section id="what-we-do" className="min-h-[480px] flex flex-col md:flex-row">
        <div
          className="flex flex-col justify-center px-10 py-16 md:w-1/2"
          style={{ background: "linear-gradient(135deg, #015779 0%, #03989E 100%)" }}
        >
          <p className="text-xs font-black tracking-[0.25em] uppercase text-white/60 mb-3">Global PARO</p>
          <h1 className="text-4xl lg:text-5xl font-black font-heading text-white leading-tight mb-5">
            What We<br /><span className="text-white/80">Do</span>
          </h1>
          <p className="text-base text-white/85 max-w-sm leading-relaxed mb-8">
            Global Paro is an AI-powered platform that simplifies the journey for nurses who want to build a global career — ethically, affordably, and with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-white font-bold px-6 py-3 rounded-full text-sm transition-all hover:bg-white/90 shadow-lg"
              style={{ color: "#015779" }}
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 relative min-h-[300px] overflow-hidden">
          <img src={nursesGroup} alt="Nurses team" className="absolute inset-0 w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(1,87,121,0.3) 0%, rgba(0,0,0,0.1) 100%)" }} />
        </div>
      </section>

      {/* Stats Bar */}
      <div style={{ background: "#015779" }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20">
            {stats.map((s) => (
              <div key={s.label} className="text-center py-6 px-4">
                <p className="text-2xl lg:text-3xl font-black text-white mb-1">{s.value}</p>
                <p className="text-xs text-white/70 font-medium uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3 Highlights */}
      <section className="py-16 lg:py-20 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-xs font-black tracking-[0.2em] uppercase mb-2" style={{ color: "#03989E" }}>Why Global Paro</p>
            <h2 className="text-3xl lg:text-4xl font-black font-heading text-foreground">A Platform Built for Nurses</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((h) => (
              <div key={h.title} className="bg-card rounded-2xl p-8 border border-border shadow-sm hover:border-accent/40 transition-all text-center group">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl mx-auto mb-5" style={{ background: "rgba(3,152,158,0.1)" }}>
                  <h.icon className="h-7 w-7" style={{ color: "#03989E" }} />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">{h.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: For Candidates ── */}
      <section id="candidates" className="py-16 lg:py-20">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <p className="text-xs font-black tracking-[0.2em] uppercase mb-3" style={{ color: "#03989E" }}>What We Do</p>
            <h2 className="text-3xl lg:text-4xl font-black font-heading text-foreground mb-4">For Candidates</h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
              We provide personalised guidance, licensing preparation, skill verification, and ethical job matching — all in one place.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {candidateServices.map((s) => (
              <div
                key={s.title}
                className="bg-card rounded-2xl p-7 border border-border shadow-sm hover:border-accent/40 hover:shadow-md transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl mb-5" style={{ background: "rgba(3,152,158,0.1)" }}>
                  <s.icon className="h-6 w-6" style={{ color: "#03989E" }} />
                </div>
                <h3 className="font-bold text-base text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Other Sections */}
      <section className="py-16 lg:py-20 bg-muted">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black font-heading text-foreground">Explore More</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {subPages.map((p) => (
              <Link
                key={p.href}
                to={p.href}
                className="group block rounded-2xl border-2 border-border hover:border-accent/50 bg-card p-8 transition-all hover:shadow-md"
              >
                <div className="w-10 h-1.5 rounded-full mb-5" style={{ background: p.color }} />
                <h3 className="text-xl font-black font-heading text-foreground mb-3 group-hover:text-accent transition-colors">{p.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{p.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-bold" style={{ color: p.color }}>
                  Learn more <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <WhatWeDoCTA />
    </Layout>
  );
}
