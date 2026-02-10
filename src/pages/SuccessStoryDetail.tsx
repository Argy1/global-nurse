import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Globe, Loader2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useSuccessStoryBySlug } from "@/hooks/useSuccessStories";

export default function SuccessStoryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: story, isLoading } = useSuccessStoryBySlug(slug || "");

  if (isLoading) {
    return <Layout><div className="flex justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div></Layout>;
  }
  if (!story) {
    return <Layout><div className="container py-32 text-center"><h1 className="text-2xl font-bold">Story not found</h1><Link to="/success-stories" className="text-primary hover:underline mt-4 inline-block">Back to Stories</Link></div></Layout>;
  }

  return (
    <Layout>
      <section className="py-8 bg-card border-b border-border">
        <div className="container">
          <Link to="/success-stories" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Back to Success Stories
          </Link>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-accent mb-4">
            <Globe className="h-4 w-4" />
            {story.origin_country} → {story.destination_country}
            {story.specialty && <span>• {story.specialty}</span>}
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-4">{story.title}</h1>
          <p className="text-muted-foreground mb-8">— {story.nurse_name}</p>
          <div className="prose prose-lg max-w-none text-foreground" dangerouslySetInnerHTML={{ __html: story.body.replace(/\n/g, "<br/>") }} />

          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-muted-foreground mb-4">Inspired? Start your own journey.</p>
            <Button variant="cta" size="lg" asChild>
              <Link to="/register">Register Now <ArrowRight className="h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
