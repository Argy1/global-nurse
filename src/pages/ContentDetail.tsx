import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Share2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const contentData: Record<string, {
  title: string;
  description: string;
  category: string;
  readTime: string;
  content: string[];
}> = {
  "complete-guide-uk-nursing": {
    title: "Complete Guide to UK Nursing Registration",
    description: "Everything you need to know about NMC registration, OSCE preparation, and starting your NHS career.",
    category: "UK Pathway",
    readTime: "15 min read",
    content: [
      "The United Kingdom remains one of the most popular destinations for international nurses, offering excellent career opportunities through the NHS and private healthcare sectors. This comprehensive guide covers everything you need to know about the registration process.",
      "## Understanding NMC Registration",
      "The Nursing & Midwifery Council (NMC) is the regulatory body for nurses in the UK. To work as a nurse in the UK, you must be registered with the NMC. The registration process involves several steps designed to ensure you meet the standards required for safe and effective practice.",
      "## Step 1: English Language Requirements",
      "You must demonstrate English language proficiency through one of these approved tests:\n- IELTS Academic: Overall score of 7.0 with at least 7.0 in reading, listening, and speaking, and at least 6.5 in writing\n- OET: Grade B in all four components (reading, writing, listening, speaking)",
      "## Step 2: Apply to the NMC",
      "Create an account on the NMC Online portal and submit your application with supporting documents including your nursing qualification certificates, ID verification, and good character references.",
      "## Step 3: Computer-Based Test (CBT)",
      "The CBT tests your theoretical nursing knowledge. It covers adult nursing, children's nursing, mental health, and learning disabilities. The test consists of 120 questions to be completed in 4 hours.",
      "## Step 4: OSCE Examination",
      "The Objective Structured Clinical Examination (OSCE) assesses your practical nursing skills. It consists of multiple stations testing different competencies including patient assessment, clinical procedures, and communication.",
      "## Preparing for the OSCE",
      "Success in the OSCE requires thorough preparation. We recommend joining study groups, practicing scenarios with peers, and using official NMC preparation materials. Many nurses find that 3-6 months of dedicated preparation is sufficient.",
      "## After Registration",
      "Once registered, you can begin applying for nursing positions in the UK. Most employers offer induction programs for international nurses, helping you adapt to UK healthcare practices and systems.",
    ],
  },
  "nclex-study-tips": {
    title: "Top 10 NCLEX Study Tips from Successful Nurses",
    description: "Proven strategies and resources that helped international nurses pass the NCLEX on their first attempt.",
    category: "USA Pathway",
    readTime: "8 min read",
    content: [
      "Passing the NCLEX-RN examination is a crucial step for nurses seeking to work in the United States. We surveyed over 500 international nurses who passed on their first attempt to bring you their best study tips.",
      "## 1. Understand the NCLEX Format",
      "The NCLEX uses Computerized Adaptive Testing (CAT), which adjusts question difficulty based on your performance. Understanding this format helps reduce anxiety and develop effective test-taking strategies.",
      "## 2. Create a Study Schedule",
      "Most successful candidates studied for 2-4 months, dedicating 4-6 hours daily. Create a realistic schedule that covers all content areas while allowing for breaks and self-care.",
      "## 3. Use Multiple Resources",
      "Don't rely on a single study resource. Combine comprehensive review books, question banks, and video lectures for well-rounded preparation.",
      "## 4. Practice, Practice, Practice",
      "Complete at least 2,000-3,000 practice questions. Focus on understanding the rationale behind correct and incorrect answers, not just memorizing facts.",
      "## 5. Master Prioritization Questions",
      "NCLEX loves prioritization questions. Practice using frameworks like Maslow's Hierarchy of Needs and ABCs (Airway, Breathing, Circulation) to guide your decision-making.",
      "## 6. Join Study Groups",
      "Connect with other nurses preparing for the NCLEX. Study groups provide accountability, different perspectives, and emotional support.",
      "## 7. Take Timed Practice Tests",
      "Simulate test conditions regularly. This builds stamina and helps you manage time effectively during the actual exam.",
      "## 8. Focus on Weak Areas",
      "Use practice test results to identify weak content areas. Spend extra time strengthening these areas rather than reviewing what you already know.",
      "## 9. Rest Before the Exam",
      "In the final days before your exam, reduce study intensity. Ensure you're well-rested and mentally prepared on exam day.",
      "## 10. Trust Your Preparation",
      "On exam day, trust the work you've put in. Stay calm, read questions carefully, and use the strategies you've practiced.",
    ],
  },
  "avoiding-recruitment-scams": {
    title: "How to Avoid Nursing Recruitment Scams",
    description: "Red flags to watch for and how to verify legitimate recruitment agencies.",
    category: "Safety",
    readTime: "10 min read",
    content: [
      "Unfortunately, the international nursing recruitment industry has bad actors who exploit nurses seeking opportunities abroad. This guide helps you identify and avoid scams.",
      "## Red Flag #1: Upfront Fees",
      "Legitimate recruitment agencies NEVER charge nurses fees. All costs should be covered by employers. If an agency asks you to pay for recruitment, job placement, or processing fees, it's likely a scam.",
      "## Red Flag #2: Vague Job Details",
      "Scammers often provide vague information about the job, employer, or location. Legitimate offers include specific details about the healthcare facility, position, salary, and benefits.",
      "## Red Flag #3: Pressure Tactics",
      "Be wary of agencies that pressure you to make quick decisions or sign contracts without time to review. Legitimate recruiters understand you need time to consider such important decisions.",
      "## Red Flag #4: Unprofessional Communication",
      "Poor grammar, generic email addresses (Gmail, Yahoo), and reluctance to provide verifiable contact information are warning signs.",
      "## How to Verify an Agency",
      "- Check registration with relevant nursing councils\n- Look for reviews from other nurses\n- Verify their employer partnerships\n- Request references from nurses they've placed\n- Research their business registration and history",
      "## What Legitimate Agencies Offer",
      "Legitimate agencies:\n- Never charge nurses\n- Provide clear written contracts\n- Have verifiable employer relationships\n- Offer transparent communication\n- Support you throughout the process\n- Have proper licensing and registration",
      "## Report Suspicious Activity",
      "If you encounter a suspected scam, report it to relevant authorities and warn other nurses in community groups. Your report could protect someone else from exploitation.",
    ],
  },
};

export default function ContentDetail() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? contentData[slug] : null;

  if (!article) {
    return (
      <Layout>
        <section className="py-24 text-center">
          <div className="container">
            <h1 className="text-3xl font-bold mb-4">Content Not Found</h1>
            <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/content">
                <ArrowLeft className="h-4 w-4" />
                Back to Content Hub
              </Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <section className="gradient-hero py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl">
            <Link 
              to="/content" 
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              All Resources
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-primary-foreground/20 text-primary-foreground text-sm font-medium rounded-full">
                {article.category}
              </span>
              <span className="text-primary-foreground/80 text-sm flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {article.readTime}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4">
              {article.title}
            </h1>
            <p className="text-lg text-primary-foreground/90">{article.description}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
            <article className="lg:col-span-3 prose prose-lg max-w-none">
              {article.content.map((paragraph, index) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2 key={index} className="text-xl font-bold text-foreground mt-8 mb-4">
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }
                if (paragraph.includes("\n-")) {
                  const [intro, ...items] = paragraph.split("\n-");
                  return (
                    <div key={index}>
                      <p className="text-foreground leading-relaxed mb-2">{intro}</p>
                      <ul className="list-disc pl-6 space-y-1">
                        {items.map((item, i) => (
                          <li key={i} className="text-foreground">{item.trim()}</li>
                        ))}
                      </ul>
                    </div>
                  );
                }
                return (
                  <p key={index} className="text-foreground leading-relaxed mb-4">
                    {paragraph}
                  </p>
                );
              })}
            </article>
            
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-card rounded-xl p-6 shadow-card border border-border sticky top-24">
                <h3 className="font-bold text-foreground mb-4">Ready to Start?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Take the first step toward your international nursing career.
                </p>
                <Button variant="cta" className="w-full mb-3" asChild>
                  <Link to="/apply">Apply Now</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/community">Join Community</Link>
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* More Content */}
      <section className="py-12 lg:py-16 bg-muted">
        <div className="container text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Continue Learning</h2>
          <p className="text-muted-foreground mb-6">Explore more resources to support your journey.</p>
          <Button variant="outline" asChild>
            <Link to="/content">
              <BookOpen className="h-4 w-4" />
              View All Resources
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
