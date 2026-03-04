import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, Users, FileText, MapPin, Check, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import nurseClipboard from "@/assets/nurse-clipboard.png";

export default function BatchProgram() {
  const benefits = [
    { label: "Salary (Net)", value: "1.1K – 1.2K SGD" },
    { label: "Housing Allowance", value: "500 SGD" },
    { label: "Airfare Subsidy", value: "1,000 SGD" },
    { label: "Annual Bonus", value: "2× Monthly Salary" },
    { label: "Medical Insurance", value: "Depends on Hospital" },
  ];

  return (
    <Layout>
      {/* Hero — teal split panel */}
      <section className="relative overflow-hidden" style={{ minHeight: 420, background: "#03989E" }}>
        {/* Red diagonal ribbon — "50 NURSES ONLY" */}
        <div
          className="absolute top-0 left-0 z-20 overflow-hidden"
          style={{ width: 220, height: 220 }}
        >
          <div
            className="absolute flex items-center justify-center font-black text-white uppercase text-center leading-tight"
            style={{
              background: "#e53e3e",
              width: 300,
              height: 56,
              top: 72,
              left: -58,
              transform: "rotate(-45deg)",
              fontSize: 13,
              letterSpacing: "0.05em",
            }}
          >
            50&nbsp;NURSES&nbsp;ONLY
          </div>
        </div>

        {/* Left: nurse image */}
        <div className="absolute left-0 top-0 bottom-0 w-full lg:w-1/2">
          <img
            src={nurseClipboard}
            alt="Healthcare professional"
            className="w-full h-full object-cover object-center"
            style={{ opacity: 0.92 }}
          />
          {/* gradient overlay blending into teal */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to right, transparent 40%, #03989E 100%)",
            }}
          />
        </div>

        {/* Right: info card */}
        <div className="relative z-10 container flex justify-end py-12 lg:py-16">
          <div
            className="w-full lg:w-1/2 lg:pl-12 bg-white rounded-2xl p-8 shadow-2xl"
            style={{ maxWidth: 480 }}
          >
            {/* folded corner accent */}
            <div className="relative">
              <div
                className="absolute -bottom-8 -right-8 w-12 h-12"
                style={{
                  background: "linear-gradient(135deg, transparent 50%, #03989E 50%)",
                }}
              />
            </div>

            <p className="text-sm font-bold uppercase tracking-widest mb-1" style={{ color: "#015779" }}>
              🇸🇬 Singapore
            </p>
            <h1 className="text-3xl lg:text-4xl font-black mb-4" style={{ color: "#015779" }}>
              Nurse in Singapore
            </h1>

            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <span className="text-base">🚀</span> Batch #1
              </li>
              <li className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <span className="text-base">•</span> Deployment timeline: 31st May 2026
              </li>
              <li className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <span className="text-base">•</span> Registration open until 15th March 2026
              </li>
            </ul>

            <Button asChild className="w-full font-bold text-white" style={{ backgroundColor: "#03989E" }}>
              <Link to="/register">
                Apply Now <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Page title overlay — bottom left */}
        <div className="absolute bottom-6 left-0 z-10 container hidden lg:block">
          <h2 className="text-4xl font-black text-white">Programs</h2>
          <p className="text-white/80 text-sm mt-1">Join 1000+ Indonesian Nurses Building Their Global Healthcare Careers</p>
        </div>
      </section>

      {/* Mobile title */}
      <section className="lg:hidden py-6 px-4 text-center" style={{ background: "#015779" }}>
        <h2 className="text-2xl font-black text-white">Programs</h2>
        <p className="text-white/70 text-sm mt-1">Join 1000+ Indonesian Nurses Building Their Global Healthcare Careers</p>
      </section>

      {/* Batch Details */}
      <section className="py-16 bg-muted">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-2xl font-extrabold text-foreground mb-8 text-center">Batch #1 — Program Details</h2>
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {[
              { icon: Users, label: "Role", value: "Healthcare Assistant (HCA)" },
              { icon: FileText, label: "Contract", value: "2 Years Contract" },
              { icon: MapPin, label: "Employer", value: "Gov't / Private Hospitals & Nursing Homes" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-card rounded-xl p-5 border border-border shadow-card flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#03989E20" }}>
                  <Icon className="h-5 w-5" style={{ color: "#03989E" }} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold mb-0.5">{label}</p>
                  <p className="font-semibold text-foreground text-sm">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Deployment badge */}
          <div className="flex items-center gap-3 p-4 rounded-xl border mb-10" style={{ background: "#03989E15", borderColor: "#03989E40" }}>
            <Calendar className="h-5 w-5 shrink-0" style={{ color: "#03989E" }} />
            <p className="text-sm font-semibold text-foreground">
              📅 Deployment: 31st May 2026 &nbsp;|&nbsp; 📝 Registration closes: 15th March 2026
            </p>
          </div>

          {/* Compensation */}
          <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
            <div className="px-6 py-4 flex items-center gap-3" style={{ background: "#015779" }}>
              <Award className="h-5 w-5 text-white" />
              <h3 className="font-bold text-white">Compensation Package</h3>
            </div>
            <div className="p-6 space-y-3">
              {benefits.map((b) => (
                <div key={b.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-sm text-muted-foreground">{b.label}</span>
                  <span className="font-bold text-sm" style={{ color: "#015779" }}>{b.value}</span>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 text-sm font-medium" style={{ background: "#03989E15", color: "#03989E" }}>
              📈 Career path: HCA → Enrolled Nurse → Registered Nurse opportunities available
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14" style={{ background: "linear-gradient(135deg, #015779 0%, #03989E 100%)" }}>
        <div className="container text-center">
          <h2 className="text-2xl font-extrabold text-white mb-3">Ready to Secure Your Spot?</h2>
          <p className="text-white/80 mb-6 text-sm">Only 50 nurses will be selected for Batch #1. Don't miss your chance.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="font-bold text-white" style={{ backgroundColor: "#e53e3e" }}>
              <Link to="/register">Register Now — Batch #1 <ArrowRight className="h-4 w-4 ml-1" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-bold border-white text-white hover:bg-white/10">
              <Link to="/programs/requirements">View Requirements</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
