import { Link } from "react-router-dom";
import { CheckCircle, MessageCircle, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

export default function RegisterSuccess() {
  return (
    <Layout>
      <section className="py-20 lg:py-32">
        <div className="container max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-accent/10 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-accent" />
            </div>
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-4">Thanks — We Received Your Profile!</h1>
          <p className="text-lg text-muted-foreground mb-8">Our team will review your registration within 48 hours.</p>

          <div className="bg-card rounded-xl p-8 shadow-card border border-border text-left mb-8">
            <h2 className="font-bold text-foreground mb-4">What happens next:</h2>
            <ul className="space-y-3">
              {[
                "Our team reviews your profile and qualifications.",
                "We'll reach out via WhatsApp (with your consent) to discuss next steps.",
                "You'll receive guidance tailored to your target countries and readiness level.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">{i + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="cta" asChild>
              <Link to="/quickstart"><ArrowRight className="h-4 w-4" /> Read Quickstart Guide</Link>
            </Button>
            <Button variant="outline" asChild>
              <a href="mailto:globalparo@gmail.com"><Mail className="h-4 w-4" /> Email Us</a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
