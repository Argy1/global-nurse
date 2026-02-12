import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MessageCircle, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoIcon from "@/assets/logo-icon.png";
import { cn } from "@/lib/utils";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/what-we-do", label: "What We Do" },
  { href: "/how-we-do-it", label: "How We Do It" },
  { href: "/lms", label: "LMS" },
  { href: "/register", label: "Register" },
  { href: "/help", label: "Help" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { data: settings } = useSiteSettings();

  const helpEmail = settings?.support_email || "globalparo@gmail.com";
  const helpMobile = settings?.help_mobile;
  const whatsappLink = settings?.whatsapp_direct_chat_link;
  const hasWhatsApp = whatsappLink && whatsappLink !== "UPDATE_ME";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <img src={logoIcon} alt="Global Paro" className="h-8 w-8" />
          <span className="font-heading">
            <span className="text-primary">Global</span>
            {" "}
            <span className="text-accent">Paro</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                location.pathname === link.href
                  ? "bg-secondary text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {link.label}
            </Link>
          ))}
          {/* Help contact icons */}
          <div className="flex items-center gap-1 ml-1">
            <a
              href={`mailto:${helpEmail}`}
              className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"
              aria-label="Email help"
            >
              <Mail className="h-4 w-4" />
            </a>
            {helpMobile && helpMobile !== "UPDATE_ME" && (
              <a
                href={`tel:${helpMobile}`}
                className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"
                aria-label="Call help"
              >
                <Phone className="h-4 w-4" />
              </a>
            )}
          </div>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Button variant="cta" size="sm" asChild>
            <Link to="/register">Register</Link>
          </Button>
          {hasWhatsApp && (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
              aria-label="WhatsApp Support"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden border-t border-border animate-fade-in">
          <nav className="container py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                  location.pathname === link.href
                    ? "bg-secondary text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-border mt-2">
              <Button variant="cta" asChild>
                <Link to="/register" onClick={() => setIsOpen(false)}>Register</Link>
              </Button>
              {hasWhatsApp && (
                <Button variant="whatsapp" asChild>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Support
                  </a>
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
