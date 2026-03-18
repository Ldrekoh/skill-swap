import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getMyOffers } from "@/server/Offers";
import { getCurrentUser } from "@/server/Users";
import { ArrowUpRight, Coins, LayoutGrid, Star } from "lucide-react";
import { CreateOfferDialog } from "./CreateOfferDialog";

export default async function DashboardPage() {
  const currentUser = (await getCurrentUser()) as any;
  const result = await getMyOffers();

  const offers = result.success ? result.offers : [];

  return (
    <div className="container mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground font-medium">
            Ravi de vous revoir,{" "}
            <span className="text-primary">{currentUser?.user?.name}</span> 👋
          </p>
        </div>
        {/* On utilise le Dialog ici aussi pour que le bouton soit fonctionnel */}
        <CreateOfferDialog />
      </div>

      {/* --- STATS CARDS --- */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="relative overflow-hidden border-none bg-gradient-to-br from-yellow-500/20 to-orange-500/10 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-yellow-700 dark:text-yellow-500">
              Mon Portefeuille
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black flex items-baseline gap-2">
              {currentUser?.user?.tokenBalance || 0}
              <span className="text-lg font-bold">Jetons</span>
            </div>
            <Coins className="absolute -bottom-2 -right-2 size-24 opacity-10 rotate-12" />
          </CardContent>
        </Card>

        <Card className="border-none bg-secondary/40 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold uppercase tracking-wider">
              Mes Annonces
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black">{offers.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Actuellement en ligne
            </p>
          </CardContent>
        </Card>

        <Card className="border-none bg-secondary/40 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold uppercase tracking-wider">
              Réputation
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <div className="text-4xl font-black text-muted-foreground/50">
              --
            </div>
            <div className="flex text-muted-foreground/30">
              <Star className="fill-current size-5" />
            </div>
            <p className="text-xs text-muted-foreground">(0 avis)</p>
          </CardContent>
        </Card>
      </div>

      {/* --- SECTION CONTENU --- */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">
            Mes dernières publications
          </h2>
          {offers.length > 0 && (
            <Button variant="link" className="text-primary p-0">
              Voir tout
            </Button>
          )}
        </div>

        {offers.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer: any) => (
              <Card
                key={offer.id}
                className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 border-primary/5"
              >
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                    <Badge className="bg-primary/10 text-primary border-none capitalize">
                      {offer.category}
                    </Badge>
                    <div className="flex items-center gap-1 font-bold text-yellow-600 bg-yellow-500/10 px-2 py-0.5 rounded-md">
                      <Coins className="size-3" /> {offer.price}
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-1">
                    {offer.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {offer.description}
                  </p>
                </CardContent>
                <div className="p-4 bg-muted/30 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest italic">
                    Publié le {new Date(offer.createdAt).toLocaleDateString()}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 gap-2 group-hover:bg-primary group-hover:text-white transition-all"
                  >
                    Détails <ArrowUpRight className="size-3" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          /* --- EMPTY STATE --- */
          <Card className="border-dashed bg-transparent flex flex-col items-center justify-center p-12 text-center">
            <div className="size-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <LayoutGrid className="size-8 text-muted-foreground/50" />
            </div>
            <CardTitle className="text-xl">
              Vous n'avez pas encore d'offres
            </CardTitle>
            <CardDescription className="max-w-xs mx-auto mt-2 mb-6">
              Partagez vos compétences pour commencer à accumuler des jetons et
              apprendre des autres.
            </CardDescription>

            <CreateOfferDialog />
          </Card>
        )}
      </div>
    </div>
  );
}
