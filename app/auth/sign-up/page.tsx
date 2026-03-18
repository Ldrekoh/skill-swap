import { SignUpForm } from "@/components/forms/SignUpForm";
import { Coins, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="relative flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-muted/30">
      {/* Background decoratif (Idem Sign-in pour la cohérence) */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-[5%] -right-[5%] w-[30%] h-[30%] bg-primary/10 blur-[100px] rounded-full" />
        <div className="absolute -bottom-[5%] -left-[5%] w-[30%] h-[30%] bg-primary/10 blur-[100px] rounded-full" />
      </div>

      <div className="w-full max-w-[450px] space-y-6">
        {/* --- BRANDING & PROMO --- */}
        <div className="flex flex-col items-center gap-3 text-center">
          <Link href="/" className="group flex items-center gap-2">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20 transition-transform group-hover:rotate-12">
              <span className="text-2xl font-bold text-primary-foreground">
                S
              </span>
            </div>
            <h1 className="text-4xl font-black tracking-tighter">SkillSwap</h1>
          </Link>

          <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 px-4 py-1.5 rounded-full border border-yellow-500/20 shadow-sm animate-bounce mt-2">
            <Coins className="size-4" />
            <span className="text-sm font-bold tracking-tight">
              3 JETONS OFFERTS À L'INSCRIPTION
            </span>
            <Sparkles className="size-4" />
          </div>

          <p className="text-muted-foreground text-sm max-w-[300px]">
            Rejoignez la communauté et commencez à apprendre de nouvelles
            compétences aujourd'hui.
          </p>
        </div>

        {/* --- FORMULAIRE --- */}
        <div className="bg-background rounded-3xl shadow-2xl shadow-black/5 border p-2">
          <SignUpForm />
        </div>

        {/* --- FOOTER DE PAGE --- */}
        <p className="text-center text-xs text-muted-foreground px-8">
          En vous inscrivant, vous acceptez nos{" "}
          <Link href="#" className="underline hover:text-primary">
            Conditions d'utilisation
          </Link>{" "}
          et notre{" "}
          <Link href="#" className="underline hover:text-primary">
            Politique de confidentialité
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
