import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Award, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import {
  HeroCampaign,
  TrustBadgesStrip,
  ProcessSteps,
  PathwayCardGrid,
  FeaturedContentGrid,
  CommunityInviteBlock,
  EthicsSafetyStrip,
} from "@/components/campaign";

const stats = [
  { value: "5,000+", label: "Nurses Placed" },
  { value: "25+", label: "Partner Countries" },
  { value: "98%", label: "Success Rate" },
  { value: "0", label: "Fees to Nurses" },
];

const testimonials = [
  {
    name: "Grace M.",
    role: "ICU Nurse, London",
    quote: "Global Nurse made my UK dream a reality. The support was incredible from day one.",
    origin: "Kenya",
  },
  {
    name: "Maria S.",
    role: "ER Nurse, Toronto",
    quote: "Zero fees and genuine care. They helped me every step of the way to Canada.",
    origin: "Philippines",
  },
  {
    name: "James O.",
    role: "Surgical Nurse, Sydney",
    quote: "The community support and ethical approach set Global Nurse apart.",
    origin: "Nigeria",
  },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <HeroCampaign />

      {/* Trust Badges */}
      <TrustBadgesStrip />

      {/* Stats Bar */}
      <section className="bg-muted">
        <div className="container py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl lg:text-4xl font-extrabold text-primary mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <ProcessSteps />

      {/* Pathways */}
      <PathwayCardGrid limit={4} />

      {/* Ethics Strip */}
      <EthicsSafetyStrip variant="compact" />

      {/* Featured Content */}
      <FeaturedContentGrid limit={6} />

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-4">
              Nurses Who Made the Leap
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real stories from nurses who trusted us with their international careers.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-card rounded-xl p-6 shadow-card border border-border"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Award key={i} className="h-4 w-4 text-cta fill-current" />
                  ))}
                </div>
                <p className="text-foreground mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                    <span className="font-bold text-secondary-foreground">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} • From {testimonial.origin}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Invite */}
      <CommunityInviteBlock />

      {/* Final CTA */}
      <section className="py-16 lg:py-24 gradient-hero">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-primary-foreground mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-8">
            Join our community today and take the first step toward your international nursing career.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/apply">
                Apply Now
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/community">
                <MessageCircle className="h-5 w-5" />
                Join WhatsApp Community
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
