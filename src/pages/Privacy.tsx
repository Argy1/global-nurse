import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Database, UserCheck, Trash2, Mail } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

export default function Privacy() {
  return (
    <Layout>
      {/* Header */}
      <section className="gradient-hero py-12">
        <div className="container">
          <div className="max-w-3xl">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary-foreground">
              Privacy Notice
            </h1>
            <p className="text-lg text-primary-foreground/80 mt-4">
              Last updated: February 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Overview */}
            <div className="bg-card rounded-xl p-6 lg:p-8 shadow-card border border-border mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Our Commitment</h2>
              </div>
              <p className="text-muted-foreground">
                Global Paro is committed to protecting your privacy. This notice explains how we collect, 
                use, and safeguard your personal information when you use our services. We provide guidance and support — we do not guarantee employment outcomes.
              </p>
            </div>

            {/* Data Collection */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Database className="h-6 w-6 text-accent" />
                <h2 className="text-xl font-bold text-foreground">What Data We Collect in the Application Form</h2>
              </div>
              <div className="bg-muted rounded-lg p-6">
                <p className="text-foreground mb-4">When you submit an application, we collect:</p>
                <ul className="space-y-2 text-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Contact Information:</strong> Full name, WhatsApp number, email (optional), city/country</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Professional Details:</strong> Profession, education level, graduation year, years of experience, specialty, license status</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Career Preferences:</strong> English level, target countries, availability, CV link (optional)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Consent Records:</strong> Your consent to be contacted and acceptance of this privacy policy</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Consent */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <UserCheck className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-bold text-foreground">How We Use Your Data & Consent</h2>
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Your information is used to:
                </p>
                <ul className="space-y-2 text-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent">✓</span>
                    Match you with suitable job opportunities based on your qualifications
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">✓</span>
                    Communicate with you about your application and career journey
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">✓</span>
                    Provide support and resources for your international nursing career
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">✓</span>
                    Improve our services and user experience
                  </li>
                </ul>
                <p className="text-muted-foreground">
                  <strong>Important:</strong> We only share your information with potential employers 
                  when you've given explicit consent. We never sell your data to third parties.
                </p>
              </div>
            </div>

            {/* Data Deletion */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Trash2 className="h-6 w-6 text-destructive" />
                <h2 className="text-xl font-bold text-foreground">How to Request Data Deletion</h2>
              </div>
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
                <p className="text-foreground mb-4">
                  You have the right to request deletion of your personal information at any time.
                </p>
                <p className="text-foreground mb-4">
                  To request deletion, please email us at:
                </p>
                <a 
                  href="mailto:globalparo@gmail.com?subject=Data Deletion Request" 
                  className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
                >
                  <Mail className="h-5 w-5" />
                  globalparo@gmail.com
                </a>
                <p className="text-sm text-muted-foreground mt-4">
                  Include "Data Deletion Request" in the subject line and provide your full name and 
                  WhatsApp number for verification. We will process your request within 30 days.
                </p>
              </div>
            </div>

            {/* Your Rights */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-foreground mb-4">Your Rights</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-card rounded-lg p-4 border border-border">
                  <h3 className="font-medium text-foreground mb-2">Access</h3>
                  <p className="text-sm text-muted-foreground">Request a copy of your personal data</p>
                </div>
                <div className="bg-card rounded-lg p-4 border border-border">
                  <h3 className="font-medium text-foreground mb-2">Correction</h3>
                  <p className="text-sm text-muted-foreground">Request corrections to inaccurate data</p>
                </div>
                <div className="bg-card rounded-lg p-4 border border-border">
                  <h3 className="font-medium text-foreground mb-2">Deletion</h3>
                  <p className="text-sm text-muted-foreground">Request removal of your information</p>
                </div>
                <div className="bg-card rounded-lg p-4 border border-border">
                  <h3 className="font-medium text-foreground mb-2">Withdraw Consent</h3>
                  <p className="text-sm text-muted-foreground">Revoke consent at any time</p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-primary/5 border border-primary/10 rounded-lg p-6 text-center">
              <h2 className="text-xl font-bold text-foreground mb-2">Questions About Your Privacy?</h2>
              <p className="text-muted-foreground mb-4">
                For any privacy-related inquiries, please contact us.
              </p>
              <a 
                href="mailto:globalparo@gmail.com" 
                className="text-primary font-bold hover:underline"
              >
                globalparo@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
