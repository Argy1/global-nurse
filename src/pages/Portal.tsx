import { useAuth } from "@/hooks/useAuth";
import { useCandidateProfile } from "@/hooks/useCandidatePortal";
import { Layout } from "@/components/layout/Layout";
import { Loader2, User, FileText, MapPin, GraduationCap, Phone, Mail, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import StatusTracker from "@/components/portal/StatusTracker";
import DocumentUpload from "@/components/portal/DocumentUpload";

function Field({ icon: Icon, label, value }: { icon?: any; label: string; value: any }) {
  return (
    <div className="flex items-start gap-2">
      {Icon && <Icon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />}
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground">{value || "—"}</p>
      </div>
    </div>
  );
}

export default function Portal() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { data: candidate, isLoading, error } = useCandidateProfile();

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth?redirect=portal");
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!candidate) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center max-w-md space-y-4">
            <User className="h-12 w-12 text-muted-foreground mx-auto" />
            <h1 className="text-2xl font-bold text-foreground">No Application Found</h1>
            <p className="text-muted-foreground">
              We couldn't find an application linked to <strong>{user?.email}</strong>. 
              Make sure you registered with the same email address.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="cta" onClick={() => navigate("/register")}>Register Now</Button>
              <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-foreground">My Application</h1>
            <p className="text-sm text-muted-foreground">Welcome back, {candidate.full_name}</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleSignOut} className="gap-1">
            <LogOut className="h-4 w-4" /> Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Status Tracker */}
          <div className="lg:col-span-1 bg-card rounded-xl border border-border p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Your Journey</h2>
            <StatusTracker currentStage={candidate.journey_stage} />
          </div>

          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-bold text-foreground mb-4">Profile Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field icon={User} label="Full Name" value={candidate.full_name} />
                <Field icon={Mail} label="Email" value={candidate.email} />
                <Field icon={Phone} label="WhatsApp" value={candidate.whatsapp_number} />
                <Field icon={GraduationCap} label="University" value={candidate.university} />
                <Field label="Graduation Year" value={candidate.graduation_year} />
                <Field label="Profession" value={candidate.profession} />
                <Field label="Specialty" value={candidate.specialty} />
                <Field label="English Level" value={candidate.english_capability || candidate.english_level} />
                <Field label="License Status" value={candidate.license_status} />
                <Field label="Experience" value={candidate.experience_years ? `${candidate.experience_years} years` : null} />
                <Field icon={MapPin} label="Location" value={candidate.city_country} />
                <Field label="Target Countries" value={candidate.target_countries?.join(", ")} />
              </div>
            </div>

            {/* Document Upload */}
            <div className="bg-card rounded-xl border border-border p-6">
              <DocumentUpload candidateId={candidate.id} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
