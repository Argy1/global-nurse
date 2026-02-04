import { Link } from "react-router-dom";
import { MessageCircle, Users, Globe, Shield, ArrowRight, CheckCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { useWhatsAppGroups } from "@/hooks/useWhatsAppGroups";

const benefits = [
  "Real-time answers from nurses who've been through the process",
  "Job alerts and opportunity notifications",
  "Study group partners for exams",
  "Settlement tips from nurses in your destination country",
  "Emotional support during the journey",
  "Networking with healthcare professionals worldwide",
];

export default function Community() {
  const { data: groups, isLoading } = useWhatsAppGroups();

  const isValidLink = (link: string) => {
    return link && link !== "UPDATE_ME" && link.startsWith("http");
  };

  const handleGroupClick = (link: string, e: React.MouseEvent) => {
    if (!isValidLink(link)) {
      e.preventDefault();
      alert("WhatsApp group link coming soon! Check back later.");
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-hero py-12 lg:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-6">
              <Users className="h-4 w-4" />
              Growing Community
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4">
              Join Our Global <br />Nursing Community
            </h1>
            <p className="text-lg text-primary-foreground/90 mb-8">
              Connect with nurses worldwide. Get real advice, find study partners, and never feel alone on your journey.
            </p>
            <Button 
              variant="hero" 
              size="xl" 
              asChild
              onClick={(e) => handleGroupClick("UPDATE_ME", e)}
            >
              <a href="#">
                <MessageCircle className="h-5 w-5" />
                Join WhatsApp Community
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-foreground mb-6">
                Why Join Our Community?
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-xl p-8 shadow-card border border-border">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-accent mx-auto flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Free to Join</h3>
                <p className="text-muted-foreground mb-6">
                  Our community is completely free. No hidden fees, no premium tiers. Just nurses helping nurses.
                </p>
                <Button 
                  variant="whatsapp" 
                  className="w-full"
                  onClick={(e) => handleGroupClick("UPDATE_ME", e)}
                  asChild
                >
                  <a href="#">
                    <MessageCircle className="h-5 w-5" />
                    Join Now
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Groups */}
      <section className="py-12 lg:py-16 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-extrabold text-foreground mb-4">
              Specialized Groups
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Find your niche. Join groups focused on your interests and needs.
            </p>
          </div>
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-card rounded-xl p-6 shadow-card border border-border animate-pulse">
                  <div className="h-12 w-12 bg-muted rounded-lg mb-4"></div>
                  <div className="h-6 w-32 bg-muted rounded mb-2"></div>
                  <div className="h-4 w-full bg-muted rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups?.map((group) => (
                <div
                  key={group.id}
                  className="bg-card rounded-xl p-6 shadow-card border border-border hover:shadow-lg transition-shadow"
                >
                  <div className="h-12 w-12 rounded-lg bg-mint flex items-center justify-center mb-4">
                    <MessageCircle className="h-6 w-6 text-mint-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{group.segment_name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{group.description}</p>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={(e) => handleGroupClick(group.join_link, e)}
                    asChild
                  >
                    <a href={isValidLink(group.join_link) ? group.join_link : "#"}>
                      Join
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Guidelines */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl lg:text-3xl font-extrabold text-foreground mb-4">
              Community Guidelines
            </h2>
            <p className="text-muted-foreground mb-6">
              Our community is a safe space. We expect all members to be respectful, supportive, and honest. 
              No recruitment fees, no scams, no spam. Violations result in immediate removal.
            </p>
            <Button variant="outline" asChild>
              <Link to="/ethics">
                Read Our Ethics Policy
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-16 gradient-hero">
        <div className="container text-center">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-primary-foreground mb-4">
            Ready to Connect?
          </h2>
          <p className="text-primary-foreground/90 max-w-xl mx-auto mb-8">
            Join nurses who are supporting each other on their international career journeys.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="lg"
              onClick={(e) => handleGroupClick("UPDATE_ME", e)}
              asChild
            >
              <a href="#">
                <MessageCircle className="h-5 w-5" />
                Join WhatsApp Community
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/apply">
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
