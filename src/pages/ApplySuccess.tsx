import { Link } from "react-router-dom";
import { CheckCircle, MessageCircle, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const nextSteps = [
  "Our team will review your profile within 2-3 business days.",
  "We'll contact you via WhatsApp to discuss suitable pathways.",
  "You'll receive personalized guidance on documentation and next steps.",
];

export default function ApplySuccess() {
  return (
    <Layout>
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="max-w-xl mx-auto text-center">
            <div className="h-20 w-20 rounded-full bg-accent mx-auto flex items-center justify-center mb-6">
              <CheckCircle className="h-10 w-10 text-accent-foreground" />
            </div>

            <h1 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-4">
              Thanks — We Received Your Profile!
            </h1>

            <p className="text-lg text-muted-foreground mb-8">
              You've taken an important step toward your international nursing career. Here's what happens next:
            </p>

            <div className="bg-card rounded-xl p-6 lg:p-8 shadow-card border border-border text-left mb-8">
              <h2 className="text-lg font-bold text-foreground mb-4">Next Steps</h2>
              <ul className="space-y-4">
                {nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <span className="text-foreground">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="whatsapp" size="lg" asChild>
                <Link to="/community">
                  <MessageCircle className="h-5 w-5" />
                  Join WhatsApp Community
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="mailto:globalparo@gmail.com">
                  <Mail className="h-5 w-5" />
                  Email Us
                </a>
              </Button>
            </div>

            <div className="mt-8">
              <Button variant="link" asChild>
                <Link to="/">
                  <ArrowRight className="h-4 w-4 rotate-180" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
