import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Bot, BookOpen, Handshake, HeadphonesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { useTranslation } from "@/i18n/LanguageContext";

const stepIcons = [Bot, BookOpen, Handshake, HeadphonesIcon];

export default function HowWeDoIt() {
  const { t } = useTranslation();

  return (
    <Layout>
      <section className="gradient-hero py-16 lg:py-24">
        <div className="container text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4">{t.howWeDoIt.title}</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">{t.howWeDoIt.subtitle}</p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container">
          <h2 className="text-3xl font-extrabold text-foreground mb-12 text-center">{t.howWeDoIt.ourApproach}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.howWeDoIt.steps.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <div key={step.title} className="bg-card rounded-xl p-6 shadow-card border border-border">
                  <Icon className="h-10 w-10 text-accent mb-4" />
                  <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-extrabold text-foreground mb-12 text-center">{t.howWeDoIt.journeyStepByStep}</h2>
          <div className="space-y-12">
            {t.howWeDoIt.phases.map((phase, i) => (
              <div key={phase.title} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                    {String(i + 1).padStart(2, "0")}
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
          <h2 className="text-3xl font-extrabold text-primary-foreground mb-8">{t.howWeDoIt.startJourney}</h2>
          <Button variant="hero" size="xl" asChild>
            <Link to="/register">{t.common.registerNow} <ArrowRight className="h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
