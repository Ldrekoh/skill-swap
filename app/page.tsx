import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Coins, Search, Users, Zap } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* --- Section Hero --- */}
      <section className="relative py-20 px-4 md:py-32 bg-gradient-to-b from-primary/5 to-background overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1 border-primary/20 text-primary animate-pulse"
          >
            Nouvelle façon d'apprendre 🚀
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Échangez vos talents, <br />
            <span className="text-primary">pas votre argent.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            SkillSwap est la plateforme où le savoir est la seule monnaie.
            Apprenez le React, la cuisine ou le japonais en partageant vos
            propres compétences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/sign-up">
              <Button size="lg" className="px-8 text-lg gap-2">
                Commencer maintenant <ArrowRight className="size-5" />
              </Button>
            </Link>
            <Link href="/explore">
              <Button
                size="lg"
                variant="outline"
                className="px-8 text-lg gap-2"
              >
                Explorer les offres <Search className="size-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Décoration d'arrière-plan (optionnel) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full -z-0" />
      </section>

      {/* --- Section Fonctionnalités --- */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Comment ça marche ?</h2>
          <p className="text-muted-foreground">
            Une économie circulaire basée sur l'entraide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-none bg-secondary/50">
            <CardHeader>
              <div className="size-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Coins className="text-primary size-6" />
              </div>
              <CardTitle>Système de Jetons</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Inscrivez-vous et recevez **3 jetons** offerts. Utilisez-les
                pour réserver votre premier cours.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none bg-secondary/50">
            <CardHeader>
              <div className="size-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="text-primary size-6" />
              </div>
              <CardTitle>Partagez votre Savoir</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Créez une annonce pour un talent que vous possédez. Chaque
                service rendu vous rapporte des jetons.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none bg-secondary/50">
            <CardHeader>
              <div className="size-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-primary size-6" />
              </div>
              <CardTitle>Communauté de Confiance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Échangez avec des passionnés. Notre système de notation garantit
                la qualité des échanges.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- Section Preuve Sociale / Stats --- */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-1">500+</div>
            <div className="text-primary-foreground/70 text-sm uppercase tracking-wider font-semibold">
              Membres
            </div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-1">1.2k</div>
            <div className="text-primary-foreground/70 text-sm uppercase tracking-wider font-semibold">
              Échanges
            </div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-1">50+</div>
            <div className="text-primary-foreground/70 text-sm uppercase tracking-wider font-semibold">
              Catégories
            </div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-1">98%</div>
            <div className="text-primary-foreground/70 text-sm uppercase tracking-wider font-semibold">
              Satisfaction
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer Simple --- */}
      <footer className="py-12 border-t mt-auto">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="size-6 bg-primary rounded flex items-center justify-center text-[10px] font-bold text-white">
              S
            </div>
            <span className="font-bold">SkillSwap</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 SkillSwap. Projet réalisé pour le titre CDA.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary">
              Conditions
            </Link>
            <Link href="#" className="hover:text-primary">
              Confidentialité
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
