import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Shield, Globe, FileText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Layout } from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";
import { useSubmitCandidate } from "@/hooks/useCandidates";
import { usePathways } from "@/hooks/usePathways";

const benefits = [
  { icon: Shield, text: "Zero fees to nurses—ever" },
  { icon: Globe, text: "Global verified opportunities" },
  { icon: FileText, text: "Visa & documentation support" },
  { icon: Users, text: "Dedicated support team" },
];

const professions = ["Nurse", "Midwife", "Other"];
const educationLevels = ["Diploma", "Bachelor", "Master", "Other"];
const specialties = ["ICU", "ER", "Med-Surg", "OR", "Pediatrics", "Geriatric", "Mental Health", "Community Health", "Other"];
const licenseStatuses = ["STR/SIP Active", "In Process", "Not Available"];
const englishLevels = ["IELTS", "OET", "Basic", "Intermediate", "Advanced", "Not Yet"];
const availabilities = ["0-3 months", "3-6 months", "6-12 months"];

export default function Apply() {
  const { toast } = useToast();
  const submitCandidate = useSubmitCandidate();
  const { data: pathways } = usePathways();
  
  const [formData, setFormData] = useState({
    full_name: "",
    whatsapp_number: "",
    email: "",
    city_country: "",
    profession: "",
    education_level: "",
    graduation_year: "",
    experience_years: "",
    specialty: "",
    license_status: "",
    english_level: "",
    target_countries: [] as string[],
    availability: "",
    cv_link: "",
    consent_contact: false,
    consent_privacy: false,
  });

  const targetCountryOptions = pathways?.map(p => p.country) || ["United Kingdom", "United States", "Canada", "Australia", "Germany", "Ireland"];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.consent_contact || !formData.consent_privacy) {
      toast({
        title: "Consent Required",
        description: "Please agree to both consent checkboxes to continue.",
        variant: "destructive",
      });
      return;
    }

    try {
      await submitCandidate.mutateAsync({
        full_name: formData.full_name,
        whatsapp_number: formData.whatsapp_number,
        email: formData.email || null,
        city_country: formData.city_country,
        profession: formData.profession as any,
        education_level: formData.education_level as any,
        graduation_year: formData.graduation_year ? parseInt(formData.graduation_year) : null,
        experience_years: parseInt(formData.experience_years),
        specialty: formData.specialty as any,
        license_status: formData.license_status as any,
        english_level: formData.english_level as any,
        target_countries: formData.target_countries,
        availability: formData.availability as any,
        cv_link: formData.cv_link || null,
        consent_contact: formData.consent_contact,
        consent_privacy: formData.consent_privacy,
      });
      
      toast({
        title: "Application Received! 🎉",
        description: "We'll review your application and contact you within 48 hours.",
      });
      
      // Reset form
      setFormData({
        full_name: "",
        whatsapp_number: "",
        email: "",
        city_country: "",
        profession: "",
        education_level: "",
        graduation_year: "",
        experience_years: "",
        specialty: "",
        license_status: "",
        english_level: "",
        target_countries: [],
        availability: "",
        cv_link: "",
        consent_contact: false,
        consent_privacy: false,
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCountryToggle = (country: string) => {
    setFormData(prev => ({
      ...prev,
      target_countries: prev.target_countries.includes(country)
        ? prev.target_countries.filter(c => c !== country)
        : [...prev.target_countries, country],
    }));
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
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="full_name">Full Name *</Label>
                        <Input 
                          id="full_name" 
                          required 
                          placeholder="Your full name"
                          value={formData.full_name}
                          onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="whatsapp_number">WhatsApp Number *</Label>
                        <Input 
                          id="whatsapp_number" 
                          type="tel" 
                          required 
                          placeholder="+62 812 345 6789"
                          value={formData.whatsapp_number}
                          onChange={(e) => setFormData(prev => ({ ...prev, whatsapp_number: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email (Optional)</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="you@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="city_country">City & Country *</Label>
                        <Input 
                          id="city_country" 
                          required 
                          placeholder="Jakarta, Indonesia"
                          value={formData.city_country}
                          onChange={(e) => setFormData(prev => ({ ...prev, city_country: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Professional Info */}
                  <div>
                    <h3 className="font-bold text-lg mb-4 text-foreground">Professional Background</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Profession *</Label>
                        <Select 
                          value={formData.profession}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, profession: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select profession" />
                          </SelectTrigger>
                          <SelectContent>
                            {professions.map((p) => (
                              <SelectItem key={p} value={p}>{p}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Education Level *</Label>
                        <Select
                          value={formData.education_level}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, education_level: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select education" />
                          </SelectTrigger>
                          <SelectContent>
                            {educationLevels.map((e) => (
                              <SelectItem key={e} value={e}>{e}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="graduation_year">Graduation Year</Label>
                        <Input 
                          id="graduation_year" 
                          type="number" 
                          placeholder="2020"
                          min="1980"
                          max="2030"
                          value={formData.graduation_year}
                          onChange={(e) => setFormData(prev => ({ ...prev, graduation_year: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="experience_years">Years of Experience *</Label>
                        <Input 
                          id="experience_years" 
                          type="number" 
                          required
                          placeholder="5"
                          min="0"
                          max="50"
                          value={formData.experience_years}
                          onChange={(e) => setFormData(prev => ({ ...prev, experience_years: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Specialty *</Label>
                        <Select
                          value={formData.specialty}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, specialty: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select specialty" />
                          </SelectTrigger>
                          <SelectContent>
                            {specialties.map((s) => (
                              <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>License Status *</Label>
                        <Select
                          value={formData.license_status}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, license_status: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select license status" />
                          </SelectTrigger>
                          <SelectContent>
                            {licenseStatuses.map((l) => (
                              <SelectItem key={l} value={l}>{l}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label>English Level *</Label>
                        <Select
                          value={formData.english_level}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, english_level: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select English level" />
                          </SelectTrigger>
                          <SelectContent>
                            {englishLevels.map((e) => (
                              <SelectItem key={e} value={e}>{e}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Destination Preferences */}
                  <div>
                    <h3 className="font-bold text-lg mb-4 text-foreground">Destination Preferences</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Target Countries * (select all that apply)</Label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {targetCountryOptions.map((country) => (
                            <label
                              key={country}
                              className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                                formData.target_countries.includes(country)
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/50"
                              }`}
                            >
                              <Checkbox
                                checked={formData.target_countries.includes(country)}
                                onCheckedChange={() => handleCountryToggle(country)}
                              />
                              <span className="text-sm">{country}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Availability *</Label>
                        <Select
                          value={formData.availability}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, availability: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="When can you relocate?" />
                          </SelectTrigger>
                          <SelectContent>
                            {availabilities.map((a) => (
                              <SelectItem key={a} value={a}>{a}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cv_link">CV/Resume Link (Optional)</Label>
                        <Input 
                          id="cv_link" 
                          placeholder="https://drive.google.com/..."
                          value={formData.cv_link}
                          onChange={(e) => setFormData(prev => ({ ...prev, cv_link: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Consent */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg text-foreground">Consent</h3>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <Checkbox
                        checked={formData.consent_contact}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, consent_contact: !!checked }))}
                        className="mt-1"
                      />
                      <span className="text-sm text-foreground">
                        I consent to be contacted by Global Nurse regarding my application and career opportunities. *
                      </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <Checkbox
                        checked={formData.consent_privacy}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, consent_privacy: !!checked }))}
                        className="mt-1"
                      />
                      <span className="text-sm text-foreground">
                        I have read and agree to the{" "}
                        <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>. *
                      </span>
                    </label>
                  </div>

                  {/* Submit */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button 
                      type="submit" 
                      variant="cta" 
                      size="lg" 
                      disabled={submitCandidate.isPending} 
                      className="flex-1"
                    >
                      {submitCandidate.isPending ? "Submitting..." : "Submit Application"}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
