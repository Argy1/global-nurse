import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Star, Zap, Crown, FileText, Globe, BookOpen, Languages, Home, Plane, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "9",
    currency: "SGD",
    period: "/one-time",
    highlight: false,
    features: [
      "Create your profile",
      "Document submission",
      "Opportunity to work in Singapore",
    ],
  },
  {
    name: "Professional",
    price: "19",
    currency: "SGD",
    period: "/one-time",
    highlight: true,
    features: [
      "Everything in Starter",
      "Personalized LMS access",
      "English guidance & tips",
      "Document checklist & validation",
      "English interview training",
      "Translate all required docs (Bahasa → English)",
      "Assist for TrueMerit application & verification",
      "Assist for visa & working permit",
      "Free visa working permit processing",
      "Help to find apartment",
      "Opportunities in Singapore, Canada, US",
    ],
  },
];

const singaporeDetails = {
  role: "Healthcare Assistant (HCA)",
  contract: "2 years contract",
  employer: "Government / Private Hospitals & Nursing Homes",
  requirements: [
    "Age 22–45",
    "1–5 years nursing experience",
    "English daily conversation",
    "S.Nurse or B.Nurse certification",
    "Nursing Degree",
    "STR Number (for Indonesian citizens)",
    "English certificate (optional)",
  ],
  benefits: [
    { label: "Salary", value: "1.1K – 1.2K SGD (Net)" },
    { label: "Housing allowance", value: "500 SGD" },
    { label: "Airfare + settling-in", value: "1K SGD" },
    { label: "Annual bonus", value: "2x salary" },
    { label: "Insurance", value: "Depends on hospital" },
  ],
  careerPath: "After 1.5–2 years → Singapore Nursing Board Exam → Enrolled Nurse (EN)",
};

export default function Programs() {
  return (
    <Layout>
      <section className="gradient-hero py-16 lg:py-24">
        <div className="container text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4">Programs & Pricing</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Join 1000+ Indonesian Nurses Building Their Global Healthcare Careers
          </p>
        </div>
      </section>

      {/* Batch Info */}
      <section className="py-8 bg-accent text-accent-foreground">
        <div className="container text-center">
          <p className="font-bold text-lg">
            🚀 Batch #1 — Deployment timeline: <span className="underline">31st May 2026</span> | Registration open until <span className="underline">15th March 2026</span>
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <h2 className="text-3xl font-extrabold text-foreground mb-12 text-center">Choose Your Plan</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 border-2 ${
                  plan.highlight
                    ? "border-accent bg-accent/5 shadow-lg relative"
                    : "border-border bg-card shadow-card"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold">
                    RECOMMENDED
                  </span>
                )}
                <h3 className="text-2xl font-extrabold text-foreground mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-accent">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.currency} {plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.highlight ? "cta" : "outline"}
                  className="w-full"
                  asChild
                >
                  <Link to="/register">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Singapore Deployment Details */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container">
          <h2 className="text-3xl font-extrabold text-foreground mb-4 text-center">🇸🇬 Nurse in Singapore</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            {singaporeDetails.role} — {singaporeDetails.contract} for {singaporeDetails.employer}
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Requirements */}
            <div className="bg-card rounded-xl p-6 shadow-card border border-border">
              <h3 className="font-bold text-foreground text-lg mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-accent" />
                Requirements & Documents
              </h3>
              <ul className="space-y-2">
                {singaporeDetails.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-card rounded-xl p-6 shadow-card border border-border">
              <h3 className="font-bold text-foreground text-lg mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-accent" />
                Compensation & Benefits
              </h3>
              <div className="space-y-3">
                {singaporeDetails.benefits.map((b) => (
                  <div key={b.label} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{b.label}</span>
                    <span className="font-medium text-foreground">{b.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-sm text-accent font-medium">
                  📈 {singaporeDetails.careerPath}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 gradient-hero">
        <div className="container text-center">
          <h2 className="text-3xl font-extrabold text-primary-foreground mb-4">Ready to Start Your Journey?</h2>
          <p className="text-primary-foreground/90 mb-8">Register now to secure your spot in Batch #1.</p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/register">Register Now <ArrowRight className="h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
