import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Bot, BookOpen, Handshake, HeadphonesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const howSteps = [
  {
    icon: Bot,
    title: "AI-Driven Assessment",
    desc: "We evaluate each nurse's profile, goals, STR status, English readiness, and licensing requirements to create a personalised roadmap and build a trusted, job-ready database for global employers.",
  },
  {
    icon: BookOpen,
    title: "Guided Learning Pathway",
    desc: "Nurses receive customised learning plans for IELTS/TOEFL, NCLEX, and country-specific credentialing to ensure they meet all requirements efficiently.",
  },
  {
    icon: Handshake,
    title: "Ethical Recruitment & Job Matching",
    desc: "We partner only with employers who meet international ethical recruitment standards and offer transparent processes, ensuring fair treatment and opportunities.",
  },
  {
    icon: HeadphonesIcon,
    title: "Human + AI Support",
    desc: "Nurses can access instant AI assistance 24/7 and book real mentors for 1:1 sessions when they need deeper guidance and personalized support.",
  },
];

const phases = [
  {
    step: "01",
    title: "Register & Profile Assessment",
    items: ["You submit your profile (3 min)", "AI evaluates your qualifications, STR, and English readiness", "Receive a personalized readiness roadmap"],
  },
  {
    step: "02",
    title: "Guided Learning & Preparation",
    items: ["Customised IELTS/NCLEX learning plans", "Country-specific credentialing guidance", "Document checklist and timeline planning"],
  },
  {
    step: "03",
    title: "Ethical Job Matching",
    items: ["Connect with verified ethical employers", "Transparent process — full employer visibility", "No pressure, no hidden fees, full consent"],
  },
  {
    step: "04",
    title: "Placement & Ongoing Support",
    items: ["Visa & relocation assistance", "Settling-in support and onboarding", "Ongoing community and career development"],
  },
];

export default function HowWeDoIt() {
  return (
    <Layout>
      <section className="gradient-hero py-16 lg:py-24">
        <div className="container text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4">How We Do It</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            We combine <strong>smart technology</strong> with human expertise to create <strong>your personalized</strong> pathway to success.
          </p>
        </div>
      </section>

      {/* 4 Pillars */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <h2 className="text-3xl font-extrabold text-foreground mb-12 text-center">Our Approach</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howSteps.map((step) => (
              <div key={step.title} className="bg-card rounded-xl p-6 shadow-card border border-border">
                <step.icon className="h-10 w-10 text-accent mb-4" />
                <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-extrabold text-foreground mb-12 text-center">Your Journey Step by Step</h2>
          <div className="space-y-12">
            {phases.map((phase) => (
              <div key={phase.step} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                    {phase.step}
                  </div>
                  <div className="w-px flex-1 bg-border mt-2" />
                </div>
                <div className="pb-8">
                  <h3 className="text-xl font-bold text-foreground mb-4">{phase.title}</h3>
                  <ul className="space-y-2">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-accent mt-1 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 gradient-hero">
        <div className="container text-center">
          <h2 className="text-3xl font-extrabold text-primary-foreground mb-8">Start Your Journey Today</h2>
          <Button variant="hero" size="xl" asChild>
            <Link to="/register">Register Now <ArrowRight className="h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
