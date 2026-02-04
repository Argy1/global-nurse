import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <p className="text-muted-foreground">
              Last updated: February 2025
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-4">Overview</h2>
            <p className="text-foreground leading-relaxed">
              Global Nurse is committed to protecting your privacy. This notice explains how we collect, 
              use, and safeguard your personal information when you use our services.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-4">Information We Collect</h2>
            <p className="text-foreground leading-relaxed mb-4">
              We collect information you provide directly, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground">
              <li>Contact information (name, email, phone number)</li>
              <li>Professional qualifications and experience</li>
              <li>Destination preferences and career goals</li>
              <li>Communication records with our team</li>
            </ul>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-4">How We Use Your Information</h2>
            <p className="text-foreground leading-relaxed mb-4">
              Your information is used to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground">
              <li>Match you with suitable job opportunities</li>
              <li>Communicate about your application and career journey</li>
              <li>Provide support and resources for your international career</li>
              <li>Improve our services and user experience</li>
            </ul>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-4">Information Sharing</h2>
            <p className="text-foreground leading-relaxed">
              We only share your information with potential employers when you've given explicit consent. 
              We never sell your data to third parties or share it for marketing purposes without your permission.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-4">Data Security</h2>
            <p className="text-foreground leading-relaxed">
              We implement industry-standard security measures to protect your personal information. 
              All data transmission is encrypted, and access is restricted to authorized personnel only.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-4">Your Rights</h2>
            <p className="text-foreground leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground">
              <li>Access your personal information</li>
              <li>Request corrections to your data</li>
              <li>Request deletion of your information</li>
              <li>Withdraw consent at any time</li>
              <li>Receive a copy of your data</li>
            </ul>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-4">Contact Us</h2>
            <p className="text-foreground leading-relaxed">
              For privacy-related inquiries or to exercise your rights, please contact us at{" "}
              <a href="mailto:globalparo@gmail.com" className="text-primary hover:underline">
                globalparo@gmail.com
              </a>.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-4">Updates to This Notice</h2>
            <p className="text-foreground leading-relaxed">
              We may update this privacy notice periodically. Significant changes will be communicated 
              through our website or via email.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
