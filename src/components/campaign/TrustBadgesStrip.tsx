import { Shield, Eye, Users, BookOpen } from "lucide-react";

const badges = [
  {
    icon: Shield,
    title: "Ethical Recruitment",
    description: "Zero fees for nurses",
  },
  {
    icon: Eye,
    title: "Transparent Steps",
    description: "Clear process guidance",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Peer-to-peer help",
  },
  {
    icon: BookOpen,
    title: "Nurse-focused Content",
    description: "Free resources & guides",
  },
];

interface TrustBadgesStripProps {
  variant?: "default" | "compact";
}

export function TrustBadgesStrip({ variant = "default" }: TrustBadgesStripProps) {
  if (variant === "compact") {
    return (
      <section className="bg-card border-y border-border">
        <div className="container py-4">
          <div className="flex flex-wrap justify-center gap-4 lg:gap-8">
            {badges.map((badge) => (
              <div key={badge.title} className="flex items-center gap-2">
                <badge.icon className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-foreground">{badge.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-card border-y border-border">
      <div className="container py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {badges.map((badge) => (
            <div key={badge.title} className="text-center">
              <div className="h-12 w-12 rounded-lg bg-mint mx-auto flex items-center justify-center mb-3">
                <badge.icon className="h-6 w-6 text-mint-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-1">{badge.title}</h3>
              <p className="text-sm text-muted-foreground">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
