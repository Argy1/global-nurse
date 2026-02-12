import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Users, Globe, Briefcase, MessageCircle, Award, FileCheck, Languages, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const candidateServices = [
  { icon: MapPin, title: "Personalized Learning Pathways", desc: "Customised learning plans tailored to your qualifications, goals, and target countries." },
  { icon: Languages, title: "IELTS & NCLEX Preparation", desc: "Guided preparation resources for English proficiency and licensing examinations." },
  { icon: FileCheck, title: "STR Verification Support", desc: "Assistance with STR/SIP verification and documentation processing." },
  { icon: Briefcase, title: "Job Matching", desc: "Ethical job matching with verified employers — transparently and with full consent." },
  { icon: Globe, title: "Visa & Relocation Assistance", desc: "Support with visa applications, relocation planning, and settling-in guidance." },
  { icon: MessageCircle, title: "Human + AI Support", desc: "24/7 AI assistance plus real mentors for 1:1 sessions when you need deeper guidance." },
];

const employerServices = [
  { icon: ShieldCheck, title: "Verified Credentials & STR", desc: "Pre-screened nurses with verified qualifications and active STR status." },
  { icon: Languages, title: "English Proficiency Certified", desc: "Candidates with certified English proficiency ready for international work." },
  { icon: Users, title: "Ready-to-Relocate Candidates", desc: "Qualified nurses who are prepared and eager to start their international careers." },
  { icon: Award, title: "Ethical Recruitment Compliance", desc: "We partner only with employers who meet international ethical recruitment standards." },
];

export default function WhatWeDo() {
  return (
    <Layout>
      <section className="gradient-hero py-16 lg:py-24">
        <div className="container text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4">What We Do</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Global Paro is an AI-powered platform that simplifies the journey for nurses who want to build a career overseas.
          </p>
        </div>
      </section>

      {/* For Candidates */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-foreground mb-4">For Candidates</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide personalised guidance, licensing preparation, skill verification, and ethical job matching — all in one place.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {candidateServices.map((s) => (
              <div key={s.title} className="bg-card rounded-xl p-8 shadow-card border border-border">
                <s.icon className="h-10 w-10 text-accent mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Employers */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-foreground mb-4">For Employers</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We deliver pre-qualified, verified talent with the right skills, documentation, and readiness to relocate.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {employerServices.map((s) => (
              <div key={s.title} className="bg-card rounded-xl p-6 shadow-card border border-border text-center">
                <s.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Don't Do */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-foreground mb-4">What We Don't Do</h2>
            <p className="text-muted-foreground mb-8">We believe in transparency. Here's what you should know:</p>
            <div className="bg-card rounded-xl p-8 border border-border text-left space-y-3">
              {[
                "We do not guarantee job placements or visa approvals.",
                "We do not charge nurses any fees — ever.",
                "We do not pressure you into decisions.",
                "We do not share your data without your explicit consent.",
              ].map((item) => (
                <p key={item} className="flex items-start gap-3 text-foreground">
                  <span className="text-accent font-bold mt-0.5">→</span>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 gradient-hero">
        <div className="container text-center">
          <h2 className="text-3xl font-extrabold text-primary-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-primary-foreground/90 mb-8">Register today and let us guide your journey.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/register">Register Now <ArrowRight className="h-5 w-5" /></Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/how-we-do-it">How We Do It</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
