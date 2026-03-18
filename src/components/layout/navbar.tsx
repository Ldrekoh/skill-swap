import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCurrentUser } from "@/server/Users";
import { Coins, LayoutDashboard, User } from "lucide-react";
import Link from "next/link";
import { SignOutButton } from "./sign-out-button";

export async function Navbar() {
  // On cast en 'any' ou ton type User personnalisé pour éviter l'erreur sur tokenBalance
  const currentUser = (await getCurrentUser()) as any;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-hover hover:opacity-90"
        >
          <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">S</span>
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">
            SkillSwap
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {currentUser ? (
            <>
              {/* Badge Jetons */}
              <div className="flex items-center gap-1.5 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1.5 rounded-full transition-colors hover:bg-yellow-500/20">
                <Coins className="size-4 text-yellow-600 dark:text-yellow-400" />
                <span className="font-bold text-sm text-yellow-700 dark:text-yellow-300">
                  {currentUser.user.tokenBalance ?? 0}
                </span>
              </div>

              {/* Menu Utilisateur */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full border focus-visible:ring-0 focus-visible:ring-offset-0"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={currentUser.user.image}
                        alt={currentUser.user.name}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary uppercase">
                        {currentUser.user.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {currentUser.user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {currentUser.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href="/dashboard"
                      className="cursor-pointer w-full flex items-center"
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Tableau de bord</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile"
                      className="cursor-pointer w-full flex items-center"
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Profil</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {/* Utilise le composant client pour la déconnexion */}
                  <SignOutButton />
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth/sign-in">
                <Button variant="ghost" size="sm">
                  Connexion
                </Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button size="sm">S'inscrire</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
