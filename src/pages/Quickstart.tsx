import { Link } from "react-router-dom";
import { BookOpen, ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useQuickstartChapters } from "@/hooks/useQuickstartChapters";
import { Loader2 } from "lucide-react";

export default function Quickstart() {
  const { data: chapters, isLoading } = useQuickstartChapters();

  return (
    <Layout>
      <section className="gradient-hero py-16 lg:py-24">
        <div className="container text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4">Quickstart Guide</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Must-know information before working abroad as a nurse. Read at your own pace.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container max-w-3xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : chapters && chapters.length > 0 ? (
            <div className="space-y-4">
              {chapters.map((ch, i) => (
                <Link
                  key={ch.id}
                  to={`/quickstart/${ch.slug}`}
                  className="flex items-start gap-4 bg-card rounded-xl p-6 shadow-card border border-border hover:border-primary/30 hover:shadow-lg transition-all group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{ch.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{ch.summary}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary mt-1 shrink-0 transition-colors" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-xl border border-border">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-bold text-foreground mb-2">Content Coming Soon</h3>
              <p className="text-muted-foreground mb-4">We're preparing the quickstart chapters. Check back soon!</p>
              <Button variant="cta" asChild>
                <Link to="/register">Register to Get Notified</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
