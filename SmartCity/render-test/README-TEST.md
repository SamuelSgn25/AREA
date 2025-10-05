# Tests de Configuration Render

Ce dossier contient différentes configurations pour tester le déploiement sur Render.

## Configurations testées

### Version 1: `render-v1.yaml` - Site statique basique
```yaml
env: static
buildCommand: npm install && npm run build
staticPublishPath: ./dist
```
**Avantages**: Simple, pas de serveur nécessaire
**Inconvénients**: Peut ne pas fonctionner avec toutes les configurations

### Version 2: `render-v2.yaml` - Node.js avec serve
```yaml
env: node
buildCommand: npm install && npm run build
startCommand: npx serve -s dist -l 3000
```
**Avantages**: Utilise serve directement sans dépendance
**Inconvénients**: Plus complexe

### Version 3: `render-v3.yaml` - Node.js avec script start
```yaml
env: node
buildCommand: npm install && npm run build
startCommand: npm start
```
**Avantages**: Utilise le script start du package.json
**Inconvénients**: Nécessite la dépendance "serve"

## Instructions de test

1. Pour chaque version, renommez le fichier `render-vX.yaml` en `render.yaml`
2. Commitez et poussez sur GitHub
3. Déployez sur Render
4. Testez le résultat

## Modifications apportées au package.json

- Ajout du script `"start": "serve -s dist -l $PORT"`
- Ajout de la dépendance `"serve": "^14.2.3"`

## Résultats des tests

- [ ] Version 1: Site statique basique
- [ ] Version 2: Node.js avec npx serve
- [ ] Version 3: Node.js avec script start

Une fois qu'une version fonctionne, appliquer la configuration au projet principal.
