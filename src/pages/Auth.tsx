import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

export default function Auth() {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await signIn(email, password);
        navigate("/admin");
      } else {
        await signUp(email, password, displayName);
        toast({ title: "Check your email", description: "We sent you a confirmation link." });
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Something went wrong", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <div className="w-full max-w-md bg-card rounded-xl p-8 shadow-card border border-border">
        <h1 className="text-2xl font-extrabold text-foreground mb-2">{isLogin ? "Admin Login" : "Create Account"}</h1>
        <p className="text-sm text-muted-foreground mb-6">
          {isLogin ? "Sign in to access the admin panel." : "Create an admin account."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-1">
              <Label htmlFor="displayName">Display Name</Label>
              <Input id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your name" />
            </div>
          )}
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@example.com" required />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} />
          </div>
          <Button type="submit" variant="cta" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {isLogin ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <p className="text-sm text-muted-foreground text-center mt-4">
          {isLogin ? "Need an account?" : "Already have an account?"}{" "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-primary hover:underline font-medium">
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}
