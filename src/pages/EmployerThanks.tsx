import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

export default function EmployerThanks() {
  return (
    <Layout>
      <section className="py-20 lg:py-32">
        <div className="container max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-accent/10 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-accent" />
            </div>
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-4">Thank You for Your Inquiry</h1>
          <p className="text-lg text-muted-foreground mb-8">Our team will review your submission and respond within 2 business days.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="cta" asChild><Link to="/">Back to Home <ArrowRight className="h-4 w-4" /></Link></Button>
            <Button variant="outline" asChild><a href="mailto:globalparo@gmail.com">Email Us</a></Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
