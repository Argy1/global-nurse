import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Users, Globe, Shield, BookOpen, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import heroImage from "@/assets/hero-nurses.jpg";

const trustPoints = [
  "Ethical • Transparent • Supportive",
  "No fees charged to nurses",
  "Consent-based communication only",
];

const processSteps = [
  { step: "01", title: "Register", desc: "Submit your profile in under 3 minutes. We'll review it within 48 hours.", icon: Users },
  { step: "02", title: "Get Guided", desc: "Receive a personalized roadmap — licensing, language, and documentation support.", icon: BookOpen },
  { step: "03", title: "Go Global", desc: "Connect with verified employers and start your international nursing career.", icon: Globe },
];

const features = [
  { title: "Quickstart Guide", desc: "Everything you need to know before working abroad as a nurse.", link: "/quickstart", icon: BookOpen },
  { title: "Success Stories", desc: "Read real journeys from nurses who made the leap.", link: "/success-stories", icon: Star },
  { title: "News & Insights", desc: "Stay informed with the latest in global nursing careers.", link: "/news", icon: Globe },
  { title: "LMS (Coming Soon)", desc: "Structured learning modules to prepare you for success abroad.", link: "/lms", icon: CheckCircle },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative container py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <p className="text-accent-foreground bg-accent/20 inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
                {trustPoints[0]}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground mb-6 leading-tight">
                Accelerating Nurses to
                <br />
                <span className="text-mint">Global Opportunities</span>
              </h1>
              <p className="text-lg text-primary-foreground/90 max-w-lg mb-8">
                We guide, prepare, and connect nurses with verified international opportunities. No promises — just real support, every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/register">
                    Register Now <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="heroOutline" size="xl" asChild>
                  <Link to="/what-we-do">
                    Learn More
                  </Link>
                </Button>
              </div>
              <p className="text-xs text-primary-foreground/60 mt-4">
                No fees. No spam. Consent-based contact only.
              </p>
            </div>
            <div className="hidden lg:block">
              <img
                src={heroImage}
                alt="Nurses collaborating in a professional healthcare setting"
                className="rounded-2xl shadow-lg object-cover w-full max-h-[480px]"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-6 bg-card border-b border-border">
        <div className="container flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          {trustPoints.map((point) => (
            <span key={point} className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-accent" />
              {point}
            </span>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A clear, supported path from registration to your international nursing career.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step) => (
              <div key={step.step} className="bg-card rounded-xl p-8 shadow-card border border-border text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary mx-auto mb-4">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <p className="text-sm font-bold text-accent mb-2">Step {step.step}</p>
                <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-4">Explore & Prepare</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Resources designed to help you make informed decisions about your career abroad.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <Link
                key={f.title}
                to={f.link}
                className="bg-card rounded-xl p-6 shadow-card border border-border hover:border-primary/30 hover:shadow-lg transition-all group"
              >
                <f.icon className="h-8 w-8 text-primary mb-4 group-hover:text-accent transition-colors" />
                <h3 className="font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-24 gradient-hero">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-primary-foreground mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-8">
            Register today and take the first step toward your international nursing career. We're here to guide you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/register">Register Now <ArrowRight className="h-5 w-5" /></Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/quickstart">Quickstart Guide</Link>
            </Button>
          </div>
          <p className="text-xs text-primary-foreground/50 mt-6">
            We do not guarantee outcomes. We provide ethical guidance and transparent support.
          </p>
        </div>
      </section>
    </Layout>
  );
}
