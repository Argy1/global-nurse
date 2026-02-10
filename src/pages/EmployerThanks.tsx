import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, Calendar, Mail, MessageCircle, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { useSetting } from "@/hooks/useSiteSettings";

export default function EmployerThanks() {
  const { value: bookingLink } = useSetting("booking_20min_link");
  const { value: supportEmail } = useSetting("support_email");
  const email = supportEmail ?? "globalparo@gmail.com";

  return (
    <Layout>
      <section className="py-20 lg:py-28">
        <div className="container max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-accent/20 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-accent" />
            </div>
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-4">Thank You for Your Inquiry</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Our team will review your submission and respond within 2 business days.
          </p>

          {/* About Global Paro model */}
          <div className="bg-card border border-border rounded-xl p-6 lg:p-8 text-left mb-8">
            <h2 className="text-xl font-bold text-foreground mb-3">How Global Paro Works</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              We connect healthcare institutions with pre-screened, motivated international nurses through an ethical, transparent
              recruitment process. We never charge fees to nurses — our model is built on trust, structured preparation, and
              long-term partnership with employers.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link to="/what-we-do">Learn More <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3 max-w-sm mx-auto">
            {bookingLink ? (
              <Button variant="cta" size="lg" asChild>
                <a href={bookingLink} target="_blank" rel="noopener noreferrer">
                  <Calendar className="h-5 w-5" /> Book a 20-Min Discussion
                </a>
              </Button>
            ) : (
              <div className="bg-muted rounded-lg p-4 text-sm text-muted-foreground text-center">
                <Calendar className="h-5 w-5 mx-auto mb-1 opacity-50" />
                Booking link coming soon — email <a href={`mailto:${email}`} className="text-primary underline">{email}</a> to schedule.
              </div>
            )}
            <Button variant="default" size="lg" asChild>
              <a href={`mailto:${email}`}>
                <Mail className="h-5 w-5" /> Contact Support
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
