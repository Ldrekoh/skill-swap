"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/sign-in");
          router.refresh();
        },
      },
    });
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleSignOut}>
      Déconnexion
    </Button>
  );
}
