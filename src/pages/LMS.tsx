import { Link, useLocation } from "react-router-dom";
import { BookOpen, ArrowRight, Languages, Award, Building2, FileText, Briefcase, DollarSign, Globe, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { useTranslation } from "@/i18n/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";

function ComingSoonCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="relative bg-card rounded-xl p-6 border border-border shadow-card overflow-hidden group">
      {/* Coming Soon overlay on hover */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-bold text-foreground">{title}</h3>
        <Badge variant="secondary" className="bg-accent/10 text-accent border border-accent/20 text-xs font-semibold shrink-0 ml-2">
          <Lock className="h-3 w-3 mr-1" />
          Soon
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

export default function LMS() {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace("#", ""));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }, [location.hash]);

  const usHealthcareTopics = [
    { icon: Building2, title: t.lms.healthcareSystem, desc: t.lms.healthcareSystemDesc },
    { icon: FileText, title: t.lms.visaGuide, desc: t.lms.visaGuideDesc },
    { icon: Briefcase, title: t.lms.workplaceCulture, desc: t.lms.workplaceCultureDesc },
    { icon: DollarSign, title: t.lms.salaryBenefits, desc: t.lms.salaryBenefitsDesc },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-hero py-16 lg:py-24">
        <div className="container text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4">{t.lms.title}</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">{t.lms.subtitle}</p>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-12 bg-muted">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-card rounded-xl p-6 shadow-card border border-border text-center">
              <Languages className="h-10 w-10 text-accent mx-auto mb-3" />
              <h3 className="font-bold text-foreground mb-2">{t.lms.comprehensiveTraining}</h3>
              <p className="text-sm text-muted-foreground">{t.lms.comprehensiveTrainingDesc}</p>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-card border border-border text-center">
              <Award className="h-10 w-10 text-accent mx-auto mb-3" />
              <h3 className="font-bold text-foreground mb-2">{t.lms.personalizedMatching}</h3>
              <p className="text-sm text-muted-foreground">{t.lms.personalizedMatchingDesc}</p>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-card border border-border text-center">
              <Globe className="h-10 w-10 text-accent mx-auto mb-3" />
              <h3 className="font-bold text-foreground mb-2">{t.lms.fullSupport}</h3>
              <p className="text-sm text-muted-foreground">{t.lms.fullSupportDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tabs */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="ielts" className="w-full">
              <TabsList className="w-full h-auto flex-wrap gap-1 bg-muted p-1.5 rounded-xl mb-10">
                <TabsTrigger
                  value="ielts"
                  id="ielts"
                  className="flex-1 min-w-[140px] py-3 rounded-lg font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Languages className="h-4 w-4 mr-2" />
                  {t.lms.ieltsPrep}
                </TabsTrigger>
                <TabsTrigger
                  value="certified"
                  id="certified"
                  className="flex-1 min-w-[140px] py-3 rounded-lg font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Award className="h-4 w-4 mr-2" />
                  {t.lms.certifiedGlobalNurse}
                  <Badge variant="secondary" className="ml-2 bg-accent/10 text-accent text-[10px] px-1.5 py-0 border border-accent/20">Soon</Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="nclex"
                  id="nclex"
                  className="flex-1 min-w-[140px] py-3 rounded-lg font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  {t.lms.nclexResources}
                </TabsTrigger>
              </TabsList>

              {/* IELTS Tab */}
              <TabsContent value="ielts">
                <div className="mb-6">
                  <h2 className="text-2xl font-extrabold text-foreground">{t.lms.ieltsPrep}</h2>
                  <p className="text-muted-foreground mt-1">{t.lms.ieltsSubtitle}</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {t.lms.ieltsModules.map((mod) => (
                    <ComingSoonCard key={mod.title} title={mod.title} desc={mod.desc} />
                  ))}
                </div>
              </TabsContent>

              {/* Certified Global Nurse Tab */}
              <TabsContent value="certified">
                <div className="mb-6">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-extrabold text-foreground">{t.lms.certifiedGlobalNurse}</h2>
                    <Badge className="bg-accent/10 text-accent border border-accent/20 text-xs">Coming Soon</Badge>
                  </div>
                  <p className="text-muted-foreground mt-1">{t.lms.certifiedGlobalNurseSubtitle}</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {t.lms.certModules.map((mod) => (
                    <ComingSoonCard key={mod.title} title={mod.title} desc={mod.desc} />
                  ))}
                </div>
              </TabsContent>

              {/* NCLEX Tab */}
              <TabsContent value="nclex">
                <div className="mb-6">
                  <h2 className="text-2xl font-extrabold text-foreground">{t.lms.nclexResources}</h2>
                  <p className="text-muted-foreground mt-1">{t.lms.nclexSubtitle}</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {t.lms.nclexModules.map((mod) => (
                    <ComingSoonCard key={mod.title} title={mod.title} desc={mod.desc} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* US Healthcare Basics */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Globe className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-foreground">{t.lms.usHealthcare}</h2>
                <p className="text-sm text-muted-foreground">{t.lms.usHealthcareSubtitle}</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {usHealthcareTopics.map((topic) => (
                <div key={topic.title} className="bg-card rounded-xl p-6 shadow-card border border-border relative">
                  <topic.icon className="h-8 w-8 text-accent mb-3" />
                  <h3 className="font-bold text-foreground mb-2">{topic.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{topic.desc}</p>
                  <Badge className="bg-accent/10 text-accent border border-accent/20 text-xs">
                    <Lock className="h-3 w-3 mr-1" />
                    {t.common.comingSoon}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-hero">
        <div className="container text-center">
          <h2 className="text-3xl font-extrabold text-primary-foreground mb-4">{t.lms.readyToLearn}</h2>
          <p className="text-primary-foreground/90 mb-8">{t.lms.readyToLearnDesc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/register">{t.common.registerNow} <ArrowRight className="h-5 w-5" /></Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/quickstart">{t.lms.quickstartGuide}</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
