import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, CheckCircle, Loader2, FileText, User, Briefcase, AlertCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Layout } from "@/components/layout/Layout";
import { useCreateCandidate } from "@/hooks/useCandidates";
import { toast } from "@/hooks/use-toast";
import { Constants } from "@/integrations/supabase/types";
import type { Database } from "@/integrations/supabase/types";
import { TrustBadgesStrip } from "@/components/campaign/TrustBadgesStrip";

type CandidateInsert = Database["public"]["Tables"]["candidates"]["Insert"];

const professionOptions = Constants.public.Enums.profession_type;
const educationOptions = Constants.public.Enums.education_level_type;
const specialtyOptions = Constants.public.Enums.specialty_type;
const licenseStatusOptions = Constants.public.Enums.license_status_type;
const englishLevelOptions = Constants.public.Enums.english_level_type;
const availabilityOptions = Constants.public.Enums.availability_type;

const targetCountryOptions = [
  "United Kingdom",
  "United States",
  "Canada",
  "Australia",
  "Germany",
  "Ireland",
];

const steps = [
  { id: 1, title: "Basic Info", icon: User },
  { id: 2, title: "Professional", icon: Briefcase },
  { id: 3, title: "Readiness", icon: FileText },
];

interface FormData {
  full_name: string;
  whatsapp_number: string;
  email: string;
  city_country: string;
  profession: string;
  education_level: string;
  graduation_year: string;
  experience_years: string;
  specialty: string;
  license_status: string;
  english_level: string;
  target_countries: string[];
  availability: string;
  cv_link: string;
  consent_contact: boolean;
  consent_privacy: boolean;
}

export default function Apply() {
  const navigate = useNavigate();
  const createCandidate = useCreateCandidate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
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
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [showErrorSummary, setShowErrorSummary] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
      setShowErrorSummary(false);
    }
  };

  const toggleCountry = (country: string) => {
    setFormData((prev) => ({
      ...prev,
      target_countries: prev.target_countries.includes(country)
        ? prev.target_countries.filter((c) => c !== country)
        : [...prev.target_countries, country],
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (step === 1) {
      if (!formData.full_name.trim()) newErrors.full_name = "Full name is required";
      if (!formData.whatsapp_number.trim()) newErrors.whatsapp_number = "WhatsApp number is required";
      if (!formData.city_country.trim()) newErrors.city_country = "City/Country is required";
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
    }

    if (step === 2) {
      if (!formData.profession) newErrors.profession = "Profession is required";
      if (!formData.education_level) newErrors.education_level = "Education level is required";
      if (!formData.experience_years) newErrors.experience_years = "Experience is required";
      if (!formData.specialty) newErrors.specialty = "Specialty is required";
      if (!formData.license_status) newErrors.license_status = "License status is required";
    }

    if (step === 3) {
      if (!formData.english_level) newErrors.english_level = "English level is required";
      if (!formData.availability) newErrors.availability = "Availability is required";
      if (!formData.consent_contact) newErrors.consent_contact = "You must consent to be contacted";
      if (!formData.consent_privacy) newErrors.consent_privacy = "You must accept the privacy policy";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setShowErrorSummary(true);
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setShowErrorSummary(false);
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) {
      toast({
        title: "Please fix the errors",
        description: "Check the highlighted fields and try again.",
        variant: "destructive",
      });
      return;
    }

    const candidateData: CandidateInsert = {
      full_name: formData.full_name.trim(),
      whatsapp_number: formData.whatsapp_number.trim(),
      email: formData.email.trim() || null,
      city_country: formData.city_country.trim(),
      profession: formData.profession as CandidateInsert["profession"],
      education_level: formData.education_level as CandidateInsert["education_level"],
      graduation_year: formData.graduation_year ? parseInt(formData.graduation_year) : null,
      experience_years: parseInt(formData.experience_years),
      specialty: formData.specialty as CandidateInsert["specialty"],
      license_status: formData.license_status as CandidateInsert["license_status"],
      english_level: formData.english_level as CandidateInsert["english_level"],
      target_countries: formData.target_countries,
      availability: formData.availability as CandidateInsert["availability"],
      cv_link: formData.cv_link.trim() || null,
      consent_contact: formData.consent_contact,
      consent_privacy: formData.consent_privacy,
      pipeline_status: "new",
    };

    createCandidate.mutate(candidateData, {
      onSuccess: () => {
        navigate("/apply/success");
      },
      onError: () => {
        toast({
          title: "Submission Failed",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <Layout>
      {/* Header */}
      <section className="gradient-hero py-12 lg:py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4">
              Apply in 3 Minutes
            </h1>
            <p className="text-lg text-primary-foreground/90">
              Complete your profile and take the first step toward your international nursing career.
            </p>
            <p className="text-sm text-primary-foreground/70 mt-4 flex items-center justify-center gap-2">
              <Lock className="h-4 w-4" />
              Your data stays private. We contact you only with consent.
            </p>
          </div>
        </div>
      </section>

      <TrustBadgesStrip variant="compact" />

      {/* Stepper */}
      <section className="py-8 bg-card border-b border-border">
        <div className="container">
          <div className="flex items-center justify-center gap-4 md:gap-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-2 md:gap-4">
                <div
                  className={`flex items-center justify-center h-10 w-10 rounded-full font-bold transition-colors ${
                    currentStep >= step.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {currentStep > step.id ? <CheckCircle className="h-5 w-5" /> : step.id}
                </div>
                <span
                  className={`hidden sm:block font-medium transition-colors ${
                    currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 md:w-16 h-0.5 ${
                      currentStep > step.id ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-xl p-6 lg:p-8 shadow-card border border-border">
              {/* Error Summary */}
              {showErrorSummary && Object.keys(errors).length > 0 && (
                <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/30" role="alert">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-destructive mb-1">Please fix the following errors:</h3>
                      <ul className="text-sm text-destructive space-y-1">
                        {Object.entries(errors).map(([field, error]) => (
                          <li key={field}>• {error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name *</Label>
                    <Input
                      id="full_name"
                      value={formData.full_name}
                      onChange={(e) => handleInputChange("full_name", e.target.value)}
                      placeholder="Enter your full name"
                      maxLength={100}
                      className={errors.full_name ? "border-destructive focus-visible:ring-destructive" : ""}
                      aria-invalid={!!errors.full_name}
                    />
                    {errors.full_name && <p className="text-sm text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.full_name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="whatsapp_number">WhatsApp Number *</Label>
                    <Input
                      id="whatsapp_number"
                      value={formData.whatsapp_number}
                      onChange={(e) => handleInputChange("whatsapp_number", e.target.value)}
                      placeholder="+62 812 3456 7890"
                      maxLength={20}
                      className={errors.whatsapp_number ? "border-destructive focus-visible:ring-destructive" : ""}
                      aria-invalid={!!errors.whatsapp_number}
                    />
                    {errors.whatsapp_number && <p className="text-sm text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.whatsapp_number}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email (optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your@email.com"
                      maxLength={255}
                      className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                    />
                    {errors.email && <p className="text-sm text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city_country">City / Country *</Label>
                    <Input
                      id="city_country"
                      value={formData.city_country}
                      onChange={(e) => handleInputChange("city_country", e.target.value)}
                      placeholder="e.g., Jakarta, Indonesia"
                      maxLength={100}
                      className={errors.city_country ? "border-destructive focus-visible:ring-destructive" : ""}
                    />
                    {errors.city_country && <p className="text-sm text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.city_country}</p>}
                  </div>
                </div>
              )}

              {/* Step 2: Professional */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Profession *</Label>
                      <Select value={formData.profession} onValueChange={(v) => handleInputChange("profession", v)}>
                        <SelectTrigger><SelectValue placeholder="Select profession" /></SelectTrigger>
                        <SelectContent>
                          {professionOptions.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      {errors.profession && <p className="text-sm text-destructive">{errors.profession}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label>Education Level *</Label>
                      <Select value={formData.education_level} onValueChange={(v) => handleInputChange("education_level", v)}>
                        <SelectTrigger><SelectValue placeholder="Select education" /></SelectTrigger>
                        <SelectContent>
                          {educationOptions.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      {errors.education_level && <p className="text-sm text-destructive">{errors.education_level}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="graduation_year">Graduation Year</Label>
                      <Input
                        id="graduation_year"
                        type="number"
                        value={formData.graduation_year}
                        onChange={(e) => handleInputChange("graduation_year", e.target.value)}
                        placeholder="e.g., 2020"
                        min={1980}
                        max={new Date().getFullYear()}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Years of Experience *</Label>
                      <Select value={formData.experience_years} onValueChange={(v) => handleInputChange("experience_years", v)}>
                        <SelectTrigger><SelectValue placeholder="Select experience" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Less than 1 year</SelectItem>
                          <SelectItem value="1">1-2 years</SelectItem>
                          <SelectItem value="3">3-5 years</SelectItem>
                          <SelectItem value="6">6-10 years</SelectItem>
                          <SelectItem value="11">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.experience_years && <p className="text-sm text-destructive">{errors.experience_years}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Specialty *</Label>
                      <Select value={formData.specialty} onValueChange={(v) => handleInputChange("specialty", v)}>
                        <SelectTrigger><SelectValue placeholder="Select specialty" /></SelectTrigger>
                        <SelectContent>
                          {specialtyOptions.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      {errors.specialty && <p className="text-sm text-destructive">{errors.specialty}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label>License Status *</Label>
                      <Select value={formData.license_status} onValueChange={(v) => handleInputChange("license_status", v)}>
                        <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                        <SelectContent>
                          {licenseStatusOptions.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      {errors.license_status && <p className="text-sm text-destructive">{errors.license_status}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Readiness */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>English Level *</Label>
                      <Select value={formData.english_level} onValueChange={(v) => handleInputChange("english_level", v)}>
                        <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
                        <SelectContent>
                          {englishLevelOptions.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      {errors.english_level && <p className="text-sm text-destructive">{errors.english_level}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label>Availability *</Label>
                      <Select value={formData.availability} onValueChange={(v) => handleInputChange("availability", v)}>
                        <SelectTrigger><SelectValue placeholder="Select availability" /></SelectTrigger>
                        <SelectContent>
                          {availabilityOptions.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      {errors.availability && <p className="text-sm text-destructive">{errors.availability}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Target Countries</Label>
                    <div className="flex flex-wrap gap-2">
                      {targetCountryOptions.map((country) => (
                        <button
                          key={country}
                          type="button"
                          onClick={() => toggleCountry(country)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                            formData.target_countries.includes(country)
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                          }`}
                        >
                          {country}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cv_link">CV Link (optional)</Label>
                    <Input
                      id="cv_link"
                      value={formData.cv_link}
                      onChange={(e) => handleInputChange("cv_link", e.target.value)}
                      placeholder="https://drive.google.com/..."
                      maxLength={500}
                    />
                  </div>

                  <div className="space-y-4 pt-4 border-t border-border">
                    {/* Consent blocking message */}
                    {(errors.consent_contact || errors.consent_privacy) && (
                      <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30" role="alert">
                        <p className="text-sm text-destructive flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          Consent is required to proceed.
                        </p>
                      </div>
                    )}

                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="consent_contact"
                        checked={formData.consent_contact}
                        onCheckedChange={(checked) => handleInputChange("consent_contact", checked === true)}
                        className={errors.consent_contact ? "border-destructive" : ""}
                      />
                      <div className="space-y-1">
                        <Label htmlFor="consent_contact" className="cursor-pointer">
                          I consent to be contacted about opportunities *
                        </Label>
                        {errors.consent_contact && <p className="text-sm text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.consent_contact}</p>}
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="consent_privacy"
                        checked={formData.consent_privacy}
                        onCheckedChange={(checked) => handleInputChange("consent_privacy", checked === true)}
                        className={errors.consent_privacy ? "border-destructive" : ""}
                      />
                      <div className="space-y-1">
                        <Label htmlFor="consent_privacy" className="cursor-pointer">
                          I accept the <a href="/privacy" className="text-primary underline" target="_blank">privacy policy</a> *
                        </Label>
                        {errors.consent_privacy && <p className="text-sm text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.consent_privacy}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                {currentStep > 1 ? (
                  <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>
                ) : (
                  <div />
                )}

                {currentStep < 3 ? (
                  <Button variant="cta" onClick={handleNext}>
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button variant="cta" onClick={handleSubmit} disabled={createCandidate.isPending}>
                    {createCandidate.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
