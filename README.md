# Canvas to Colors — Paint by Numbers

Convertissez n'importe quelle photo en planche de peinture numérotée, style professionnel, directement dans le navigateur.

---

## Fonctionnalités

- **Import photo** — glissez-déposez ou sélectionnez une image (JPG, PNG, WebP)
- **Extraction de palette** — détection automatique des couleurs dominantes avec contrôle du nombre de teintes (4 – 64)
- **5 vues** — Original · Colorisé · Contours · Numéroté · Comparer
- **Palette interactive** — copier HEX, verrouiller ou masquer chaque couleur
- **Profiler intégré** — métriques P50/P95 par phase de traitement
- **Interface style Photoshop** — barre de menus, onglets, toolbar verticale, panneaux rétractables
- **Accessibilité** — landmarks HTML5, ARIA, navigation clavier, `prefers-reduced-motion`
- **100 % client-side** — aucun serveur requis, aucune donnée envoyée

---

## Démarrage rapide

### Prérequis

| Outil | Version minimale |
|-------|-----------------|
| Node.js | 18+ |
| pnpm | 8+ (ou npm / yarn) |

> Installer pnpm si besoin : `npm install -g pnpm`

### Installation

```bash
# 1. Cloner le dépôt
git clone <URL_DU_REPO>
cd <NOM_DU_DOSSIER>

# 2. Installer les dépendances
pnpm install
# ou : npm install

# 3. Lancer le serveur de développement
pnpm dev
# ou : npm run dev
```

L'application est accessible sur **http://localhost:5173**

### Autres commandes

```bash
pnpm build      # Build de production → dist/
pnpm preview    # Prévisualiser le build de production
```

---

## Structure du projet

```
├── index.html                  # Point d'entrée HTML (Vite)
├── vite.config.ts
├── package.json
└── src/
    ├── main.tsx                # Bootstrap React
    ├── styles/
    │   ├── index.css           # Imports Tailwind
    │   ├── theme.css           # Tokens de design (couleurs, espacements)
    │   └── fonts.css           # Google Fonts
    └── app/
        ├── App.tsx             # Composant racine
        └── components/
            ├── MenuBar.tsx         # Barre de menus (Fichier, Édition…)
            ├── TabBar.tsx          # Onglets (Original, Colorisé, Contours…)
            ├── VerticalToolbar.tsx # Outils à gauche
            ├── LeftPanel.tsx       # Panneau paramètres (rétractable)
            ├── CanvasWorkspace.tsx # Zone de travail centrale
            ├── RightPanel.tsx      # Palette + Debug (rétractable)
            └── StickyGenerateButton.tsx
```

---

## Workflow d'utilisation

1. **Importer** une image via *Fichier → Ouvrir* ou glisser-déposer dans le canvas
2. **Régler les paramètres** dans le panneau gauche : nombre de couleurs, lissage, contours
3. **Générer le modèle** avec le bouton CTA en bas du panneau
4. **Explorer les vues** via les onglets (Colorisé, Contours, Numéroté, Comparer)
5. **Affiner la palette** dans le panneau droit : verrouiller, masquer, copier HEX
6. **Exporter** via *Fichier → Exporter*

---

## Stack technique

- **React 18** + **TypeScript**
- **Vite 6** (bundler)
- **Tailwind CSS 4** (design system)
- **Radix UI** (composants accessibles)
- **Lucide React** (icônes)
- **Motion** (animations)
- **Recharts** (graphiques profiler)

---

## Licence

Projet privé — tous droits réservés.
