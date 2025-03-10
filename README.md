# StockScreener - Plateforme de Screening d'Actions

![StockScreener Banner](https://via.placeholder.com/1200x300/0ea5e9/FFFFFF?text=StockScreener)

Une application web moderne pour filtrer et afficher des actions sur la base de différents critères de performance.

## ✨ Aperçu

StockScreener est une plateforme web intuitive et élégante qui permet aux utilisateurs de filtrer et d'analyser des actions selon différents critères techniques et fondamentaux. L'application offre un écosystème complet pour la recherche d'actions avec une interface utilisateur moderne et réactive.

## 🚀 Fonctionnalités principales

- **Sélection de différents indices**
  - NASDAQ
  - S&P 500
  - MSCI World
  - MSCI World Tech

- **Filtrage par critères multiples**
  - Cours au-dessus de la Moyenne Mobile Pondérée (WMA) sur 200 périodes
  - Rendement le plus élevé sur les 6 derniers mois
  - Rendement élevé sur les 12 derniers mois
  - Bêta supérieur à 1

- **Visualisations de données avancées**
  - Graphiques de performance
  - Comparaisons avec les indices de référence
  - Analyses techniques visuelles

- **Interface utilisateur moderne et réactive**
  - Thème clair/sombre
  - Design responsive
  - Expérience utilisateur intuitive

## 🛠️ Stack Technologique

- **Frontend**
  - React.js
  - Tailwind CSS avec DaisyUI
  - React Router pour la navigation
  - Chart.js avec React-ChartJS-2 pour les visualisations

- **Données Financières**
  - APIs comme Yahoo Finance (simulées pour la démo)

## ⚙️ Installation et démarrage

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/Kyac99/stock-screener-platform.git
   cd stock-screener-platform
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Démarrer l'application en mode développement**
   ```bash
   npm start
   ```

4. **Ouvrir l'application**
   L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000)

## 📸 Captures d'écran

### Dashboard
![Dashboard](https://via.placeholder.com/800x450/f8fafc/1e293b?text=Dashboard)

### Screener
![Screener](https://via.placeholder.com/800x450/f8fafc/1e293b?text=Screener)

### Détail d'une action
![Stock Detail](https://via.placeholder.com/800x450/f8fafc/1e293b?text=Stock+Detail)

## 🏗️ Structure du projet

```
stock-screener-platform/
├── public/                 # Fichiers statiques
├── src/                    # Code source
│   ├── components/         # Composants React
│   │   ├── charts/         # Composants de visualisation
│   │   ├── layout/         # Composants de mise en page
│   │   ├── screener/       # Composants du screener
│   │   └── stock/          # Composants de détail d'action
│   ├── contexts/           # Contextes React pour la gestion d'état
│   ├── hooks/              # Hooks personnalisés
│   ├── pages/              # Pages principales
│   ├── App.js              # Composant principal
│   └── index.js            # Point d'entrée
├── package.json            # Dépendances et scripts
└── tailwind.config.js      # Configuration Tailwind CSS
```

## 🔄 Mode de données

Pour cette démo, l'application utilise des données générées aléatoirement. Dans un environnement de production, elle se connecterait à des APIs financières pour récupérer des données en temps réel.

## 🚧 Roadmap

- [ ] Ajouter plus de critères de filtrage
- [ ] Implémenter l'authentification des utilisateurs
- [ ] Permettre la sauvegarde de configurations de filtres
- [ ] Ajouter des alertes personnalisées
- [ ] Intégrer des données financières réelles
- [ ] Ajouter une fonctionnalité de backtesting

## 📄 Licence

Ce projet est distribué sous licence MIT. Voir le fichier `LICENSE` pour plus d'informations.

## 👥 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou soumettre une pull request.

---

Développé avec ❤️ pour simplifier l'analyse des marchés financiers
