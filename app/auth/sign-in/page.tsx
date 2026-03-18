import { SignInForm } from "@/components/forms/SignInForm";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="relative flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-muted/30">
      {/* Background décoratif (Identique au Sign-Up pour la cohérence) */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-[450px] space-y-6">
        {/* --- BRANDING HEADER --- */}
        <div className="flex flex-col items-center gap-3 text-center">
          <Link href="/" className="group flex items-center gap-2">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
              <span className="text-2xl font-bold text-primary-foreground">
                S
              </span>
            </div>
            <h1 className="text-4xl font-black tracking-tighter">SkillSwap</h1>
          </Link>

          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full border border-primary/20 shadow-sm mt-2">
            <Sparkles className="size-4" />
            <span className="text-sm font-bold tracking-tight">
              BON RETOUR PARMI NOUS
            </span>
          </div>

          <p className="text-muted-foreground text-sm max-w-[300px]">
            Connectez-vous pour continuer vos échanges et dépenser vos jetons.
          </p>
        </div>

        {/* --- FORMULAIRE --- */}
        <div className="bg-background rounded-3xl shadow-2xl shadow-black/5 border p-1">
          <SignInForm />
        </div>

        {/* --- FOOTER DE PAGE --- */}
        <p className="text-center text-xs text-muted-foreground">
          Mot de passe oublié ?{" "}
          <Link
            href="#"
            className="underline hover:text-primary transition-colors"
          >
            Réinitialiser
          </Link>
        </p>
      </div>
    </div>
  );
}
