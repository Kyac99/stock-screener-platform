import { useState, useEffect } from 'react';
import { fetchStocksByIndex } from '../services/apiService';

// Hook personnalisé pour récupérer et filtrer les données des actions
export const useStocks = (indexName) => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    aboveWMA200: false,
    highReturn6m: false,
    highReturn12m: false,
    betaAbove1: false,
    // Filtres pour PER et ROE
    perMin: '',
    perMax: '',
    roeMin: '',
    roeMax: ''
  });

  useEffect(() => {
    const getStocks = async () => {
      try {
        setLoading(true);
        
        // Utiliser notre service API Yahoo Finance
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
      // Convertir les valeurs de filtre en nombres (si elles sont définies)
      const perMinValue = filters.perMin !== '' ? parseFloat(filters.perMin) : null;
      const perMaxValue = filters.perMax !== '' ? parseFloat(filters.perMax) : null;
      const roeMinValue = filters.roeMin !== '' ? parseFloat(filters.roeMin) : null;
      const roeMaxValue = filters.roeMax !== '' ? parseFloat(filters.roeMax) : null;

      // Si aucun filtre n'est activé ou défini, retourne toutes les actions
      if (!filters.aboveWMA200 && 
          !filters.highReturn6m && 
          !filters.highReturn12m && 
          !filters.betaAbove1 &&
          perMinValue === null && 
          perMaxValue === null && 
          roeMinValue === null && 
          roeMaxValue === null) {
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
      
      // Filtres pour PER
      if (perMinValue !== null && stock.per < perMinValue) {
        meetsFilters = false;
      }
      
      if (perMaxValue !== null && stock.per > perMaxValue) {
        meetsFilters = false;
      }
      
      // Filtres pour ROE
      if (roeMinValue !== null && stock.roe < roeMinValue) {
        meetsFilters = false;
      }
      
      if (roeMaxValue !== null && stock.roe > roeMaxValue) {
        meetsFilters = false;
      }
      
      return meetsFilters;
    });
  };

  // Fonction pour mettre à jour les filtres numériques
  const updateNumericFilter = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  return {
    stocks: filteredStocks(),
    allStocks: stocks,
    loading,
    error,
    filters,
    setFilters,
    updateNumericFilter
  };
};
