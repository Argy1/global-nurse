import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, Clock, Loader2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useContentBySlug, useContent } from "@/hooks/useContent";

export default function NewsDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading } = useContentBySlug(slug || "");
  const { data: allArticles } = useContent();

  const related = allArticles?.filter((a) => a.category === article?.category && a.slug !== slug).slice(0, 3);

  if (isLoading) {
    return <Layout><div className="flex justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div></Layout>;
  }

  if (!article) {
    return <Layout><div className="container py-32 text-center"><h1 className="text-2xl font-bold">Article not found</h1><Link to="/news" className="text-primary hover:underline mt-4 inline-block">Back to News</Link></div></Layout>;
  }

  return (
    <Layout>
      <section className="py-8 bg-card border-b border-border">
        <div className="container">
          <Link to="/news" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Back to News
          </Link>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <span className="text-sm font-medium text-accent">{article.category}</span>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-foreground mt-2 mb-4">{article.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{new Date(article.publish_date).toLocaleDateString()}</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{article.read_time_minutes} min read</span>
              </div>
              <div className="prose prose-lg max-w-none text-foreground" dangerouslySetInnerHTML={{ __html: article.body.replace(/\n/g, "<br/>") }} />
            </div>

            <aside className="space-y-8">
              <div className="bg-card rounded-xl p-6 shadow-card border border-border sticky top-24">
                <h3 className="font-bold text-lg mb-2">Ready to Start?</h3>
                <p className="text-sm text-muted-foreground mb-4">Take the first step toward your international nursing career.</p>
                <div className="space-y-3">
                  <Button variant="cta" className="w-full" asChild><Link to="/register">Register Now <ArrowRight className="h-4 w-4" /></Link></Button>
                  <Button variant="outline" className="w-full" asChild><Link to="/quickstart">Quickstart Guide</Link></Button>
                </div>
              </div>

              {related && related.length > 0 && (
                <div>
                  <h3 className="font-bold text-foreground mb-4">Related Articles</h3>
                  <div className="space-y-3">
                    {related.map((r) => (
                      <Link key={r.id} to={`/news/${r.slug}`} className="block bg-card rounded-lg p-4 border border-border hover:border-primary/30 transition-colors">
                        <h4 className="font-medium text-foreground text-sm">{r.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{r.read_time_minutes} min read</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
}
