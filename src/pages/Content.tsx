import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Video, FileText, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const featuredContent = [
  {
    slug: "complete-guide-uk-nursing",
    title: "Complete Guide to UK Nursing Registration",
    description: "Everything you need to know about NMC registration, OSCE preparation, and starting your NHS career.",
    type: "Guide",
    readTime: "15 min read",
    category: "UK Pathway",
  },
  {
    slug: "nclex-study-tips",
    title: "Top 10 NCLEX Study Tips from Successful Nurses",
    description: "Proven strategies and resources that helped international nurses pass the NCLEX on their first attempt.",
    type: "Article",
    readTime: "8 min read",
    category: "USA Pathway",
  },
  {
    slug: "avoiding-recruitment-scams",
    title: "How to Avoid Nursing Recruitment Scams",
    description: "Red flags to watch for and how to verify legitimate recruitment agencies.",
    type: "Guide",
    readTime: "10 min read",
    category: "Safety",
  },
];

const allContent = [
  {
    slug: "osce-preparation-guide",
    title: "OSCE Preparation: A Step-by-Step Guide",
    description: "Detailed breakdown of each OSCE station with tips from nurses who passed.",
    type: "Guide",
    readTime: "20 min read",
    category: "UK Pathway",
  },
  {
    slug: "canada-provincial-differences",
    title: "Understanding Provincial Differences in Canadian Nursing",
    description: "How nursing requirements and opportunities vary by province.",
    type: "Article",
    readTime: "12 min read",
    category: "Canada Pathway",
  },
  {
    slug: "ielts-vs-oet",
    title: "IELTS vs OET: Which English Test Should You Take?",
    description: "Comparing the two main English proficiency tests for nursing registration.",
    type: "Comparison",
    readTime: "7 min read",
    category: "Preparation",
  },
  {
    slug: "relocation-checklist",
    title: "International Relocation Checklist for Nurses",
    description: "Everything to prepare before, during, and after your move abroad.",
    type: "Checklist",
    readTime: "10 min read",
    category: "Relocation",
  },
  {
    slug: "family-visa-options",
    title: "Bringing Your Family: Visa Options Explained",
    description: "Dependent visa options for nurses moving to the UK, USA, Canada, and Australia.",
    type: "Guide",
    readTime: "15 min read",
    category: "Immigration",
  },
  {
    slug: "salary-negotiation",
    title: "Salary Negotiation Tips for International Nurses",
    description: "How to negotiate your compensation package confidently.",
    type: "Article",
    readTime: "8 min read",
    category: "Career",
  },
];

const categories = ["All", "UK Pathway", "USA Pathway", "Canada Pathway", "Safety", "Preparation", "Career"];

export default function Content() {
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
          <div className="grid md:grid-cols-3 gap-6">
            {featuredContent.map((item) => (
              <Link
                key={item.slug}
                to={`/content/${item.slug}`}
                className="group bg-card rounded-xl overflow-hidden shadow-card border border-border hover:shadow-lg transition-all"
              >
                <div className="aspect-video bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-primary-foreground opacity-50" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-mint text-mint-foreground text-xs font-medium rounded">
                      {item.category}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Content */}
      <section className="py-12 lg:py-16 bg-muted">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold text-foreground">All Resources</h2>
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 5).map((category) => (
                <button
                  key={category}
                  className="px-3 py-1 text-sm rounded-full border border-border bg-card hover:bg-secondary transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allContent.map((item) => (
              <Link
                key={item.slug}
                to={`/content/${item.slug}`}
                className="group bg-card rounded-xl p-6 shadow-card border border-border hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded">
                    {item.type}
                  </span>
                  <span className="text-xs text-muted-foreground">{item.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                <span className="text-primary font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read More <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
