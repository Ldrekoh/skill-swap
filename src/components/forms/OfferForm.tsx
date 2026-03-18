"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Coins, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// On importe ton action serveur
import { createOffer } from "@/server/Offers";
import { useRouter } from "next/navigation";

const offerSchema = z.object({
  title: z.string().min(5, "Titre trop court (5 car. min)"),
  description: z.string().min(20, "Description trop courte (20 car. min)"),
  category: z.string().min(1, "Catégorie requise"),
  price: z.coerce.number().min(1, "Le prix doit être au moins de 1 jeton"),
});

export type OfferFormValues = z.infer<typeof offerSchema>;

interface OfferFormProps {
  onSuccess?: () => void; // Pour fermer le Dialog après succès
}

export function OfferForm({ onSuccess }: OfferFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<OfferFormValues>({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      price: 1,
    },
  });

  async function onSubmit(values: OfferFormValues) {
    setIsLoading(true);

    const { message, success } = await createOffer(
      values.title,
      values.description,
      values.category,
      values.price,
    );

    if (success) {
      toast.success(message);
      form.reset();
      onSuccess?.();
      router.refresh();
    } else {
      toast.error(message);
    }

    setIsLoading(false);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <Field>
        <FieldLabel>Titre</FieldLabel>
        <FieldContent>
          <Input
            placeholder="Qu'allez-vous enseigner ?"
            {...form.register("title")}
          />
        </FieldContent>
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel>Catégorie</FieldLabel>
          <FieldContent>
            <Select onValueChange={(v) => form.setValue("category", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dev">Développement</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="cuisine">Cuisine</SelectItem>
                <SelectItem value="langues">Langues</SelectItem>
              </SelectContent>
            </Select>
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel>Prix (Jetons)</FieldLabel>
          <FieldContent className="relative">
            <Input type="number" {...form.register("price")} className="pl-8" />
            <Coins className="absolute left-2.5 top-3 size-4 text-yellow-600" />
          </FieldContent>
        </Field>
      </div>

      <Field>
        <FieldLabel>Description</FieldLabel>
        <FieldContent>
          <Textarea
            placeholder="Détails du cours, matériel nécessaire..."
            className="h-24"
            {...form.register("description")}
          />
        </FieldContent>
      </Field>

      <Button type="submit" className="w-full font-bold" disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="animate-spin h-4 w-4 mr-2" />
        ) : (
          "Publier l'annonce"
        )}
      </Button>
    </form>
  );
}
