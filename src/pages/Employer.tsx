import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Loader2, Building2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Layout } from "@/components/layout/Layout";
import { useSubmitEmployerInquiry } from "@/hooks/useEmployerInquiry";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { toast } from "@/hooks/use-toast";

export default function Employer() {
  const navigate = useNavigate();
  const submitInquiry = useSubmitEmployerInquiry();
  const { data: settings } = useSiteSettings();
  const bookingLink = settings?.booking_link;
  const hasBooking = bookingLink && bookingLink !== "UPDATE_ME" && bookingLink.startsWith("http");

  const [form, setForm] = useState({
    company_name: "", contact_name: "", email: "", phone: "", country: "", nurses_needed: "", message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.company_name.trim()) e.company_name = "Company name is required";
    if (!form.contact_name.trim()) e.contact_name = "Contact name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email is required";
    if (!form.country.trim()) e.country = "Country is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    submitInquiry.mutate(
      {
        company_name: form.company_name.trim(), contact_name: form.contact_name.trim(),
        email: form.email.trim(), phone: form.phone.trim() || undefined,
        country: form.country.trim(), nurses_needed: form.nurses_needed ? parseInt(form.nurses_needed) : undefined,
        message: form.message.trim() || undefined,
      },
      {
        onSuccess: () => navigate("/employer/thanks"),
        onError: () => toast({ title: "Submission failed", description: "Please try again.", variant: "destructive" }),
      }
    );
  };

  return (
    <Layout>
      <section className="gradient-hero py-16 lg:py-24">
        <div className="container text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4">For Employers</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Connect with qualified, pre-screened international nurses for your healthcare workforce needs.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-extrabold text-foreground mb-6">Why Work With Us</h2>
              <div className="space-y-4">
                {[
                  "Pre-screened, qualified nursing candidates",
                  "Ethical recruitment — no fees charged to nurses",
                  "Transparent process with clear timelines",
                  "Ongoing support for employers and candidates",
                  "Community-backed pipeline of motivated nurses",
                ].map((item) => (
                  <p key={item} className="flex items-start gap-3 text-muted-foreground">
                    <span className="text-accent font-bold mt-0.5">✓</span> {item}
                  </p>
                ))}
              </div>
              {hasBooking && (
                <div className="mt-8 p-6 bg-secondary rounded-xl">
                  <h3 className="font-bold text-foreground mb-2">Book a 20-Minute Call</h3>
                  <p className="text-sm text-muted-foreground mb-4">Discuss your workforce needs with our team.</p>
                  <Button variant="cta" asChild>
                    <a href={bookingLink} target="_blank" rel="noopener noreferrer">Book Now <ArrowRight className="h-4 w-4" /></a>
                  </Button>
                </div>
              )}
            </div>

            <div className="bg-card rounded-xl p-8 shadow-card border border-border">
              <h2 className="text-xl font-bold text-foreground mb-6">Submit an Inquiry</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { id: "company_name", label: "Company Name *", placeholder: "Hospital / Organization" },
                  { id: "contact_name", label: "Contact Person *", placeholder: "Your full name" },
                  { id: "email", label: "Email *", placeholder: "work@company.com", type: "email" },
                  { id: "phone", label: "Phone (optional)", placeholder: "+1 234 567 8900" },
                  { id: "country", label: "Country *", placeholder: "Where do you need nurses?" },
                  { id: "nurses_needed", label: "Nurses Needed (optional)", placeholder: "e.g., 10", type: "number" },
                ].map((field) => (
                  <div key={field.id} className="space-y-1">
                    <Label htmlFor={field.id}>{field.label}</Label>
                    <Input
                      id={field.id}
                      type={field.type || "text"}
                      value={form[field.id as keyof typeof form]}
                      onChange={(e) => setForm((p) => ({ ...p, [field.id]: e.target.value }))}
                      placeholder={field.placeholder}
                      maxLength={255}
                      className={errors[field.id] ? "border-destructive" : ""}
                    />
                    {errors[field.id] && <p className="text-sm text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors[field.id]}</p>}
                  </div>
                ))}
                <div className="space-y-1">
                  <Label htmlFor="message">Message (optional)</Label>
                  <textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    placeholder="Tell us about your needs..."
                    maxLength={1000}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm min-h-[100px] resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                <Button type="submit" variant="cta" className="w-full" disabled={submitInquiry.isPending}>
                  {submitInquiry.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Building2 className="h-4 w-4" />}
                  Submit Inquiry
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
