import { Link } from "react-router-dom";
import { Instagram, Linkedin } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const quickLinks = [
  { href: "/about", label: "About" },
  { href: "/what-we-do", label: "What We Do" },
  { href: "/how-we-do-it", label: "How We Do It" },
  { href: "/quickstart", label: "Quickstart Guide" },
  { href: "/register", label: "Register" },
];

const supportLinks = [
  { href: "/help", label: "Help Center" },
  { href: "/news", label: "News & Insights" },
  { href: "/success-stories", label: "Success Stories" },
  { href: "/employer", label: "For Employers" },
  { href: "/privacy", label: "Privacy" },
];

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export function Footer() {
  const { data: settings } = useSiteSettings();
  const isValid = (url?: string) => url && url !== "UPDATE_ME" && url.startsWith("http");
  const helpEmail = settings?.help_email || "globalparo@gmail.com";

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <span>Global Paro</span>
            </Link>
            <p className="text-primary-foreground/80 max-w-sm mb-6">
              Accelerating nurses to reach global opportunities — with guidance, transparency, and community support.
            </p>
            <div className="flex items-center gap-4">
              {[
                { url: settings?.instagram_url, icon: <Instagram className="h-5 w-5" />, label: "Instagram" },
                { url: settings?.linkedin_url, icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" },
                { url: settings?.tiktok_url, icon: <TikTokIcon className="h-5 w-5" />, label: "TikTok" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={isValid(social.url) ? social.url! : "#"}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                  aria-label={social.label}
                  onClick={(e) => !isValid(social.url) && e.preventDefault()}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Explore</h4>
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
            <h4 className="font-bold mb-4">Support</h4>
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
            <p>© {new Date().getFullYear()} Global Paro. All rights reserved.</p>
            <p>We do not guarantee outcomes. Guidance-first, consent-based support.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
