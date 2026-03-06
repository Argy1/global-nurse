import { Link } from "react-router-dom";
import {
  ArrowRight, MessageCircle, Play, Lock,
  Instagram, Linkedin, Mail, Phone,
  Globe, BookOpen, Users, Sparkles, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";
import { TrustBadgesStrip } from "@/components/campaign/TrustBadgesStrip";
import { TutorialModal } from "@/components/home/TutorialModal";
import { useSiteSettings, useSetting } from "@/hooks/useSiteSettings";
import { useContent } from "@/hooks/useContent";
import { useSuccessStories } from "@/hooks/useSuccessStories";
import { useTranslation } from "@/i18n/LanguageContext";
import heroBanner from "@/assets/hero-banner.png";
// v2

const quickstartTopics = [
  { title_en: "Is Working Abroad Right for You?", title_id: "Apakah Bekerja di Luar Negeri Tepat untuk Anda?", slug: "is-working-abroad-right" },
  { title_en: "Understanding Licensing", title_id: "Memahami Lisensi", slug: "understanding-licensing" },
  { title_en: "English Proficiency (IELTS / OET)", title_id: "Kemahiran Bahasa Inggris (IELTS / OET)", slug: "english-proficiency" },
  { title_en: "NCLEX Preparation", title_id: "Persiapan NCLEX", slug: "nclex-preparation" },
  { title_en: "CGFNS & VisaScreen", title_id: "CGFNS & VisaScreen", slug: "cgfns-visascreen" },
  { title_en: "Document Checklist", title_id: "Daftar Periksa Dokumen", slug: "document-checklist" },
  { title_en: "Financial Planning", title_id: "Perencanaan Keuangan", slug: "financial-planning" },
  { title_en: "Employer Red vs Green Flags", title_id: "Tanda Bahaya vs Tanda Aman Pemberi Kerja", slug: "employer-red-green-flags" },
  { title_en: "Life Abroad: What to Expect", title_id: "Kehidupan di Luar Negeri: Apa yang Diharapkan", slug: "life-abroad" },
  { title_en: "Your First 90 Days", title_id: "90 Hari Pertama Anda", slug: "first-90-days" },
];

const pathwayPills = [
  { flag: "🇮🇩", label: "Nurse ID", sub: "Starting Point" },
  { flag: "🇺🇸", label: "USA", sub: "NCLEX + CGFNS" },
  { flag: "🇨🇦", label: "Canada", sub: "NCLEX-RN" },
  { flag: "🇸🇬", label: "Singapore", sub: "SNB Reg." },
];

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

export default function Index() {
  const { value: tutorialVideo } = useSetting("site_tutorial_video_url");
  const { value: whatsappLink } = useSetting("whatsapp_direct_chat_link");
  const { value: supportEmail } = useSetting("support_email");
  const { value: helpMobile } = useSetting("help_mobile");
  const { value: instagramUrl } = useSetting("instagram_url");
  const { value: linkedinUrl } = useSetting("linkedin_url");
  const { lang, t } = useTranslation();

  const { data: newsItems } = useContent("News");
  const { data: stories } = useSuccessStories();

  const publishedNews = (newsItems ?? []).filter((n) => n.published).slice(0, 4);
  const publishedStories = (stories ?? []).filter((s) => s.is_published).slice(0, 3);

  const whatsappHref = whatsappLink ?? "mailto:hello@globalparo.com";

  return (
    <Layout>
      <TutorialModal />

      {/* ─── 1. HERO ─── */}
      <section className="relative overflow-hidden">
        <img
          src={heroBanner}
          alt="Global PARO - Global Career Gateway for Nurses"
          className="w-full object-cover"
          style={{ maxHeight: "480px", objectPosition: "center 30%" }}
          loading="eager"
        />
        {/* Overlay buttons — centered, lower-middle */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ paddingTop: "55%" }}>
          <div className="flex gap-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-base text-white shadow-lg transition-all hover:opacity-90"
              style={{ backgroundColor: "#03989E" }}
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/programs"
              className="inline-flex items-center px-7 py-3 rounded-full font-bold text-base text-white border-2 border-white transition-all hover:bg-white/20"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 2. Stats Bar ─── */}
      <section className="py-6 border-b border-border" style={{ backgroundColor: 'hsl(var(--card))' }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: "500+", label: "Nurses Registered" },
              { num: "3", label: "Destination Countries" },
              { num: "AI+Human", label: "Support Model" },
              { num: "0 Fee", label: "To Nurses, Always" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-heading font-black text-2xl" style={{ color: 'hsl(var(--accent))' }}>{stat.num}</div>
                <div className="text-sm text-muted-foreground mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. Why Choose Us - PARO ─── */}
      <section className="py-16 lg:py-20 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: 'hsl(var(--accent))' }}>Why Global PARO</p>
            <h2 className="text-3xl lg:text-4xl font-black font-heading text-foreground">Built for Nurses. <span style={{ color: 'hsl(var(--accent))' }}>By People Who Care.</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { letter: "P", title: "Personalized Platform", desc: "AI-matched learning paths and job opportunities tailored to your profile.", icon: Sparkles },
              { letter: "A", title: "Accessible & Affordable", desc: "Available anytime, anywhere. Zero fees charged directly to nurses.", icon: Globe },
              { letter: "R", title: "Reputable Team", desc: "Global healthcare experts, board advisors, and dedicated support agents.", icon: Users },
              { letter: "O", title: "One-Stop Journey", desc: "From IELTS prep to job placement — everything in one trusted platform.", icon: BookOpen },
            ].map((item) => (
              <div key={item.letter} className="bg-card rounded-2xl p-6 shadow-card border border-border group hover:border-accent/50 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full font-black text-xl font-heading text-primary-foreground shrink-0" style={{ backgroundColor: 'hsl(var(--primary))' }}>
                    {item.letter}
                  </span>
                  <item.icon className="h-5 w-5" style={{ color: 'hsl(var(--accent))' }} />
                </div>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/why-choose-us">Explore Why Global PARO <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── 4. Tutorial Video Block ─── */}
      <section className="py-12 lg:py-16">
        <div className="container max-w-3xl">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                <div className="aspect-video md:aspect-auto">
                  <VideoOrPlaceholder url={tutorialVideo} className="w-full h-full min-h-[200px]" />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <h2 className="text-xl font-bold text-foreground mb-2">{t.home.tutorialTitle}</h2>
                  <p className="text-sm text-muted-foreground mb-4">{t.home.tutorialDesc}</p>
                  {tutorialVideo ? (
                    <Button size="sm" className="self-start" asChild>
                      <a href={tutorialVideo} target="_blank" rel="noopener noreferrer"><Play className="h-4 w-4" /> {t.home.watchTutorial}</a>
                    </Button>
                  ) : (
                    <Button size="sm" className="self-start" disabled><Play className="h-4 w-4" /> {t.home.videoComingSoon}</Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ─── 5. Trust Badges ─── */}
      <TrustBadgesStrip />

      {/* ─── 6. Quickstart Guide Teaser ─── */}
      <section className="py-12 lg:py-16 bg-muted">
        <div className="container">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-foreground">{t.home.quickstartTitle}</h2>
              <p className="text-muted-foreground text-sm mt-1">{t.home.quickstartSubtitle}</p>
            </div>
            <Button variant="link" asChild className="hidden sm:inline-flex">
              <Link to="/quickstart">{t.common.viewAll} <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x">
            {quickstartTopics.map((topic, i) => (
              <Link
                key={topic.slug}
                to="/quickstart"
                className="snap-start shrink-0 w-56 bg-card border border-border rounded-xl p-5 hover:border-accent/40 hover:shadow-md transition-all group"
              >
                <span className="text-xs font-bold mb-2 block" style={{ color: 'hsl(var(--accent))' }}>{t.common.chapter} {String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                  {lang === "id" ? topic.title_id : topic.title_en}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. Register CTA ─── */}
      <section className="py-16 lg:py-20" style={{ background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)' }}>
        <div className="container text-center max-w-2xl">
          <Lock className="h-8 w-8 text-primary-foreground/60 mx-auto mb-4" />
          <h2 className="text-3xl lg:text-4xl font-black font-heading text-primary-foreground mb-4">{t.home.registerCtaTitle}</h2>
          <p className="text-primary-foreground/85 mb-6">{t.home.registerCtaDesc}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="xl"
              asChild
              className="rounded-full font-bold"
              style={{ backgroundColor: 'hsl(var(--card))', color: 'hsl(var(--primary))' }}
            >
              <Link to="/register">{t.common.registerNow} <ArrowRight className="h-5 w-5" /></Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild className="rounded-full font-bold">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" /> {t.common.whatsappSupport}
              </a>
            </Button>
          </div>
          <p className="text-xs text-primary-foreground/50 mt-4">{t.home.registerCtaDisclaimer}</p>
        </div>
      </section>

      {/* ─── 8. News & Insights ─── */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-foreground">{t.home.newsTitle}</h2>
              <p className="text-muted-foreground text-sm mt-1">{t.home.newsSubtitle}</p>
            </div>
            <Button variant="link" asChild><Link to="/news">{t.common.viewAll} <ArrowRight className="h-4 w-4" /></Link></Button>
          </div>
          {publishedNews.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {publishedNews.map((item) => (
                <Link key={item.id} to={`/news/${item.slug}`} className="group">
                  <Card className="h-full hover:shadow-md transition-shadow">
                    {item.cover_image_url && <img src={item.cover_image_url} alt={item.title} className="w-full h-40 object-cover rounded-t-lg" loading="lazy" />}
                    <CardContent className={item.cover_image_url ? "p-4" : "p-6"}>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">{item.title}</h3>
                      {item.excerpt && <p className="text-sm text-muted-foreground line-clamp-2">{item.excerpt}</p>}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card><CardContent className="py-12 text-center text-muted-foreground">{t.home.newsEmpty}</CardContent></Card>
          )}
        </div>
      </section>

      {/* ─── 9. Success Stories ─── */}
      <section className="py-12 lg:py-16 bg-muted">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-foreground">{t.home.storiesTitle}</h2>
              <p className="text-muted-foreground text-sm mt-1">{t.home.storiesSubtitle}</p>
            </div>
            <Button variant="link" asChild><Link to="/success-stories">{t.common.viewAll} <ArrowRight className="h-4 w-4" /></Link></Button>
          </div>
          {publishedStories.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {publishedStories.map((story) => (
                <Link key={story.id} to={`/success-stories/${story.slug}`} className="group">
                  <Card className="h-full hover:shadow-md transition-shadow">
                    {story.hero_image && <img src={story.hero_image} alt={story.title} className="w-full h-44 object-cover rounded-t-lg" loading="lazy" />}
                    <CardContent className={story.hero_image ? "p-4" : "p-6"}>
                      <p className="text-xs font-semibold mb-1" style={{ color: 'hsl(var(--accent))' }}>{story.origin_country} → {story.destination_country}</p>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">{story.nurse_name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{story.excerpt}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card><CardContent className="py-12 text-center text-muted-foreground">{t.home.storiesEmpty}</CardContent></Card>
          )}
        </div>
      </section>

      {/* ─── 10. Social + Contact Strip ─── */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <h2 className="text-2xl font-extrabold text-foreground text-center mb-8">{t.home.connectTitle || "Connect With Us"}</h2>
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            {[
              { icon: Instagram, label: "Instagram", url: instagramUrl },
              { icon: Linkedin, label: "LinkedIn", url: linkedinUrl },
            ].map(({ icon: Icon, label, url }) => (
              <Card key={label} className="flex-1 min-w-[140px] max-w-[200px]">
                <CardContent className="flex flex-col items-center gap-2 p-6 text-center">
                  <Icon className="h-7 w-7" style={{ color: 'hsl(var(--primary))' }} />
                  <p className="font-semibold text-foreground">{label}</p>
                  {url ? (
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline" style={{ color: 'hsl(var(--accent))' }}>Follow Us</a>
                  ) : (
                    <span className="text-xs text-muted-foreground">Coming soon</span>
                  )}
                </CardContent>
              </Card>
            ))}
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
