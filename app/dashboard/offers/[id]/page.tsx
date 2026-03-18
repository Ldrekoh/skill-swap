import { BuyButton } from "@/components/layout/BuyButton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMyOfferById } from "@/server/Offers";
import { ChevronLeft, Clock, Coins, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function OfferDetailsPage({ params }: PageProps) {
  const { id } = await params;

  // On convertit l'ID en nombre si ton schéma utilise des integers
  const { success, offer } = await getMyOfferById(id);

  if (!success || !offer) {
    notFound(); // Redirige vers la page 404 si l'offre n'existe pas
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-8 animate-in fade-in duration-500">
      {/* --- RETOUR --- */}
      <Link
        href="/dashboard"
        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors w-fit"
      >
        <ChevronLeft className="size-4" /> Retour au dashboard
      </Link>

      <div className="grid gap-8 md:grid-cols-3">
        {/* --- COLONNE GAUCHE : INFOS PRINCIPALES --- */}
        <div className="md:col-span-2 space-y-6">
          <div className="space-y-4">
            <Badge className="bg-primary/10 text-primary border-none text-sm px-4">
              {offer.category}
            </Badge>
            <h1 className="text-4xl font-black tracking-tight">
              {offer.title}
            </h1>

            <div className="flex items-center gap-6 text-muted-foreground text-sm border-y py-4">
              <div className="flex items-center gap-2">
                <User className="size-4" />
                <span>Proposé par un membre</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-4" />
                <span>
                  Publié le {new Date(offer.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-xl font-bold">À propos de cette compétence</h3>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {offer.description}
            </p>
          </div>
        </div>

        {/* --- COLONNE DROITE : ACTION / PRIX --- */}
        <div className="space-y-6">
          <Card className="border-primary/20 shadow-xl shadow-primary/5 sticky top-24">
            <CardHeader>
              <CardTitle className="text-center text-muted-foreground text-sm uppercase tracking-widest">
                Tarif de la session
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <div className="flex items-center justify-center gap-2 text-5xl font-black text-yellow-600">
                {offer.price} <Coins className="size-10" />
              </div>
              <p className="text-xs text-muted-foreground">
                Ce montant sera transféré de votre compte vers celui du
                formateur après validation.
              </p>

              <BuyButton offerId={offer.id} price={offer.price} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
