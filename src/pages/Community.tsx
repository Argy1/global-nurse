import { Link } from "react-router-dom";
import { MessageCircle, Users, Shield, ArrowRight, CheckCircle, XCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { useWhatsAppGroups } from "@/hooks/useWhatsAppGroups";
import { useWhatsAppLink } from "@/hooks/useWhatsAppLink";

const guidelines = [
  { type: "do", text: "Be respectful and supportive of all members" },
  { type: "do", text: "Share your experiences to help others" },
  { type: "do", text: "Ask questions—no question is too basic" },
  { type: "do", text: "Report suspicious activity to admins" },
  { type: "dont", text: "No recruitment fees or money requests" },
  { type: "dont", text: "No spam, self-promotion, or MLM schemes" },
  { type: "dont", text: "No sharing personal info of others without consent" },
  { type: "dont", text: "No discrimination or harassment of any kind" },
];

export default function Community() {
  const { data: groups, isLoading } = useWhatsAppGroups();
  const { isValidLink, handleWhatsAppClick, handleGroupClick } = useWhatsAppLink();

  return (
    <Layout>
      {/* A) Hero */}
      <section className="gradient-hero py-12 lg:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-6">
              <Users className="h-4 w-4" />
              Growing Community
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4">
              Join the Nurse Community
            </h1>
            <p className="text-lg text-primary-foreground/90 mb-8">
              Connect with nurses worldwide. Get real advice, find study partners, and never feel alone on your journey.
            </p>
            <Button variant="hero" size="xl" onClick={handleWhatsAppClick}>
              <MessageCircle className="h-5 w-5" />
              Join WhatsApp Community
            </Button>
          </div>
        </div>
      </section>

      {/* B) Segment Cards */}
      <section className="py-12 lg:py-16">
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
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-card rounded-xl p-6 shadow-card border border-border animate-pulse">
                  <div className="h-14 w-14 bg-muted rounded-lg mb-4" />
                  <div className="h-6 w-32 bg-muted rounded mb-2" />
                  <div className="h-4 w-full bg-muted rounded mb-4" />
                  <div className="h-10 w-full bg-muted rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {groups?.map((group) => {
                const valid = isValidLink(group.join_link);
                
                return (
                  <div
                    key={group.id}
                    className="bg-card rounded-xl p-6 shadow-card border border-border hover:shadow-lg transition-shadow"
                  >
                    <div className="h-14 w-14 rounded-lg bg-mint flex items-center justify-center mb-4">
                      <MessageCircle className="h-7 w-7 text-mint-foreground" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{group.segment_name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{group.description}</p>
                    
                    {valid ? (
                      <Button variant="whatsapp" className="w-full" asChild>
                        <a href={group.join_link} target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="h-4 w-4" />
                          Join Group
                        </a>
                      </Button>
                    ) : (
                      <div className="space-y-2">
                        <Button variant="ghost" className="w-full" disabled>
                          Coming Soon
                        </Button>
                        <p className="text-xs text-muted-foreground text-center">
                          Contact: <a href="mailto:globalparo@gmail.com" className="text-primary hover:underline">globalparo@gmail.com</a>
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* C) Community Guidelines */}
      <section className="py-12 lg:py-16 bg-muted">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl lg:text-3xl font-extrabold text-foreground mb-4">
                Community Guidelines
              </h2>
              <p className="text-muted-foreground">
                Our community is a safe space. Please follow these guidelines to keep it that way.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Do's */}
              <div className="bg-accent/10 rounded-xl p-6 border border-accent/20">
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  Do's
                </h3>
                <ul className="space-y-3">
                  {guidelines
                    .filter((g) => g.type === "do")
                    .map((guideline) => (
                      <li key={guideline.text} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{guideline.text}</span>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Don'ts */}
              <div className="bg-destructive/10 rounded-xl p-6 border border-destructive/20">
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-destructive" />
                  Don'ts
                </h3>
                <ul className="space-y-3">
                  {guidelines
                    .filter((g) => g.type === "dont")
                    .map((guideline) => (
                      <li key={guideline.text} className="flex items-start gap-2">
                        <XCircle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{guideline.text}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Violations result in immediate removal. Your privacy and safety are our priority.
              </p>
              <Button variant="outline" asChild>
                <Link to="/ethics">
                  Read Our Full Ethics Policy
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
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
            <Button variant="hero" size="lg" onClick={handleWhatsAppClick}>
              <MessageCircle className="h-5 w-5" />
              Join WhatsApp Community
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
