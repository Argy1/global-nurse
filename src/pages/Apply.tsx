import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Shield, Globe, FileText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Layout } from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";

const benefits = [
  { icon: Shield, text: "Zero fees to nurses—ever" },
  { icon: Globe, text: "Global verified opportunities" },
  { icon: FileText, text: "Visa & documentation support" },
  { icon: Users, text: "Dedicated support team" },
];

const countries = [
  "United Kingdom",
  "United States",
  "Canada",
  "Australia",
  "Germany",
  "Ireland",
  "New Zealand",
  "Other",
];

const experienceLevels = [
  "0-1 years",
  "1-3 years",
  "3-5 years",
  "5-10 years",
  "10+ years",
];

const specialties = [
  "General/Medical-Surgical",
  "ICU/Critical Care",
  "Emergency/ER",
  "Pediatrics",
  "Oncology",
  "Labor & Delivery",
  "Mental Health/Psychiatric",
  "Operating Room/Surgical",
  "Community/Public Health",
  "Other",
];

export default function Apply() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Application Received! 🎉",
      description: "We'll review your application and contact you within 48 hours.",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-hero py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4">
              Start Your Application
            </h1>
            <p className="text-lg text-primary-foreground/90">
              Take the first step toward your international nursing career. We'll guide you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl p-6 shadow-card border border-border sticky top-24">
                <h3 className="font-bold text-lg mb-4 text-foreground">What You Get</h3>
                <ul className="space-y-4">
                  {benefits.map((benefit) => (
                    <li key={benefit.text} className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-lg bg-mint flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="h-4 w-4 text-mint-foreground" />
                      </div>
                      <span className="text-foreground">{benefit.text}</span>
                    </li>
                  ))}
                </ul>
                <hr className="my-6 border-border" />
                <p className="text-sm text-muted-foreground">
                  Applications are reviewed within 48 hours. Qualified candidates receive personalized pathway recommendations.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl p-6 lg:p-8 shadow-card border border-border">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div>
                    <h3 className="font-bold text-lg mb-4 text-foreground">Personal Information</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input id="firstName" required placeholder="Your first name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input id="lastName" required placeholder="Your last name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input id="email" type="email" required placeholder="you@email.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input id="phone" type="tel" required placeholder="+1 234 567 8900" />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="currentCountry">Current Country *</Label>
                        <Input id="currentCountry" required placeholder="Where do you currently live?" />
                      </div>
                    </div>
                  </div>

                  {/* Professional Info */}
                  <div>
                    <h3 className="font-bold text-lg mb-4 text-foreground">Professional Background</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="experience">Years of Experience *</Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience" />
                          </SelectTrigger>
                          <SelectContent>
                            {experienceLevels.map((level) => (
                              <SelectItem key={level} value={level}>{level}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="specialty">Primary Specialty *</Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select specialty" />
                          </SelectTrigger>
                          <SelectContent>
                            {specialties.map((specialty) => (
                              <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="qualifications">Nursing Qualifications *</Label>
                        <Input id="qualifications" required placeholder="e.g., BSN, RN, MSN" />
                      </div>
                    </div>
                  </div>

                  {/* Destination Preferences */}
                  <div>
                    <h3 className="font-bold text-lg mb-4 text-foreground">Destination Preferences</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="destination">Preferred Destination(s) *</Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select preferred destination" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country} value={country}>{country}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timeline">When do you want to relocate?</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="asap">As soon as possible</SelectItem>
                            <SelectItem value="3months">Within 3 months</SelectItem>
                            <SelectItem value="6months">Within 6 months</SelectItem>
                            <SelectItem value="12months">Within 12 months</SelectItem>
                            <SelectItem value="exploring">Just exploring options</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div>
                    <h3 className="font-bold text-lg mb-4 text-foreground">Additional Information</h3>
                    <div className="space-y-2">
                      <Label htmlFor="message">Tell us about yourself (optional)</Label>
                      <Textarea
                        id="message"
                        placeholder="Share anything else you'd like us to know—your goals, questions, or concerns."
                        rows={4}
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button type="submit" variant="cta" size="lg" disabled={isSubmitting} className="flex-1">
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <p className="text-sm text-muted-foreground text-center">
                    By submitting, you agree to our{" "}
                    <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                    We'll never share your information without consent.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
