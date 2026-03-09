import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/i18n/LanguageContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  User,
  Lock,
  ChevronLeft,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// ── Schemas ──────────────────────────────────────────────────────────────────
const displayNameSchema = z.object({
  display_name: z.string().trim().min(2, "Min 2 characters").max(80, "Max 80 characters"),
});
type DisplayNameForm = z.infer<typeof displayNameSchema>;

const passwordSchema = z
  .object({
    new_password: z.string().min(8, "Min 8 characters"),
    confirm_password: z.string(),
  })
  .refine((d) => d.new_password === d.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });
type PasswordForm = z.infer<typeof passwordSchema>;

// ── Component ─────────────────────────────────────────────────────────────────
export default function AccountSettings() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch current display name from profiles table
  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("user_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  // ── Display Name form ─────────────────────────────────────────────────────
  const nameForm = useForm<DisplayNameForm>({
    resolver: zodResolver(displayNameSchema),
    values: { display_name: profile?.display_name ?? "" },
  });

  const nameMutation = useMutation({
    mutationFn: async ({ display_name }: DisplayNameForm) => {
      const { error } = await supabase
        .from("profiles")
        .update({ display_name })
        .eq("user_id", user!.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
      toast.success(t.accountSettings.nameSaved);
    },
    onError: () => toast.error(t.accountSettings.saveError),
  });

  // ── Password form ─────────────────────────────────────────────────────────
  const [pwSuccess, setPwSuccess] = useState(false);
  const pwForm = useForm<PasswordForm>({ resolver: zodResolver(passwordSchema) });

  const pwMutation = useMutation({
    mutationFn: async ({ new_password }: PasswordForm) => {
      const { error } = await supabase.auth.updateUser({ password: new_password });
      if (error) throw error;
    },
    onSuccess: () => {
      setPwSuccess(true);
      pwForm.reset();
    },
    onError: (err: Error) => toast.error(err.message ?? t.accountSettings.saveError),
  });

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-10 space-y-8">
        {/* Back link */}
        <button
          onClick={() => navigate("/portal")}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          {t.accountSettings.backToPortal}
        </button>

        {/* Page title */}
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">{t.accountSettings.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{user?.email}</p>
        </div>

        {/* ── Display Name Card ─────────────────────────────────────────── */}
        <section className="bg-card border border-border rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <User className="h-4 w-4 text-primary" />
            </div>
            <h2 className="text-base font-semibold text-foreground">{t.accountSettings.displayNameTitle}</h2>
          </div>

          <form
            onSubmit={nameForm.handleSubmit((v) => nameMutation.mutate(v))}
            className="space-y-4"
          >
            <div className="space-y-1.5">
              <Label htmlFor="display_name">{t.accountSettings.displayNameLabel}</Label>
              <Input
                id="display_name"
                placeholder={t.accountSettings.displayNamePlaceholder}
                {...nameForm.register("display_name")}
              />
              {nameForm.formState.errors.display_name && (
                <p className="text-xs text-destructive">
                  {nameForm.formState.errors.display_name.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="cta"
              size="sm"
              disabled={nameMutation.isPending}
              className="gap-2"
            >
              {nameMutation.isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {t.accountSettings.saveName}
            </Button>
          </form>
        </section>

        {/* ── Change Password Card ──────────────────────────────────────── */}
        <section className="bg-card border border-border rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Lock className="h-4 w-4 text-primary" />
            </div>
            <h2 className="text-base font-semibold text-foreground">{t.accountSettings.passwordTitle}</h2>
          </div>

          {pwSuccess ? (
            <div className="flex items-center gap-2 text-sm text-primary font-medium animate-fade-in">
              <CheckCircle2 className="h-4 w-4" />
              {t.accountSettings.passwordSaved}
            </div>
          ) : (
            <form
              onSubmit={pwForm.handleSubmit((v) => pwMutation.mutate(v))}
              className="space-y-4"
            >
              <div className="space-y-1.5">
                <Label htmlFor="new_password">{t.accountSettings.newPassword}</Label>
                <Input
                  id="new_password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  {...pwForm.register("new_password")}
                />
                {pwForm.formState.errors.new_password && (
                  <p className="text-xs text-destructive">
                    {pwForm.formState.errors.new_password.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirm_password">{t.accountSettings.confirmPassword}</Label>
                <Input
                  id="confirm_password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  {...pwForm.register("confirm_password")}
                />
                {pwForm.formState.errors.confirm_password && (
                  <p className="text-xs text-destructive">
                    {pwForm.formState.errors.confirm_password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="cta"
                size="sm"
                disabled={pwMutation.isPending}
                className="gap-2"
              >
                {pwMutation.isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                {t.accountSettings.updatePassword}
              </Button>
            </form>
          )}
        </section>
      </div>
    </Layout>
  );
}
