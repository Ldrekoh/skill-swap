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
import { signIn } from "@/server/Users";
import { useRouter } from "next/navigation";

// Schéma de validation Zod
const signInSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "8 caractères minimum"),
});

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    setIsLoading(true);

    const { success, message } = await signIn(values.email, values.password);

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
        <CardTitle>Se connecter</CardTitle>
        <CardDescription>
          Connectez-vous a votre compte SkillSwap
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              "Se connecter"
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Pas encore de compte ?{" "}
          <a
            href="/auth/sign-up"
            className="underline underline-offset-4 hover:text-primary"
          >
            S&apos;inscrire
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}
