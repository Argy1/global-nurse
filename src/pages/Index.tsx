import { Link } from "react-router-dom";
import { ArrowRight, Globe, Shield, CheckCircle, Users, Heart, MessageCircle, MapPin, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import heroImage from "@/assets/hero-nurses.jpg";

const features = [
  {
    icon: Shield,
    title: "Ethical First",
    description: "We never charge nurses. Employers pay all fees. Zero exploitation.",
  },
  {
    icon: Globe,
    title: "Global Opportunities",
    description: "Verified positions in the UK, USA, Canada, Australia, and more.",
  },
  {
    icon: CheckCircle,
    title: "Complete Support",
    description: "From application to arrival—visa, housing, and onboarding help.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Join thousands of nurses sharing experiences and advice.",
  },
];

const stats = [
  { value: "5,000+", label: "Nurses Placed" },
  { value: "25+", label: "Partner Countries" },
  { value: "98%", label: "Success Rate" },
  { value: "0", label: "Fees to Nurses" },
];

const pathways = [
  {
    country: "United Kingdom",
    flag: "🇬🇧",
    description: "NHS and private sector opportunities with OSCE preparation support.",
    href: "/pathways/uk",
  },
  {
    country: "United States",
    flag: "🇺🇸",
    description: "NCLEX pathway with visa sponsorship and relocation packages.",
    href: "/pathways/usa",
  },
  {
    country: "Canada",
    flag: "🇨🇦",
    description: "Provincial nursing programs with permanent residency pathways.",
    href: "/pathways/canada",
  },
  {
    country: "Australia",
    flag: "🇦🇺",
    description: "AHPRA registration support with competitive compensation.",
    href: "/pathways/australia",
  },
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
      <section className="relative gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5"></div>
        <div className="container relative py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left animate-fade-up">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-6">
                <Shield className="h-4 w-4" />
                100% Ethical Recruitment
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6">
                Your Global <br />
                <span className="text-mint">Nursing Career</span><br />
                Starts Here
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-lg mx-auto lg:mx-0">
                Join thousands of nurses building international careers with full support, zero fees, and ethical guidance every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/apply">
                    Apply Now
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="heroOutline" size="xl" asChild>
                  <Link to="/community">
                    <MessageCircle className="h-5 w-5" />
                    Join WhatsApp
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl animate-float">
                <img
                  src={heroImage}
                  alt="Diverse team of international nurses"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-4 shadow-card animate-fade-up" style={{ animationDelay: "0.3s" }}>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center">
                    <Heart className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">5,000+</p>
                    <p className="text-sm text-muted-foreground">Nurses Placed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-card border-y border-border">
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

      {/* Features */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-4">
              Why Choose Global Nurse?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're not just recruiters—we're your partners in building an international healthcare career.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-card rounded-xl p-6 shadow-card border border-border hover:shadow-lg transition-shadow"
              >
                <div className="h-12 w-12 rounded-lg bg-mint flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-mint-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pathways Preview */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-4">
              Popular Destination Pathways
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore verified opportunities in top healthcare destinations worldwide.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pathways.map((pathway) => (
              <Link
                key={pathway.country}
                to={pathway.href}
                className="group bg-card rounded-xl p-6 shadow-card border border-border hover:shadow-lg hover:border-primary/30 transition-all"
              >
                <span className="text-4xl mb-4 block">{pathway.flag}</span>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {pathway.country}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{pathway.description}</p>
                <span className="text-primary font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn More <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button variant="outline" size="lg" asChild>
              <Link to="/pathways">
                View All Pathways
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24">
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

      {/* CTA Section */}
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
