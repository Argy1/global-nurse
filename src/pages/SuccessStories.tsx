import { Link } from "react-router-dom";
import { ArrowRight, Loader2, Users } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useSuccessStories } from "@/hooks/useSuccessStories";

export default function SuccessStories() {
  const { data: stories, isLoading } = useSuccessStories();

  return (
    <Layout>
      <section className="gradient-hero py-16 lg:py-24">
        <div className="container text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4">Success Stories</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">Real journeys from nurses who pursued international careers.</p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container">
          {isLoading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : stories && stories.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story) => (
                <Link key={story.id} to={`/success-stories/${story.slug}`} className="bg-card rounded-xl p-6 shadow-card border border-border hover:border-primary/30 hover:shadow-lg transition-all group">
                  <span className="text-xs font-medium text-accent">{story.origin_country} → {story.destination_country}</span>
                  <h3 className="font-bold text-foreground mt-2 mb-2 group-hover:text-primary transition-colors">{story.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">{story.excerpt}</p>
                  <p className="text-xs text-muted-foreground mt-4">— {story.nurse_name}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-xl border border-border">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-bold text-foreground mb-2">Stories Coming Soon</h3>
              <p className="text-muted-foreground mb-4">We're collecting stories from nurses. Check back soon!</p>
              <Button variant="cta" asChild><Link to="/register">Register Now</Link></Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
