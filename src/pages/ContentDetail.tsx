import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { useContentBySlug } from "@/hooks/useContent";

export default function ContentDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading, error } = useContentBySlug(slug || "");

  if (isLoading) {
    return (
      <Layout>
        <section className="gradient-hero py-12 lg:py-16">
          <div className="container">
            <div className="max-w-3xl animate-pulse">
              <div className="h-6 w-32 bg-primary-foreground/20 rounded mb-6"></div>
              <div className="h-10 w-full bg-primary-foreground/20 rounded mb-4"></div>
              <div className="h-6 w-3/4 bg-primary-foreground/20 rounded"></div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (error || !article) {
    return (
      <Layout>
        <section className="py-24 text-center">
          <div className="container">
            <h1 className="text-3xl font-bold mb-4">Content Not Found</h1>
            <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/content">
                <ArrowLeft className="h-4 w-4" />
                Back to Content Hub
              </Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  // Parse body content - simple markdown-like rendering
  const renderBody = (body: string) => {
    const lines = body.split("\n");
    const elements: JSX.Element[] = [];
    
    lines.forEach((line, index) => {
      if (line.startsWith("# ")) {
        elements.push(
          <h1 key={index} className="text-2xl font-bold text-foreground mt-8 mb-4">
            {line.replace("# ", "")}
          </h1>
        );
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2 key={index} className="text-xl font-bold text-foreground mt-8 mb-4">
            {line.replace("## ", "")}
          </h2>
        );
      } else if (line.startsWith("- ")) {
        elements.push(
          <li key={index} className="text-foreground ml-6 list-disc">
            {line.replace("- ", "")}
          </li>
        );
      } else if (line.startsWith("*") && line.endsWith("*")) {
        elements.push(
          <p key={index} className="text-muted-foreground italic mb-4">
            {line.replace(/\*/g, "")}
          </p>
        );
      } else if (line.trim()) {
        elements.push(
          <p key={index} className="text-foreground leading-relaxed mb-4">
            {line}
          </p>
        );
      }
    });
    
    return elements;
  };

  return (
    <Layout>
      {/* Header */}
      <section className="gradient-hero py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl">
            <Link 
              to="/content" 
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              All Resources
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-primary-foreground/20 text-primary-foreground text-sm font-medium rounded-full">
                {article.category}
              </span>
              <span className="text-primary-foreground/80 text-sm flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {article.read_time_minutes} min read
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4">
              {article.title}
            </h1>
            <p className="text-lg text-primary-foreground/90">{article.excerpt}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
            <article className="lg:col-span-3 prose prose-lg max-w-none">
              {renderBody(article.body)}
            </article>
            
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-card rounded-xl p-6 shadow-card border border-border sticky top-24">
                <h3 className="font-bold text-foreground mb-4">Ready to Start?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Take the first step toward your international nursing career.
                </p>
                <Button variant="cta" className="w-full mb-3" asChild>
                  <Link to="/apply">Apply Now</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/community">Join Community</Link>
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* More Content */}
      <section className="py-12 lg:py-16 bg-muted">
        <div className="container text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Continue Learning</h2>
          <p className="text-muted-foreground mb-6">Explore more resources to support your journey.</p>
          <Button variant="outline" asChild>
            <Link to="/content">
              <BookOpen className="h-4 w-4" />
              View All Resources
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
