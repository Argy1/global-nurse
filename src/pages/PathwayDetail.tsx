import { useParams, Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Clock, FileCheck, CheckCircle, MapPin, Users, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { usePathway } from "@/hooks/usePathways";
import { CTABoxSticky } from "@/components/campaign";

// Country flag mapping
const countryFlags: Record<string, string> = {
  "United Kingdom": "🇬🇧",
  "United States": "🇺🇸",
  "Canada": "🇨🇦",
  "Australia": "🇦🇺",
  "Germany": "🇩🇪",
  "Ireland": "🇮🇪",
};

interface FAQ {
  question: string;
  answer: string;
}

export default function PathwayDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: pathway, isLoading, error } = usePathway(slug || "");

  if (isLoading) {
    return (
      <Layout>
        <section className="gradient-hero py-12 lg:py-20">
          <div className="container">
            <div className="animate-pulse">
              <div className="h-8 w-32 bg-primary-foreground/20 rounded mb-6"></div>
              <div className="h-12 w-64 bg-primary-foreground/20 rounded mb-4"></div>
              <div className="h-6 w-96 bg-primary-foreground/20 rounded"></div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (error || !pathway) {
    return (
      <Layout>
        <section className="py-24 text-center">
          <div className="container">
            <h1 className="text-3xl font-bold mb-4">Pathway Not Found</h1>
            <p className="text-muted-foreground mb-8">The pathway you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/pathways">
                <ArrowLeft className="h-4 w-4" />
                Back to Pathways
              </Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  const requirements = Array.isArray(pathway.requirements) ? (pathway.requirements as string[]) : [];
  const timelineSteps = Array.isArray(pathway.timeline_steps) ? (pathway.timeline_steps as string[]) : [];
  const documentsChecklist = Array.isArray(pathway.documents_checklist) ? (pathway.documents_checklist as string[]) : [];
  const faqs = Array.isArray(pathway.faq) ? (pathway.faq as unknown as FAQ[]) : [];

  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-hero py-12 lg:py-20">
        <div className="container">
          <Link 
            to="/pathways" 
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            All Pathways
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{countryFlags[pathway.country] || "🌍"}</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground">
              {pathway.country}
            </h1>
          </div>
          <p className="text-xl text-primary-foreground/90 max-w-2xl">
            {pathway.title}
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-card border-y border-border py-6">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Timeline Steps</p>
                <p className="font-bold text-foreground">{timelineSteps.length} Steps</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FileCheck className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Requirements</p>
                <p className="font-bold text-foreground">{requirements.length} Items</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Documents</p>
                <p className="font-bold text-foreground">{documentsChecklist.length} Required</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Support Level</p>
                <p className="font-bold text-foreground">Full Guidance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">{pathway.short_summary}</p>
              </div>

              {/* Timeline */}
              {timelineSteps.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Your Journey</h2>
                  <div className="space-y-4">
                    {timelineSteps.map((step, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1 pb-4 border-b border-border last:border-0">
                          <p className="text-foreground">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Requirements */}
              {requirements.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Requirements</h2>
                  <ul className="space-y-3">
                    {requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Documents */}
              {documentsChecklist.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Documents Checklist</h2>
                  <ul className="space-y-3">
                    {documentsChecklist.map((doc, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <FileCheck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* FAQs */}
              {faqs.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Common Questions</h2>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="bg-muted rounded-lg p-4">
                        <h3 className="font-bold text-foreground mb-2 flex items-start gap-2">
                          <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          {faq.question}
                        </h3>
                        <p className="text-muted-foreground pl-7">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <CTABoxSticky
                title="Ready to Start?"
                description={`Apply now and our team will guide you through the ${pathway.country} pathway.`}
                applyLabel={`Apply for ${pathway.country}`}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
