import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useWhatsAppLink } from "@/hooks/useWhatsAppLink";

export function StickyBottomCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const { handleWhatsAppClick } = useWhatsAppLink();

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 250px
      setIsVisible(window.scrollY > 250);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur border-t border-border shadow-lg transition-transform duration-300",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="container py-3 flex items-center justify-center gap-3 sm:gap-4">
        <Button 
          variant="whatsapp" 
          size="sm" 
          className="flex-1 sm:flex-none"
          onClick={handleWhatsAppClick}
        >
          <MessageCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Join</span> WhatsApp
        </Button>
        <Button variant="cta" size="sm" className="flex-1 sm:flex-none" asChild>
          <Link to="/apply">
            Apply Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
