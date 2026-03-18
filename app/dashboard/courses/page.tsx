import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getOffers } from "@/server/Offers";
import { ArrowRight, Coins, Search } from "lucide-react";
import Link from "next/link";

export default async function CoursesPage() {
  const { success, offers } = await getOffers();

  if (!success || !offers || offers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Search className="size-12 text-muted-foreground opacity-20" />
        <h2 className="text-xl font-semibold text-muted-foreground">
          Aucune offre disponible pour le moment
        </h2>
        <Link href="/dashboard/create">
          <Button>Créer la première offre</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8 animate-in fade-in duration-700">
      {/* --- HEADER --- */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black tracking-tight">
          Explorer les compétences
        </h1>
        <p className="text-muted-foreground text-lg">
          Apprenez de nouvelles choses en échangeant vos jetons avec la
          communauté.
        </p>
      </div>

      {/* --- GRID DES OFFRES --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <Card
            key={offer.id}
            className="group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 border-primary/10 flex flex-col"
          >
            <CardHeader className="space-y-4">
              <div className="flex justify-between items-start">
                <Badge
                  variant="secondary"
                  className="bg-primary/5 text-primary border-none px-3 py-1"
                >
                  {offer.category}
                </Badge>
                <div className="flex items-center gap-1.5 font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-md border border-yellow-200 shadow-sm">
                  {offer.price} <Coins className="size-4" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                {offer.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1">
              <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                {offer.description}
              </p>
            </CardContent>

            <CardFooter className="pt-4 border-t bg-muted/30">
              <Link href={`/dashboard/courses/${offer.id}`} className="w-full">
                <Button
                  className="w-full group/btn gap-2 font-bold"
                  variant="default"
                >
                  Voir les détails
                  <ArrowRight className="size-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
