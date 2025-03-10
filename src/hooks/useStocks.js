import { useState, useEffect } from 'react';
import { fetchStocksByIndex } from '../services/mockApiService';

// Hook personnalisé pour récupérer et filtrer les données des actions
export const useStocks = (indexName) => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    aboveWMA200: false,
    highReturn6m: false,
    highReturn12m: false,
    betaAbove1: false
  });

  useEffect(() => {
    const getStocks = async () => {
      try {
        setLoading(true);
        
        // Utiliser notre service de mock API
        const data = await fetchStocksByIndex(indexName);
        
        setStocks(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching stocks:', err);
        setError('Impossible de récupérer les données des actions. Veuillez réessayer.');
        setLoading(false);
      }
    };

    getStocks();
  }, [indexName]);

  // Fonction pour filtrer les stocks selon les critères sélectionnés
  const filteredStocks = () => {
    return stocks.filter(stock => {
      // Si aucun filtre n'est activé, retourne toutes les actions
      if (!filters.aboveWMA200 && !filters.highReturn6m && !filters.highReturn12m && !filters.betaAbove1) {
        return true;
      }

      // Applique les filtres sélectionnés
      let meetsFilters = true;
      
      if (filters.aboveWMA200 && stock.currentPrice <= stock.wma200) {
        meetsFilters = false;
      }
      
      if (filters.highReturn6m && stock.return6m < 10) { // Seuil à 10%
        meetsFilters = false;
      }
      
      if (filters.highReturn12m && stock.return12m < 15) { // Seuil à 15%
        meetsFilters = false;
      }
      
      if (filters.betaAbove1 && stock.beta <= 1) {
        meetsFilters = false;
      }
      
      return meetsFilters;
    });
  };

  return {
    stocks: filteredStocks(),
    allStocks: stocks,
    loading,
    error,
    filters,
    setFilters
  };
};
