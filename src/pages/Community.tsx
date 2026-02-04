import { Link } from "react-router-dom";
import { MessageCircle, Users, Globe, Shield, ArrowRight, CheckCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const communities = [
  {
    name: "General Nurses Network",
    description: "Connect with nurses from around the world. Share experiences, ask questions, and support each other.",
    members: "5,000+",
    icon: Globe,
  },
  {
    name: "UK Pathway Group",
    description: "Dedicated support for nurses pursuing opportunities in the United Kingdom.",
    members: "1,200+",
    icon: MessageCircle,
  },
  {
    name: "USA Pathway Group",
    description: "NCLEX prep tips, visa guidance, and connections with nurses in the US.",
    members: "2,100+",
    icon: MessageCircle,
  },
  {
    name: "Canada Pathway Group",
    description: "Provincial updates, NNAS guidance, and settlement advice for Canada.",
    members: "900+",
    icon: MessageCircle,
  },
  {
    name: "OSCE Preparation",
    description: "Study groups, practice scenarios, and success stories from nurses who passed.",
    members: "800+",
    icon: MessageCircle,
  },
  {
    name: "NCLEX Study Group",
    description: "Collaborative study, question banks, and test-taking strategies.",
    members: "1,500+",
    icon: MessageCircle,
  },
];

const benefits = [
  "Real-time answers from nurses who've been through the process",
  "Job alerts and opportunity notifications",
  "Study group partners for exams",
  "Settlement tips from nurses in your destination country",
  "Emotional support during the journey",
  "Networking with healthcare professionals worldwide",
];

export default function Community() {
  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-hero py-12 lg:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-6">
              <Users className="h-4 w-4" />
              10,000+ Active Members
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4">
              Join Our Global <br />Nursing Community
            </h1>
            <p className="text-lg text-primary-foreground/90 mb-8">
              Connect with thousands of nurses worldwide. Get real advice, find study partners, and never feel alone on your journey.
            </p>
            <Button variant="hero" size="xl" asChild>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('WhatsApp group link placeholder - update with real link'); }}>
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
                <Button variant="whatsapp" className="w-full" asChild>
                  <a href="#" onClick={(e) => { e.preventDefault(); alert('WhatsApp group link placeholder - update with real link'); }}>
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
              Find your niche. Join groups focused on your destination or area of interest.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((community) => (
              <div
                key={community.name}
                className="bg-card rounded-xl p-6 shadow-card border border-border hover:shadow-lg transition-shadow"
              >
                <div className="h-12 w-12 rounded-lg bg-mint flex items-center justify-center mb-4">
                  <community.icon className="h-6 w-6 text-mint-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{community.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{community.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">{community.members} members</span>
                  <Button variant="ghost" size="sm" asChild>
                    <a href="#" onClick={(e) => { e.preventDefault(); alert('WhatsApp group link placeholder'); }}>
                      Join
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
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
            Join thousands of nurses who are supporting each other on their international career journeys.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('WhatsApp group link placeholder'); }}>
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
