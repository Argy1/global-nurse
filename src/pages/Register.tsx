import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, CheckCircle, Loader2, User, Heart, FileText, AlertCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Layout } from "@/components/layout/Layout";
import { useCreateCandidate, CandidateInsert } from "@/hooks/useCandidates";
import { toast } from "@/hooks/use-toast";

const englishOptions = ["Basic", "Intermediate", "Fluent"] as const;
const motivationOptions = ["Career Growth & International Experience", "Better Income & Financial Stability", "Learning, Culture & Personal Development", "Other"];
const challengeOptions = ["Licensing/registration confusion", "English tests/communication", "Lack of guidance/trusted pathway", "Financial prep for exams/docs", "Other"];
const helpOptions = ["Step-by-step guidance", "Training & preparation", "Connection to trusted opportunities", "Not sure yet/need advice"];

const steps = [
  { id: 1, title: "Personal", icon: User },
  { id: 2, title: "Motivation", icon: Heart },
  { id: 3, title: "Consent", icon: FileText },
];

interface FormData {
  full_name: string;
  date_of_birth: string;
  graduation_year: string;
  university: string;
  str_active_number: string;
  english_capability: string;
  email: string;
  whatsapp_number: string;
  motivations: string[];
  motivation_story: string;
  challenges: string[];
  challenge_story: string;
  help_needed: string[];
  consent_contact: boolean;
  consent_privacy: boolean;
}

export default function Register() {
  const navigate = useNavigate();
  const createCandidate = useCreateCandidate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    full_name: "", date_of_birth: "", graduation_year: "", university: "",
    str_active_number: "", english_capability: "", email: "", whatsapp_number: "",
    motivations: [], motivation_story: "", challenges: [], challenge_story: "",
    help_needed: [], consent_contact: false, consent_privacy: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [showErrorSummary, setShowErrorSummary] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) { setErrors((prev) => ({ ...prev, [field]: undefined })); setShowErrorSummary(false); }
  };

  const toggleMulti = (field: "motivations" | "challenges" | "help_needed", val: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(val) ? prev[field].filter((v) => v !== val) : [...prev[field], val],
    }));
  };

  const validateStep = (step: number): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (step === 1) {
      if (!formData.full_name.trim()) e.full_name = "Full name is required";
      if (!formData.date_of_birth) e.date_of_birth = "Date of birth is required";
      if (!formData.graduation_year) e.graduation_year = "Graduation year is required";
      if (!formData.university.trim()) e.university = "University is required";
      if (!formData.str_active_number.trim()) e.str_active_number = "STR active number is required";
      if (!formData.english_capability) e.english_capability = "English capability is required";
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Valid email is required";
      if (!formData.whatsapp_number.trim()) e.whatsapp_number = "WhatsApp number is required";
    }
    if (step === 2) {
      if (formData.motivations.length === 0) e.motivations = "Select at least one motivation";
      if (formData.challenges.length === 0) e.challenges = "Select at least one challenge";
      if (formData.help_needed.length === 0) e.help_needed = "Select at least one option";
    }
    if (step === 3) {
      if (!formData.consent_contact) e.consent_contact = "Consent is required to proceed.";
      if (!formData.consent_privacy) e.consent_privacy = "Consent is required to proceed.";
    }
    setErrors(e);
    if (Object.keys(e).length > 0) setShowErrorSummary(true);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => { if (validateStep(currentStep)) { setShowErrorSummary(false); setCurrentStep((p) => Math.min(p + 1, 3)); } };
  const handleBack = () => setCurrentStep((p) => Math.max(p - 1, 1));

  const handleSubmit = async () => {
    if (!validateStep(3)) { toast({ title: "Please fix the errors", variant: "destructive" }); return; }
    const data: CandidateInsert = {
      full_name: formData.full_name.trim(),
      date_of_birth: formData.date_of_birth,
      graduation_year: parseInt(formData.graduation_year),
      university: formData.university.trim(),
      str_active_number: formData.str_active_number.trim(),
      english_capability: formData.english_capability as CandidateInsert["english_capability"],
      email: formData.email.trim(),
      whatsapp_number: formData.whatsapp_number.trim(),
      motivations: formData.motivations,
      motivation_story: formData.motivation_story.trim() || undefined,
      challenges: formData.challenges,
      challenge_story: formData.challenge_story.trim() || undefined,
      help_needed: formData.help_needed,
      consent_contact: formData.consent_contact,
      consent_privacy: formData.consent_privacy,
    };
    createCandidate.mutate(data, {
      onSuccess: () => navigate("/register/success"),
      onError: () => toast({ title: "Submission Failed", description: "Please try again.", variant: "destructive" }),
    });
  };

  const renderFieldError = (field: keyof FormData) => errors[field] ? (
    <p className="text-sm text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors[field]}</p>
  ) : null;

  const renderMultiSelect = (field: "motivations" | "challenges" | "help_needed", options: string[], label: string) => (
    <div className="space-y-2">
      <Label>{label} *</Label>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button key={o} type="button" onClick={() => toggleMulti(field, o)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${formData[field].includes(o) ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-border hover:border-primary/50"}`}>
            {o}
          </button>
        ))}
      </div>
      {renderFieldError(field)}
    </div>
  );

  return (
    <Layout>
      <section className="gradient-hero py-12 lg:py-16">
        <div className="container text-center max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4">Register in 3 Minutes</h1>
          <p className="text-lg text-primary-foreground/90">Complete your profile and take the first step toward your international nursing career.</p>
          <p className="text-sm text-primary-foreground/70 mt-4 flex items-center justify-center gap-2">
            <Lock className="h-4 w-4" /> Your data stays private. We contact you only with consent.
          </p>
        </div>
      </section>

      <section className="py-8 bg-card border-b border-border">
        <div className="container flex items-center justify-center gap-4 md:gap-8">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center gap-2 md:gap-4">
              <div className={`flex items-center justify-center h-10 w-10 rounded-full font-bold transition-colors ${currentStep >= step.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                {currentStep > step.id ? <CheckCircle className="h-5 w-5" /> : step.id}
              </div>
              <span className={`hidden sm:block font-medium ${currentStep >= step.id ? "text-foreground" : "text-muted-foreground"}`}>{step.title}</span>
              {i < steps.length - 1 && <div className={`w-8 md:w-16 h-0.5 ${currentStep > step.id ? "bg-primary" : "bg-muted"}`} />}
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container max-w-2xl mx-auto">
          <div className="bg-card rounded-xl p-6 lg:p-8 shadow-card border border-border">
            {showErrorSummary && Object.keys(errors).length > 0 && (
              <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/30" role="alert">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-destructive mb-1">Please fix the following errors:</h3>
                    <ul className="text-sm text-destructive space-y-1">
                      {Object.entries(errors).map(([f, e]) => <li key={f}>• {e}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input id="full_name" value={formData.full_name} onChange={(e) => handleInputChange("full_name", e.target.value)} placeholder="Enter your full name" maxLength={100} className={errors.full_name ? "border-destructive" : ""} />
                  {renderFieldError("full_name")}
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date_of_birth">Date of Birth *</Label>
                    <Input id="date_of_birth" type="date" value={formData.date_of_birth} onChange={(e) => handleInputChange("date_of_birth", e.target.value)} className={errors.date_of_birth ? "border-destructive" : ""} />
                    {renderFieldError("date_of_birth")}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="graduation_year">Graduation Year *</Label>
                    <Input id="graduation_year" type="number" value={formData.graduation_year} onChange={(e) => handleInputChange("graduation_year", e.target.value)} placeholder="e.g., 2020" min={1980} max={new Date().getFullYear()} className={errors.graduation_year ? "border-destructive" : ""} />
                    {renderFieldError("graduation_year")}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="university">University *</Label>
                  <Input id="university" value={formData.university} onChange={(e) => handleInputChange("university", e.target.value)} placeholder="Your nursing school / university" maxLength={200} className={errors.university ? "border-destructive" : ""} />
                  {renderFieldError("university")}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="str_active_number">STR Active Number *</Label>
                  <Input id="str_active_number" value={formData.str_active_number} onChange={(e) => handleInputChange("str_active_number", e.target.value)} placeholder="Your active STR number" maxLength={50} className={errors.str_active_number ? "border-destructive" : ""} />
                  {renderFieldError("str_active_number")}
                </div>
                <div className="space-y-2">
                  <Label>English Capability *</Label>
                  <Select value={formData.english_capability} onValueChange={(v) => handleInputChange("english_capability", v)}>
                    <SelectTrigger className={errors.english_capability ? "border-destructive" : ""}><SelectValue placeholder="Select level" /></SelectTrigger>
                    <SelectContent>{englishOptions.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                  </Select>
                  {renderFieldError("english_capability")}
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} placeholder="your@email.com" maxLength={255} className={errors.email ? "border-destructive" : ""} />
                    {renderFieldError("email")}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp_number">WhatsApp Number *</Label>
                    <Input id="whatsapp_number" value={formData.whatsapp_number} onChange={(e) => handleInputChange("whatsapp_number", e.target.value)} placeholder="+62 812 3456 7890" maxLength={20} className={errors.whatsapp_number ? "border-destructive" : ""} />
                    {renderFieldError("whatsapp_number")}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                {renderMultiSelect("motivations", motivationOptions, "What motivates you to go global?")}
                <div className="space-y-2">
                  <Label htmlFor="motivation_story">Tell us more (optional)</Label>
                  <textarea id="motivation_story" value={formData.motivation_story} onChange={(e) => handleInputChange("motivation_story", e.target.value)}
                    placeholder="Share your story..." maxLength={1000}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm min-h-[80px] resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                </div>
                {renderMultiSelect("challenges", challengeOptions, "What challenges are you facing?")}
                <div className="space-y-2">
                  <Label htmlFor="challenge_story">Tell us more (optional)</Label>
                  <textarea id="challenge_story" value={formData.challenge_story} onChange={(e) => handleInputChange("challenge_story", e.target.value)}
                    placeholder="What's been difficult?" maxLength={1000}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm min-h-[80px] resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                </div>
                {renderMultiSelect("help_needed", helpOptions, "What kind of help do you need?")}
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="bg-muted rounded-lg p-6">
                  <h3 className="font-bold text-foreground mb-4">Almost done! Please confirm:</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Checkbox id="consent_contact" checked={formData.consent_contact} onCheckedChange={(v) => handleInputChange("consent_contact", !!v)} className={errors.consent_contact ? "border-destructive" : ""} />
                      <Label htmlFor="consent_contact" className="text-sm leading-relaxed cursor-pointer">I consent to be contacted about international nursing opportunities. *</Label>
                    </div>
                    {renderFieldError("consent_contact")}
                    <div className="flex items-start gap-3">
                      <Checkbox id="consent_privacy" checked={formData.consent_privacy} onCheckedChange={(v) => handleInputChange("consent_privacy", !!v)} className={errors.consent_privacy ? "border-destructive" : ""} />
                      <Label htmlFor="consent_privacy" className="text-sm leading-relaxed cursor-pointer">I accept the <a href="/privacy" target="_blank" className="text-primary underline">Privacy Policy</a> and understand how my data will be used. *</Label>
                    </div>
                    {renderFieldError("consent_privacy")}
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              {currentStep > 1 ? (
                <Button variant="outline" onClick={handleBack}><ArrowLeft className="h-4 w-4" /> Back</Button>
              ) : <div />}
              {currentStep < 3 ? (
                <Button variant="cta" onClick={handleNext}>Next <ArrowRight className="h-4 w-4" /></Button>
              ) : (
                <Button variant="cta" onClick={handleSubmit} disabled={createCandidate.isPending}>
                  {createCandidate.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Submit Registration
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
