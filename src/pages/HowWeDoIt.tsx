import { Link } from "react-router-dom";
import { ArrowRight, Bot, BookOpen, Handshake, HeadphonesIcon, CheckCircle, XCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { useTranslation } from "@/i18n/LanguageContext";

const approachCards = [
  {
    icon: Bot,
    title: "AI-Driven Assessment",
    desc: "We evaluate each nurse's profile, goals, STR status, English readiness and licensing requirements to create a personalised roadmap.",
    details: ["Complete profile analysis in minutes", "Personalised readiness score", "Country-specific gap identification", "Ongoing progress tracking"],
  },
  {
    icon: BookOpen,
    title: "Guided Learning Pathway",
    desc: "Nurses receive customised learning plans for IELTS/TOEFL, NCLEX, and country-specific credentialing.",
    details: ["Customised IELTS/OET study plan", "NCLEX 2026 resources", "Country credentialing checklists", "LMS platform with progress tracking"],
  },
  {
    icon: Handshake,
    title: "Ethical Recruitment & Job Matching",
    desc: "We partner only with employers who meet international ethical recruitment standards and offer transparent processes.",
    details: ["Verified employer network only", "Zero fees charged to nurses", "Full transparency at every step", "WHO Code of Practice compliant"],
  },
  {
    icon: HeadphonesIcon,
    title: "Human + AI Support",
    desc: "Nurses can access instant AI assistance 24/7 and book real mentors for 1:1 sessions when they need deeper guidance.",
    details: ["AI chatbot available 24/7", "1:1 mentor session booking", "Dedicated support agent assigned", "Community WhatsApp groups"],
  },
];

const redFlags = [
  "Asks you to pay fees upfront",
  "Promises guaranteed jobs or visas",
  "Pressures you to decide quickly",
  "Won't share employer details",
  "No clear contract or terms",
];

const greenFlags = [
  "No fees charged to candidates",
  "Transparent about process and timelines",
  "Gives you time and space to decide",
  "Shares verified employer information",
  "Clear consent and privacy practices",
];

const protections = [
  { title: "WHO Code of Practice", desc: "We strictly follow the WHO Code of Practice on the International Recruitment of Health Personnel." },
  { title: "Zero Placement Fees", desc: "We never charge nurses any recruitment or placement fees. Our costs are covered by verified employers only." },
  { title: "Full Data Privacy", desc: "Your personal and professional data is never shared without your explicit written consent." },
];

const journeySteps = [
  {
    num: "01",
    title: "Register & Profile Assessment",
    desc: "You submit your profile and our AI evaluates your qualifications, STR, and English readiness to build your personalized roadmap.",
    details: ["You submit your profile (3 min)", "AI evaluates your qualifications, STR, and English readiness", "Receive a personalized readiness roadmap"],
    color: "hsl(var(--primary))",
  },
  {
    num: "02",
    title: "Guided Learning & Preparation",
    desc: "Access customised IELTS/NCLEX learning plans, country-specific credentialing guidance, and document preparation support.",
    details: ["Customised IELTS/NCLEX learning plans", "Country-specific credentialing guidance", "Document checklist and timeline planning"],
    color: "hsl(var(--accent))",
  },
  {
    num: "03",
    title: "Ethical Job Matching",
    desc: "Once ready, get introduced to verified ethical employers aligned with your specialty and destination country.",
    details: ["Connect with verified ethical employers", "Transparent process — full employer visibility", "No pressure, no hidden fees, full consent"],
    color: "hsl(var(--primary))",
  },
  {
    num: "04",
    title: "Placement & Ongoing Support",
    desc: "We guide you through visa applications, pre-departure prep, and support you in your new home country.",
    details: ["Visa & relocation assistance", "Settling-in support and onboarding", "Ongoing community and career development"],
    color: "hsl(var(--accent))",
  },
];

export default function HowWeDoIt() {
  const { t } = useTranslation();

  return (
    <Layout>
      {/* ── SECTION 1: How We Do It Hero ── */}
      <section
        id="how-we-do-it"
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #015779 0%, #03989E 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />
        <div className="container relative text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5 bg-white/20 text-white">
            Our Methodology
          </span>
          <h1 className="text-4xl lg:text-6xl font-black font-heading text-white mb-5 leading-tight">How We Do It</h1>
          <p className="text-lg text-white/85 max-w-2xl mx-auto mb-10">
            We combine smart technology with human expertise to create your personalized pathway to success.
          </p>
          <Button asChild size="lg" className="rounded-full font-bold px-8" style={{ backgroundColor: "white", color: "#015779" }}>
            <Link to="/register">Start Your Journey <ArrowRight className="h-4 w-4 ml-1" /></Link>
          </Button>
        </div>
      </section>

      {/* ── SECTION 2: Our Approach ── */}
      <section id="approach" className="py-16 lg:py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: "hsl(var(--accent))" }}>Our Approach</p>
            <h2 className="text-3xl lg:text-4xl font-black font-heading text-foreground">4 Pillars of Our Methodology</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Everything we do is built on these four principles</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {approachCards.map((card, i) => (
              <div key={card.title} className="group bg-card rounded-2xl p-7 border border-border hover:border-accent/40 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl shrink-0"
                    style={{ backgroundColor: i % 2 === 0 ? "hsl(var(--primary) / 0.1)" : "hsl(var(--accent) / 0.1)" }}
                  >
                    <card.icon className="h-7 w-7" style={{ color: i % 2 === 0 ? "hsl(var(--primary))" : "hsl(var(--accent))" }} />
                  </div>
                  <div>
                    <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: i % 2 === 0 ? "hsl(var(--primary))" : "hsl(var(--accent))" }}>
                      Pillar {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{card.title}</h3>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{card.desc}</p>
                <ul className="space-y-2">
                  {card.details.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-sm text-foreground">
                      <div className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: i % 2 === 0 ? "hsl(var(--primary))" : "hsl(var(--accent))" }} />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Know the Difference ── */}
      <section id="difference" className="py-16 lg:py-20 bg-muted">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: "hsl(var(--primary))" }}>Know The Difference</p>
            <h2 className="text-3xl font-black font-heading text-foreground">Red Flags vs Green Flags</h2>
            <p className="text-muted-foreground mt-2">Compare what unethical vs ethical recruitment looks like</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-2xl p-7 border-2" style={{ borderColor: "hsl(var(--destructive) / 0.3)", background: "hsl(var(--destructive) / 0.03)" }}>
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2" style={{ color: "hsl(var(--destructive))" }}>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: "hsl(var(--destructive) / 0.1)" }}>🚩</div>
                Red Flags — Run Away
              </h3>
              <ul className="space-y-4">
                {redFlags.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 shrink-0 mt-0.5" style={{ color: "hsl(var(--destructive))" }} />
                    <span className="text-sm text-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-2xl p-7 border-2" style={{ borderColor: "hsl(var(--accent) / 0.4)", background: "hsl(var(--accent) / 0.03)" }}>
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2" style={{ color: "hsl(var(--accent))" }}>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: "hsl(var(--accent) / 0.1)" }}>✅</div>
                Green Flags — Global PARO
              </h3>
              <ul className="space-y-4">
                {greenFlags.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" style={{ color: "hsl(var(--accent))" }} />
                    <span className="text-sm text-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Protections */}
          <div className="grid md:grid-cols-3 gap-5 mt-10">
            {protections.map((p) => (
              <div key={p.title} className="bg-card rounded-2xl p-6 border border-border hover:border-accent/40 hover:shadow-md transition-all">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl mb-4" style={{ backgroundColor: "hsl(var(--accent) / 0.1)" }}>
                  <ShieldCheck className="h-5 w-5" style={{ color: "hsl(var(--accent))" }} />
                </div>
                <h3 className="font-bold text-foreground mb-2 text-sm">{p.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Your Journey ── */}
      <section id="journey" className="py-16 lg:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: "hsl(var(--accent))" }}>Your Journey</p>
            <h2 className="text-3xl font-black font-heading text-foreground">{t.howWeDoIt.journeyStepByStep}</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {journeySteps.map((step, i) => (
              <div
                key={step.num}
                className="group relative bg-card rounded-2xl p-7 border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl font-black text-xl font-heading text-white mb-5"
                  style={{ backgroundColor: step.color }}
                >
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{step.desc}</p>
                <ul className="space-y-2.5">
                  {step.details.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-sm text-foreground">
                      <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" style={{ color: step.color }} />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Flow indicator */}
          <div className="flex items-center justify-center gap-3 mt-12 flex-wrap">
            {journeySteps.map((step, i) => (
              <div key={step.num} className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-black text-white" style={{ backgroundColor: step.color }}>
                  {step.num}
                </div>
                {i < journeySteps.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-hero">
        <div className="container text-center">
          <h2 className="text-3xl font-black font-heading text-primary-foreground mb-4">{t.howWeDoIt.startJourney}</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">Register now and get your personalised readiness roadmap in minutes.</p>
          <Button size="xl" asChild className="rounded-full font-bold" style={{ backgroundColor: 'hsl(var(--card))', color: 'hsl(var(--primary))' }}>
            <Link to="/register">{t.common.registerNow} <ArrowRight className="h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
