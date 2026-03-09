import { Link } from "react-router-dom";
import { Mail, Phone, MessageCircle, ArrowRight, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useTranslation } from "@/i18n/LanguageContext";
import { useFaqItems, FaqItem } from "@/hooks/useFaqItems";
import { cn } from "@/lib/utils";

const CATEGORY_LABELS: Record<FaqItem["category"], { en: string; id: string; emoji: string }> = {
  General:      { en: "General",       id: "Umum",           emoji: "💡" },
  Registration: { en: "Registration",  id: "Pendaftaran",    emoji: "📝" },
  English:      { en: "English Tests", id: "Tes Bahasa",     emoji: "🎓" },
  Licensing:    { en: "Licensing",     id: "Lisensi",        emoji: "📋" },
  Pathways:     { en: "Programs",      id: "Program",        emoji: "✈️" },
  Privacy:      { en: "Privacy",       id: "Privasi",        emoji: "🔒" },
  Employer:     { en: "For Employers", id: "Untuk Employer", emoji: "🏥" },
};

const CATEGORY_ORDER: FaqItem["category"][] = [
  "General", "Registration", "Pathways", "English", "Licensing", "Privacy", "Employer",
];

function FaqAccordionItem({ faq }: { faq: FaqItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-card hover:bg-muted/50 transition-colors gap-3"
      >
        <span className="font-semibold text-foreground text-sm leading-snug">{faq.question}</span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 py-4 bg-card border-t border-border">
          <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function Help() {
  const { data: settings } = useSiteSettings();
  const { t, lang } = useTranslation();
  const { data: faqItems, isLoading, isError } = useFaqItems();

  const email = settings?.support_email || "hello@globalparo.com";
  const mobile = settings?.help_mobile;
  const hasMobile = mobile && mobile !== "UPDATE_ME";
  const whatsapp = settings?.whatsapp_direct_chat_link;
  const hasWhatsApp = whatsapp && whatsapp !== "UPDATE_ME" && whatsapp.startsWith("http");

  // Group FAQ items by category
  const grouped = faqItems
    ? CATEGORY_ORDER.reduce<Record<string, FaqItem[]>>((acc, cat) => {
        const items = faqItems.filter((f) => f.category === cat);
        if (items.length) acc[cat] = items;
        return acc;
      }, {})
    : {};

  const [activeCategory, setActiveCategory] = useState<FaqItem["category"] | "All">("All");

  const categories = Object.keys(grouped) as FaqItem["category"][];

  const displayedGroups =
    activeCategory === "All"
      ? grouped
      : { [activeCategory]: grouped[activeCategory] ?? [] };

  return (
    <Layout>
      <section className="gradient-hero py-16 lg:py-24">
        <div className="container text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4">{t.help.title}</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">{t.help.subtitle}</p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container max-w-4xl mx-auto">
          {/* Contact cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <div className="bg-card rounded-xl p-6 shadow-card border border-border text-center">
              <Mail className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-foreground mb-2">{t.help.email}</h3>
              <a href={`mailto:${email}`} className="text-primary hover:underline">{email}</a>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-card border border-border text-center">
              <MessageCircle className="h-10 w-10 text-accent mx-auto mb-4" />
              <h3 className="font-bold text-foreground mb-2">{t.help.whatsapp}</h3>
              {hasWhatsApp ? (
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{t.help.chatOnWhatsApp}</a>
              ) : (
                <p className="text-sm text-muted-foreground">{t.common.comingSoon}</p>
              )}
            </div>
            <div className="bg-card rounded-xl p-6 shadow-card border border-border text-center">
              <Phone className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-foreground mb-2">{t.help.phone}</h3>
              {hasMobile ? (
                <a href={`tel:${mobile}`} className="text-primary hover:underline">{mobile}</a>
              ) : (
                <p className="text-sm text-muted-foreground">{t.common.comingSoon}</p>
              )}
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-2xl font-extrabold text-foreground mb-6">{t.help.faqTitle}</h2>

            {isLoading && (
              <div className="flex items-center justify-center py-16 text-muted-foreground gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-sm">{t.help.loadingFaqs}</span>
              </div>
            )}

            {isError && (
              <p className="text-sm text-destructive text-center py-8">
                {t.help.faqError}
              </p>
            )}

            {!isLoading && !isError && faqItems && faqItems.length > 0 && (
              <>
                {/* Category filter pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  <button
                    onClick={() => setActiveCategory("All")}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
                      activeCategory === "All"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                    )}
                  >
                    {t.help.filterAll}
                  </button>
                  {categories.map((cat) => {
                    const meta = CATEGORY_LABELS[cat];
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={cn(
                          "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
                          activeCategory === cat
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                        )}
                      >
                        {meta.emoji} {lang === "id" ? meta.id : meta.en}
                      </button>
                    );
                  })}
                </div>

                {/* FAQ groups */}
                <div className="space-y-10">
                  {Object.entries(displayedGroups).map(([cat, items]) => {
                    const meta = CATEGORY_LABELS[cat as FaqItem["category"]];
                    return (
                      <div key={cat}>
                        {activeCategory === "All" && (
                          <h3 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                            <span>{meta.emoji}</span>
                            <span>{lang === "id" ? meta.id : meta.en}</span>
                          </h3>
                        )}
                        <div className="space-y-2">
                          {items.map((faq) => (
                            <FaqAccordionItem key={faq.id} faq={faq} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* Fallback: show hardcoded FAQs if DB has no items */}
            {!isLoading && !isError && (!faqItems || faqItems.length === 0) && (
              <div className="space-y-4">
                {t.help.faqs.map((faq) => (
                  <div key={faq.q} className="bg-card rounded-xl p-6 border border-border">
                    <h3 className="font-bold text-foreground mb-2">{faq.q}</h3>
                    <p className="text-muted-foreground text-sm">{faq.a}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 gradient-hero">
        <div className="container text-center">
          <h2 className="text-3xl font-extrabold text-primary-foreground mb-8">{t.help.stillHaveQuestions}</h2>
          <Button variant="hero" size="xl" asChild>
            <a href={`mailto:${email}`}>{t.common.emailUs} <ArrowRight className="h-5 w-5" /></a>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
