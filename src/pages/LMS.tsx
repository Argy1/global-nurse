import { Link } from "react-router-dom";
import { BookOpen, ArrowRight, ExternalLink, Languages, Award, Building2, FileText, Briefcase, DollarSign, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { useTranslation } from "@/i18n/LanguageContext";

const ieltsResources = [
  { name: "British Council", url: "https://www.britishcouncil.org/exam/ielts", desc: "Official IELTS preparation materials and practice tests" },
  { name: "Cambridge English", url: "https://www.cambridgeenglish.org/", desc: "Free preparation resources from Cambridge" },
  { name: "IELTS Online Tests", url: "https://ieltsonlinetests.com/", desc: "Free full practice tests with scoring" },
  { name: "IELTS Liz", url: "https://ieltsliz.com/", desc: "Tips, strategies, and free lessons for all IELTS sections" },
  { name: "IELTSbuddy", url: "https://www.ieltsbuddy.com/", desc: "Sample questions, model answers, and study guides" },
];

const nclexResources = [
  { name: "NCSBN", url: "https://www.ncsbn.org/nclex.htm", desc: "Official NCLEX information and candidate resources" },
  { name: "Nurses International", url: "https://www.nursesinternational.com/", desc: "NCLEX review courses for international nurses" },
  { name: "Kaplan Test Prep", url: "https://www.kaptest.com/nclex", desc: "Comprehensive NCLEX prep courses and practice questions" },
  { name: "Simple Nursing", url: "https://simplenursing.com/", desc: "Visual learning resources and nursing concept reviews" },
  { name: "NursesLabs", url: "https://nurseslabs.com/", desc: "Practice questions, study guides, and nursing resources" },
];

export default function LMS() {
  const { t } = useTranslation();

  const usHealthcareTopics = [
    { icon: Building2, title: t.lms.healthcareSystem, desc: t.lms.healthcareSystemDesc },
    { icon: FileText, title: t.lms.visaGuide, desc: t.lms.visaGuideDesc },
    { icon: Briefcase, title: t.lms.workplaceCulture, desc: t.lms.workplaceCultureDesc },
    { icon: DollarSign, title: t.lms.salaryBenefits, desc: t.lms.salaryBenefitsDesc },
  ];

  return (
    <Layout>
      <section className="gradient-hero py-16 lg:py-24">
        <div className="container text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4">{t.lms.title}</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">{t.lms.subtitle}</p>
        </div>
      </section>

      {/* What We Provide */}
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

      {/* IELTS Preparation */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Languages className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-foreground">{t.lms.ieltsPrep}</h2>
                <p className="text-sm text-muted-foreground">{t.lms.ieltsSubtitle}</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ieltsResources.map((r) => (
                <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer" className="bg-card rounded-xl p-5 shadow-card border border-border hover:border-accent hover:shadow-lg transition-all group">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-foreground group-hover:text-accent transition-colors">{r.name}</h3>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-accent" />
                  </div>
                  <p className="text-sm text-muted-foreground">{r.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NCLEX Resources */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-foreground">{t.lms.nclexResources}</h2>
                <p className="text-sm text-muted-foreground">{t.lms.nclexSubtitle}</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {nclexResources.map((r) => (
                <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer" className="bg-card rounded-xl p-5 shadow-card border border-border hover:border-primary hover:shadow-lg transition-all group">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{r.name}</h3>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">{r.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* US Healthcare Basics */}
      <section className="py-16 lg:py-24">
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
                <div key={topic.title} className="bg-card rounded-xl p-6 shadow-card border border-border">
                  <topic.icon className="h-8 w-8 text-accent mb-3" />
                  <h3 className="font-bold text-foreground mb-2">{topic.title}</h3>
                  <p className="text-sm text-muted-foreground">{topic.desc}</p>
                  <span className="inline-block mt-3 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">{t.common.comingSoon}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
