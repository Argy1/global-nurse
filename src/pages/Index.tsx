import { Link } from "react-router-dom";
import {
  ArrowRight, MessageCircle, BookOpen, Play, Lock, Globe,
  Instagram, Linkedin, Facebook, Mail, Phone, MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";
import { TrustBadgesStrip } from "@/components/campaign/TrustBadgesStrip";
import { TutorialModal } from "@/components/home/TutorialModal";
import { useSiteSettings, useSetting } from "@/hooks/useSiteSettings";
import { useContent } from "@/hooks/useContent";
import { useSuccessStories } from "@/hooks/useSuccessStories";
import heroImage from "@/assets/hero-nurses.jpg";

/* ── Quickstart topics (hardcoded — DB empty) ── */
const quickstartTopics = [
  { title: "Is Working Abroad Right for You?", slug: "is-working-abroad-right" },
  { title: "Understanding Licensing", slug: "understanding-licensing" },
  { title: "English Proficiency (IELTS / OET)", slug: "english-proficiency" },
  { title: "NCLEX Preparation", slug: "nclex-preparation" },
  { title: "CGFNS & VisaScreen", slug: "cgfns-visascreen" },
  { title: "Document Checklist", slug: "document-checklist" },
  { title: "Financial Planning", slug: "financial-planning" },
  { title: "Employer Red vs Green Flags", slug: "employer-red-green-flags" },
  { title: "Life Abroad: What to Expect", slug: "life-abroad" },
  { title: "Your First 90 Days", slug: "first-90-days" },
];

const pathways = [
  { from: "Nurse ID", to: "Singapore", flag: "🇸🇬" },
  { from: "Nurse ID", to: "Canada", flag: "🇨🇦" },
  { from: "Nurse ID", to: "USA", flag: "🇺🇸" },
];

/* ── Helpers ── */
function VideoOrPlaceholder({ url, className = "" }: { url: string | null; className?: string }) {
  if (!url) {
    return (
      <div className={`bg-muted rounded-xl flex flex-col items-center justify-center text-muted-foreground ${className}`}>
        <Play className="h-14 w-14 mb-2 opacity-30" />
        <p className="text-sm font-medium">Video coming soon</p>
      </div>
    );
  }
  if (url.includes("youtube") || url.includes("youtu.be") || url.includes("vimeo")) {
    let src = url;
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]?.split("?")[0];
      src = `https://www.youtube.com/embed/${id}`;
    } else if (url.includes("youtube.com/watch")) {
      const id = new URL(url).searchParams.get("v");
      src = `https://www.youtube.com/embed/${id}`;
    } else if (url.includes("vimeo.com/")) {
      const id = url.split("vimeo.com/")[1]?.split("?")[0];
      src = `https://player.vimeo.com/video/${id}`;
    }
    return <iframe src={src} className={`rounded-xl ${className}`} allow="autoplay; encrypted-media" allowFullScreen title="Video" />;
  }
  return <video src={url} controls className={`rounded-xl object-cover ${className}`} />;
}

function SocialCard({ icon: Icon, label, url }: { icon: React.ElementType; label: string; url: string | null }) {
  const available = !!url;
  return (
    <Card className="flex-1 min-w-[160px]">
      <CardContent className="flex flex-col items-center gap-2 p-6 text-center">
        <Icon className="h-7 w-7 text-primary" />
        <p className="font-semibold text-foreground">{label}</p>
        {available ? (
          <a href={url!} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">Follow us</a>
        ) : (
          <span className="text-xs text-muted-foreground">Coming soon</span>
        )}
      </CardContent>
    </Card>
  );
}

/* ══════════════════════════════════════════════ */
export default function Index() {
  const { data: settings } = useSiteSettings();
  const { value: aiVideo } = useSetting("ai_intro_video_url");
  const { value: tutorialVideo } = useSetting("site_tutorial_video_url");
  const { value: whatsappLink } = useSetting("whatsapp_direct_chat_link");
  const { value: supportEmail } = useSetting("support_email");
  const { value: helpMobile } = useSetting("help_mobile");
  const { value: instagramUrl } = useSetting("instagram_url");
  const { value: linkedinUrl } = useSetting("linkedin_url");
  const { value: facebookUrl } = useSetting("facebook_url");

  const { data: newsItems } = useContent("News");
  const { data: stories } = useSuccessStories();

  const publishedNews = (newsItems ?? []).filter((n) => n.published).slice(0, 4);
  const publishedStories = (stories ?? []).filter((s) => s.is_published).slice(0, 3);

  const whatsappHref = whatsappLink ?? "mailto:globalparo@gmail.com";

  return (
    <Layout>
      <TutorialModal />

      {/* ─── 1. Hero ─── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative container py-16 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              {/* Pathway pills */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
                {pathways.map((p) => (
                  <span key={p.to} className="text-xs font-semibold bg-accent/20 text-accent-foreground px-3 py-1 rounded-full backdrop-blur-sm">
                    {p.flag} {p.from} → {p.to}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground mb-6 leading-tight">
                The Journey to Becoming a{" "}
                <span className="text-mint">Global Nurse</span>
              </h1>

              <p className="text-base lg:text-lg text-primary-foreground/90 max-w-xl mb-4">
                The world needs nurses. Aging populations, workforce shortages, and rising healthcare demands are creating
                unprecedented opportunities in Singapore, Canada, the USA, and beyond.
              </p>
              <p className="text-sm text-primary-foreground/75 max-w-xl mb-8">
                Getting there requires structured preparation — from CGFNS / TrueMerit credentials, to IELTS 6.5+ (7 speaking),
                NCLEX readiness, and navigating complex licensing pathways. We provide step-by-step, ethical guidance so you can focus on what matters: your career.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/register">Register Now <ArrowRight className="h-5 w-5" /></Link>
                </Button>
                <Button variant="heroOutline" size="xl" asChild>
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5" /> WhatsApp Support
                  </a>
                </Button>
                <Button variant="ghost" size="lg" className="text-primary-foreground/80 hover:text-primary-foreground" asChild>
                  <Link to="/quickstart"><BookOpen className="h-5 w-5" /> Quickstart Guide</Link>
                </Button>
              </div>

              <p className="text-xs text-primary-foreground/50 mt-4">No fees. No spam. Consent-based contact only.</p>
            </div>

            {/* Hero right — video or image */}
            <div className="hidden lg:block">
              {aiVideo ? (
                <VideoOrPlaceholder url={aiVideo} className="w-full aspect-video" />
              ) : (
                <div className="relative">
                  <img
                    src={heroImage}
                    alt="Nurses collaborating in a professional healthcare setting"
                    className="rounded-2xl shadow-lg object-cover w-full max-h-[480px]"
                    loading="eager"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 text-center">
                      <Play className="h-10 w-10 text-primary mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground font-medium">AI Journey Video Coming Soon</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. Tutorial Video Block ─── */}
      <section className="py-12 lg:py-16">
        <div className="container max-w-3xl">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                <div className="aspect-video md:aspect-auto">
                  <VideoOrPlaceholder url={tutorialVideo} className="w-full h-full min-h-[200px]" />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <h2 className="text-xl font-bold text-foreground mb-2">How to Use This Website in 60 Seconds</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get a quick overview of everything available to you — from guides and registration to community support.
                  </p>
                  {tutorialVideo ? (
                    <Button size="sm" className="self-start" asChild>
                      <a href={tutorialVideo} target="_blank" rel="noopener noreferrer"><Play className="h-4 w-4" /> Watch Tutorial</a>
                    </Button>
                  ) : (
                    <Button size="sm" className="self-start" disabled><Play className="h-4 w-4" /> Video Coming Soon</Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ─── 3. Trust Badges ─── */}
      <TrustBadgesStrip />

      {/* ─── 4. Quickstart Guide Teaser ─── */}
      <section className="py-12 lg:py-16 bg-muted">
        <div className="container">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-foreground">Your Quickstart Guide</h2>
              <p className="text-muted-foreground text-sm mt-1">10 essential topics every aspiring global nurse should explore.</p>
            </div>
            <Button variant="link" asChild className="hidden sm:inline-flex">
              <Link to="/quickstart">View all <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x">
            {quickstartTopics.map((t, i) => (
              <Link
                key={t.slug}
                to="/quickstart"
                className="snap-start shrink-0 w-56 bg-card border border-border rounded-xl p-5 hover:border-primary/40 hover:shadow-md transition-all group"
              >
                <span className="text-xs font-bold text-accent mb-2 block">Chapter {String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">{t.title}</h3>
              </Link>
            ))}
          </div>
          <Button variant="link" asChild className="sm:hidden mt-2">
            <Link to="/quickstart">View all chapters <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* ─── 5. Register CTA ─── */}
      <section className="py-16 lg:py-20 gradient-hero">
        <div className="container text-center max-w-2xl">
          <Lock className="h-8 w-8 text-primary-foreground/60 mx-auto mb-4" />
          <h2 className="text-3xl lg:text-4xl font-extrabold text-primary-foreground mb-4">
            Start Your Journey Today
          </h2>
          <p className="text-primary-foreground/85 mb-6">
            Your information is safe with us. We never share data without your consent,
            charge fees, or make promises we can't keep. Just real, transparent support.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/register">Register Now <ArrowRight className="h-5 w-5" /></Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" /> WhatsApp Support
              </a>
            </Button>
          </div>
          <p className="text-xs text-primary-foreground/50 mt-4">Consent-based communication only. Zero fees charged to nurses.</p>
        </div>
      </section>

      {/* ─── 6. News & Insights ─── */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-foreground">News & Insights</h2>
              <p className="text-muted-foreground text-sm mt-1">Stay informed about global nursing careers.</p>
            </div>
            <Button variant="link" asChild><Link to="/news">View All <ArrowRight className="h-4 w-4" /></Link></Button>
          </div>
          {publishedNews.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {publishedNews.map((item) => (
                <Link key={item.id} to={`/news/${item.slug}`} className="group">
                  <Card className="h-full hover:shadow-md transition-shadow">
                    {item.cover_image_url && (
                      <img src={item.cover_image_url} alt={item.title} className="w-full h-40 object-cover rounded-t-lg" loading="lazy" />
                    )}
                    <CardContent className={item.cover_image_url ? "p-4" : "p-6"}>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">{item.title}</h3>
                      {item.excerpt && <p className="text-sm text-muted-foreground line-clamp-2">{item.excerpt}</p>}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card><CardContent className="py-12 text-center text-muted-foreground">Articles coming soon — stay tuned.</CardContent></Card>
          )}
        </div>
      </section>

      {/* ─── 7. Success Stories ─── */}
      <section className="py-12 lg:py-16 bg-muted">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-foreground">Success Stories</h2>
              <p className="text-muted-foreground text-sm mt-1">Real journeys from nurses who made the leap.</p>
            </div>
            <Button variant="link" asChild><Link to="/success-stories">View All <ArrowRight className="h-4 w-4" /></Link></Button>
          </div>
          {publishedStories.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {publishedStories.map((story) => (
                <Link key={story.id} to={`/success-stories/${story.slug}`} className="group">
                  <Card className="h-full hover:shadow-md transition-shadow">
                    {story.hero_image && (
                      <img src={story.hero_image} alt={story.title} className="w-full h-44 object-cover rounded-t-lg" loading="lazy" />
                    )}
                    <CardContent className={story.hero_image ? "p-4" : "p-6"}>
                      <p className="text-xs text-accent font-semibold mb-1">{story.origin_country} → {story.destination_country}</p>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">{story.nurse_name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{story.excerpt}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card><CardContent className="py-12 text-center text-muted-foreground">Stories coming soon — yours could be next.</CardContent></Card>
          )}
        </div>
      </section>

      {/* ─── 8. Social + Contact Strip ─── */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <h2 className="text-2xl font-extrabold text-foreground text-center mb-8">Connect With Us</h2>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <SocialCard icon={Instagram} label="Instagram" url={instagramUrl} />
            <SocialCard icon={Linkedin} label="LinkedIn" url={linkedinUrl} />
            <SocialCard icon={Facebook} label="Facebook" url={facebookUrl} />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            {supportEmail && (
              <a href={`mailto:${supportEmail}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="h-4 w-4" /> {supportEmail}
              </a>
            )}
            {helpMobile && (
              <a href={`tel:${helpMobile}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="h-4 w-4" /> {helpMobile}
              </a>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
