import * as React from "react";
import { Link } from "react-router-dom";
import { Stethoscope, Instagram, Linkedin } from "lucide-react";
import { useSocialLinks } from "@/hooks/useSocialLinks";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/pathways", label: "Pathways" },
  { href: "/apply", label: "Apply" },
  { href: "/community", label: "Community" },
  { href: "/content", label: "Content" },
  { href: "/ethics", label: "Ethics" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
];

// TikTok icon component since lucide doesn't have one
const TikTokIcon = React.forwardRef<SVGSVGElement, { className?: string }>(
  ({ className }, ref) => {
    return (
      <svg
        ref={ref}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
      >
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    );
  }
);
TikTokIcon.displayName = "TikTokIcon";

export function Footer() {
  const { data: socialLinks } = useSocialLinks();

  const isValidUrl = (url: string | undefined) => {
    return url && url !== "UPDATE_ME" && url.startsWith("http");
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground">
                <Stethoscope className="h-5 w-5 text-primary" />
              </div>
              <span>Global Nurse</span>
            </Link>
            <p className="text-primary-foreground/80 max-w-sm mb-6">
              Empowering nurses worldwide with ethical international career opportunities. 
              Your safety and success are our priority.
            </p>
            <div className="flex items-center gap-4">
              <a
                href={isValidUrl(socialLinks?.instagram_url) ? socialLinks.instagram_url : "#"}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                aria-label="Instagram"
                onClick={(e) => !isValidUrl(socialLinks?.instagram_url) && e.preventDefault()}
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={isValidUrl(socialLinks?.linkedin_url) ? socialLinks.linkedin_url : "#"}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                aria-label="LinkedIn"
                onClick={(e) => !isValidUrl(socialLinks?.linkedin_url) && e.preventDefault()}
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={isValidUrl(socialLinks?.tiktok_url) ? socialLinks.tiktok_url : "#"}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                aria-label="TikTok"
                onClick={(e) => !isValidUrl(socialLinks?.tiktok_url) && e.preventDefault()}
              >
                <TikTokIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links & Contact */}
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2">
              {quickLinks.slice(5).map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="mailto:globalparo@gmail.com"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  globalparo@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p>© {new Date().getFullYear()} Global Nurse. All rights reserved.</p>
            <p className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-accent"></span>
              We prioritize privacy, consent, and ethical guidance.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
