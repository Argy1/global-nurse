import { useParams, Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Clock, DollarSign, FileCheck, CheckCircle, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const pathwayData: Record<string, {
  country: string;
  flag: string;
  heroText: string;
  description: string;
  processingTime: string;
  avgSalary: string;
  requirements: string[];
  process: { step: number; title: string; description: string }[];
  highlights: string[];
  faqs: { q: string; a: string }[];
}> = {
  uk: {
    country: "United Kingdom",
    flag: "🇬🇧",
    heroText: "Build Your Career in the NHS",
    description: "The UK offers incredible opportunities for international nurses through the NHS and private healthcare sector. With a structured pathway, excellent training, and career progression opportunities, the UK remains one of the top destinations for nursing professionals worldwide.",
    processingTime: "4-8 months",
    avgSalary: "£28,000 - £45,000",
    requirements: [
      "Valid nursing qualification (BSN or equivalent)",
      "English language proficiency (IELTS 7.0 or OET B)",
      "Pass the OSCE (Objective Structured Clinical Examination)",
      "NMC registration",
      "CBT (Computer-Based Test) pass",
    ],
    process: [
      { step: 1, title: "Apply with Global Nurse", description: "Submit your application and we'll match you with suitable employers." },
      { step: 2, title: "English Test", description: "Complete IELTS or OET to meet the language requirement." },
      { step: 3, title: "NMC Application", description: "We'll guide you through the Nursing & Midwifery Council registration." },
      { step: 4, title: "CBT Exam", description: "Pass the Computer-Based Test to demonstrate your nursing knowledge." },
      { step: 5, title: "Visa & Travel", description: "Receive your visa and travel to the UK with our support." },
      { step: 6, title: "OSCE & Work", description: "Complete your OSCE and begin your nursing career in the UK!" },
    ],
    highlights: [
      "NHS Pension Scheme",
      "27+ days annual leave",
      "Free NHS healthcare",
      "Career progression pathways",
      "Family visa options",
      "Path to permanent residency",
    ],
    faqs: [
      { q: "How long does the entire process take?", a: "Typically 4-8 months from application to starting work, depending on your preparation and visa processing times." },
      { q: "Will I be charged any fees?", a: "No. Global Nurse never charges nurses. All recruitment fees are paid by employers." },
      { q: "Can I bring my family?", a: "Yes! The Health & Care Worker visa allows you to bring your spouse and children." },
    ],
  },
  usa: {
    country: "United States",
    flag: "🇺🇸",
    heroText: "Pursue the American Dream in Healthcare",
    description: "The USA offers some of the highest nursing salaries globally, with opportunities across all 50 states. With visa sponsorship, sign-on bonuses, and diverse specialty options, American hospitals actively recruit international nurses.",
    processingTime: "12-24 months",
    avgSalary: "$65,000 - $120,000",
    requirements: [
      "BSN degree (Bachelor of Science in Nursing)",
      "NCLEX-RN license",
      "English proficiency (TOEFL/IELTS)",
      "VisaScreen certificate (CGFNS)",
      "State licensure",
    ],
    process: [
      { step: 1, title: "Apply with Global Nurse", description: "We connect you with verified US healthcare employers." },
      { step: 2, title: "Credential Evaluation", description: "Complete CGFNS evaluation and VisaScreen certification." },
      { step: 3, title: "NCLEX Preparation", description: "Study for and pass the NCLEX-RN examination." },
      { step: 4, title: "Employer Match", description: "Interview with hospitals and receive a job offer." },
      { step: 5, title: "Visa Processing", description: "Complete immigration paperwork for your work visa." },
      { step: 6, title: "Relocation", description: "Move to the US with employer-provided relocation support." },
    ],
    highlights: [
      "Highest nursing salaries",
      "Sign-on bonuses up to $30,000",
      "Diverse specialty options",
      "Continuing education support",
      "Green card sponsorship",
      "Relocation packages",
    ],
    faqs: [
      { q: "Which visa do nurses typically get?", a: "Most nurses receive an EB-3 immigrant visa or H-1B work visa with a path to green card." },
      { q: "How hard is the NCLEX?", a: "With proper preparation (which we provide), international nurses have strong pass rates. We offer study resources and support." },
      { q: "Which states have the most opportunities?", a: "California, Texas, Florida, and New York have the most openings, but opportunities exist in all states." },
    ],
  },
  canada: {
    country: "Canada",
    flag: "🇨🇦",
    heroText: "Your Path to Canadian Healthcare",
    description: "Canada offers excellent work-life balance, competitive salaries, and a clear pathway to permanent residency. With provincial nursing programs and a welcoming immigration policy, Canada is ideal for nurses seeking long-term settlement.",
    processingTime: "6-12 months",
    avgSalary: "CAD $70,000 - $95,000",
    requirements: [
      "Nursing degree (diploma or BSN)",
      "NNAS assessment completion",
      "Provincial regulatory body registration",
      "English/French proficiency (IELTS/TEF)",
      "Provincial licensure exam",
    ],
    process: [
      { step: 1, title: "Apply with Global Nurse", description: "Start your journey with our Canada pathway experts." },
      { step: 2, title: "NNAS Application", description: "Submit your credentials to the National Nursing Assessment Service." },
      { step: 3, title: "Provincial Application", description: "Apply to your chosen provincial nursing regulatory body." },
      { step: 4, title: "Bridging/Exams", description: "Complete any required bridging programs or exams." },
      { step: 5, title: "Job Placement", description: "Interview with healthcare employers across Canada." },
      { step: 6, title: "Immigration", description: "Apply for work permit or permanent residency." },
    ],
    highlights: [
      "Clear PR pathway",
      "Universal healthcare",
      "Strong nursing unions",
      "Excellent work-life balance",
      "Safe, welcoming communities",
      "Provincial nomination programs",
    ],
    faqs: [
      { q: "Can I get permanent residency as a nurse?", a: "Yes! Nurses are in high demand and qualify for Express Entry and Provincial Nominee Programs." },
      { q: "Which province is best for nurses?", a: "Ontario, British Columbia, and Alberta have the most positions, but all provinces are actively recruiting." },
      { q: "Do I need to speak French?", a: "Only for Quebec. All other provinces primarily use English in healthcare settings." },
    ],
  },
  australia: {
    country: "Australia",
    flag: "🇦🇺",
    heroText: "Nursing in the Land Down Under",
    description: "Australia offers an incredible quality of life with competitive salaries, sunny weather, and a robust healthcare system. With strong nursing unions and excellent working conditions, Australia is a top choice for international nurses.",
    processingTime: "3-9 months",
    avgSalary: "AUD $75,000 - $110,000",
    requirements: [
      "Nursing qualification (degree or diploma)",
      "AHPRA registration",
      "English proficiency (IELTS 7.0 or OET B)",
      "Skills assessment (ANMAC)",
      "Working with Children Check",
    ],
    process: [
      { step: 1, title: "Apply with Global Nurse", description: "Connect with our Australia migration specialists." },
      { step: 2, title: "Skills Assessment", description: "Complete ANMAC assessment of your qualifications." },
      { step: 3, title: "English Test", description: "Achieve required IELTS or OET scores." },
      { step: 4, title: "AHPRA Registration", description: "Apply for nursing registration with AHPRA." },
      { step: 5, title: "Visa Application", description: "Apply for skilled worker or employer-sponsored visa." },
      { step: 6, title: "Start Working", description: "Begin your Australian nursing career!" },
    ],
    highlights: [
      "High quality of life",
      "Strong nursing unions",
      "Competitive penalty rates",
      "Beach lifestyle",
      "Multicultural society",
      "Path to citizenship",
    ],
    faqs: [
      { q: "What visa options are available?", a: "Nurses can apply for Skilled Independent (189), Skilled Nominated (190), or employer-sponsored visas." },
      { q: "How much do nurses earn in Australia?", a: "Base salaries range from $75,000-$110,000 AUD, with penalty rates for weekends and nights." },
      { q: "Is it easy to get PR in Australia?", a: "Nurses are on the priority skills list, making permanent residency more accessible." },
    ],
  },
  germany: {
    country: "Germany",
    flag: "🇩🇪",
    heroText: "Nursing Excellence in Germany",
    description: "Germany has a growing demand for qualified nurses with excellent working conditions and social benefits. With free education opportunities and EU mobility, Germany offers a unique pathway for nursing professionals.",
    processingTime: "8-14 months",
    avgSalary: "€35,000 - €50,000",
    requirements: [
      "Nursing qualification",
      "German language B2 level",
      "Recognition of qualifications",
      "Adaptation period or exam",
      "Health and character checks",
    ],
    process: [
      { step: 1, title: "Apply with Global Nurse", description: "Start with our Germany pathway team." },
      { step: 2, title: "German Language", description: "Complete German language training to B2 level." },
      { step: 3, title: "Recognition", description: "Apply for qualification recognition in your target state." },
      { step: 4, title: "Employer Match", description: "Connect with German healthcare employers." },
      { step: 5, title: "Visa & Travel", description: "Obtain your work visa and relocate." },
      { step: 6, title: "Adaptation", description: "Complete adaptation measures and begin full practice." },
    ],
    highlights: [
      "Strong labor laws",
      "EU freedom of movement",
      "Free further education",
      "Excellent social benefits",
      "Central European location",
      "Path to citizenship",
    ],
    faqs: [
      { q: "Do I need to know German?", a: "Yes, B2 level German is required for nursing registration. We provide language training support." },
      { q: "How long is the recognition process?", a: "Typically 3-6 months, depending on your qualifications and the federal state." },
      { q: "Can I work in other EU countries afterwards?", a: "Yes! Once recognized in Germany, you have EU-wide mobility as a nurse." },
    ],
  },
  ireland: {
    country: "Ireland",
    flag: "🇮🇪",
    heroText: "Nursing in the Emerald Isle",
    description: "Ireland offers a warm welcome to international nurses with English-speaking hospitals, EU benefits, and a growing healthcare sector. With a relatively quick registration process and excellent quality of life, Ireland is increasingly popular among nurses.",
    processingTime: "3-6 months",
    avgSalary: "€35,000 - €55,000",
    requirements: [
      "Nursing degree",
      "NMBI registration",
      "English proficiency proof",
      "Character references",
      "Adaptation program (if required)",
    ],
    process: [
      { step: 1, title: "Apply with Global Nurse", description: "Connect with our Ireland nursing specialists." },
      { step: 2, title: "NMBI Application", description: "Apply to the Nursing & Midwifery Board of Ireland." },
      { step: 3, title: "Document Verification", description: "Submit verified qualifications and references." },
      { step: 4, title: "Employer Match", description: "Interview with Irish healthcare providers." },
      { step: 5, title: "Visa Processing", description: "Complete work permit or Stamp 4 application." },
      { step: 6, title: "Relocation", description: "Move to Ireland and begin your career!" },
    ],
    highlights: [
      "English-speaking",
      "EU membership benefits",
      "Friendly culture",
      "Growing healthcare sector",
      "Path to EU citizenship",
      "High quality of life",
    ],
    faqs: [
      { q: "Is Ireland part of the EU?", a: "Yes! Working in Ireland gives you access to EU benefits and eventual EU citizenship." },
      { q: "What's the cost of living like?", a: "Dublin is expensive, but regional areas offer good value. Salaries are competitive for the cost of living." },
      { q: "How quick is the registration process?", a: "Typically 3-6 months from application to registration, one of the faster EU processes." },
    ],
  },
};

export default function PathwayDetail() {
  const { slug } = useParams<{ slug: string }>();
  const pathway = slug ? pathwayData[slug] : null;

  if (!pathway) {
    return (
      <Layout>
        <section className="py-24 text-center">
          <div className="container">
            <h1 className="text-3xl font-bold mb-4">Pathway Not Found</h1>
            <p className="text-muted-foreground mb-8">The pathway you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/pathways">
                <ArrowLeft className="h-4 w-4" />
                Back to Pathways
              </Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-hero py-12 lg:py-20">
        <div className="container">
          <Link 
            to="/pathways" 
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            All Pathways
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{pathway.flag}</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground">
              {pathway.country}
            </h1>
          </div>
          <p className="text-xl text-primary-foreground/90 max-w-2xl">
            {pathway.heroText}
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-card border-y border-border py-6">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Processing Time</p>
                <p className="font-bold text-foreground">{pathway.processingTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Avg. Salary</p>
                <p className="font-bold text-foreground">{pathway.avgSalary}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FileCheck className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Requirements</p>
                <p className="font-bold text-foreground">{pathway.requirements.length} Steps</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Support Level</p>
                <p className="font-bold text-foreground">Full Guidance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">{pathway.description}</p>
              </div>

              {/* Process */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Your Journey</h2>
                <div className="space-y-4">
                  {pathway.process.map((step, index) => (
                    <div key={step.step} className="flex gap-4">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        {step.step}
                      </div>
                      <div className="flex-1 pb-4 border-b border-border last:border-0">
                        <h3 className="font-bold text-foreground">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {pathway.requirements.map((req) => (
                    <li key={req} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* FAQs */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Common Questions</h2>
                <div className="space-y-4">
                  {pathway.faqs.map((faq) => (
                    <div key={faq.q} className="bg-muted rounded-lg p-4">
                      <h3 className="font-bold text-foreground mb-2">{faq.q}</h3>
                      <p className="text-muted-foreground">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl p-6 shadow-card border border-border sticky top-24">
                <h3 className="font-bold text-lg mb-4 text-foreground">Why {pathway.country}?</h3>
                <ul className="space-y-3 mb-6">
                  {pathway.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      <span className="text-foreground text-sm">{highlight}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="cta" className="w-full mb-3" asChild>
                  <Link to="/apply">
                    Apply for {pathway.country}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="whatsappOutline" className="w-full" asChild>
                  <Link to="/community">
                    Join Community
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
