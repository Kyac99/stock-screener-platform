import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUp, FiArrowDown, FiInfo, FiEye } from 'react-icons/fi';

const ResultsTable = ({ stocks, loading, error }) => {
  const [sortField, setSortField] = useState('symbol');
  const [sortDirection, setSortDirection] = useState('asc');

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement des données...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900">
          <FiInfo className="h-6 w-6 text-red-600 dark:text-red-200" aria-hidden="true" />
        </div>
        <h3 className="mt-3 text-lg font-medium text-gray-900 dark:text-gray-100">Erreur</h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{error}</p>
      </div>
    );
  }

  if (stocks.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">Aucune action ne correspond aux critères sélectionnés.</p>
      </div>
    );
  }

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedStocks = [...stocks].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      return sortDirection === 'asc' 
        ? aValue - bValue
        : bValue - aValue;
    }
  });

  // Helper pour le formatage des nombres
  const formatNumber = (number, decimals = 2) => {
    return number.toFixed(decimals);
  };

  // Helper pour le formatage des pourcentages
  const formatPercent = (number) => {
    return number.toFixed(2) + '%';
  };

  // Helper pour la couleur du rendement (positif/négatif)
  const getReturnColor = (value) => {
    if (value > 0) return 'text-green-600 dark:text-green-400';
    if (value < 0) return 'text-red-600 dark:text-red-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  // Helper pour évaluer la valeur du PER
  const getPERClass = (per) => {
    if (per < 10) return 'text-green-600 dark:text-green-400'; // très bon
    if (per < 20) return 'text-blue-600 dark:text-blue-400';   // bon
    if (per < 30) return 'text-yellow-600 dark:text-yellow-400'; // moyen
    return 'text-red-600 dark:text-red-400'; // élevé
  };

  // Helper pour évaluer la valeur du ROE
  const getROEClass = (roe) => {
    if (roe > 20) return 'text-green-600 dark:text-green-400'; // excellent
    if (roe > 15) return 'text-blue-600 dark:text-blue-400';   // très bon
    if (roe > 10) return 'text-yellow-600 dark:text-yellow-400'; // bon
    return 'text-gray-600 dark:text-gray-400'; // moyen ou faible
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th onClick={() => handleSort('symbol')} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                <div className="flex items-center">
                  Symbole
                  {sortField === 'symbol' && (
                    sortDirection === 'asc' ? <FiArrowUp className="ml-1" /> : <FiArrowDown className="ml-1" />
                  )}
                </div>
              </th>
              <th onClick={() => handleSort('currentPrice')} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                <div className="flex items-center">
                  Cours actuel
                  {sortField === 'currentPrice' && (
                    sortDirection === 'asc' ? <FiArrowUp className="ml-1" /> : <FiArrowDown className="ml-1" />
                  )}
                </div>
              </th>
              <th onClick={() => handleSort('wma200')} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                <div className="flex items-center">
                  WMA 200
                  {sortField === 'wma200' && (
                    sortDirection === 'asc' ? <FiArrowUp className="ml-1" /> : <FiArrowDown className="ml-1" />
                  )}
                </div>
              </th>
              <th onClick={() => handleSort('return6m')} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                <div className="flex items-center">
                  Rend. 6M
                  {sortField === 'return6m' && (
                    sortDirection === 'asc' ? <FiArrowUp className="ml-1" /> : <FiArrowDown className="ml-1" />
                  )}
                </div>
              </th>
              <th onClick={() => handleSort('return12m')} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                <div className="flex items-center">
                  Rend. 12M
                  {sortField === 'return12m' && (
                    sortDirection === 'asc' ? <FiArrowUp className="ml-1" /> : <FiArrowDown className="ml-1" />
                  )}
                </div>
              </th>
              <th onClick={() => handleSort('beta')} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                <div className="flex items-center">
                  Bêta
                  {sortField === 'beta' && (
                    sortDirection === 'asc' ? <FiArrowUp className="ml-1" /> : <FiArrowDown className="ml-1" />
                  )}
                </div>
              </th>
              {/* Nouvelles colonnes pour PER et ROE */}
              <th onClick={() => handleSort('per')} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                <div className="flex items-center">
                  PER
                  {sortField === 'per' && (
                    sortDirection === 'asc' ? <FiArrowUp className="ml-1" /> : <FiArrowDown className="ml-1" />
                  )}
                </div>
              </th>
              <th onClick={() => handleSort('roe')} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                <div className="flex items-center">
                  ROE
                  {sortField === 'roe' && (
                    sortDirection === 'asc' ? <FiArrowUp className="ml-1" /> : <FiArrowDown className="ml-1" />
                  )}
                </div>
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {sortedStocks.map((stock) => (
              <tr key={stock.symbol} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{stock.symbol}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{stock.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-gray-100">${formatNumber(stock.currentPrice)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-gray-100">${formatNumber(stock.wma200)}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {stock.currentPrice > stock.wma200 ? (
                      <span className="text-green-600 dark:text-green-400">Au-dessus</span>
                    ) : (
                      <span className="text-red-600 dark:text-red-400">En-dessous</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm ${getReturnColor(stock.return6m)}`}>
                    {formatPercent(stock.return6m)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm ${getReturnColor(stock.return12m)}`}>
                    {formatPercent(stock.return12m)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-gray-100">{formatNumber(stock.beta, 2)}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {stock.beta > 1 ? (
                      <span className="text-blue-600 dark:text-blue-400">> 1</span>
                    ) : (
                      <span className="text-gray-600 dark:text-gray-400">≤ 1</span>
                    )}
                  </div>
                </td>
                {/* Cellules pour PER et ROE */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm ${getPERClass(stock.per)}`}>
                    {formatNumber(stock.per, 1)}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {stock.per < 15 ? 'Attractif' : stock.per > 25 ? 'Élevé' : 'Moyen'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm ${getROEClass(stock.roe)}`}>
                    {formatPercent(stock.roe)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link 
                    to={`/stock/${stock.symbol}`} 
                    className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 flex items-center justify-end"
                  >
                    <FiEye className="mr-1" /> Détails
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <div className="text-sm text-gray-700 dark:text-gray-300">
          {stocks.length} résultats trouvés
        </div>
      </div>
    </div>
  );
};

export default ResultsTable;
