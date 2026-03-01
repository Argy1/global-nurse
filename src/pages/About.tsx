import { Link } from "react-router-dom";
import { ArrowRight, Heart, Shield, Users, Eye, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { useTranslation } from "@/i18n/LanguageContext";
import logoIcon from "@/assets/logo-icon.png";
import heroNurse from "@/assets/hero-nurse-asia.png";

export default function About() {
  const { t } = useTranslation();

  return (
    <Layout>
      {/* Hero */}
      <section id="global-paro" className="gradient-hero py-16 lg:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img src={logoIcon} alt="Global Paro" className="h-12 w-12 brightness-0 invert" />
                <span className="font-heading font-black text-2xl text-primary-foreground">Global PARO</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black font-heading text-primary-foreground mb-4 leading-tight">
                {t.about.title}
              </h1>
              <p className="text-lg text-primary-foreground/85 max-w-md">
                {t.about.subtitle}
              </p>
            </div>
            <div className="hidden lg:flex justify-center relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-72 h-72 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }} />
              </div>
              <img src={heroNurse} alt="Nurse" className="relative z-10 h-[380px] w-auto object-contain drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section id="vision" className="py-16 lg:py-24">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Vision */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ backgroundColor: 'hsl(var(--accent) / 0.1)', color: 'hsl(var(--accent))' }}>
                Our Vision
              </div>
              <h2 className="text-3xl font-black font-heading text-foreground mb-4">{t.about.visionTitle}</h2>
              <div className="w-12 h-1 rounded-full mb-6" style={{ backgroundColor: 'hsl(var(--accent))' }} />
              <p className="text-lg text-muted-foreground leading-relaxed">{t.about.visionText}</p>
            </div>

            {/* Mission */}
            <div id="mission">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ backgroundColor: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))' }}>
                Our Mission
              </div>
              <h2 className="text-3xl font-black font-heading text-foreground mb-4">{t.about.missionTitle}</h2>
              <div className="w-12 h-1 rounded-full mb-6" style={{ backgroundColor: 'hsl(var(--primary))' }} />
              <div className="space-y-5">
                {[
                  { letter: "P", title: t.about.providingTitle, desc: t.about.providingDesc, color: 'hsl(var(--primary))' },
                  { letter: "A", title: t.about.acceleratingTitle, desc: t.about.acceleratingDesc, color: 'hsl(var(--accent))' },
                  { letter: "E", title: t.about.empoweringTitle, desc: t.about.empoweringDesc, color: 'hsl(var(--primary))' },
                ].map((m) => (
                  <div key={m.letter} className="flex items-start gap-4">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-white font-black font-heading text-lg shrink-0"
                      style={{ backgroundColor: m.color }}
                    >
                      {m.letter}
                    </span>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">{m.title}</h4>
                      <p className="text-sm text-muted-foreground">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Philosophy Banner */}
      <section className="py-12" style={{ backgroundColor: 'hsl(var(--primary))' }}>
        <div className="container text-center">
          <p className="text-2xl lg:text-3xl font-black font-heading text-primary-foreground italic">
            "{t.about.brandPhilosophy}"
          </p>
          <p className="text-primary-foreground/70 mt-2 text-sm">{t.about.brandPhilosophyDesc}</p>
        </div>
      </section>

      {/* Core Values */}
      <section id="values" className="py-16 lg:py-24 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: 'hsl(var(--accent))' }}>Core Values</p>
            <h2 className="text-3xl lg:text-4xl font-black font-heading text-foreground">{t.about.coreValues}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: t.about.passion, desc: t.about.passionDesc, num: "01" },
              { icon: Shield, title: t.about.trust, desc: t.about.trustDesc, num: "02" },
              { icon: Users, title: t.about.diversity, desc: t.about.diversityDesc, num: "03" },
              { icon: Eye, title: t.about.integrity, desc: t.about.integrityDesc, num: "04" },
            ].map((v) => (
              <div key={v.title} className="bg-card rounded-2xl p-6 shadow-card border border-border hover:border-accent/40 transition-all group text-center">
                <div className="text-4xl font-black font-heading opacity-10 mb-3 group-hover:opacity-20 transition-opacity" style={{ color: 'hsl(var(--accent))' }}>
                  {v.num}
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl mx-auto mb-4" style={{ backgroundColor: 'hsl(var(--accent) / 0.1)' }}>
                  <v.icon className="h-6 w-6" style={{ color: 'hsl(var(--accent))' }} />
                </div>
                <h3 className="font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* "NURSES ARE THE HEART OF HEALTHCARE" Banner */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(var(--primary)) 100%)' }}>
        <div className="container text-center">
          <Heart className="h-10 w-10 text-primary-foreground/60 mx-auto mb-4" />
          <h2 className="text-3xl lg:text-5xl font-black font-heading text-primary-foreground leading-tight">
            NURSES ARE THE<br />HEART OF HEALTHCARE
          </h2>
        </div>
      </section>

      {/* Know the Difference: Red vs Green Flags */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-black font-heading text-foreground mb-2 text-center">{t.about.knowDifference}</h2>
          <p className="text-muted-foreground text-center mb-12">Know the red flags from green flags when choosing a recruitment partner.</p>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Red Flags */}
            <div className="bg-card rounded-2xl p-6 border-2" style={{ borderColor: 'hsl(var(--destructive) / 0.4)' }}>
              <div className="flex items-center gap-2 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: 'hsl(var(--destructive) / 0.1)' }}>
                  <XCircle className="h-5 w-5" style={{ color: 'hsl(var(--destructive))' }} />
                </div>
                <h3 className="font-bold text-lg" style={{ color: 'hsl(var(--destructive))' }}>🚩 {t.about.redFlags}</h3>
              </div>
              <ul className="space-y-3">
                {t.about.redFlagsList.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                    <XCircle className="h-4 w-4 shrink-0 mt-0.5" style={{ color: 'hsl(var(--destructive))' }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Green Flags */}
            <div className="bg-card rounded-2xl p-6 border-2" style={{ borderColor: 'hsl(var(--accent) / 0.4)' }}>
              <div className="flex items-center gap-2 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: 'hsl(var(--accent) / 0.1)' }}>
                  <CheckCircle className="h-5 w-5" style={{ color: 'hsl(var(--accent))' }} />
                </div>
                <h3 className="font-bold text-lg" style={{ color: 'hsl(var(--accent))' }}>✅ {t.about.greenFlags}</h3>
              </div>
              <ul className="space-y-3">
                {t.about.greenFlagsList.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                    <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" style={{ color: 'hsl(var(--accent))' }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-hero">
        <div className="container text-center max-w-xl">
          <h2 className="text-3xl font-black font-heading text-primary-foreground mb-4">{t.about.joinMission}</h2>
          <p className="text-primary-foreground/80 mb-8">{t.about.joinMissionDesc}</p>
          <Button
            size="xl"
            asChild
            className="rounded-full font-bold"
            style={{ backgroundColor: 'hsl(var(--card))', color: 'hsl(var(--primary))' }}
          >
            <Link to="/register">{t.common.registerNow} <ArrowRight className="h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
