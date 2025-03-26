// apiService.js
// Service pour récupérer des données d'actions via l'API Yahoo Finance

import axios from 'axios';

// Base URL pour l'API Yahoo Finance via RapidAPI
const RAPID_API_KEY = ''; // Obtenez une clé sur RapidAPI
const BASE_URL = 'https://yh-finance.p.rapidapi.com';

const API_OPTIONS = {
  headers: {
    'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
    'X-RapidAPI-Key': RAPID_API_KEY
  }
};

// Listes de symboles pour chaque indice
const INDICES_SYMBOLS = {
  'NASDAQ': ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA', 'NVDA', 'ADBE', 'NFLX', 'PYPL'],
  'S&P 500': ['JPM', 'JNJ', 'PG', 'V', 'UNH', 'HD', 'BAC', 'DIS', 'XOM', 'CVX'],
  'MSCI World': ['NESN.SW', 'NOVN.SW', 'ROG.SW', 'BHP.L', 'RIO.L', 'HSBA.L', 'BP.L', 'AZN.L', 'SAP.DE', 'BATS.L'],
  'MSCI World Tech': ['TSM', 'CRM', 'ORCL', 'ASML', 'ACN', 'IBM', 'TXN', 'INTC', 'AVGO', 'AMD']
};

/**
 * Récupère des données pour les actions d'un indice spécifique
 * @param {string} indexName - Nom de l'indice boursier
 * @returns {Promise<Array>} - Promesse résolue avec un tableau d'actions
 */
export const fetchStocksByIndex = async (indexName) => {
  try {
    // Récupérer la liste des symboles pour l'indice
    const symbols = INDICES_SYMBOLS[indexName] || INDICES_SYMBOLS['NASDAQ'];
    
    // Utiliser la fonction d'obtention de données pour chaque symbole
    const stocksPromises = symbols.map(symbol => fetchStockDetail(symbol));
    
    // Attendre que toutes les promesses soient résolues
    const stocks = await Promise.all(stocksPromises);
    
    return stocks;
    
  } catch (error) {
    console.error('Error fetching stocks by index:', error);
    throw error;
  }
};

/**
 * Récupère des données détaillées pour une action spécifique
 * @param {string} symbol - Symbole de l'action
 * @returns {Promise<Object>} - Promesse résolue avec les données de l'action
 */
export const fetchStockDetail = async (symbol) => {
  try {
    // Si nous sommes en mode développement ou sans clé API, utiliser des données simulées
    if (!RAPID_API_KEY) {
      console.warn('API Key not provided. Using mock data for demonstration.');
      return generateMockStockData(symbol);
    }
    
    // Récupérer les données de base de l'action
    const quoteResponse = await axios.get(`${BASE_URL}/stock/v2/get-summary`, {
      ...API_OPTIONS,
      params: { symbol }
    });
    
    // Récupérer l'historique des prix pour calculer les rendements et WMA
    const historicalResponse = await axios.get(`${BASE_URL}/stock/v3/get-historical-data`, {
      ...API_OPTIONS,
      params: { symbol }
    });
    
    // Extraire les données pertinentes
    const stockData = quoteResponse.data;
    const historicalData = historicalResponse.data.prices || [];
    
    // Calculer les métriques nécessaires
    const wma200 = calculateWMA(historicalData.slice(0, 200).map(item => item.close));
    const return6m = calculateReturn(historicalData, 180);
    const return12m = calculateReturn(historicalData, 365);
    
    // Construire l'objet de données
    return {
      symbol,
      name: stockData.price.longName || `${symbol} Inc.`,
      currentPrice: stockData.price.regularMarketPrice?.raw || 0,
      wma200,
      return6m,
      return12m,
      beta: stockData.defaultKeyStatistics.beta?.raw || 1,
      volume: stockData.price.regularMarketVolume?.raw || 0,
      marketCap: (stockData.price.marketCap?.raw / 1000000000) || 0, // Convertir en milliards
      per: stockData.defaultKeyStatistics.forwardPE?.raw || stockData.defaultKeyStatistics.trailingPE?.raw || 0,
      roe: parseRoe(stockData.financialData.returnOnEquity)
    };
    
  } catch (error) {
    console.error(`Error fetching details for ${symbol}:`, error);
    // Fallback aux données simulées en cas d'erreur
    return generateMockStockData(symbol);
  }
};

/**
 * Calcule la moyenne mobile pondérée
 * @param {Array<number>} prices - Tableau des prix
 * @param {number} period - Période pour la moyenne mobile
 * @returns {number} - Moyenne mobile pondérée
 */
const calculateWMA = (prices, period = 200) => {
  if (!prices || prices.length < period) {
    return 0;
  }
  
  let sum = 0;
  let weightSum = 0;
  
  for (let i = 0; i < period; i++) {
    const weight = period - i;
    sum += prices[i] * weight;
    weightSum += weight;
  }
  
  return sum / weightSum;
};

/**
 * Calcule le rendement sur une période donnée
 * @param {Array<Object>} historicalData - Données historiques
 * @param {number} days - Nombre de jours pour le calcul
 * @returns {number} - Rendement en pourcentage
 */
const calculateReturn = (historicalData, days) => {
  if (!historicalData || historicalData.length < days) {
    return 0;
  }
  
  const currentPrice = historicalData[0].close;
  const pastPrice = historicalData.find((_, index) => index >= days)?.close || historicalData[historicalData.length - 1].close;
  
  return ((currentPrice - pastPrice) / pastPrice) * 100;
};

/**
 * Parse la valeur ROE depuis les données Yahoo Finance
 * @param {Object} roeData - Données ROE de Yahoo Finance
 * @returns {number} - Valeur ROE en pourcentage
 */
const parseRoe = (roeData) => {
  if (!roeData || !roeData.raw) {
    return 0;
  }
  
  // Yahoo Finance fournit généralement le ROE en décimal, le convertir en pourcentage
  return roeData.raw * 100;
};

/**
 * Génère des données mock si l'API est indisponible
 * @param {string} symbol - Symbole de l'action
 * @returns {Object} - Données mock
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
  
  // Générer le PER (Price-to-Earnings Ratio)
  const per = 5 + Math.floor(Math.random() * 45);
  
  // Générer le ROE (Return on Equity) en pourcentage
  const roe = 2 + Math.random() * 33;
  
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
    per,
    roe
  };
};
