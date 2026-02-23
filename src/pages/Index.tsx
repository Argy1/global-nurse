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
import { useTranslation } from "@/i18n/LanguageContext";
import heroImage from "@/assets/hero-nurses.jpg";

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

function SocialCard({ icon: Icon, label, url, followText }: { icon: React.ElementType; label: string; url: string | null; followText: string }) {
  const { t } = useTranslation();
  const available = !!url;
  return (
    <Card className="flex-1 min-w-[160px]">
      <CardContent className="flex flex-col items-center gap-2 p-6 text-center">
        <Icon className="h-7 w-7 text-primary" />
        <p className="font-semibold text-foreground">{label}</p>
        {available ? (
          <a href={url!} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">{followText}</a>
        ) : (
          <span className="text-xs text-muted-foreground">{t.common.comingSoon}</span>
        )}
      </CardContent>
    </Card>
  );
}

export default function Index() {
  const { data: settings } = useSiteSettings();
  const { value: tutorialVideo } = useSetting("site_tutorial_video_url");
  const { value: whatsappLink } = useSetting("whatsapp_direct_chat_link");
  const { value: supportEmail } = useSetting("support_email");
  const { value: helpMobile } = useSetting("help_mobile");
  const { value: instagramUrl } = useSetting("instagram_url");
  const { value: linkedinUrl } = useSetting("linkedin_url");
  const { value: facebookUrl } = useSetting("facebook_url");
  const { lang, t } = useTranslation();

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
        <div className="relative container py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground mb-6 leading-tight">
                {t.home.heroTitle}{" "}
                <span className="text-mint">{t.home.heroHighlight}</span>{" "}
                {t.home.heroTitleEnd}
              </h1>
              <p className="text-lg lg:text-xl text-primary-foreground/90 max-w-xl mb-8">
                {t.home.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/register">{t.common.getStarted} <ArrowRight className="h-5 w-5" /></Link>
                </Button>
                <Button variant="heroOutline" size="xl" asChild>
                  <Link to="/programs">{t.common.learnMore}</Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:flex justify-end">
              <img src={heroImage} alt="Professional nurses ready for global healthcare careers" className="rounded-2xl shadow-2xl object-cover w-full max-h-[500px]" loading="eager" />
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

      {/* ─── 3. Trust Badges ─── */}
      <TrustBadgesStrip />

      {/* ─── 4. Quickstart Guide Teaser ─── */}
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
                className="snap-start shrink-0 w-56 bg-card border border-border rounded-xl p-5 hover:border-primary/40 hover:shadow-md transition-all group"
              >
                <span className="text-xs font-bold text-accent mb-2 block">{t.common.chapter} {String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                  {lang === "id" ? topic.title_id : topic.title_en}
                </h3>
              </Link>
            ))}
          </div>
          <Button variant="link" asChild className="sm:hidden mt-2">
            <Link to="/quickstart">{t.home.viewAllChapters} <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* ─── 5. Register CTA ─── */}
      <section className="py-16 lg:py-20 gradient-hero">
        <div className="container text-center max-w-2xl">
          <Lock className="h-8 w-8 text-primary-foreground/60 mx-auto mb-4" />
          <h2 className="text-3xl lg:text-4xl font-extrabold text-primary-foreground mb-4">{t.home.registerCtaTitle}</h2>
          <p className="text-primary-foreground/85 mb-6">{t.home.registerCtaDesc}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/register">{t.common.registerNow} <ArrowRight className="h-5 w-5" /></Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" /> {t.common.whatsappSupport}
              </a>
            </Button>
          </div>
          <p className="text-xs text-primary-foreground/50 mt-4">{t.home.registerCtaDisclaimer}</p>
        </div>
      </section>

      {/* ─── 6. News & Insights ─── */}
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

      {/* ─── 7. Success Stories ─── */}
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
                      <p className="text-xs text-accent font-semibold mb-1">{story.origin_country} → {story.destination_country}</p>
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

      {/* ─── 8. Social + Contact Strip ─── */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <h2 className="text-2xl font-extrabold text-foreground text-center mb-8">{t.home.connectTitle}</h2>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <SocialCard icon={Instagram} label="Instagram" url={instagramUrl} followText={t.common.followUs} />
            <SocialCard icon={Linkedin} label="LinkedIn" url={linkedinUrl} followText={t.common.followUs} />
            <SocialCard icon={Facebook} label="Facebook" url={facebookUrl} followText={t.common.followUs} />
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
