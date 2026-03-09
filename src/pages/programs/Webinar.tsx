import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import webinarIcon from "@/assets/webinar-icon.png";
import gratisBadge from "@/assets/gratis-badge.png";
import shareIcon from "@/assets/share-icon.png";
import { useTranslation } from "@/i18n/LanguageContext";

export default function Webinar() {
  const { t } = useTranslation();

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
          <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-2">{t.programs.webinarPageLabel}</p>
          <h1 className="text-3xl lg:text-4xl font-black text-white mb-3">{t.programs.webinarPageTitle}</h1>
          <p className="text-white/80 max-w-lg mx-auto text-sm">
            {t.programs.webinarPageDesc}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-muted">
        <div className="container max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left: Webinar graphic */}
            <div className="flex flex-col items-center gap-4">
              {/* GRATIS burst + webinar icon */}
              <div className="relative">
                {/* Burst badge */}
                <img
                  src={gratisBadge}
                  alt="GRATIS"
                  className="absolute -top-8 -left-8 z-10 w-24 h-24 object-contain drop-shadow-lg"
                />
                <div className="bg-card rounded-2xl p-8 shadow-xl border border-border">
                  <img src={webinarIcon} alt="Webinar" className="h-40 w-auto mx-auto object-contain" />
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
                <h2 className="text-2xl font-black text-foreground">{t.programs.webinarCardTitle}</h2>
                <p className="font-semibold text-foreground">{t.programs.webinarCardSubtitle}</p>
              </div>
              {/* Contact block */}
              <div className="px-8 py-5 text-white font-semibold text-sm" style={{ background: "#03989E" }}>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {t.programs.webinarContactLabel}{" "}
                  <a href="mailto:hello@globalparo.com" className="underline font-bold">
                    hello@globalparo.com
                  </a>
                </div>
              </div>
              {/* Details */}
              <div className="px-8 py-6 space-y-3">
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground w-28 shrink-0">{t.programs.webinarTopicLabel}</span>
                  <span>{t.programs.webinarTopicValue}</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground w-28 shrink-0">{t.programs.webinarCostLabel}</span>
                  <span className="font-bold" style={{ color: "#03989E" }}>{t.programs.webinarCostValue}</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground w-28 shrink-0">{t.programs.webinarScheduleLabel}</span>
                  <span>{t.programs.webinarScheduleValue}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom sticky-style CTA bar */}
      <section className="py-5" style={{ background: "#015779" }}>
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative overflow-hidden">
            <p className="text-white font-bold text-lg">{t.programs.webinarSecureSeat}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/register"
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
              title="Share to WhatsApp / social media"
              className="h-12 w-12 flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <img src={shareIcon} alt="Share" className="h-10 w-10 object-contain" />
            </button>
          </div>
        </div>
      </section>

      {/* What you'll learn */}
      <section className="py-16 bg-muted">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-2xl font-extrabold text-foreground text-center mb-8">{t.programs.webinarLearnTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {t.programs.webinarLearnItems.map((item) => (
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
    </Layout>
  );
}
