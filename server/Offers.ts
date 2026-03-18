"use server";

import { db } from "@/db/drizzle";
import { skillOffers } from "@/db/schema";
import { and, eq } from "drizzle-orm"; // Ajout de 'and'
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./Users";

export const createOffer = async (
  title: string,
  description: string,
  category: string,
  price: number,
) => {
  try {
    const currentUser = await getCurrentUser(); // Appel INTERNE
    if (!currentUser?.user?.id) {
      return { success: false, message: "Vous devez être connecté" };
    }

    await db.insert(skillOffers).values({
      title,
      description,
      category,
      price,
      authorId: currentUser.user.id,
    });

    revalidatePath("/dashboard");
    return { success: true, message: "Offre créée avec succès !" };
  } catch (error) {
    const e = error as Error;
    return { success: false, message: e.message };
  }
};

export const getMyOffers = async () => {
  try {
    const currentUser = await getCurrentUser(); // Appel INTERNE
    if (!currentUser?.user?.id) return { success: false, offers: [] };

    const offers = await db.query.skillOffers.findMany({
      where: eq(skillOffers.authorId, currentUser.user.id),
    });
    return { success: true, offers };
  } catch (error) {
    return { success: false, offers: [] };
  }
};

export const getOffers = async () => {
  try {
    const offers = await db.query.skillOffers.findMany({});
    return { success: true, offers };
  } catch (error) {
    return { success: false, offers: [] };
  }
};

export const getMyOfferById = async (id: number) => {
  try {
    const currentUser = await getCurrentUser();

    const offer = await db.query.skillOffers.findFirst({
      where: eq(skillOffers.id, id),
    });

    if (!offer) {
      return { success: false, message: "Offre introuvable", offer: null };
    }

    if (offer.authorId !== currentUser?.user?.id) {
      return { success: false, message: "Accès non autorisé", offer: null };
    }

    return { success: true, offer };
  } catch (error) {
    console.error("Erreur getOfferById:", error);
    return { success: false, offer: null };
  }
};

export const deleteOffer = async (id: number) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.user?.id)
      return { success: false, message: "Non autorisé" };

    const deleted = await db
      .delete(skillOffers)
      .where(
        and(
          eq(skillOffers.id, id),
          eq(skillOffers.authorId, currentUser.user.id),
        ),
      );

    if (!deleted) return { success: false, message: "Offre introuvable" };

    revalidatePath("/dashboard");
    return { success: true, message: "Offre supprimée avec succès !" };
  } catch (error) {
    return { success: false, message: "Erreur de suppression" };
  }
};
