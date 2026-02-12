import { Link } from "react-router-dom";
import { ArrowRight, Heart, Shield, Eye, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const values = [
  { icon: Heart, title: "Passion", desc: "Passion helps people stay motivated, tackle challenges, and take pride in what they do." },
  { icon: Shield, title: "Trust", desc: "Creating an environment where people feel safe to speak up, take risks, and be themselves as foundation for long-term engagement." },
  { icon: Users, title: "Diversity", desc: "Valuing different perspectives, backgrounds, and ways of thinking. Diversity fuels innovation and helps everyone do their best work." },
  { icon: Eye, title: "Integrity", desc: "Doing the right thing — even when no one's looking. Integrity is about staying honest, accountable, and transparent in every decision." },
];

export default function About() {
  return (
    <Layout>
      <section className="gradient-hero py-16 lg:py-24">
        <div className="container text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4">About Global Paro</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Global Paro is an AI-powered platform that simplifies the journey for nurses who want to build a career overseas.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl font-extrabold text-foreground mb-6">Our Vision</h2>
              <p className="text-lg text-muted-foreground">
                To become the leader and the preferred global partner platform as a bridge between healthcare talents and international opportunities in healthcare providers.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-foreground mb-6">Our Mission</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold text-sm shrink-0">P</span>
                  <div>
                    <h4 className="font-bold text-foreground">Providing</h4>
                    <p className="text-muted-foreground text-sm">Affordable mobile platform that can be accessed anytime, anywhere.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold text-sm shrink-0">A</span>
                  <div>
                    <h4 className="font-bold text-foreground">Accelerating</h4>
                    <p className="text-muted-foreground text-sm">Enable internationally qualified nurses through a seamless, scalable AI-powered platform.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold text-sm shrink-0">E</span>
                  <div>
                    <h4 className="font-bold text-foreground">Empowering</h4>
                    <p className="text-muted-foreground text-sm">Simplify the journey by partnering & connecting with international key stakeholders.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="py-12 bg-muted">
        <div className="container text-center max-w-3xl">
          <p className="text-xl font-heading font-bold text-foreground mb-2">
            "Prepare. Beyond. Global."
          </p>
          <p className="text-muted-foreground">
            <strong>PARO</strong> — Latin: <em>to prepare, to make ready</em> · Sanskrit: <em>beyond, above, further</em> · Preparing local talents to go beyond borders and become part of the global workforce.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <h2 className="text-3xl font-extrabold text-foreground mb-12 text-center">Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={v.title} className="bg-card rounded-xl p-6 shadow-card border border-border text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 mx-auto mb-4">
                  <span className="text-2xl font-extrabold text-accent">{i + 1}</span>
                </div>
                <h3 className="font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Red vs Green Flags */}
      <section className="py-16 lg:py-24 bg-muted">
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
