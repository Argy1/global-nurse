import { Link } from "react-router-dom";
import { ArrowRight, Heart, Shield, Eye, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const values = [
  { icon: Shield, title: "Ethical First", desc: "We never charge nurses. Our guidance follows international ethical recruitment standards." },
  { icon: Eye, title: "Transparent", desc: "No hidden agendas, no false promises. We share what we know — clearly and honestly." },
  { icon: Heart, title: "Consent-Based", desc: "We only contact you with your explicit permission. Your data stays private." },
  { icon: Users, title: "Community-Driven", desc: "Nurses supporting nurses. Our community is the heart of everything we do." },
];

export default function About() {
  return (
    <Layout>
      <section className="gradient-hero py-16 lg:py-24">
        <div className="container text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4">About Global Paro</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            We're a mission-driven team accelerating nurses to reach global opportunities — ethically, transparently, and with genuine care.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-extrabold text-foreground mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Global Paro exists to bridge the gap between talented nurses and international career opportunities. We believe every nurse deserves access to clear, honest guidance — free from exploitation and false promises.
            </p>
            <p className="text-muted-foreground mb-8">
              We don't promise jobs. We provide education, preparation support, and connections to verified employers. Our role is to guide you through the process with transparency at every step.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted">
        <div className="container">
          <h2 className="text-3xl font-extrabold text-foreground mb-12 text-center">What We Stand For</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-card rounded-xl p-6 shadow-card border border-border text-center">
                <v.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Red vs Green Flags */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <h2 className="text-3xl font-extrabold text-foreground mb-12 text-center">Know the Difference</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-destructive/5 rounded-xl p-6 border border-destructive/20">
              <h3 className="font-bold text-destructive mb-4 text-lg">🚩 Red Flags</h3>
              <ul className="space-y-3 text-sm text-foreground">
                {["Asks you to pay fees upfront", "Promises guaranteed jobs or visas", "Pressures you to decide quickly", "Won't share employer details", "No clear contract or terms"].map((f) => (
                  <li key={f} className="flex items-start gap-2"><span className="text-destructive mt-0.5">✗</span>{f}</li>
                ))}
              </ul>
            </div>
            <div className="bg-accent/5 rounded-xl p-6 border border-accent/20">
              <h3 className="font-bold text-accent mb-4 text-lg">✅ Green Flags</h3>
              <ul className="space-y-3 text-sm text-foreground">
                {["No fees charged to candidates", "Transparent about process and timelines", "Gives you time and space to decide", "Shares verified employer information", "Clear consent and privacy practices"].map((f) => (
                  <li key={f} className="flex items-start gap-2"><span className="text-accent mt-0.5">✓</span>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 gradient-hero">
        <div className="container text-center">
          <h2 className="text-3xl font-extrabold text-primary-foreground mb-4">Join Our Mission</h2>
          <p className="text-primary-foreground/90 max-w-xl mx-auto mb-8">Ready to explore international nursing opportunities with a team that puts you first?</p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/register">Register Now <ArrowRight className="h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
