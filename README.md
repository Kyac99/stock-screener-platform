# StockScreener - Plateforme de Screening d'Actions

![StockScreener Banner](https://via.placeholder.com/1200x300/0ea5e9/FFFFFF?text=StockScreener)

## 📈 Présentation du projet

StockScreener est une application web moderne pour filtrer et analyser des actions selon différents critères techniques et fondamentaux. Elle permet aux investisseurs et traders de rapidement identifier des opportunités d'investissement selon des stratégies personnalisées.

### [🔗 Démo en ligne](https://kyac99.github.io/stock-screener-platform/)

## 🌟 Caractéristiques principales

### 📊 Filtrage multi-critères
- **Filtres techniques:**
  - Cours au-dessus de la Moyenne Mobile Pondérée (WMA) sur 200 périodes
  - Rendement sur 6 et 12 mois
  - Bêta (volatilité par rapport au marché)
  
- **Filtres fondamentaux:**
  - PER (Price-to-Earnings Ratio) - avec plages min/max personnalisables
  - ROE (Return on Equity) - avec plages min/max personnalisables

### 📉 Visualisations avancées
- Graphiques de performance interactifs
- Analyses comparatives avec indices de référence
- Calcul dynamique de force relative

### 🔍 Exploration par indice
Sélection de différents indices pour cibler votre recherche:
- NASDAQ
- S&P 500
- MSCI World
- MSCI World Tech

### 🎨 Interface utilisateur moderne
- Design responsive adapté à tous les appareils
- Mode clair/sombre automatique
- Navigation intuitive et fluide

## 🖥️ Captures d'écran

### Dashboard
![Dashboard](https://via.placeholder.com/800x450/f8fafc/1e293b?text=Dashboard)

### Screener
![Screener](https://via.placeholder.com/800x450/f8fafc/1e293b?text=Screener)

### Détail d'une action
![Stock Detail](https://via.placeholder.com/800x450/f8fafc/1e293b?text=Stock+Detail)

## 🛠️ Technologies utilisées

- **Frontend:**
  - React.js 18
  - Tailwind CSS avec DaisyUI pour le design
  - React Router pour la navigation
  - Chart.js avec React-ChartJS-2 pour les visualisations
  - React Icons

- **Données:**
  - API mock pour démonstration (peut être remplacée par des API financières réelles)

## 📦 Installation et démarrage local

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/Kyac99/stock-screener-platform.git
   cd stock-screener-platform
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer l'application en mode développement**
   ```bash
   npm start
   ```
   
4. **Accéder à l'application**
   L'application sera disponible à l'adresse [http://localhost:3000](http://localhost:3000)

## 🚀 Déploiement avec GitHub Pages

Le projet est configuré pour être facilement déployé sur GitHub Pages, permettant de le rendre accessible sur le web sans serveur dédié.

### Prérequis pour le déploiement
- Un compte GitHub
- Git installé sur votre machine
- Node.js et npm installés

### Étapes détaillées pour le déploiement

1. **Forker ou cloner ce dépôt**
   Assurez-vous d'avoir une copie du code sur votre compte GitHub.

2. **Configurer package.json**
   Vérifiez que votre fichier `package.json` inclut les éléments suivants:
   - La propriété `"homepage"` pointant vers votre GitHub Pages URL
   - Les scripts `"predeploy"` et `"deploy"` 
   - La dépendance `"gh-pages"` dans devDependencies
   
   ```json
   {
     "name": "stock-screener-platform",
     "version": "0.1.0",
     "homepage": "https://votre-nom-utilisateur.github.io/stock-screener-platform",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build",
       ...
     },
     "devDependencies": {
       "gh-pages": "^6.1.0",
       ...
     }
   }
   ```

3. **Utiliser HashRouter**
   Le projet utilise déjà HashRouter au lieu de BrowserRouter pour une meilleure compatibilité avec GitHub Pages. Cela permet aux URL de fonctionner correctement sans configuration serveur spéciale.

4. **Installer les dépendances et déployer**
   ```bash
   npm install
   npm run deploy
   ```
   
   Cette commande va:
   - Construire votre application avec `npm run build`
   - Créer une branche `gh-pages` dans votre dépôt
   - Pousser le contenu du dossier `build` vers cette branche

5. **Configurer GitHub Pages dans les paramètres**
   - Allez dans l'onglet "Settings" de votre dépôt GitHub
   - Naviguez jusqu'à la section "Pages"
   - Dans "Source", sélectionnez la branche `gh-pages`
   - Cliquez sur "Save"

6. **Accéder à votre site**
   Après quelques minutes, votre application sera accessible à l'URL:
   `https://votre-nom-utilisateur.github.io/stock-screener-platform/`

### Dépannage du déploiement

- **Page blanche après déploiement**: Vérifiez que vous utilisez bien HashRouter et non BrowserRouter.
- **Images ou ressources manquantes**: Assurez-vous d'utiliser des chemins relatifs pour toutes les ressources.
- **Erreurs 404**: Vérifiez que le fichier 404.html est correctement configuré.

## 🔄 Structure des données

Pour cette démo, l'application utilise des données générées aléatoirement. Dans un environnement de production, vous pourriez connecter ce front-end à des APIs financières comme:
- Yahoo Finance
- Alpha Vantage
- IEX Cloud

Voici un exemple du format de données utilisé:

```javascript
{
  symbol: "AAPL",
  name: "Apple Inc.",
  currentPrice: 178.42,
  wma200: 165.30,
  return6m: 12.5,
  return12m: 27.8,
  beta: 1.2,
  per: 28.5,     // Price-to-Earnings Ratio
  roe: 18.7,     // Return on Equity (%)
  volume: 35821567,
  marketCap: 2850
}
```

## 🛣️ Feuille de route

- [ ] Connexion à des API financières réelles
- [ ] Ajout de critères de filtrage supplémentaires (dividendes, secteurs, etc.)
- [ ] Sauvegarde des configurations de filtres
- [ ] Authentification des utilisateurs
- [ ] Comparaison côte-à-côte des actions
- [ ] Export des résultats en CSV/PDF
- [ ] Alertes personnalisées sur les actions
- [ ] Backtesting des stratégies
- [ ] Version mobile dédiée

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer:

1. Forker le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Commiter vos changements (`git commit -m 'Add some amazing feature'`)
4. Pousser vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est distribué sous licence MIT. Voir le fichier `LICENSE` pour plus d'informations.

## 📬 Contact

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue sur GitHub.

---

Développé avec ❤️ pour faciliter l'analyse des marchés financiers.
