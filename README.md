🪙 SkillSwap

SkillSwap est une plateforme communautaire d'échange de compétences basée sur un système de jetons. L'objectif est de permettre à chacun de partager son savoir-faire sans transaction monétaire directe.
🚀 Stack Technique

    Framework : Next.js 15 (App Router)

    Base de données : Neon (PostgreSQL Serverless)

    ORM : Drizzle ORM

    Authentification : Better-Auth

    UI Components : Shadcn UI & Tailwind CSS 4

    Validation : Zod

🛠️ Architecture de la Base de Données

Le projet utilise PostgreSQL avec une architecture relationnelle optimisée :

    Users : Gestion des profils et du solde de jetons (tokenBalance).

    Skill Offers : Annonces de compétences liées aux utilisateurs via un authorId (relation One-to-Many).

    Auth : Tables gérées par Better-Auth (Sessions, Accounts, Verifications).

🔑 Fonctionnalités Clés

    [x] Authentification sécurisée (Email/Password & Google OAuth) via Better-Auth.

    [x] Système de Jetons : Chaque nouvel utilisateur commence avec 3 jetons gratuits.

    [x] Gestion du Profil : Affichage dynamique du solde et des informations utilisateur.

    [ ] Publication d'Offres : Création d'annonces de compétences (en cours).

    [ ] Système d'Échange : Transfert de jetons lors d'une validation de service (à venir).

⚙️ Installation

    Cloner le projet
    Bash

    git clone https://github.com/votre-username/skill-swap.git
    cd skill-swap

    Installer les dépendances
    Bash

    npm install

    Variables d'environnement
    Créez un fichier .env à la racine :
    Extrait de code

    DATABASE_URL=your_neon_db_url
    BETTER_AUTH_SECRET=your_secret
    BETTER_AUTH_URL=http://localhost:3000

    Synchroniser la base de données
    Bash

    npx drizzle-kit push

    Lancer le serveur de développement
    Bash

    npm run dev
