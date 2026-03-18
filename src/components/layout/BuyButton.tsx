"use client";

import { Button } from "@/components/ui/button";
import { buyOffer } from "@/server/Bookings";
import { Loader2, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function BuyButton({
  offerId,
  price,
}: {
  offerId: string;
  price: number;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleBuy = async () => {
    // 1. Confirmation de sécurité
    const confirmBuy = confirm(
      `Voulez-vous acheter ce cours pour ${price} jetons ?`,
    );
    if (!confirmBuy) return;

    setIsLoading(true);

    try {
      const res = await buyOffer(offerId);

      if (res.success) {
        toast.success(res.message);
        router.refresh(); // Pour mettre à jour le solde de jetons dans le header
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Une erreur est survenue.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleBuy}
      disabled={isLoading}
      className="w-full h-12 text-lg font-bold gap-2 shadow-lg shadow-primary/20"
    >
      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <>
          <ShoppingCart className="size-5" />
          Réserver ce cours
        </>
      )}
    </Button>
  );
}
