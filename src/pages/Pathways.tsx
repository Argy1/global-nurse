import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Clock, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Layout } from "@/components/layout/Layout";
import { usePathways } from "@/hooks/usePathways";
import { Constants } from "@/integrations/supabase/types";

const licenseStatusOptions = Constants.public.Enums.license_status_type;
const englishLevelOptions = Constants.public.Enums.english_level_type;

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
  const [countryFilter, setCountryFilter] = useState<string>("all");
  const [licenseFilter, setLicenseFilter] = useState<string>("all");
  const [englishFilter, setEnglishFilter] = useState<string>("all");

  const countries = useMemo(() => {
    if (!pathways) return [];
    return [...new Set(pathways.map((p) => p.country))];
  }, [pathways]);

  const filteredPathways = useMemo(() => {
    if (!pathways) return [];
    return pathways.filter((pathway) => {
      if (countryFilter !== "all" && pathway.country !== countryFilter) return false;
      // License and English filters are informational only (no data in pathway)
      return true;
    });
  }, [pathways, countryFilter]);

  const hasActiveFilters = countryFilter !== "all" || licenseFilter !== "all" || englishFilter !== "all";

  const clearFilters = () => {
    setCountryFilter("all");
    setLicenseFilter("all");
    setEnglishFilter("all");
  };

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

      {/* Filters */}
      <section className="py-6 bg-card border-b border-border">
        <div className="container">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Filter className="h-4 w-4" />
              Filters:
            </div>

            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Countries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {countryFlags[country] || "🌍"} {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={licenseFilter} onValueChange={setLicenseFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="License Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All License Status</SelectItem>
                {licenseStatusOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={englishFilter} onValueChange={setEnglishFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="English Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All English Levels</SelectItem>
                {englishLevelOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4" />
                Clear
              </Button>
            )}
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
          ) : filteredPathways.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No pathways match your filters.</p>
              <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {filteredPathways.map((pathway) => {
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

                      <div className="flex gap-3">
                        <Button variant="outline" className="flex-1" asChild>
                          <Link to={`/pathways/${pathway.slug}`}>
                            View Details
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="cta" className="flex-1" asChild>
                          <Link to="/apply">Apply</Link>
                        </Button>
                      </div>
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
