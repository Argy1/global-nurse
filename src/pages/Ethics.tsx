import { Link } from "react-router-dom";
import { Shield, Heart, Users, Eye, CheckCircle, XCircle, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const principles = [
  {
    icon: Heart,
    title: "Consent",
    description: "We always obtain your explicit consent before sharing your information with potential employers. No surprises, no hidden actions.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "Complete information about opportunities, including challenges and realistic expectations. We tell you what you need to know.",
  },
  {
    icon: Shield,
    title: "Privacy",
    description: "Your data is protected with industry-standard security. We never sell your information or share it without permission.",
  },
  {
    icon: Users,
    title: "Community-first Support",
    description: "Free resources and community access for all nurses, regardless of whether you use our placement services.",
  },
];

const greenFlags = [
  "Employer pays all recruitment fees",
  "Clear contract terms with no hidden clauses",
  "Verified and licensed recruitment agencies",
  "Transparent salary and benefits information",
  "Support throughout the entire process",
  "Access to nurses who've worked with them",
];

const redFlags = [
  "Asks you to pay any fees upfront",
  "Vague job descriptions or employer details",
  "Pressure to sign contracts quickly",
  "Requests for money before visa confirmation",
  "Promises that seem too good to be true",
  "Contracts with punitive penalty clauses",
];

export default function Ethics() {
  return (
    <Layout>
      {/* A) Hero */}
      <section className="gradient-hero py-12 lg:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="h-16 w-16 rounded-full bg-primary-foreground/20 mx-auto flex items-center justify-center mb-6">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4">
              Ethical Recruitment. Transparent Guidance.
            </h1>
            <p className="text-lg text-primary-foreground/90">
              We believe international nursing recruitment should be fair, transparent, and always put nurses first.
            </p>
          </div>
        </div>
      </section>

      {/* B) Principles Cards */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-extrabold text-foreground mb-4">
              Our Core Principles
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide every decision we make and every relationship we build.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="bg-card rounded-xl p-6 shadow-card border border-border text-center"
              >
                <div className="h-14 w-14 rounded-full bg-mint mx-auto flex items-center justify-center mb-4">
                  <principle.icon className="h-7 w-7 text-mint-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{principle.title}</h3>
                <p className="text-sm text-muted-foreground">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* C) Red Flags vs Green Flags */}
      <section className="py-12 lg:py-16 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-extrabold text-foreground mb-4">
              Know the Difference
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Learn to identify ethical recruitment practices from potential scams.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Green Flags */}
            <div className="bg-accent/10 rounded-xl p-6 lg:p-8 border border-accent/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Green Flags ✓</h3>
              </div>
              <ul className="space-y-3">
                {greenFlags.map((flag) => (
                  <li key={flag} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{flag}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Red Flags */}
            <div className="bg-destructive/10 rounded-xl p-6 lg:p-8 border border-destructive/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-full bg-destructive flex items-center justify-center">
                  <XCircle className="h-6 w-6 text-destructive-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Red Flags ✗</h3>
              </div>
              <ul className="space-y-3">
                {redFlags.map((flag) => (
                  <li key={flag} className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{flag}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* D) Contact Concerns */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl lg:text-3xl font-extrabold text-foreground mb-4">
              Report Concerns
            </h2>
            <p className="text-muted-foreground mb-6">
              If you've experienced or witnessed unethical recruitment practices, please let us know. 
              We're committed to protecting the nursing community.
            </p>
            <div className="bg-card rounded-xl p-6 shadow-card border border-border inline-block">
              <p className="text-foreground font-medium mb-2">Contact us at:</p>
              <a 
                href="mailto:globalparo@gmail.com" 
                className="text-primary text-lg font-bold hover:underline"
              >
                globalparo@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* E) Disclaimer */}
      <section className="py-8 bg-muted">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm text-muted-foreground italic">
              We do not promise outcomes. We focus on guidance and ethical pathways. 
              Individual results depend on qualifications, preparation, and destination requirements.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-16 gradient-hero">
        <div className="container text-center">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-primary-foreground mb-4">
            Ready to Work with an Ethical Partner?
          </h2>
          <p className="text-primary-foreground/90 max-w-xl mx-auto mb-8">
            Take the first step toward your international nursing career with a team that puts you first.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/apply">
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/community">
                Join Our Community
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
