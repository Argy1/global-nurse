import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { useContent, type Content } from "@/hooks/useContent";

const categoryColors: Record<string, string> = {
  "Career Abroad": "bg-primary text-primary-foreground",
  "Licensing": "bg-accent text-accent-foreground",
  "English": "bg-mint text-mint-foreground",
  "Interview": "bg-cta text-cta-foreground",
  "Mental Health": "bg-secondary text-secondary-foreground",
  "Professional Growth": "bg-primary text-primary-foreground",
};

export default function ContentPage() {
  const { data: content, isLoading, error } = useContent();

  const featuredContent = content?.slice(0, 3) || [];
  const allContent = content?.slice(3) || [];

  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-hero py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4">
              Resources & Guides
            </h1>
            <p className="text-lg text-primary-foreground/90">
              Free resources to help you navigate your international nursing journey with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <h2 className="text-2xl font-bold text-foreground mb-8">Featured Resources</h2>
          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-card rounded-xl overflow-hidden shadow-card border border-border animate-pulse">
                  <div className="aspect-video bg-muted"></div>
                  <div className="p-6">
                    <div className="h-4 w-20 bg-muted rounded mb-3"></div>
                    <div className="h-6 w-full bg-muted rounded mb-2"></div>
                    <div className="h-4 w-3/4 bg-muted rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Failed to load content. Please try again later.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {featuredContent.map((item) => (
                <Link
                  key={item.id}
                  to={`/content/${item.slug}`}
                  className="group bg-card rounded-xl overflow-hidden shadow-card border border-border hover:shadow-lg transition-all"
                >
                  <div className="aspect-video bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-primary-foreground opacity-50" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${categoryColors[item.category] || "bg-mint text-mint-foreground"}`}>
                        {item.category}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {item.read_time_minutes} min read
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* All Content */}
      {allContent.length > 0 && (
        <section className="py-12 lg:py-16 bg-muted">
          <div className="container">
            <h2 className="text-2xl font-bold text-foreground mb-8">All Resources</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allContent.map((item) => (
                <Link
                  key={item.id}
                  to={`/content/${item.slug}`}
                  className="group bg-card rounded-xl p-6 shadow-card border border-border hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${categoryColors[item.category] || "bg-secondary text-secondary-foreground"}`}>
                      {item.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{item.read_time_minutes} min</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.excerpt}</p>
                  <span className="text-primary font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="bg-card rounded-xl p-8 lg:p-12 shadow-card border border-border text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Stay Updated
            </h2>
            <p className="text-muted-foreground mb-6">
              Get the latest guides, pathway updates, and career tips delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button variant="cta">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
