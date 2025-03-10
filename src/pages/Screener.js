import React from 'react';
import { useIndex } from '../contexts/IndexContext';
import { useStocks } from '../hooks/useStocks';
import FilterPanel from '../components/screener/FilterPanel';
import ResultsTable from '../components/screener/ResultsTable';

const Screener = () => {
  const { selectedIndex } = useIndex();
  const { stocks, loading, error, filters, setFilters } = useStocks(selectedIndex);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Screener: {selectedIndex}</h1>
        <p className="text-gray-600 dark:text-gray-400">Filtrez les actions selon vos critères personnalisés.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Panneau de filtres (sidebar) */}
        <div className="lg:col-span-1">
          <FilterPanel filters={filters} setFilters={setFilters} />
          
          {/* Carte d'information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">À propos du screener</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Utilisez les filtres pour affiner votre recherche. Les critères peuvent être combinés pour trouver les actions qui correspondent à vos objectifs d'investissement.
            </p>
            <div className="space-y-2">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <span className="font-medium">WMA 200</span>: Moyenne mobile pondérée sur 200 périodes
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <span className="font-medium">Rendement 6M/12M</span>: Performance sur 6 et 12 mois
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <span className="font-medium">Bêta</span>: Mesure de volatilité par rapport au marché
              </div>
            </div>
          </div>
        </div>
        
        {/* Tableau de résultats */}
        <div className="lg:col-span-3">
          <ResultsTable stocks={stocks} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
};

export default Screener;
