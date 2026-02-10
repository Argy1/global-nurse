import { Link } from "react-router-dom";
import { Mail, Phone, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function Help() {
  const { data: settings } = useSiteSettings();
  const email = settings?.support_email || "globalparo@gmail.com";
  const mobile = settings?.help_mobile;
  const hasMobile = mobile && mobile !== "UPDATE_ME";
  const whatsapp = settings?.whatsapp_direct_chat_link;
  const hasWhatsApp = whatsapp && whatsapp !== "UPDATE_ME" && whatsapp.startsWith("http");

  return (
    <Layout>
      <section className="gradient-hero py-16 lg:py-24">
        <div className="container text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4">Help Center</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">We're here to support you. Reach out through any of the channels below.</p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <div className="bg-card rounded-xl p-6 shadow-card border border-border text-center">
              <Mail className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-foreground mb-2">Email</h3>
              <a href={`mailto:${email}`} className="text-primary hover:underline">{email}</a>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-card border border-border text-center">
              <MessageCircle className="h-10 w-10 text-accent mx-auto mb-4" />
              <h3 className="font-bold text-foreground mb-2">WhatsApp</h3>
              {hasWhatsApp ? (
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Chat on WhatsApp</a>
              ) : (
                <p className="text-sm text-muted-foreground">Coming soon</p>
              )}
            </div>
            <div className="bg-card rounded-xl p-6 shadow-card border border-border text-center">
              <Phone className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-foreground mb-2">Phone</h3>
              {hasMobile ? (
                <a href={`tel:${mobile}`} className="text-primary hover:underline">{mobile}</a>
              ) : (
                <p className="text-sm text-muted-foreground">Coming soon</p>
              )}
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-extrabold text-foreground mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: "Is there a fee for nurses?", a: "No. We never charge nurses any fees. Our services are free for candidates." },
                { q: "How long does the process take?", a: "Timelines vary by country and individual readiness. We provide transparent guidance on expected timelines during your review." },
                { q: "Do you guarantee job placement?", a: "No. We do not guarantee outcomes. We provide ethical guidance, preparation support, and connections to verified employers." },
                { q: "How is my data protected?", a: "We follow strict privacy practices. Your data is only used with your consent. See our Privacy Policy for details." },
                { q: "Can I delete my profile?", a: "Yes. Email globalparo@gmail.com to request data deletion at any time." },
              ].map((faq) => (
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
          <h2 className="text-3xl font-extrabold text-primary-foreground mb-8">Still have questions?</h2>
          <Button variant="hero" size="xl" asChild>
            <a href={`mailto:${email}`}>Email Us <ArrowRight className="h-5 w-5" /></a>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
