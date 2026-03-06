import { Link } from "react-router-dom";
import { Mail, Phone, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useTranslation } from "@/i18n/LanguageContext";

export default function Help() {
  const { data: settings } = useSiteSettings();
  const { t } = useTranslation();
  const email = settings?.support_email || "hello@globalparo.com";
  const mobile = settings?.help_mobile;
  const hasMobile = mobile && mobile !== "UPDATE_ME";
  const whatsapp = settings?.whatsapp_direct_chat_link;
  const hasWhatsApp = whatsapp && whatsapp !== "UPDATE_ME" && whatsapp.startsWith("http");

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

          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-extrabold text-foreground mb-6">{t.help.faqTitle}</h2>
            <div className="space-y-4">
              {t.help.faqs.map((faq) => (
                <div key={faq.q} className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="font-bold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
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
