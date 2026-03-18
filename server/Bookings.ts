"use server";

import { db } from "@/db/drizzle";
import { bookings, skillOffers, user } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./Users";

export const buyOffer = async (offerId: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.user?.id) {
      return { success: false, message: "Vous devez être connecté." };
    }

    const userId = currentUser.user.id;

    // 1. Récupérer l'offre
    const offer = await db.query.skillOffers.findFirst({
      where: eq(skillOffers.id, offerId),
    });

    if (!offer) return { success: false, message: "Offre introuvable." };

    // 2. Empêcher l'auto-achat
    if (offer.authorId === userId) {
      return {
        success: false,
        message: "Vous ne pouvez pas acheter votre propre offre.",
      };
    }

    // 3. NOUVELLE CONDITION : Vérifier si l'achat existe déjà
    const existingBooking = await db.query.bookings.findFirst({
      where: and(eq(bookings.offerId, offerId), eq(bookings.buyerId, userId)),
    });

    if (existingBooking) {
      return { success: false, message: "Vous avez déjà acheté ce cours !" };
    }

    // 4. Vérifier le solde de l'acheteur
    const buyer = await db.query.user.findFirst({
      where: eq(user.id, userId),
    });

    if (!buyer || buyer.tokenBalance < offer.price) {
      return { success: false, message: "Solde de jetons insuffisant." };
    }

    // 5. Exécution groupée (Batch) pour Neon HTTP
    await db.batch([
      // Débiter l'élève
      db
        .update(user)
        .set({ tokenBalance: sql`${user.tokenBalance} - ${offer.price}` })
        .where(eq(user.id, userId)),

      // Créditer le professeur
      db
        .update(user)
        .set({ tokenBalance: sql`${user.tokenBalance} + ${offer.price}` })
        .where(eq(user.id, offer.authorId)),

      // Créer le reçu
      db.insert(bookings).values({
        offerId: offer.id,
        buyerId: userId,
        sellerId: offer.authorId,
        priceAtPurchase: offer.price,
        status: "completed",
      }),
    ]);

    revalidatePath("/dashboard");
    revalidatePath(`/dashboard/offers/${offerId}`);

    return {
      success: true,
      message: "Achat réussi ! Profitez bien de votre cours.",
    };
  } catch (error) {
    console.error("Erreur achat:", error);
    return { success: false, message: "Une erreur technique est survenue." };
  }
};

export const getMyPurchases = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.user?.id) return { success: false, data: [] };

    const data = await db.query.bookings.findMany({
      where: eq(bookings.buyerId, currentUser.user.id),
      with: {
        offer: true, // Pour avoir le titre, la description du cours
        seller: true, // Pour savoir qui est le prof
      },
      orderBy: [desc(bookings.createdAt)],
    });

    return { success: true, data };
  } catch (error) {
    return { success: false, data: [] };
  }
};

// 2. Voir mes VENTES (Mon historique de gains)
export const getMySales = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.user?.id) return { success: false, data: [] };

    const data = await db.query.bookings.findMany({
      where: eq(bookings.sellerId, currentUser.user.id),
      with: {
        offer: true,
        buyer: true, // Pour savoir quel élève a acheté
      },
      orderBy: [desc(bookings.createdAt)],
    });

    return { success: true, data };
  } catch (error) {
    return { success: false, data: [] };
  }
};
