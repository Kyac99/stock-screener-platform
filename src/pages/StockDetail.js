import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiClock } from 'react-icons/fi';
import StockHeader from '../components/stock/StockHeader';
import StockMetricsCard from '../components/stock/StockMetricsCard';
import StockPerformanceChart from '../components/charts/StockPerformanceChart';
import PerformanceComparisonChart from '../components/charts/PerformanceComparisonChart';
import { fetchStockDetail } from '../services/mockApiService';

const StockDetail = () => {
  const { symbol } = useParams();
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartPeriod, setChartPeriod] = useState('6m');

  useEffect(() => {
    const getStockData = async () => {
      try {
        setLoading(true);
        
        // Utiliser notre service de mock API
        const data = await fetchStockDetail(symbol);
        setStock(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching stock data:', err);
        setError('Impossible de récupérer les données de l\'action. Veuillez réessayer.');
        setLoading(false);
      }
    };

    getStockData();
  }, [symbol]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        <p className="ml-3 text-gray-600 dark:text-gray-400">Chargement des données...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900">
          <FiClock className="h-6 w-6 text-red-600 dark:text-red-200" aria-hidden="true" />
        </div>
        <h3 className="mt-3 text-lg font-medium text-gray-900 dark:text-gray-100">Erreur</h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{error}</p>
        <div className="mt-6">
          <Link to="/screener" className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300">
            Retour au screener
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link to="/screener" className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 mb-4">
          <FiArrowLeft className="mr-1" /> Retour au screener
        </Link>
        <StockHeader stock={stock} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Graphique principal */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Performance du cours</h2>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setChartPeriod('6m')}
                className={`px-3 py-1 text-xs rounded-full ${chartPeriod === '6m' ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                6 mois
              </button>
              <button 
                onClick={() => setChartPeriod('12m')}
                className={`px-3 py-1 text-xs rounded-full ${chartPeriod === '12m' ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                12 mois
              </button>
            </div>
          </div>
          <StockPerformanceChart stock={stock} period={chartPeriod} />
        </div>

        {/* Métriques */}
        <div className="lg:col-span-1">
          <StockMetricsCard stock={stock} />
        </div>
      </div>

      {/* Comparaison de performance */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Comparaison de performance</h2>
        <PerformanceComparisonChart stock={stock} benchmarkIndex="Indice de référence" />
      </div>
      
      {/* Information supplémentaire */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">À propos de {stock.symbol}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Les données présentées sont générées pour la démonstration. Dans un environnement de production, cette section afficherait des informations détaillées sur l'entreprise, ses activités, ses fondamentaux financiers et d'autres métriques pertinentes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Points clés</h3>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>• Moyenne mobile pondérée sur 200 périodes: ${stock.wma200.toFixed(2)}</li>
              <li>• Performance sur 6 mois: {stock.return6m.toFixed(2)}%</li>
              <li>• Performance sur 12 mois: {stock.return12m.toFixed(2)}%</li>
              <li>• Bêta: {stock.beta.toFixed(2)}</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Interprétation</h3>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>• {stock.currentPrice > stock.wma200 ? 'Prix au-dessus de la WMA 200: tendance potentiellement haussière' : 'Prix en-dessous de la WMA 200: tendance potentiellement baissière'}</li>
              <li>• {stock.return6m > 0 ? 'Performance positive sur 6 mois' : 'Performance négative sur 6 mois'}</li>
              <li>• {stock.return12m > 0 ? 'Performance positive sur 12 mois' : 'Performance négative sur 12 mois'}</li>
              <li>• {stock.beta > 1 ? 'Bêta supérieur à 1: plus volatile que le marché' : 'Bêta inférieur à 1: moins volatile que le marché'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetail;
