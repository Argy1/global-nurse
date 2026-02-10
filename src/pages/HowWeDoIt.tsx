import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const phases = [
  {
    step: "01",
    title: "Register & Review",
    items: ["You submit your profile (3 min)", "Our team reviews your qualifications within 48 hours", "We assess your readiness for international pathways"],
  },
  {
    step: "02",
    title: "Personalized Guidance",
    items: ["Receive a tailored roadmap for your target countries", "Get licensing, language, and documentation guidance", "Access our Quickstart Guide and community resources"],
  },
  {
    step: "03",
    title: "Preparation Support",
    items: ["English proficiency recommendations (IELTS/OET)", "CV and interview preparation resources", "Document checklist and timeline planning"],
  },
  {
    step: "04",
    title: "Employer Matching",
    items: ["We connect you with verified employers when you're ready", "Transparent process — you see who the employer is", "No pressure, no hidden fees, full consent"],
  },
  {
    step: "05",
    title: "Ongoing Community",
    items: ["Join WhatsApp groups with nurses on similar journeys", "Access ongoing support even after placement", "Share your story and help future nurses"],
  },
];

export default function HowWeDoIt() {
  return (
    <Layout>
      <section className="gradient-hero py-16 lg:py-24">
        <div className="container text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4">How We Do It</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            A transparent, step-by-step process designed around your needs — not ours.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container max-w-3xl">
          <div className="space-y-12">
            {phases.map((phase) => (
              <div key={phase.step} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                    {phase.step}
                  </div>
                  <div className="w-px flex-1 bg-border mt-2" />
                </div>
                <div className="pb-8">
                  <h3 className="text-xl font-bold text-foreground mb-4">{phase.title}</h3>
                  <ul className="space-y-2">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-accent mt-1 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 gradient-hero">
        <div className="container text-center">
          <h2 className="text-3xl font-extrabold text-primary-foreground mb-8">Start Your Journey Today</h2>
          <Button variant="hero" size="xl" asChild>
            <Link to="/register">Register Now <ArrowRight className="h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
