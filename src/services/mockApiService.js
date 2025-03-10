// mockApiService.js
// Ce service simule des appels API pour la démonstration

/**
 * Génère des données mock pour un indice boursier spécifique
 * @param {string} indexName - Nom de l'indice boursier
 * @returns {Promise<Array>} - Promesse résolue avec un tableau d'actions
 */
export const fetchStocksByIndex = async (indexName) => {
  // Simuler un délai d'API
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const indices = {
    'NASDAQ': ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA', 'NVDA', 'ADBE', 'NFLX', 'PYPL', 'INTC', 'CSCO', 'CMCSA', 'PEP', 'AVGO', 'COST', 'TMUS', 'TXN', 'QCOM', 'SBUX'],
    'S&P 500': ['JNJ', 'PG', 'V', 'JPM', 'UNH', 'HD', 'BAC', 'DIS', 'VZ', 'CSCO', 'XOM', 'CVX', 'PFE', 'KO', 'WMT', 'MRK', 'T', 'PEP', 'ABT', 'MCD'],
    'MSCI World': ['NESN.SW', 'ROG.SW', 'ASML.AS', 'MC.PA', 'SHEL.L', 'LVMH.PA', 'TTE.PA', 'SAP.DE', 'NOVO-B.CO', 'AZN.L', 'NOVN.SW', 'HSBA.L', 'BHP.L', 'TCS.NS', 'RIO.L', 'SAN.MC', 'BP.L', 'AIR.PA', 'BARC.L', 'ALV.DE'],
    'MSCI World Tech': ['TSM', 'CRM', 'ORCL', 'ACN', 'IBM', 'TXN', 'INTC', 'AVGO', 'AMD', 'MU', 'ASML.AS', 'SAP.DE', '4819.T', '9984.T', '035420.KS', '005930.KS', '700.HK', '9988.HK', '2330.TW', '1211.TW']
  };
  
  const symbols = indices[indexName] || indices['NASDAQ'];
  
  // Générer des données mock pour chaque symbole
  return symbols.map(symbol => generateMockStockData(symbol));
};

/**
 * Génère des données mock pour une action spécifique
 * @param {string} symbol - Symbole de l'action
 * @returns {Promise<Object>} - Promesse résolue avec les données de l'action
 */
export const fetchStockDetail = async (symbol) => {
  // Simuler un délai d'API
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return generateMockStockData(symbol);
};

/**
 * Génère des données historiques mock pour une action
 * @param {string} symbol - Symbole de l'action
 * @param {string} period - Période (6m ou 12m)
 * @returns {Promise<Object>} - Promesse résolue avec les données historiques
 */
export const fetchStockHistoricalData = async (symbol, period) => {
  // Simuler un délai d'API
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  const today = new Date();
  const daysCount = period === '6m' ? 180 : 365;
  const dates = [];
  const prices = [];
  
  // Prix actuel estimé
  const currentPrice = 100 + (symbol.charCodeAt(0) % 10) * 50;
  
  // Rendement aléatoire
  const returnPercentage = (Math.random() * 40) - 10; // -10% à +30%
  
  // Prix initial
  const initialPrice = currentPrice / (1 + returnPercentage / 100);
  
  // Générer des prix pour chaque jour
  for (let i = daysCount; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
    
    const progress = 1 - (i / daysCount);
    const randomFactor = 0.03;
    const randomVariation = ((Math.random() * 2) - 1) * randomFactor;
    
    const price = initialPrice + ((currentPrice - initialPrice) * progress) + (initialPrice * randomVariation);
    prices.push(price);
  }
  
  return { dates, prices };
};

/**
 * Génère des données mock complètes pour une action
 * @param {string} symbol - Symbole de l'action
 * @returns {Object} - Données mock de l'action
 */
const generateMockStockData = (symbol) => {
  // Générer un prix entre 50 et 550$
  const seed = symbol.charCodeAt(0);
  const currentPrice = 50 + (seed % 10) * 50 + Math.random() * 50;
  
  // Générer la moyenne mobile pondérée (WMA) sur 200 périodes
  const wmaRatio = 0.9 + Math.random() * 0.2; // Entre 0.9 et 1.1 par rapport au prix actuel
  const wma200 = currentPrice * wmaRatio;
  
  // Générer les rendements
  const return6m = Math.random() * 40 - 10; // -10% à +30%
  const return12m = Math.random() * 60 - 15; // -15% à +45%
  
  // Générer le bêta
  const beta = 0.2 + Math.random() * 2.5; // 0.2 à 2.7
  
  // Générer le volume
  const volume = 100000 + Math.floor(Math.random() * 10000000);
  
  // Générer la capitalisation boursière (en milliards)
  const marketCap = 10 + Math.floor(Math.random() * 1000);
  
  return {
    symbol,
    name: `${symbol} Inc.`,
    currentPrice,
    wma200,
    return6m,
    return12m,
    beta,
    volume,
    marketCap,
  };
};
