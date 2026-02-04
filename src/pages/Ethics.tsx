import { Link } from "react-router-dom";
import { Shield, Heart, Users, Eye, FileCheck, Ban, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const principles = [
  {
    icon: Ban,
    title: "Zero Fees to Nurses",
    description: "We never charge nurses any fees. All recruitment costs are covered by employers. This is non-negotiable.",
  },
  {
    icon: Eye,
    title: "Full Transparency",
    description: "We provide complete information about job offers, including salary, benefits, working conditions, and any potential challenges.",
  },
  {
    icon: Heart,
    title: "Nurse Welfare First",
    description: "Your safety, wellbeing, and career satisfaction are our primary concerns. We reject opportunities that don't meet our standards.",
  },
  {
    icon: Shield,
    title: "Verified Employers Only",
    description: "We thoroughly vet all employer partners. Only ethical organizations with proven track records work with us.",
  },
  {
    icon: Users,
    title: "Informed Consent",
    description: "You'll always have complete information before making decisions. No pressure tactics, no hidden terms.",
  },
  {
    icon: FileCheck,
    title: "Regulatory Compliance",
    description: "We adhere to international recruitment standards and cooperate with nursing regulatory bodies worldwide.",
  },
];

const commitments = [
  "We will never ask you to pay fees for job placement, visa processing, or any recruitment service",
  "We will provide truthful information about job opportunities, including potential challenges",
  "We will support you throughout your journey, from application to settlement",
  "We will respect your decisions and never pressure you to accept offers",
  "We will protect your personal information and never share it without consent",
  "We will partner only with employers who treat nurses ethically and fairly",
  "We will provide resources and community support regardless of whether you use our services",
  "We will report and warn against fraudulent recruiters and schemes",
];

const redFlags = [
  "Agencies that charge upfront fees or 'processing costs'",
  "Vague job descriptions without specific employer details",
  "Pressure to sign contracts quickly",
  "Requests for money before visa or job confirmation",
  "Promises that seem too good to be true",
  "Unlicensed or unregistered agencies",
  "Poor communication or unprofessional conduct",
  "Contracts with punitive clauses or unreasonable restrictions",
];

export default function Ethics() {
  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-hero py-12 lg:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="h-16 w-16 rounded-full bg-primary-foreground/20 mx-auto flex items-center justify-center mb-6">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4">
              Our Ethical Commitment
            </h1>
            <p className="text-lg text-primary-foreground/90">
              We believe international nursing recruitment should be fair, transparent, and always put nurses first.
            </p>
          </div>
        </div>
      </section>

      {/* Core Principles */}
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="bg-card rounded-xl p-6 shadow-card border border-border"
              >
                <div className="h-12 w-12 rounded-lg bg-mint flex items-center justify-center mb-4">
                  <principle.icon className="h-6 w-6 text-mint-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{principle.title}</h3>
                <p className="text-muted-foreground">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commitments */}
      <section className="py-12 lg:py-16 bg-muted">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-foreground mb-6">
                Our Commitments to You
              </h2>
              <ul className="space-y-4">
                {commitments.map((commitment) => (
                  <li key={commitment} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{commitment}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-xl p-6 lg:p-8 shadow-card border border-border">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Ban className="h-5 w-5 text-destructive" />
                Red Flags to Watch For
              </h3>
              <p className="text-muted-foreground mb-4">
                If you encounter any of these warning signs with other recruiters, proceed with extreme caution:
              </p>
              <ul className="space-y-3">
                {redFlags.map((flag) => (
                  <li key={flag} className="flex items-start gap-2 text-sm">
                    <span className="text-destructive mt-1">⚠️</span>
                    <span className="text-foreground">{flag}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WHO Code */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl lg:text-3xl font-extrabold text-foreground mb-4">
              Aligned with International Standards
            </h2>
            <p className="text-muted-foreground mb-6">
              Our practices align with the WHO Global Code of Practice on the International Recruitment 
              of Health Personnel, ensuring ethical treatment of nurses and respect for healthcare systems 
              in source countries.
            </p>
            <p className="text-muted-foreground mb-8">
              We believe that when recruitment is done ethically, it creates positive outcomes for nurses, 
              employers, and healthcare systems worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Report Concerns */}
      <section className="py-12 lg:py-16 bg-muted">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl lg:text-3xl font-extrabold text-foreground mb-4">
              Report Unethical Practices
            </h2>
            <p className="text-muted-foreground mb-8">
              If you've experienced or witnessed unethical recruitment practices, we encourage you to 
              report them. We maintain a database of warning signs to protect the nursing community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" asChild>
                <Link to="/contact">
                  Report a Concern
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="cta" asChild>
                <Link to="/apply">
                  Work with Us
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
