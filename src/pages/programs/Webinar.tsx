import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Mail, Loader2 } from "lucide-react";
import webinarIcon from "@/assets/webinar-icon.png";
import gratisBadge from "@/assets/gratis-badge.png";
import shareIcon from "@/assets/share-icon.png";
import { useTranslation } from "@/i18n/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Webinar {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  topic: string | null;
  cost: string;
  schedule: string | null;
  contact_email: string | null;
  register_link: string | null;
  is_featured: boolean;
  learn_items: string[];
  cover_image_url: string | null;
  event_date: string | null;
}

export default function Webinar() {
  const { t } = useTranslation();

  // Fetch published webinars from DB — featured first
  const { data: webinars, isLoading } = useQuery({
    queryKey: ["webinars"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("webinars" as any)
        .select("*")
        .eq("is_published", true)
        .order("is_featured", { ascending: false })
        .order("order_index", { ascending: true });
      if (error) throw error;
      return data as unknown as Webinar[];
    },
  });

  // Use first (featured) webinar for the main hero card; fall back to defaults
  const featured = webinars?.[0];

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: t.programs.webinarShareTitle,
        text: t.programs.webinarShareText,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert(t.programs.webinarLinkCopied);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-14 lg:py-20" style={{ background: "linear-gradient(135deg, #015779 0%, #03989E 100%)" }}>
        <div className="container text-center">
          <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-2">
            {t.programs.webinarPageLabel}
          </p>
          <h1 className="text-3xl lg:text-4xl font-black text-white mb-3">
            {t.programs.webinarPageTitle}
          </h1>
          <p className="text-white/80 max-w-lg mx-auto text-sm">
            {featured?.description || t.programs.webinarPageDesc}
          </p>
        </div>
      </section>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : featured ? (
        <>
          {/* Main Content */}
          <section className="py-16 bg-muted">
            <div className="container max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Left: Webinar graphic */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    {/* Burst badge */}
                    {featured.cost?.toUpperCase() === "FREE" || featured.cost?.toUpperCase() === "GRATIS" ? (
                      <img
                        src={gratisBadge}
                        alt="GRATIS"
                        className="absolute -top-8 -left-8 z-10 w-24 h-24 object-contain drop-shadow-lg"
                      />
                    ) : null}
                    <div className="bg-card rounded-2xl p-8 shadow-xl border border-border">
                      {featured.cover_image_url ? (
                        <img src={featured.cover_image_url} alt={featured.title} className="h-40 w-auto mx-auto object-contain" />
                      ) : (
                        <img src={webinarIcon} alt="Webinar" className="h-40 w-auto mx-auto object-contain" />
                      )}
                    </div>
                  </div>
                  <p className="text-center text-sm text-muted-foreground max-w-xs">
                    {t.programs.webinarGraphicDesc}
                  </p>
                </div>

                {/* Right: Info card */}
                <div className="bg-card rounded-2xl border-2 overflow-hidden shadow-xl" style={{ borderColor: "#03989E" }}>
                  {/* Title block */}
                  <div className="px-8 py-6 border-b border-border">
                    <h2 className="text-2xl font-black text-foreground">{featured.title}</h2>
                    {featured.subtitle && (
                      <p className="font-semibold text-foreground">{featured.subtitle}</p>
                    )}
                  </div>
                  {/* Contact block */}
                  <div className="px-8 py-5 text-white font-semibold text-sm" style={{ background: "#03989E" }}>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {t.programs.webinarContactLabel}{" "}
                      <a href={`mailto:${featured.contact_email || "hello@globalparo.com"}`} className="underline font-bold">
                        {featured.contact_email || "hello@globalparo.com"}
                      </a>
                    </div>
                  </div>
                  {/* Details */}
                  <div className="px-8 py-6 space-y-3">
                    {featured.topic && (
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground w-28 shrink-0">{t.programs.webinarTopicLabel}</span>
                        <span>{featured.topic}</span>
                      </div>
                    )}
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground w-28 shrink-0">{t.programs.webinarCostLabel}</span>
                      <span className="font-bold" style={{ color: "#03989E" }}>{featured.cost}</span>
                    </div>
                    {featured.schedule && (
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground w-28 shrink-0">{t.programs.webinarScheduleLabel}</span>
                        <span>{featured.schedule}</span>
                      </div>
                    )}
                    {featured.event_date && (
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground w-28 shrink-0">Date</span>
                        <span>{new Date(featured.event_date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom CTA bar */}
          <section className="py-5" style={{ background: "#015779" }}>
            <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-white font-bold text-lg">{t.programs.webinarSecureSeat}</p>
              <div className="flex items-center gap-3">
                <Link
                  to={featured.register_link || "/register"}
                  className="inline-flex items-center justify-center px-8 h-12 rounded-xl font-bold text-white text-base transition-opacity hover:opacity-90"
                  style={{
                    background: "linear-gradient(180deg, #03d4db 0%, #03989E 40%, #027f84 100%)",
                    boxShadow: "0 4px 14px rgba(3,152,158,0.5), inset 0 1px 0 rgba(255,255,255,0.3)",
                    border: "1.5px solid #03b8be",
                  }}
                >
                  {t.programs.webinarRegisterNow}
                </Link>
                <button
                  onClick={handleShare}
                  title="Share"
                  className="h-12 w-12 flex items-center justify-center hover:opacity-80 transition-opacity"
                >
                  <img src={shareIcon} alt="Share" className="h-10 w-10 object-contain" />
                </button>
              </div>
            </div>
          </section>

          {/* What you'll learn */}
          {featured.learn_items?.length > 0 && (
            <section className="py-16 bg-muted">
              <div className="container max-w-3xl mx-auto">
                <h2 className="text-2xl font-extrabold text-foreground text-center mb-8">
                  {t.programs.webinarLearnTitle}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {featured.learn_items.map((item) => (
                    <div key={item} className="flex items-start gap-3 bg-card rounded-xl p-4 border border-border shadow-sm">
                      <div className="h-6 w-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "#03989E" }}>
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                      <p className="text-sm text-foreground font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Additional webinars (if more than one) */}
          {webinars && webinars.length > 1 && (
            <section className="py-16 bg-background">
              <div className="container max-w-4xl mx-auto">
                <h2 className="text-xl font-extrabold text-foreground mb-6">More Webinars</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {webinars.slice(1).map((w) => (
                    <div key={w.id} className="bg-card rounded-xl border border-border p-5 space-y-2 shadow-sm">
                      <h3 className="font-bold text-foreground">{w.title}</h3>
                      {w.subtitle && <p className="text-xs text-muted-foreground">{w.subtitle}</p>}
                      {w.topic && <p className="text-sm text-foreground/80">{w.topic}</p>}
                      <p className="text-sm font-bold" style={{ color: "#03989E" }}>{w.cost}</p>
                      {w.schedule && <p className="text-xs text-muted-foreground">{w.schedule}</p>}
                      <Link
                        to={w.register_link || "/register"}
                        className="inline-flex items-center justify-center w-full mt-2 h-9 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
                        style={{ background: "linear-gradient(180deg, #03d4db 0%, #027f84 100%)" }}
                      >
                        {t.programs.webinarRegisterNow}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      ) : (
        /* No webinars published yet */
        <section className="py-24 bg-muted text-center">
          <p className="text-muted-foreground">No webinars scheduled yet — check back soon!</p>
        </section>
      )}
    </Layout>
  );
}
