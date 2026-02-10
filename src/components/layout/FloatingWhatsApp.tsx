import { MessageCircle } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { toast } from "@/hooks/use-toast";

export function FloatingWhatsApp() {
  const { data: settings } = useSiteSettings();
  const link = settings?.whatsapp_link;
  const isValid = link && link !== "UPDATE_ME" && link.startsWith("http");

  const handleClick = () => {
    if (isValid) {
      window.open(link, "_blank", "noopener,noreferrer");
    } else {
      toast({
        title: "Coming Soon",
        description: "WhatsApp support will be available soon. Email: globalparo@gmail.com",
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg hover:bg-accent/90 transition-all hover:scale-105 active:scale-95"
      aria-label="WhatsApp Support"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );
}
