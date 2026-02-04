import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { usePathways } from "@/hooks/usePathways";

// Country flag mapping
const countryFlags: Record<string, string> = {
  "United Kingdom": "🇬🇧",
  "United States": "🇺🇸",
  "Canada": "🇨🇦",
  "Australia": "🇦🇺",
  "Germany": "🇩🇪",
  "Ireland": "🇮🇪",
};

export default function Pathways() {
  const { data: pathways, isLoading, error } = usePathways();

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
          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-card rounded-xl p-6 lg:p-8 shadow-card border border-border animate-pulse">
                  <div className="h-12 w-32 bg-muted rounded mb-4"></div>
                  <div className="h-4 w-full bg-muted rounded mb-2"></div>
                  <div className="h-4 w-3/4 bg-muted rounded"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Failed to load pathways. Please try again later.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {pathways?.map((pathway) => {
                const requirements = (pathway.requirements as string[]) || [];
                const timelineSteps = (pathway.timeline_steps as string[]) || [];
                
                return (
                  <div
                    key={pathway.id}
                    className="bg-card rounded-xl overflow-hidden shadow-card border border-border hover:shadow-lg transition-shadow"
                  >
                    <div className="p-6 lg:p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-4xl">{countryFlags[pathway.country] || "🌍"}</span>
                          <h2 className="text-xl lg:text-2xl font-bold text-foreground">
                            {pathway.country}
                          </h2>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-6">{pathway.short_summary}</p>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">{timelineSteps.length} steps</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-accent" />
                          <span className="text-muted-foreground">{requirements.length} requirements</span>
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
                );
              })}
            </div>
          )}
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
