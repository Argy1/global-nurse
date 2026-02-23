import { Link } from "react-router-dom";
import { ArrowRight, Heart, Shield, Eye, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { useTranslation } from "@/i18n/LanguageContext";

export default function About() {
  const { t } = useTranslation();

  const values = [
    { icon: Heart, title: t.about.passion, desc: t.about.passionDesc },
    { icon: Shield, title: t.about.trust, desc: t.about.trustDesc },
    { icon: Users, title: t.about.diversity, desc: t.about.diversityDesc },
    { icon: Eye, title: t.about.integrity, desc: t.about.integrityDesc },
  ];

  return (
    <Layout>
      <section className="gradient-hero py-16 lg:py-24">
        <div className="container text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4">{t.about.title}</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">{t.about.subtitle}</p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl font-extrabold text-foreground mb-6">{t.about.visionTitle}</h2>
              <p className="text-lg text-muted-foreground">{t.about.visionText}</p>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-foreground mb-6">{t.about.missionTitle}</h2>
              <div className="space-y-4">
                {[
                  { letter: "P", title: t.about.providingTitle, desc: t.about.providingDesc },
                  { letter: "A", title: t.about.acceleratingTitle, desc: t.about.acceleratingDesc },
                  { letter: "E", title: t.about.empoweringTitle, desc: t.about.empoweringDesc },
                ].map((m) => (
                  <div key={m.letter} className="flex items-start gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold text-sm shrink-0">{m.letter}</span>
                    <div>
                      <h4 className="font-bold text-foreground">{m.title}</h4>
                      <p className="text-muted-foreground text-sm">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted">
        <div className="container text-center max-w-3xl">
          <p className="text-xl font-heading font-bold text-foreground mb-2">"{t.about.brandPhilosophy}"</p>
          <p className="text-muted-foreground">{t.about.brandPhilosophyDesc}</p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container">
          <h2 className="text-3xl font-extrabold text-foreground mb-12 text-center">{t.about.coreValues}</h2>
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

      <section className="py-16 lg:py-24 bg-muted">
        <div className="container">
          <h2 className="text-3xl font-extrabold text-foreground mb-12 text-center">{t.about.knowDifference}</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-destructive/5 rounded-xl p-6 border border-destructive/20">
              <h3 className="font-bold text-destructive mb-4 text-lg">🚩 {t.about.redFlags}</h3>
              <ul className="space-y-3 text-sm text-foreground">
                {t.about.redFlagsList.map((f) => (
                  <li key={f} className="flex items-start gap-2"><span className="text-destructive mt-0.5">✗</span>{f}</li>
                ))}
              </ul>
            </div>
            <div className="bg-accent/5 rounded-xl p-6 border border-accent/20">
              <h3 className="font-bold text-accent mb-4 text-lg">✅ {t.about.greenFlags}</h3>
              <ul className="space-y-3 text-sm text-foreground">
                {t.about.greenFlagsList.map((f) => (
                  <li key={f} className="flex items-start gap-2"><span className="text-accent mt-0.5">✓</span>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 gradient-hero">
        <div className="container text-center">
          <h2 className="text-3xl font-extrabold text-primary-foreground mb-4">{t.about.joinMission}</h2>
          <p className="text-primary-foreground/90 max-w-xl mx-auto mb-8">{t.about.joinMissionDesc}</p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/register">{t.common.registerNow} <ArrowRight className="h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
