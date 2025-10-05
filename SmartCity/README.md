# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/138b4791-1be2-4869-92b8-212b94551d65

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/138b4791-1be2-4869-92b8-212b94551d65) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

### Déploiement sur Render

Ce projet est configuré pour être déployé facilement sur Render. Suivez ces étapes :

#### Option 1: Déploiement automatique avec render.yaml

1. **Connectez votre repository à Render** :
   - Allez sur [render.com](https://render.com)
   - Créez un compte ou connectez-vous
   - Cliquez sur "New +" puis "Static Site"
   - Connectez votre repository GitHub

2. **Configuration automatique** :
   - Render détectera automatiquement le fichier `render.yaml`
   - La configuration de build sera appliquée automatiquement :
     - Build Command: `npm ci && npm run build`
     - Publish Directory: `./dist`

3. **Variables d'environnement** (optionnel) :
   - Copiez `.env.example` vers `.env` et configurez vos variables
   - Ajoutez les variables d'environnement dans l'interface Render

#### Option 2: Déploiement manuel

Vous pouvez également utiliser le script de déploiement inclus :

```bash
# Rendre le script exécutable (déjà fait)
chmod +x deploy.sh

# Exécuter le script de déploiement
./deploy.sh
```

#### Configuration des variables d'environnement

1. Copiez le fichier `.env.example` :
   ```bash
   cp .env.example .env
   ```

2. Modifiez `.env` avec vos valeurs spécifiques

3. Dans Render, ajoutez ces variables dans la section "Environment"

#### Structure des fichiers de déploiement

- `render.yaml` : Configuration principale pour Render
- `public/_redirects` : Gestion des routes SPA
- `.env.example` : Template des variables d'environnement
- `deploy.sh` : Script de déploiement local

### Déploiement sur Lovable

Vous pouvez aussi déployer via [Lovable](https://lovable.dev/projects/138b4791-1be2-4869-92b8-212b94551d65) en cliquant sur Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
