import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, Loader2, MessageCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useContentBySlug, useContent } from "@/hooks/useContent";
import { useSetting } from "@/hooks/useSiteSettings";

export default function NewsDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading } = useContentBySlug(slug || "");
  const { data: allArticles } = useContent("News");
  const { value: whatsappLink } = useSetting("whatsapp_link");

  const related = allArticles?.filter((a) => a.slug !== slug).slice(0, 3);

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
              {article.tags?.length > 0 && <span className="text-sm font-medium text-accent">{article.tags.join(", ")}</span>}
              <h1 className="text-3xl lg:text-4xl font-extrabold text-foreground mt-2 mb-4">{article.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
                {article.publish_date && <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{new Date(article.publish_date).toLocaleDateString()}</span>}
                {article.country_focus && <span className="text-accent font-medium">{article.country_focus}</span>}
              </div>
              {article.cover_image_url && (
                <img src={article.cover_image_url} alt={article.title} className="w-full rounded-xl mb-8 max-h-[400px] object-cover" />
              )}
              <div className="prose prose-lg max-w-none text-foreground" dangerouslySetInnerHTML={{ __html: article.body.replace(/\n/g, "<br/>") }} />
            </div>

            {/* Sidebar CTAs */}
            <aside className="space-y-6">
              <div className="bg-card rounded-xl p-6 shadow-card border border-border sticky top-24 space-y-4">
                <h3 className="font-bold text-lg text-foreground">Ready to Start?</h3>
                <p className="text-sm text-muted-foreground">Take the first step toward your international nursing career.</p>
                <Button variant="cta" className="w-full" asChild>
                  <Link to="/register">Register Now <ArrowRight className="h-4 w-4" /></Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/quickstart">Quickstart Guide</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/help">Chat With Us <MessageCircle className="h-4 w-4" /></Link>
                </Button>
                {whatsappLink && (
                  <Button variant="outline" className="w-full" asChild>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">WhatsApp Support</a>
                  </Button>
                )}
              </div>

              {related && related.length > 0 && (
                <div>
                  <h3 className="font-bold text-foreground mb-4">Related Articles</h3>
                  <div className="space-y-3">
                    {related.map((r) => (
                      <Link key={r.id} to={`/news/${r.slug}`} className="block bg-card rounded-lg p-4 border border-border hover:border-primary/30 transition-colors">
                        <h4 className="font-medium text-foreground text-sm">{r.title}</h4>
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
