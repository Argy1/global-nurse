import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Clock, DollarSign, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const pathways = [
  {
    slug: "uk",
    country: "United Kingdom",
    flag: "🇬🇧",
    description: "Work in the NHS or private healthcare with world-class training and career progression.",
    requirements: ["Valid nursing qualification", "English proficiency (IELTS/OET)", "OSCE examination"],
    processingTime: "4-8 months",
    avgSalary: "£28,000 - £45,000",
    highlights: ["NHS Pension Scheme", "Career progression", "Free healthcare"],
  },
  {
    slug: "usa",
    country: "United States",
    flag: "🇺🇸",
    description: "High-paying opportunities across all 50 states with visa sponsorship and relocation support.",
    requirements: ["BSN or equivalent", "NCLEX-RN license", "English proficiency", "VisaScreen certificate"],
    processingTime: "12-24 months",
    avgSalary: "$65,000 - $120,000",
    highlights: ["Highest salaries globally", "Sign-on bonuses", "Diverse specialties"],
  },
  {
    slug: "canada",
    country: "Canada",
    flag: "🇨🇦",
    description: "Provincial nursing programs with clear pathways to permanent residency and citizenship.",
    requirements: ["Nursing degree", "NNAS assessment", "Provincial registration", "Language proficiency"],
    processingTime: "6-12 months",
    avgSalary: "CAD $70,000 - $95,000",
    highlights: ["PR pathway", "Work-life balance", "Universal healthcare"],
  },
  {
    slug: "australia",
    country: "Australia",
    flag: "🇦🇺",
    description: "Excellent quality of life with competitive pay and sunny weather year-round.",
    requirements: ["Nursing qualification", "AHPRA registration", "English test (IELTS/OET)", "Skills assessment"],
    processingTime: "3-9 months",
    avgSalary: "AUD $75,000 - $110,000",
    highlights: ["High quality of life", "Strong unions", "Beach lifestyle"],
  },
  {
    slug: "germany",
    country: "Germany",
    flag: "🇩🇪",
    description: "Growing demand for nurses with excellent working conditions and social benefits.",
    requirements: ["Nursing qualification", "German B2 level", "Recognition process", "Adaptation period"],
    processingTime: "8-14 months",
    avgSalary: "€35,000 - €50,000",
    highlights: ["No tuition fees", "Strong labor laws", "EU mobility"],
  },
  {
    slug: "ireland",
    country: "Ireland",
    flag: "🇮🇪",
    description: "English-speaking destination with EU benefits and a welcoming culture for nurses.",
    requirements: ["Nursing degree", "NMBI registration", "English proficiency", "Adaptation program"],
    processingTime: "3-6 months",
    avgSalary: "€35,000 - €55,000",
    highlights: ["EU passport pathway", "English-speaking", "Growing healthcare sector"],
  },
];

export default function Pathways() {
  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-hero py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4">
              Explore Destination Pathways
            </h1>
            <p className="text-lg text-primary-foreground/90">
              Verified opportunities in top healthcare destinations worldwide. Find your perfect match.
            </p>
          </div>
        </div>
      </section>

      {/* Pathways Grid */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {pathways.map((pathway) => (
              <div
                key={pathway.slug}
                className="bg-card rounded-xl overflow-hidden shadow-card border border-border hover:shadow-lg transition-shadow"
              >
                <div className="p-6 lg:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{pathway.flag}</span>
                      <h2 className="text-xl lg:text-2xl font-bold text-foreground">
                        {pathway.country}
                      </h2>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">{pathway.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">{pathway.processingTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-accent" />
                      <span className="text-muted-foreground">{pathway.avgSalary}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-sm text-foreground mb-2">Highlights:</h4>
                    <div className="flex flex-wrap gap-2">
                      {pathway.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="px-3 py-1 bg-mint text-mint-foreground text-xs font-medium rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button variant="outline" className="w-full" asChild>
                    <Link to={`/pathways/${pathway.slug}`}>
                      View Full Details
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-16 bg-muted">
        <div className="container text-center">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-foreground mb-4">
            Not Sure Which Pathway Fits You?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Apply now and our team will help you find the perfect destination based on your qualifications and preferences.
          </p>
          <Button variant="cta" size="lg" asChild>
            <Link to="/apply">
              Get Personalized Recommendations
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
