import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Star, Zap, Crown, FileText, Globe, BookOpen, Languages, Home, Plane, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/LanguageContext";

const singaporeDetails = {
  role: "Healthcare Assistant (HCA)",
  contract: "2 years contract",
  employer: "Government / Private Hospitals & Nursing Homes",
  benefits: [
    { key: "salary", value: "1.1K – 1.2K SGD (Net)" },
    { key: "housing", value: "500 SGD" },
    { key: "airfare", value: "1K SGD" },
    { key: "bonus", value: "2x salary" },
    { key: "insurance", value: "Depends on hospital" },
  ],
};

export default function Programs() {
  const { t } = useTranslation();

  const plans = [
    { name: t.programs.starter.name, price: "9", currency: "SGD", period: "/one-time", highlight: false, features: t.programs.starter.features },
    { name: t.programs.professional.name, price: "19", currency: "SGD", period: "/one-time", highlight: true, features: t.programs.professional.features },
  ];

  const benefitLabels: Record<string, string> = {
    salary: t.programs.benefits.salary, housing: t.programs.benefits.housing,
    airfare: t.programs.benefits.airfare, bonus: t.programs.benefits.bonus, insurance: t.programs.benefits.insurance,
  };

  return (
    <Layout>
      <section className="gradient-hero py-16 lg:py-24">
        <div className="container text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4">{t.programs.title}</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">{t.programs.subtitle}</p>
        </div>
      </section>

      <section className="py-8 bg-accent text-accent-foreground">
        <div className="container text-center"><p className="font-bold text-lg">{t.programs.batchInfo}</p></div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container">
          <h2 className="text-3xl font-extrabold text-foreground mb-12 text-center">{t.programs.choosePlan}</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <div key={plan.name} className={`rounded-2xl p-8 border-2 ${plan.highlight ? "border-accent bg-accent/5 shadow-lg relative" : "border-border bg-card shadow-card"}`}>
                {plan.highlight && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold">{t.common.recommended}</span>}
                <h3 className="text-2xl font-extrabold text-foreground mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-accent">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.currency} {plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground"><Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />{f}</li>
                  ))}
                </ul>
                <Button variant={plan.highlight ? "cta" : "outline"} className="w-full" asChild>
                  <Link to="/register">{t.common.getStarted} <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted">
        <div className="container">
          <h2 className="text-3xl font-extrabold text-foreground mb-4 text-center">{t.programs.nurseInSingapore}</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">{singaporeDetails.role} — {singaporeDetails.contract}</p>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-card rounded-xl p-6 shadow-card border border-border">
              <h3 className="font-bold text-foreground text-lg mb-4 flex items-center gap-2"><FileText className="h-5 w-5 text-accent" />{t.programs.requirementsTitle}</h3>
              <ul className="space-y-2">
                {t.programs.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-muted-foreground"><Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />{r}</li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-card border border-border">
              <h3 className="font-bold text-foreground text-lg mb-4 flex items-center gap-2"><Award className="h-5 w-5 text-accent" />{t.programs.compensationTitle}</h3>
              <div className="space-y-3">
                {singaporeDetails.benefits.map((b) => (
                  <div key={b.key} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{benefitLabels[b.key]}</span>
                    <span className="font-medium text-foreground">{b.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-sm text-accent font-medium">📈 {t.programs.careerPath}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 gradient-hero">
        <div className="container text-center">
          <h2 className="text-3xl font-extrabold text-primary-foreground mb-4">{t.programs.readyToStart}</h2>
          <p className="text-primary-foreground/90 mb-8">{t.programs.readyToStartDesc}</p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/register">{t.common.registerNow} <ArrowRight className="h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
