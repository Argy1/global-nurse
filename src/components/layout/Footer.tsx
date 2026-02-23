import { Link } from "react-router-dom";
import { Instagram, Linkedin } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useTranslation } from "@/i18n/LanguageContext";
import logoIcon from "@/assets/logo-icon.png";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export function Footer() {
  const { data: settings } = useSiteSettings();
  const { t } = useTranslation();
  const isValid = (url?: string) => url && url !== "UPDATE_ME" && url.startsWith("http");
  const helpEmail = settings?.support_email || "globalparo@gmail.com";

  const quickLinks = [
    { href: "/about", label: t.nav.about },
    { href: "/what-we-do", label: t.nav.whatWeDo },
    { href: "/how-we-do-it", label: t.nav.howWeDoIt },
    { href: "/programs", label: t.footer.programsPricing },
    { href: "/team", label: t.footer.ourTeam },
    { href: "/quickstart", label: t.footer.quickstartGuide },
    { href: "/register", label: t.nav.register },
  ];

  const supportLinks = [
    { href: "/help", label: t.footer.helpCenter },
    { href: "/news", label: t.footer.newsInsights },
    { href: "/success-stories", label: t.footer.successStories },
    { href: "/employer", label: t.footer.forEmployers },
    { href: "/privacy", label: t.footer.privacy },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <img src={logoIcon} alt="Global Paro" className="h-8 w-8 brightness-0 invert" />
              <span className="font-heading">Global Paro</span>
            </Link>
            <p className="text-primary-foreground/80 max-w-sm mb-4 text-sm font-heading italic">
              "{t.footer.tagline}"
            </p>
            <p className="text-primary-foreground/80 max-w-sm mb-6">
              {t.footer.description}
            </p>
            <div className="flex items-center gap-4">
              {[
                { url: settings?.instagram_url, icon: <Instagram className="h-5 w-5" />, label: "Instagram" },
                { url: settings?.linkedin_url, icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" },
                { url: settings?.tiktok_url, icon: <TikTokIcon className="h-5 w-5" />, label: "TikTok" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={isValid(social.url) ? social.url! : `mailto:${helpEmail}`}
                  target={isValid(social.url) ? "_blank" : undefined}
                  rel={isValid(social.url) ? "noopener noreferrer" : undefined}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                  aria-label={isValid(social.url) ? social.label : `${social.label} — ${t.common.comingSoon}, contact ${helpEmail}`}
                  title={!isValid(social.url) ? `${t.common.comingSoon} — contact ${helpEmail}` : social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">{t.footer.explore}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">{t.footer.support}</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={`mailto:${helpEmail}`} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {helpEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p>© {new Date().getFullYear()} Global Paro. {t.footer.copyright}</p>
            <p>{t.footer.disclaimer}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
