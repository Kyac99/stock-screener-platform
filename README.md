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
  - React Router (HashRouter) pour la navigation
  - Chart.js avec React-ChartJS-2 pour les visualisations
  - React Icons

- **Données:**
  - API Yahoo Finance via RapidAPI pour les données financières réelles
  - Fallback sur des données simulées en cas de problème d'API

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

3. **Configurer l'API (optionnel)**
   - Si vous souhaitez utiliser l'API Yahoo Finance, inscrivez-vous sur [RapidAPI](https://rapidapi.com/)
   - Abonnez-vous à l'API Yahoo Finance
   - Copiez votre clé API et modifiez la variable `RAPID_API_KEY` dans le fichier `src/services/apiService.js`

4. **Lancer l'application en mode développement**
   ```bash
   npm start
   ```
   
5. **Accéder à l'application**
   L'application sera disponible à l'adresse [http://localhost:3000](http://localhost:3000)

## 🚀 Déploiement avec GitHub Pages

Cette application est déjà configurée et déployée sur GitHub Pages. Suivez ces étapes si vous avez besoin de la redéployer ou de déployer votre propre version.

### Configuration déjà réalisée

1. **package.json**
   - Propriété `"homepage"` ajoutée
   - Scripts `"predeploy"` et `"deploy"` configurés
   - Dépendance `"gh-pages"` installée

2. **React Router**
   - HashRouter utilisé (à la place de BrowserRouter) pour la compatibilité avec GitHub Pages

3. **Pages de redirection**
   - Fichier 404.html configuré
   - Script de redirection dans index.html

### Comment redéployer

1. **Après avoir effectué des modifications, exécutez :**
   ```bash
   npm run deploy
   ```

2. **Vérifiez que la branche gh-pages est active dans les paramètres GitHub Pages**
   - Allez dans Settings > Pages
   - Source devrait être "Deploy from a branch"
   - Branch devrait être "gh-pages"

3. **Accédez à votre site**
   Attendez quelques minutes puis visitez :
   [https://kyac99.github.io/stock-screener-platform/](https://kyac99.github.io/stock-screener-platform/)

## 🔄 Intégration avec Yahoo Finance

Cette application utilise l'API Yahoo Finance pour obtenir des données financières réelles. Les données incluent :

- Prix actuels et historiques des actions
- Métriques clés comme le PER et le ROE
- Bêta et autres statistiques

Voici un exemple du format de données récupérées et traitées :

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
  marketCap: 2850  // En milliards
}
```

### Implémentation technique

1. **Récupération des données**
   - Appels API à Yahoo Finance via RapidAPI
   - Traitement et normalisation des données

2. **Calculs financiers**
   - WMA 200 calculée à partir des données historiques
   - Rendements sur 6 et 12 mois calculés en comparant les prix actuels et passés

3. **Système de fallback**
   - Génération de données simulées en cas d'erreur API
   - Permet à l'application de fonctionner même sans clé API

## 🛣️ Feuille de route

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
