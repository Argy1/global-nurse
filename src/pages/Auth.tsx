import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type View = "login" | "signup" | "forgot";

export default function Auth() {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect");
  const [view, setView] = useState<View>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (view === "login") {
        await signIn(email, password);
        navigate(redirectTo === "portal" ? "/portal" : "/admin");
      } else if (view === "signup") {
        await signUp(email, password, displayName);
        toast({ title: "Check your email", description: "We sent you a confirmation link." });
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        toast({ title: "Reset link sent", description: "Check your email for the password reset link." });
        setView("login");
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Something went wrong", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const isPortal = redirectTo === "portal";

  const titles: Record<View, string> = {
    login: isPortal ? "Candidate Login" : "Admin Login",
    signup: "Create Account",
    forgot: "Forgot Password",
  };

  const subtitles: Record<View, string> = {
    login: isPortal ? "Sign in to view your application status." : "Sign in to access the admin panel.",
    signup: isPortal ? "Create an account to track your application." : "Create an admin account.",
    forgot: "Enter your email and we'll send you a reset link.",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <div className="w-full max-w-md bg-card rounded-xl p-8 shadow-card border border-border">
        <h1 className="text-2xl font-extrabold text-foreground mb-2">{titles[view]}</h1>
        <p className="text-sm text-muted-foreground mb-6">{subtitles[view]}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {view === "signup" && (
            <div className="space-y-1">
              <Label htmlFor="displayName">Display Name</Label>
              <Input id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your name" />
            </div>
          )}
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={isPortal ? "your@email.com" : "admin@example.com"} required />
          </div>
          {view !== "forgot" && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {view === "login" && (
                  <button type="button" onClick={() => setView("forgot")} className="text-xs text-primary hover:underline">
                    Forgot password?
                  </button>
                )}
              </div>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} />
            </div>
          )}
          <Button type="submit" variant="cta" className="w-full" disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            {view === "login" ? "Sign In" : view === "signup" ? "Create Account" : "Send Reset Link"}
          </Button>
        </form>

        <div className="text-sm text-muted-foreground text-center mt-4 space-y-1">
          {view === "forgot" ? (
            <button onClick={() => setView("login")} className="text-primary hover:underline font-medium">
              ← Back to Sign In
            </button>
          ) : (
            <p>
              {view === "login" ? "Need an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => setView(view === "login" ? "signup" : "login")}
                className="text-primary hover:underline font-medium"
              >
                {view === "login" ? "Sign Up" : "Sign In"}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
