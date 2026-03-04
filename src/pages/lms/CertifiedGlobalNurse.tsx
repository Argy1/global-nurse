import { Layout } from "@/components/layout/Layout";
import { Award, ExternalLink, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  "Completed nursing education (Diploma/Bachelor)",
  "Active STR / SIP license",
  "IELTS score minimum 6.0",
  "Pass the CGN assessment exam",
  "Complete CGN certification program",
];

const CGN_URL = "https://itc-indonesia.com/certified-global-nurse-cgn-2/";

export default function CertifiedGlobalNurse() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-white border-b border-border py-10 lg:py-14">
        <div className="container max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "#01577920" }}
            >
              <Award className="h-5 w-5" style={{ color: "#015779" }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold" style={{ color: "#015779" }}>
                  CGN (Certified Global Nurse)
                </h1>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: "#FFD600", color: "#015779" }}
                >
                  Coming Soon
                </span>
              </div>
              <p className="text-sm" style={{ color: "#03989E" }}>
                Syarat untuk ujian NCLEX
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main card */}
      <section className="py-10 bg-muted">
        <div className="container max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-border">
            <div className="flex items-start gap-4 mb-6">
              <div
                className="h-12 w-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: "#01577915" }}
              >
                <Award className="h-6 w-6" style={{ color: "#015779" }} />
              </div>
              <div>
                <h2 className="font-extrabold text-xl" style={{ color: "#015779" }}>
                  CGN (Certified Global Nurse)
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Syarat untuk ujian NCLEX
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Certified Global Nurse (CGN) adalah sertifikasi yang diterbitkan oleh ITC Indonesia, yang merupakan
              syarat penting untuk mengikuti ujian NCLEX bagi perawat Indonesia yang ingin bekerja di luar negeri,
              khususnya di Amerika Serikat.
            </p>

            {/* Official hyperlink card — matches reference */}
            <div className="border-l-4 rounded-lg p-5 mb-6" style={{ borderColor: "#015779", backgroundColor: "#01577908" }}>
              <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">
                Official Resource
              </p>
              <a
                href={CGN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-semibold text-sm break-all hover:underline"
                style={{ color: "#015779" }}
              >
                <ExternalLink className="h-4 w-4 shrink-0" />
                {CGN_URL}
              </a>
            </div>

            {/* Prerequisites */}
            <h3 className="font-bold text-sm mb-4" style={{ color: "#015779" }}>
              Persyaratan CGN
            </h3>
            <ul className="space-y-3">
              {steps.map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" style={{ color: "#03989E" }} />
                  <span className="text-sm text-foreground">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* More info section */}
      <section className="py-10 lg:py-14">
        <div className="container max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <h3 className="font-bold mb-3" style={{ color: "#015779" }}>Mengapa CGN Penting?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                CGN menjadi jembatan antara lisensi keperawatan Indonesia (STR/SIP) dengan persyaratan
                internasional, khususnya untuk pendaftaran ujian NCLEX-RN yang dikelola oleh NCSBN.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <h3 className="font-bold mb-3" style={{ color: "#015779" }}>Dukungan Global Paro</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Global Paro membantu kandidat mempersiapkan semua dokumen dan persyaratan CGN,
                termasuk verifikasi lisensi, terjemahan resmi, dan proses pendaftaran dari awal hingga selesai.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-12"
        style={{ background: "linear-gradient(135deg, #015779 0%, #03989E 100%)" }}
      >
        <div className="container text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-extrabold text-white mb-3">
            Ready to Start Learning?
          </h2>
          <p className="text-white/80 mb-8 text-sm">
            Register to get personalized learning recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 px-8 h-12 rounded-xl font-bold text-white border-2 border-white hover:bg-white hover:text-primary transition-all"
            >
              Register Now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/quickstart"
              className="inline-flex items-center justify-center gap-2 px-8 h-12 rounded-xl font-bold border-2 border-white/40 text-white hover:bg-white/10 transition-all"
            >
              Quickstart Guide
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
