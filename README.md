# 🚀 BuzzTech

Site vitrine professionnel pour BuzzTech - Services informatiques à Saint-Étienne.

**Stack technique :** React 18 + TypeScript + Vite + SCSS Modules

---

## 📋 Table des matières

- [🎯 Fonctionnalités](#-fonctionnalités)
- [🏗️ Architecture](#️-architecture)
- [⚡ Quick Start](#-quick-start)
- [🧪 Tests](#-tests)
- [🚀 Déploiement](#-déploiement)
- [🛠️ Scripts](#️-scripts)
- [📦 Dépendances](#-dépendances)
- [🔒 Sécurité](#-sécurité)
- [📝 Conventions](#-conventions)

---

## 🎯 Fonctionnalités

### ✅ Implémentées

- **Navigation fluide** avec scroll personnalisé
- **3 services** détaillés (Dépannage, Configuration PC, Création Web)
- **Formulaire de contact** avec validation
- **SEO optimisé** (meta tags, structured data, sitemap)
- **Accessibilité** WCAG 2.1 AA (navigation clavier, ARIA, focus management)
- **Responsive design** (mobile-first, tablet, desktop)
- **Cookies RGPD** avec banner de consentement
- **Error tracking** avec Sentry (prod)
- **CI/CD** automatique avec GitHub Actions
- **Headers de sécurité** (CSP, HSTS, etc.)

### 🎨 Design

- **Glassmorphism** moderne
- **Dark theme** avec accents violets
- **Animations** fluides et performantes
- **Progressive enhancement**

---

## 🏗️ Architecture

```
buzztech/
├── .github/
│   └── workflows/
│       └── ci.yml              # CI/CD Pipeline
├── public/
│   ├── _redirects              # Netlify redirects (SPA)
│   └── assets/                 # Images, vidéos
├── src/
│   ├── core/                   # 🧠 Logique métier
│   │   ├── config/             # Configuration (env vars)
│   │   ├── data/               # Données statiques
│   │   ├── hooks/              # Hooks réutilisables
│   │   ├── services/           # Services (Sentry, etc.)
│   │   ├── tests/              # Tests unitaires
│   │   └── types/              # Types TypeScript
│   ├── ui/                     # 🎨 Composants visuels
│   │   ├── components/         # Composants réutilisables
│   │   ├── modules/            # Modules métier
│   │   └── pages/              # Pages de routing
│   ├── theme/                  # 🎨 Styles globaux
│   │   ├── mixins.scss         # Mixins SCSS
│   │   ├── variables.scss      # Variables design
│   │   ├── reset.scss          # CSS reset
│   │   └── module.scss         # Styles modules
│   ├── App.tsx                 # Point d'entrée app
│   ├── Router.tsx              # Configuration routes
│   └── Layout.tsx              # Layout principal
├── tools/                      # 🔧 Configuration outils
│   ├── eslint.config.js        # Linting JS/TS
│   ├── stylelint.config.js     # Linting CSS/SCSS
│   └── prettier.config.js      # Formatage code
├── .env.example                # Template variables d'env
├── .env.development            # Config développement
├── .env.production             # Config production (pas committé)
├── netlify.toml                # Config Netlify
├── vite.config.ts              # Configuration Vite
├── tsconfig.json               # Configuration TypeScript
└── package.json                # Dépendances npm

```

### **Principes architecturaux**

- **Séparation des responsabilités** : core (logique) / ui (présentation)
- **Composants découplés** : chaque module est autonome
- **Data layer centralisé** : toutes les données dans `core/data/`
- **Types stricts** : TypeScript en mode strict partout
- **Tests co-localisés** : tests à côté du code testé

---

## ⚡ Quick Start

### **Prérequis**

- Node.js >= 20
- npm >= 8

### **Installation**

```bash
# Cloner le repo
git clone https://github.com/estebane-blancquart/buzztech.git
cd buzztech

# Installer les dépendances
npm install

# Copier et configurer les variables d'environnement
cp .env.development .env

# Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur **http://localhost:5173**

---

## 🧪 Tests

### **Tests unitaires** (Vitest + Testing Library)

```bash
# Lancer les tests en mode watch
npm test

# Lancer les tests une fois
npm test -- --run

# Avec coverage
npm test -- --coverage
```

### **Tests E2E** (à venir)

```bash
# À implémenter avec Playwright
npm run test:e2e
```

### **Linting**

```bash
# Linter JavaScript/TypeScript
npm run lint:js

# Linter CSS/SCSS
npm run lint:css

# Auto-fix CSS
npm run lint:fix

# Formatter le code
npm run format
```

---

## 🚀 Déploiement

### **Build de production**

```bash
# Créer le build optimisé
npm run build

# Prévisualiser le build
npm run preview
```

### **Déploiement automatique sur Netlify**

Le déploiement est **automatique** via GitHub Actions :

1. **Push sur `main`** → Deploy automatique en production
2. **Pull Request** → Deploy preview automatique

#### **Configuration requise (GitHub Secrets)**

Dans `Settings > Secrets and variables > Actions`, ajouter :

```
NETLIFY_AUTH_TOKEN=ton-token-netlify
NETLIFY_SITE_ID=ton-site-id
VITE_SENTRY_DSN=ton-dsn-sentry
VITE_GTM_ID=ton-gtm-id
VITE_SITE_URL=https://buzztech.fr
VITE_SITE_NAME=BuzzTech
VITE_WHATSAPP_NUMBER=33660352267
```

#### **Obtenir les tokens**

- **Netlify Auth Token** : https://app.netlify.com/user/applications#personal-access-tokens
- **Netlify Site ID** : Dans les settings du site Netlify
- **Sentry DSN** : https://sentry.io/ > Project Settings > Client Keys

### **Déploiement manuel**

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Déployer
netlify deploy --prod
```

---

## 🛠️ Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Démarre le serveur de développement |
| `npm run build` | Build de production |
| `npm run preview` | Prévisualise le build de production |
| `npm test` | Lance les tests en mode watch |
| `npm test -- --run` | Lance les tests une fois |
| `npm test -- --coverage` | Lance les tests avec coverage |
| `npm run lint:js` | Lint JavaScript/TypeScript |
| `npm run lint:css` | Lint CSS/SCSS |
| `npm run lint:fix` | Auto-fix CSS |
| `npm run format` | Formate tout le code |

---

## 📦 Dépendances

### **Production**

- **react** 18.3 - UI library
- **react-dom** 18.3 - React DOM renderer
- **react-router-dom** 7.x - Routing
- **react-icons** 5.x - Icônes
- **classnames** 2.x - Utilitaire classes CSS

### **Développement**

- **vite** 6.x - Build tool ultra-rapide
- **typescript** 5.6 - Type safety
- **@vitejs/plugin-react** - Plugin React pour Vite
- **sass** 1.83 - Préprocesseur CSS
- **vitest** 3.x - Test framework
- **@testing-library/react** 16.x - Test utilities
- **eslint** 9.x - Linter JavaScript
- **stylelint** 16.x - Linter CSS
- **prettier** 3.x - Code formatter
- **@sentry/react** - Error tracking

---

## 🔒 Sécurité

### **Headers de sécurité** (configurés dans `netlify.toml`)

- ✅ **CSP** (Content Security Policy)
- ✅ **HSTS** (Strict Transport Security)
- ✅ **X-Frame-Options** (anti-clickjacking)
- ✅ **X-Content-Type-Options** (anti-MIME sniffing)
- ✅ **Referrer-Policy**
- ✅ **Permissions-Policy**

**Score attendu : A+ sur** https://securityheaders.com

### **Monitoring**

- **Sentry** : Tracking des erreurs en production
- **Google Analytics** : Analytiques (avec consentement RGPD)

---

## 📝 Conventions

### **Code Style**

- **TypeScript strict** : pas de `any`, types explicites partout
- **Functional components** : pas de class components
- **Hooks** : utilisation intensive des hooks React
- **Naming** :
  - Components : `PascalCase` (ex: `ContactForm`)
  - Files : `PascalCase` pour composants, `camelCase` pour le reste
  - CSS Modules : `camelCase` (ex: `.contactForm`)
  - Constants : `SCREAMING_SNAKE_CASE`

### **Git Workflow**

- **Branch principale** : `main`
- **Feature branches** : `feature/nom-feature`
- **Commits** : Format conventionnel
  ```
  feat: nouvelle fonctionnalité
  fix: correction de bug
  docs: documentation
  style: formatage
  refactor: refactoring
  test: ajout de tests
  chore: tâches diverses
  ```

### **Structure des commits**

```bash
# Bon
git commit -m "feat: add contact form validation"
git commit -m "fix: resolve scroll bug on mobile"

# Mauvais
git commit -m "update"
git commit -m "fix bug"
```

---

## 🐛 Troubleshooting

### **Le serveur ne démarre pas**

```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules
npm install

# Supprimer le cache Vite
rm -rf node_modules/.vite
```

### **Erreurs TypeScript**

```bash
# Vérifier la config TypeScript
npx tsc --noEmit

# Si problème de types
npm install --save-dev @types/node @types/react @types/react-dom
```

### **Variables d'environnement non chargées**

Les variables d'env sont chargées **uniquement au démarrage**. Il faut :

1. Arrêter le serveur (Ctrl+C)
2. Modifier `.env`
3. Relancer `npm run dev`

### **Build qui plante**

```bash
# Vérifier qu'il n'y a pas d'erreurs de linting
npm run lint:js
npm run lint:css

# Vérifier les tests
npm test -- --run

# Supprimer dist et rebuilder
rm -rf dist
npm run build
```

---


