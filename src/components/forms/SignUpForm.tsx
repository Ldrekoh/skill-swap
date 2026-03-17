"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// On utilise les noms exacts de ton nouveau fichier field.tsx
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { signUp } from "@/server/Users";
import { useRouter } from "next/navigation";

// Schéma de validation Zod
const signUpSchema = z.object({
  name: z.string().min(2, "Le nom est trop court"),
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "8 caractères minimum"),
});

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    setIsLoading(true);

    const { success, message } = await signUp(
      values.name,
      values.email,
      values.password,
    );

    if (success) {
      toast.success(message as string);
      router.push("/dashboard");
    } else {
      toast.error(message as string);
    }

    setIsLoading(false);
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Créer un compte</CardTitle>
        <CardDescription>Rejoignez la communauté SkillSwap</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Field>
            <FieldLabel>Nom complet</FieldLabel>
            <FieldContent>
              <Input placeholder="John Doe" {...form.register("name")} />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel>Email</FieldLabel>
            <FieldContent>
              <Input
                type="email"
                placeholder="john@example.com"
                {...form.register("email")}
              />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel>Mot de passe</FieldLabel>
            <FieldContent>
              <Input
                type="password"
                placeholder="••••••••"
                {...form.register("password")}
              />
            </FieldContent>
          </Field>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="animate-spin mr-2" />
            ) : (
              "S'inscrire"
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Vous avez deja un compte ?{" "}
          <a
            href="/auth/sign-in"
            className="underline underline-offset-4 hover:text-primary"
          >
            Se connecter
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}
