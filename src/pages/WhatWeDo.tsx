import { Link } from "react-router-dom";
import { ArrowRight, FileText, Users, Globe, BookOpen, Briefcase, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const services = [
  { icon: FileText, title: "Career Guidance", desc: "Personalized roadmaps based on your qualifications, experience, and target countries." },
  { icon: BookOpen, title: "Education & Prep", desc: "Quickstart guides, licensing information, English preparation resources, and interview tips." },
  { icon: Globe, title: "Pathway Information", desc: "Country-specific guidance on requirements, timelines, and documentation needed." },
  { icon: Users, title: "Community Support", desc: "Connect with nurses who've been through the process. Share, learn, and grow together." },
  { icon: Briefcase, title: "Employer Connections", desc: "We connect verified employers with qualified nurses — transparently and ethically." },
  { icon: MessageCircle, title: "Ongoing Support", desc: "WhatsApp groups, chat support, and a team that responds within 15 minutes." },
];

export default function WhatWeDo() {
  return (
    <Layout>
      <section className="gradient-hero py-16 lg:py-24">
        <div className="container text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4">What We Do</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            We provide guidance, resources, and connections to help nurses pursue international careers — ethically and transparently.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s) => (
              <div key={s.title} className="bg-card rounded-xl p-8 shadow-card border border-border">
                <s.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-foreground mb-4">What We Don't Do</h2>
            <p className="text-muted-foreground mb-8">
              We believe in transparency. Here's what you should know:
            </p>
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
