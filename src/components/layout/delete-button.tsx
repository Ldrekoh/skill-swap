"use client";

import { Button } from "@/components/ui/button";
import { deleteOffer } from "@/server/Offers";
import { Loader2, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const DeleteButton = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const handleDelete = async () => {
    if (!id) return toast.error("ID introuvable dans l'URL");
    if (!confirm("Voulez-vous vraiment supprimer cette annonce ?")) return;

    setIsPending(true);

    const { success, message } = await deleteOffer(id);

    if (success) {
      toast.success(message as string);
      router.push("/dashboard");
      router.refresh();
    } else {
      toast.error(message as string);
    }
  };

  return (
    <Button
      variant="destructive"
      onClick={handleDelete}
      disabled={isPending}
      className="w-full gap-2"
    >
      {isPending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Trash2 className="size-4" />
      )}
      Supprimer l'annonce
    </Button>
  );
};
