"use client";

import { OfferForm } from "@/components/forms/OfferForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";

export function CreateOfferDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="size-5" /> Publier une annonce
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Nouvelle compétence</DialogTitle>
        </DialogHeader>

        <OfferForm
          onSuccess={() => {
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
