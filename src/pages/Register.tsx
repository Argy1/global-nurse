import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight, ArrowLeft, CheckCircle, Loader2, User, Heart, FileText,
  AlertCircle, Lock, Mail, Phone, MessageCircle, BookOpen, Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Layout } from "@/components/layout/Layout";
import { useCreateCandidate, CandidateInsert } from "@/hooks/useCandidates";
import { useSetting } from "@/hooks/useSiteSettings";
import { toast } from "@/hooks/use-toast";

const englishOptions = ["Basic", "Intermediate", "Fluent"] as const;
const motivationOptions = [
  "Career Growth & International Experience",
  "Better Income & Financial Stability",
  "Learning, Culture & Personal Development",
  "Other",
];
const challengeOptions = [
  "Licensing/registration confusion",
  "English tests/communication",
  "Lack of guidance/trusted pathway",
  "Financial prep for exams/docs",
  "Other",
];
const helpOptions = [
  "Step-by-step guidance",
  "Training & preparation",
  "Connection to trusted opportunities",
  "Not sure yet/need advice",
];

const steps = [
  { id: 1, title: "Basic Details", icon: User },
  { id: 2, title: "Professional", icon: Shield },
  { id: 3, title: "Contact", icon: Mail },
  { id: 4, title: "Motivation", icon: Heart },
  { id: 5, title: "Consent", icon: FileText },
];

interface FormData {
  full_name: string;
  date_of_birth: string;
  graduation_year: string;
  university: string;
  str_active_number: string;
  english_capability: string;
  email: string;
  email_verified: boolean;
  whatsapp_number: string;
  whatsapp_verified: boolean;
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
  const { value: whatsappLink } = useSetting("whatsapp_direct_chat_link");
  const whatsappHref = whatsappLink ?? "mailto:globalparo@gmail.com";

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    full_name: "", date_of_birth: "", graduation_year: "", university: "",
    str_active_number: "", english_capability: "",
    email: "", email_verified: false,
    whatsapp_number: "", whatsapp_verified: false,
    motivations: [], motivation_story: "",
    challenges: [], challenge_story: "",
    help_needed: [],
    consent_contact: false, consent_privacy: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [emailCodeSent, setEmailCodeSent] = useState(false);
  const [emailCode, setEmailCode] = useState("");
  const [waCodeSent, setWaCodeSent] = useState(false);
  const [waCode, setWaCode] = useState("");

  const set = (field: keyof FormData, value: string | boolean | string[]) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => { const n = { ...p }; delete n[field]; return n; });
  };

  const toggleMulti = (field: "motivations" | "challenges" | "help_needed", val: string) => {
    setForm((p) => ({
      ...p,
      [field]: p[field].includes(val) ? p[field].filter((v) => v !== val) : [...p[field], val],
    }));
    if (errors[field]) setErrors((p) => { const n = { ...p }; delete n[field]; return n; });
  };

  const validate = (s: number): boolean => {
    const e: Record<string, string> = {};
    if (s === 1) {
      if (!form.full_name.trim()) e.full_name = "Full name is required";
      if (!form.date_of_birth) e.date_of_birth = "Date of birth is required";
      if (!form.graduation_year) e.graduation_year = "Graduation year is required";
      if (!form.university.trim()) e.university = "University is required";
    }
    if (s === 2) {
      if (!form.str_active_number.trim()) e.str_active_number = "STR active number is required";
      if (!form.english_capability) e.english_capability = "English capability is required";
    }
    if (s === 3) {
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email is required";
      if (!form.whatsapp_number.trim()) e.whatsapp_number = "WhatsApp number is required";
    }
    if (s === 5) {
      if (!form.consent_contact) e.consent_contact = "Contact consent is required";
      if (!form.consent_privacy) e.consent_privacy = "Privacy consent is required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate(step)) setStep((p) => Math.min(p + 1, 5)); };
  const back = () => setStep((p) => Math.max(p - 1, 1));

  /* Mock verification flows */
  const sendEmailCode = () => {
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setErrors((p) => ({ ...p, email: "Enter a valid email first" }));
      return;
    }
    setEmailCodeSent(true);
    toast({ title: "Verification code sent", description: "Check your email inbox (mock: use code 1234)" });
  };

  const verifyEmail = () => {
    if (emailCode === "1234") {
      set("email_verified", true);
      toast({ title: "Email verified!" });
    } else {
      toast({ title: "Invalid code", description: "Verification pending — you can still submit.", variant: "destructive" });
    }
  };

  const sendWaCode = () => {
    if (!form.whatsapp_number.trim()) {
      setErrors((p) => ({ ...p, whatsapp_number: "Enter your WhatsApp number first" }));
      return;
    }
    setWaCodeSent(true);
    toast({ title: "WhatsApp code sent", description: "Check your WhatsApp (mock: use code 5678)" });
  };

  const verifyWa = () => {
    if (waCode === "5678") {
      set("whatsapp_verified", true);
      toast({ title: "WhatsApp verified!" });
    } else {
      toast({ title: "Invalid code", description: "Verification pending — you can still submit.", variant: "destructive" });
    }
  };

  const handleSubmit = async () => {
    if (!validate(5)) return;
    const data: CandidateInsert = {
      full_name: form.full_name.trim(),
      date_of_birth: form.date_of_birth,
      graduation_year: parseInt(form.graduation_year),
      university: form.university.trim(),
      str_active_number: form.str_active_number.trim(),
      english_capability: form.english_capability as CandidateInsert["english_capability"],
      email: form.email.trim(),
      email_verified: form.email_verified,
      whatsapp_number: form.whatsapp_number.trim(),
      whatsapp_verified: form.whatsapp_verified,
      motivations: form.motivations,
      motivation_story: form.motivation_story.trim() || undefined,
      challenges: form.challenges,
      challenge_story: form.challenge_story.trim() || undefined,
      help_needed: form.help_needed,
      consent_contact: form.consent_contact,
      consent_privacy: form.consent_privacy,
      journey_stage: "New",
    };
    createCandidate.mutate(data, {
      onSuccess: () => setSubmitted(true),
      onError: () => toast({ title: "Submission Failed", description: "Please try again.", variant: "destructive" }),
    });
  };

  /* ── Helpers ── */
  const fieldErr = (f: string) => errors[f] ? (
    <p className="text-sm text-destructive flex items-center gap-1 mt-1"><AlertCircle className="h-3 w-3" />{errors[f]}</p>
  ) : null;

  const multiSelect = (field: "motivations" | "challenges" | "help_needed", options: string[], label: string) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button key={o} type="button" onClick={() => toggleMulti(field, o)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${form[field].includes(o) ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-border hover:border-primary/50"}`}>
            {o}
          </button>
        ))}
      </div>
      {fieldErr(field)}
    </div>
  );

  /* ── Thank you screen ── */
  if (submitted) {
    return (
      <Layout>
        <section className="py-20 lg:py-32">
          <div className="container max-w-lg mx-auto text-center">
            <div className="h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-accent" />
            </div>
            <h1 className="text-3xl font-extrabold text-foreground mb-3">Thank You for Registering!</h1>
            <p className="text-muted-foreground mb-2">We've received your profile and will review it within 48 hours.</p>
            <p className="text-sm text-muted-foreground mb-8">Here's what to do next:</p>
            <div className="flex flex-col gap-3">
              <Button variant="cta" size="lg" asChild>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" /> Join WhatsApp Support
                </a>
              </Button>
              <Button variant="default" size="lg" asChild>
                <Link to="/quickstart"><BookOpen className="h-5 w-5" /> Read the Quickstart Guide</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/help"><Phone className="h-5 w-5" /> Chat With Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  /* ── Progress bar ── */
  const progress = ((step - 1) / (steps.length - 1)) * 100;

  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-hero py-10 lg:py-14">
        <div className="container text-center max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-3">Register in Under 3 Minutes</h1>
          <p className="text-primary-foreground/85">Take the first step toward your international nursing career.</p>
          <p className="text-xs text-primary-foreground/60 mt-3 flex items-center justify-center gap-1">
            <Lock className="h-3 w-3" /> Your data stays private. We contact you only with consent.
          </p>
        </div>
      </section>

      {/* Stepper */}
      <section className="py-4 bg-card border-b border-border">
        <div className="container max-w-2xl mx-auto">
          {/* Progress bar */}
          <div className="h-1.5 bg-muted rounded-full mb-4 overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          {/* Step indicators */}
          <div className="flex justify-between">
            {steps.map((s) => {
              const Icon = s.icon;
              const done = step > s.id;
              const active = step === s.id;
              return (
                <div key={s.id} className="flex flex-col items-center gap-1">
                  <div className={`flex items-center justify-center h-9 w-9 rounded-full text-sm font-bold transition-colors ${done ? "bg-accent text-accent-foreground" : active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                    {done ? <CheckCircle className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                  </div>
                  <span className={`text-[10px] sm:text-xs font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}>{s.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form body */}
      <section className="py-10 lg:py-14">
        <div className="container max-w-2xl mx-auto">
          <div className="bg-card rounded-xl p-6 lg:p-8 shadow-card border border-border">

            {/* Error summary */}
            {Object.keys(errors).length > 0 && (
              <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/30" role="alert">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-destructive mb-1">Please fix the following:</h3>
                    <ul className="text-sm text-destructive space-y-0.5">
                      {Object.values(errors).map((e, i) => <li key={i}>• {e}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 1: Basic Details ── */}
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-xl font-bold text-foreground">Basic Details</h2>
                <div className="space-y-1.5">
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input id="full_name" value={form.full_name} onChange={(e) => set("full_name", e.target.value)} placeholder="Enter your full name" maxLength={100} className={errors.full_name ? "border-destructive" : ""} />
                  {fieldErr("full_name")}
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="dob">Date of Birth *</Label>
                    <Input id="dob" type="date" value={form.date_of_birth} onChange={(e) => set("date_of_birth", e.target.value)} className={errors.date_of_birth ? "border-destructive" : ""} />
                    {fieldErr("date_of_birth")}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="grad">Graduation Year *</Label>
                    <Input id="grad" type="number" value={form.graduation_year} onChange={(e) => set("graduation_year", e.target.value)} placeholder="e.g. 2020" min={1980} max={new Date().getFullYear()} className={errors.graduation_year ? "border-destructive" : ""} />
                    {fieldErr("graduation_year")}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="uni">University *</Label>
                  <Input id="uni" value={form.university} onChange={(e) => set("university", e.target.value)} placeholder="Your nursing school / university" maxLength={200} className={errors.university ? "border-destructive" : ""} />
                  {fieldErr("university")}
                </div>
              </div>
            )}

            {/* ── Step 2: Professional Readiness ── */}
            {step === 2 && (
              <div className="space-y-5">
                <h2 className="text-xl font-bold text-foreground">Professional Readiness</h2>
                <p className="text-sm text-muted-foreground bg-muted rounded-lg p-4 border-l-4 border-accent">
                  We'd like to know you better so we can support you to achieve your dreams. You are not alone in this journey. 💙
                </p>
                <div className="space-y-1.5">
                  <Label htmlFor="str">No. STR Active *</Label>
                  <Input id="str" value={form.str_active_number} onChange={(e) => set("str_active_number", e.target.value)} placeholder="Your active STR number" maxLength={50} className={errors.str_active_number ? "border-destructive" : ""} />
                  {fieldErr("str_active_number")}
                </div>
                <div className="space-y-1.5">
                  <Label>English Capability *</Label>
                  <Select value={form.english_capability} onValueChange={(v) => set("english_capability", v)}>
                    <SelectTrigger className={errors.english_capability ? "border-destructive" : ""}><SelectValue placeholder="Select level" /></SelectTrigger>
                    <SelectContent>{englishOptions.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                  </Select>
                  {fieldErr("english_capability")}
                </div>
              </div>
            )}

            {/* ── Step 3: Contact + Verification ── */}
            {step === 3 && (
              <div className="space-y-5">
                <h2 className="text-xl font-bold text-foreground">Contact & Verification</h2>

                {/* Email */}
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="your@email.com" maxLength={255} className={errors.email ? "border-destructive" : ""} disabled={form.email_verified} />
                  {fieldErr("email")}
                  {!form.email_verified ? (
                    <div className="flex items-center gap-2 mt-2">
                      {!emailCodeSent ? (
                        <Button type="button" variant="outline" size="sm" onClick={sendEmailCode}>
                          <Mail className="h-3 w-3" /> Send verification code
                        </Button>
                      ) : (
                        <>
                          <Input value={emailCode} onChange={(e) => setEmailCode(e.target.value)} placeholder="Enter code" maxLength={6} className="w-32" />
                          <Button type="button" size="sm" onClick={verifyEmail}>Verify</Button>
                        </>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-accent flex items-center gap-1 mt-1"><CheckCircle className="h-3 w-3" /> Email verified</p>
                  )}
                </div>

                {/* WhatsApp */}
                <div className="space-y-1.5">
                  <Label htmlFor="wa">WhatsApp Number *</Label>
                  <Input id="wa" value={form.whatsapp_number} onChange={(e) => set("whatsapp_number", e.target.value)} placeholder="+62 812 3456 7890" maxLength={20} className={errors.whatsapp_number ? "border-destructive" : ""} disabled={form.whatsapp_verified} />
                  {fieldErr("whatsapp_number")}
                  {!form.whatsapp_verified ? (
                    <div className="flex items-center gap-2 mt-2">
                      {!waCodeSent ? (
                        <Button type="button" variant="outline" size="sm" onClick={sendWaCode}>
                          <Phone className="h-3 w-3" /> Send verification code
                        </Button>
                      ) : (
                        <>
                          <Input value={waCode} onChange={(e) => setWaCode(e.target.value)} placeholder="Enter code" maxLength={6} className="w-32" />
                          <Button type="button" size="sm" onClick={verifyWa}>Verify</Button>
                        </>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-accent flex items-center gap-1 mt-1"><CheckCircle className="h-3 w-3" /> WhatsApp verified</p>
                  )}
                </div>

                <p className="text-xs text-muted-foreground">Verification is optional — you can still submit without verifying. We'll confirm manually.</p>
              </div>
            )}

            {/* ── Step 4: Motivation, Challenges, Support ── */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-foreground">Tell Us About Your Journey</h2>

                {multiSelect("motivations", motivationOptions, "Why do you want to work abroad?")}
                <div className="space-y-1.5">
                  <Label htmlFor="ms">Your story (optional)</Label>
                  <textarea id="ms" value={form.motivation_story} onChange={(e) => set("motivation_story", e.target.value)}
                    placeholder="Share what inspires you..." maxLength={1000}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm min-h-[80px] resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                </div>

                {multiSelect("challenges", challengeOptions, "What challenges are you facing?")}
                <div className="space-y-1.5">
                  <Label htmlFor="cs">Your story (optional)</Label>
                  <textarea id="cs" value={form.challenge_story} onChange={(e) => set("challenge_story", e.target.value)}
                    placeholder="What's been difficult?" maxLength={1000}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm min-h-[80px] resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                </div>

                {multiSelect("help_needed", helpOptions, "How can we help you?")}

                <p className="text-sm text-muted-foreground bg-muted rounded-lg p-4 border-l-4 border-accent italic">
                  "We are honored to support your journey." 💙
                </p>
              </div>
            )}

            {/* ── Step 5: Consent & Submit ── */}
            {step === 5 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-foreground">Consent & Submit</h2>
                <div className="bg-muted rounded-lg p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <Checkbox id="cc" checked={form.consent_contact} onCheckedChange={(v) => set("consent_contact", !!v)} className={errors.consent_contact ? "border-destructive" : ""} />
                    <Label htmlFor="cc" className="text-sm leading-relaxed cursor-pointer">
                      I consent to be contacted by Global Paro about international nursing opportunities. *
                    </Label>
                  </div>
                  {fieldErr("consent_contact")}

                  <div className="flex items-start gap-3">
                    <Checkbox id="cp" checked={form.consent_privacy} onCheckedChange={(v) => set("consent_privacy", !!v)} className={errors.consent_privacy ? "border-destructive" : ""} />
                    <Label htmlFor="cp" className="text-sm leading-relaxed cursor-pointer">
                      I accept the <Link to="/privacy" target="_blank" className="text-primary underline">Privacy Policy</Link> and understand how my data will be used. *
                    </Label>
                  </div>
                  {fieldErr("consent_privacy")}
                </div>

                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Lock className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                  <span>Your data is protected. We will only contact you with your consent. No fees. No spam.</span>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              {step > 1 ? (
                <Button variant="outline" onClick={back}><ArrowLeft className="h-4 w-4" /> Back</Button>
              ) : <div />}
              {step < 5 ? (
                <Button variant="cta" onClick={next}>Next <ArrowRight className="h-4 w-4" /></Button>
              ) : (
                <Button variant="cta" onClick={handleSubmit} disabled={createCandidate.isPending}>
                  {createCandidate.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
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
