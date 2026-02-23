import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Users, Globe, Briefcase, MessageCircle, Award, FileCheck, Languages, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { useTranslation } from "@/i18n/LanguageContext";

const candidateIcons = [MapPin, Languages, FileCheck, Briefcase, Globe, MessageCircle];
const employerIcons = [ShieldCheck, Languages, Users, Award];

export default function WhatWeDo() {
  const { t } = useTranslation();

  return (
    <Layout>
      <section className="gradient-hero py-16 lg:py-24">
        <div className="container text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4">{t.whatWeDo.title}</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">{t.whatWeDo.subtitle}</p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-foreground mb-4">{t.whatWeDo.forCandidates}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t.whatWeDo.forCandidatesDesc}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.whatWeDo.candidateServices.map((s, i) => {
              const Icon = candidateIcons[i];
              return (
                <div key={s.title} className="bg-card rounded-xl p-8 shadow-card border border-border">
                  <Icon className="h-10 w-10 text-accent mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-muted-foreground">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-foreground mb-4">{t.whatWeDo.forEmployers}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t.whatWeDo.forEmployersDesc}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.whatWeDo.employerServices.map((s, i) => {
              const Icon = employerIcons[i];
              return (
                <div key={s.title} className="bg-card rounded-xl p-6 shadow-card border border-border text-center">
                  <Icon className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-foreground mb-4">{t.whatWeDo.whatWeDontDo}</h2>
            <p className="text-muted-foreground mb-8">{t.whatWeDo.whatWeDontDoDesc}</p>
            <div className="bg-card rounded-xl p-8 border border-border text-left space-y-3">
              {t.whatWeDo.dontDoList.map((item) => (
                <p key={item} className="flex items-start gap-3 text-foreground">
                  <span className="text-accent font-bold mt-0.5">→</span>{item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 gradient-hero">
        <div className="container text-center">
          <h2 className="text-3xl font-extrabold text-primary-foreground mb-4">{t.whatWeDo.readyGetStarted}</h2>
          <p className="text-primary-foreground/90 mb-8">{t.whatWeDo.readyGetStartedDesc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/register">{t.common.registerNow} <ArrowRight className="h-5 w-5" /></Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/how-we-do-it">{t.nav.howWeDoIt}</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
