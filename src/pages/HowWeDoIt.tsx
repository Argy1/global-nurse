import { Link } from "react-router-dom";
import { ArrowRight, Bot, BookOpen, Handshake, HeadphonesIcon, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { useTranslation } from "@/i18n/LanguageContext";

const approachCards = [
  { icon: Bot, title: "AI-Driven Assessment", desc: "Smart profiling to understand your English level, nursing background, and readiness for each destination." },
  { icon: BookOpen, title: "Guided Learning", desc: "Structured IELTS, NCLEX, and country-specific preparation through our LMS platform." },
  { icon: Handshake, title: "Ethical Recruitment", desc: "We follow WHO Code of Practice. No pressure, no hidden fees, full transparency at every step." },
  { icon: HeadphonesIcon, title: "Human + AI Support", desc: "AI handles instant queries 24/7. Human agents handle complex cases and personalized coaching." },
];

const journeySteps = [
  {
    num: "01",
    title: "Register & Create Profile",
    desc: "Fill in your nursing background, target country, and current IELTS/English level. Our AI builds your initial roadmap.",
    details: ["Complete your profile", "Upload key documents", "Get your personalized roadmap"],
  },
  {
    num: "02",
    title: "Learn & Prepare",
    desc: "Access IELTS prep, NCLEX resources, and country-specific guides through our LMS. Track your progress.",
    details: ["IELTS / OET preparation", "NCLEX study resources", "Licensing & document guidance"],
  },
  {
    num: "03",
    title: "Get Matched & Apply",
    desc: "Once ready, get matched with verified employers aligned with your specialty and target country.",
    details: ["Job matching by AI", "Employer introductions", "Interview preparation"],
  },
  {
    num: "04",
    title: "Relocate & Thrive",
    desc: "We guide you through visa applications, pre-departure preparation, and your first 90 days abroad.",
    details: ["Visa & permit guidance", "Pre-departure checklist", "Ongoing support abroad"],
  },
];

const redFlags = [
  "Asks you to pay upfront recruitment fees",
  "Guarantees a job placement in a specific time",
  "Pressures you to decide quickly or sign documents",
  "Cannot provide verifiable employer information",
  "Asks for original documents before placement",
];

const greenFlags = [
  "Zero fees charged to nurses, ever",
  "Honest about timelines — no false promises",
  "Full consent before any employer introduction",
  "Verified employer network with clear job details",
  "Licensed and follows WHO ethical recruitment code",
];

export default function HowWeDoIt() {
  const { t } = useTranslation();

  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-hero py-16 lg:py-24">
        <div className="container text-center">
          <h1 className="text-4xl lg:text-5xl font-black font-heading text-primary-foreground mb-4">{t.howWeDoIt.title}</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">{t.howWeDoIt.subtitle}</p>
        </div>
      </section>

      {/* Our Approach */}
      <section id="approach" className="py-16 lg:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: 'hsl(var(--accent))' }}>Our Approach</p>
            <h2 className="text-3xl lg:text-4xl font-black font-heading text-foreground">{t.howWeDoIt.ourApproach}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {approachCards.map((card) => (
              <div key={card.title} className="bg-card rounded-2xl p-6 shadow-card border border-border hover:border-accent/40 transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl mb-4" style={{ backgroundColor: 'hsl(var(--accent) / 0.1)' }}>
                  <card.icon className="h-6 w-6" style={{ color: 'hsl(var(--accent))' }} />
                </div>
                <h3 className="font-bold text-foreground mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Know the Difference */}
      <section id="difference" className="py-16 lg:py-24 bg-muted">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: 'hsl(var(--primary))' }}>Know The Difference</p>
            <h2 className="text-3xl font-black font-heading text-foreground">Red Flags vs Green Flags</h2>
            <p className="text-muted-foreground mt-2">Protect yourself — know what an ethical recruiter looks like.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-2xl p-6 border-2" style={{ borderColor: 'hsl(var(--destructive) / 0.4)' }}>
              <h3 className="font-bold text-lg mb-5 flex items-center gap-2" style={{ color: 'hsl(var(--destructive))' }}>
                <XCircle className="h-5 w-5" /> 🚩 Red Flags — Run Away
              </h3>
              <ul className="space-y-3">
                {redFlags.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <XCircle className="h-4 w-4 shrink-0 mt-0.5" style={{ color: 'hsl(var(--destructive))' }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-2xl p-6 border-2" style={{ borderColor: 'hsl(var(--accent) / 0.4)' }}>
              <h3 className="font-bold text-lg mb-5 flex items-center gap-2" style={{ color: 'hsl(var(--accent))' }}>
                <CheckCircle className="h-5 w-5" /> ✅ Green Flags — Global PARO
              </h3>
              <ul className="space-y-3">
                {greenFlags.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" style={{ color: 'hsl(var(--accent))' }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Your Journey Step by Step */}
      <section id="journey" className="py-16 lg:py-24">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: 'hsl(var(--accent))' }}>Your Journey</p>
            <h2 className="text-3xl font-black font-heading text-foreground">{t.howWeDoIt.journeyStepByStep}</h2>
          </div>
          <div className="space-y-0">
            {journeySteps.map((step, i) => (
              <div key={step.num} className="flex gap-6">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl font-black text-lg font-heading text-white shrink-0"
                    style={{ backgroundColor: i % 2 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--accent))' }}
                  >
                    {step.num}
                  </div>
                  {i < journeySteps.length - 1 && (
                    <div className="w-0.5 flex-1 my-2" style={{ backgroundColor: 'hsl(var(--border))' }} />
                  )}
                </div>

                {/* Content */}
                <div className="pb-10 flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground mb-3">{step.desc}</p>
                  <ul className="space-y-1.5">
                    {step.details.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-3.5 w-3.5 shrink-0" style={{ color: 'hsl(var(--accent))' }} />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-hero">
        <div className="container text-center">
          <h2 className="text-3xl font-black font-heading text-primary-foreground mb-8">{t.howWeDoIt.startJourney}</h2>
          <Button
            size="xl"
            asChild
            className="rounded-full font-bold"
            style={{ backgroundColor: 'hsl(var(--card))', color: 'hsl(var(--primary))' }}
          >
            <Link to="/register">{t.common.registerNow} <ArrowRight className="h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
