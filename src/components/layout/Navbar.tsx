import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, Globe, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoIcon from "@/assets/logo-icon.png";
import logoFull from "@/assets/logo-full.png";
import { cn } from "@/lib/utils";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useTranslation } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/LanguageContext";

interface DropdownItem {
  href: string;
  label: string;
}

interface NavItem {
  href?: string;
  label: string;
  dropdown?: DropdownItem[];
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();
  const { data: settings } = useSiteSettings();
  const { lang, setLang, t } = useTranslation();

  const helpEmail = settings?.support_email || "globalparo@gmail.com";
  const helpMobile = settings?.help_mobile;

  const navItems: NavItem[] = [
    {
      label: "About Us",
      dropdown: [
        { href: "/about", label: "Global Paro" },
        { href: "/about#vision", label: "Our Vision" },
        { href: "/about#mission", label: "Our Mission" },
        { href: "/about#values", label: "Our Value" },
      ],
    },
    { href: "/what-we-do", label: "What We Do" },
    {
      label: "How We Do It",
      dropdown: [
        { href: "/how-we-do-it#approach", label: "Our Approach" },
        { href: "/how-we-do-it#difference", label: "Know The Difference" },
        { href: "/how-we-do-it#journey", label: "Your Journey Step by Step" },
      ],
    },
    { href: "/why-choose-us", label: "Why Choose Us" },
    {
      label: "Programs",
      dropdown: [
        { href: "/programs#batch", label: "Batch Program" },
        { href: "/programs#requirements", label: "Requirement Criteria" },
        { href: "/programs#webinar", label: "Webinar" },
      ],
    },
    { href: "/quickstart", label: "QuickStart" },
    {
      label: "LMS",
      dropdown: [
        { href: "/lms#ielts", label: "IELTS Preparation" },
        { href: "/lms#certified", label: "Certified Global Nurse" },
        { href: "/lms#nclex", label: "NCLEX 2026 Resources" },
      ],
    },
    { href: "/team", label: "Our Team" },
    { href: "/register", label: "Register" },
  ];

  const toggleLang = () => setLang(lang === "en" ? "id" : "en" as Lang);

  return (
    <header className="sticky top-0 z-50 w-full shadow-md" style={{ backgroundColor: 'hsl(var(--card))' }}>
      {/* Top Bar */}
      <div style={{ backgroundColor: 'hsl(var(--primary))' }} className="py-1.5">
        <div className="container flex items-center justify-between gap-4">
          {/* Language Switcher */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 text-xs font-medium text-primary-foreground/90 hover:text-primary-foreground transition-colors"
            aria-label="Switch language"
          >
            <Globe className="h-3.5 w-3.5" />
            {lang === "en" ? "English" : "Indonesia"}
            <ChevronDown className="h-3 w-3" />
          </button>

          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-primary-foreground/10 rounded-full px-3 py-1 flex-1 max-w-xs">
            <Search className="h-3.5 w-3.5 text-primary-foreground/70" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-xs text-primary-foreground placeholder-primary-foreground/60 outline-none w-full"
            />
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-3">
            <Link to="/help" className="flex items-center gap-1 text-xs text-primary-foreground/90 hover:text-primary-foreground transition-colors">
              Help
            </Link>
            {helpMobile && helpMobile !== "UPDATE_ME" && (
              <a href={`tel:${helpMobile}`} className="text-primary-foreground/90 hover:text-primary-foreground transition-colors">
                <Phone className="h-3.5 w-3.5" />
              </a>
            )}
            <a href={`mailto:${helpEmail}`} className="text-primary-foreground/90 hover:text-primary-foreground transition-colors">
              <Mail className="h-3.5 w-3.5" />
            </a>
            <Button
              asChild
              size="sm"
              className="h-6 px-3 text-xs rounded-full font-semibold"
              style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}
            >
              <Link to="/auth">Login</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="container flex h-16 items-center justify-between gap-4" style={{ backgroundColor: 'hsl(var(--card))' }}>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logoFull} alt="Global PARO" className="h-10 w-auto max-w-[180px] object-contain" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-0.5">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {item.href && !item.dropdown ? (
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap",
                    location.pathname === item.href
                      ? "text-accent"
                      : "text-foreground hover:text-accent"
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap",
                    item.dropdown?.some(d => location.pathname === d.href)
                      ? "text-accent"
                      : "text-foreground hover:text-accent"
                  )}
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
              )}

              {/* Dropdown */}
              {item.dropdown && activeDropdown === item.label && (
                <div
                  className="absolute top-full left-0 mt-1 w-52 rounded-xl shadow-lg border border-border py-2 z-50"
                  style={{ backgroundColor: 'hsl(var(--card))' }}
                >
                  {item.dropdown.map((sub) => (
                    <Link
                      key={sub.href}
                      to={sub.href}
                      className="block px-4 py-2.5 text-sm font-medium text-foreground hover:text-accent hover:bg-muted transition-colors"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="xl:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="xl:hidden border-t border-border animate-fade-in" style={{ backgroundColor: 'hsl(var(--card))' }}>
          <nav className="container py-4 flex flex-col gap-1 max-h-[75vh] overflow-y-auto">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.href && !item.dropdown ? (
                  <Link
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block px-4 py-3 text-sm font-semibold rounded-lg transition-colors",
                      location.pathname === item.href
                        ? "text-accent bg-muted"
                        : "text-foreground hover:text-accent hover:bg-muted"
                    )}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                      className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold text-foreground hover:text-accent hover:bg-muted rounded-lg transition-colors"
                    >
                      {item.label}
                      <ChevronDown className={cn("h-4 w-4 transition-transform", mobileExpanded === item.label && "rotate-180")} />
                    </button>
                    {mobileExpanded === item.label && item.dropdown && (
                      <div className="pl-4 pb-2">
                        {item.dropdown.map((sub) => (
                          <Link
                            key={sub.href}
                            to={sub.href}
                            onClick={() => { setIsOpen(false); setMobileExpanded(null); }}
                            className="block px-4 py-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-border mt-2">
              <div className="flex items-center justify-between px-4 py-2">
                <button onClick={toggleLang} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  {lang === "en" ? "Switch to Indonesia" : "Switch to English"}
                </button>
              </div>
              <Button asChild className="w-full mt-2" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                <Link to="/auth" onClick={() => setIsOpen(false)}>Login</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
