# Boutique Maroc — Site e-commerce statique

Site vitrine e-commerce entièrement statique construit avec **Next.js 16 (App Router)**, **TypeScript strict**, et **Tailwind CSS v4**. Déployable sur Cloudflare Pages, GitHub Pages ou tout hébergeur de fichiers statiques.

---

## Démarrage rapide

```bash
npm install
npm run dev        # serveur de développement → http://localhost:3000
npm run build      # génère le dossier /out (export statique)
```

---

## Structure du projet

```
src/
├── app/                    # Routage Next.js (App Router)
│   ├── layout.tsx          # Layout racine (Navbar, Footer, WhatsApp)
│   ├── page.tsx            # Page d'accueil
│   ├── produits/           # Liste des produits
│   │   └── [slug]/         # Page produit individuelle
│   ├── categories/[slug]/  # Page de catégorie
│   ├── a-propos/           # Page À propos
│   ├── contact/            # Page Contact
│   ├── not-found.tsx       # Page 404
│   ├── sitemap.ts          # Sitemap généré automatiquement
│   └── robots.ts           # robots.txt
├── components/
│   ├── layout/             # Navbar, Footer, FloatingWhatsApp
│   ├── product/            # ProductCard, ProductGrid, ProductDetail
│   ├── order/              # OrderModal (formulaire WhatsApp)
│   ├── search/             # ProductFilters, ProductListClient
│   └── ui/                 # Button, Badge, Input, Textarea, Select
├── config/
│   └── site.ts             # ⚙️  Configuration de la boutique
├── data/
│   ├── products.json       # 📦 Données produits
│   └── categories.json     # 📂 Données catégories
├── lib/
│   ├── products.ts         # Logique métier produits
│   ├── whatsapp.ts         # Construction des URLs WhatsApp
│   ├── format.ts           # Formatage des prix
│   └── strings.ts          # Tous les textes UI en français
└── types/
    └── index.ts            # Types TypeScript partagés
```

---

## Personnaliser la boutique

### 1. Changer les informations de la boutique

Modifiez `src/config/site.ts` :

```ts
export const siteConfig: SiteConfig = {
  name: "Ma Boutique",
  logo: "/images/logo.svg",           // chemin dans /public
  whatsapp: "212600000000",           // sans le +
  address: "Votre adresse",
  phone: "+212 6 XX XX XX XX",
  email: "contact@ma-boutique.ma",
  openingHours: "Lun – Sam : 9h – 20h",
  socials: {
    facebook: "https://facebook.com/...",
    instagram: "https://instagram.com/...",
  },
  colors: {
    primary: "#1a6b3c",               // couleur principale
    primaryDark: "#145530",
    accent: "#f59e0b",
  },
};
```

### 2. Ajouter un produit

Ajoutez une entrée dans `src/data/products.json` :

```json
{
  "id": "13",
  "slug": "mon-nouveau-produit",
  "name": "Mon Nouveau Produit",
  "description": "Description détaillée du produit.",
  "price": 150,
  "oldPrice": 200,
  "category": "artisanat",
  "images": ["/images/products/mon-produit-1.jpg"],
  "inStock": true,
  "featured": false,
  "tags": ["tag1", "tag2"]
}
```

Placez les images dans `public/images/products/`.

### 3. Ajouter une catégorie

Ajoutez une entrée dans `src/data/categories.json` :

```json
{
  "slug": "ma-categorie",
  "name": "Ma Catégorie",
  "image": "/images/categories/ma-categorie.jpg",
  "description": "Description de la catégorie."
}
```

### 4. Modifier les textes

Tous les textes de l'interface sont centralisés dans `src/lib/strings.ts`.

---

## Build et déploiement

### Build local

```bash
npm run build
# Génère le dossier /out avec les fichiers HTML/CSS/JS statiques
```

### Déployer sur Cloudflare Pages

1. Connectez votre dépôt Git à Cloudflare Pages.
2. Configurez le build :
   - **Framework preset** : Next.js (Static HTML Export)
   - **Build command** : `npm run build`
   - **Output directory** : `out`
3. Déployez.

> Les routes dynamiques (`/produits/[slug]`, `/categories/[slug]`) sont toutes pré-générées au build grâce à `generateStaticParams`.

---

## Technologies utilisées

| Technologie | Version |
|---|---|
| Next.js | 16 (App Router) |
| React | 19 |
| TypeScript | strict |
| Tailwind CSS | v4 |
| lucide-react | icons |

---

## Contraintes techniques

- **100 % statique** : `output: 'export'` — aucun serveur Node.js requis
- **Aucun backend** : commandes via WhatsApp uniquement
- **Images non optimisées** : `images: { unoptimized: true }` pour compatibilité export statique
- Toutes les pages dynamiques utilisent `generateStaticParams`
- `useSearchParams` est enveloppé dans `<Suspense>` conformément aux exigences de Next.js
