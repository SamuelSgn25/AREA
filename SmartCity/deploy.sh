#!/bin/bash

# Script de déploiement pour Smart City App sur Render
echo "🚀 Démarrage du processus de déploiement..."

# Vérifier que Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez l'installer avant de continuer."
    exit 1
fi

# Vérifier que npm est installé
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé. Veuillez l'installer avant de continuer."
    exit 1
fi

echo "✅ Node.js et npm sont installés"

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm ci

# Construire l'application
echo "🔨 Construction de l'application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Construction réussie!"
    echo "📁 Les fichiers de production sont dans le dossier 'dist/'"
    echo ""
    echo "🌐 Pour déployer sur Render:"
    echo "1. Connectez votre repository GitHub à Render"
    echo "2. Render utilisera automatiquement le fichier render.yaml"
    echo "3. Votre app sera disponible à l'URL fournie par Render"
else
    echo "❌ Erreur lors de la construction"
    exit 1
fi
