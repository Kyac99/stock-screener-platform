import React from 'react';
import { FiSliders, FiCheck, FiDollarSign, FiPercent } from 'react-icons/fi';

const FilterPanel = ({ filters, setFilters }) => {
  const handleCheckboxChange = (filterName) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Permet seulement les nombres, le point décimal et la valeur vide
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setFilters(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const resetFilters = () => {
    setFilters({
      aboveWMA200: false,
      highReturn6m: false,
      highReturn12m: false,
      betaAbove1: false,
      perMin: '',
      perMax: '',
      roeMin: '',
      roeMax: ''
    });
  };

  // Compte combien de filtres sont actifs
  const countActiveFilters = () => {
    let count = 0;
    if (filters.aboveWMA200) count++;
    if (filters.highReturn6m) count++;
    if (filters.highReturn12m) count++;
    if (filters.betaAbove1) count++;
    if (filters.perMin !== '') count++;
    if (filters.perMax !== '') count++;
    if (filters.roeMin !== '') count++;
    if (filters.roeMax !== '') count++;
    return count;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
          <FiSliders className="mr-2" /> Filtres
        </h2>
        <button 
          onClick={resetFilters}
          className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          Réinitialiser
        </button>
      </div>
      
      <div className="space-y-6">
        {/* Filtres booléens */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filtres techniques</h3>
          
          <div className="flex items-center">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked={filters.aboveWMA200}
                  onChange={() => handleCheckboxChange('aboveWMA200')}
                />
                <div className={`block w-10 h-6 rounded-full transition-colors ${filters.aboveWMA200 ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${filters.aboveWMA200 ? 'translate-x-4' : ''}`}></div>
              </div>
              <div className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                Cours au-dessus de la WMA 200
              </div>
            </label>
          </div>
          
          <div className="flex items-center">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked={filters.highReturn6m}
                  onChange={() => handleCheckboxChange('highReturn6m')}
                />
                <div className={`block w-10 h-6 rounded-full transition-colors ${filters.highReturn6m ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${filters.highReturn6m ? 'translate-x-4' : ''}`}></div>
              </div>
              <div className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                Rendement élevé sur 6 mois
              </div>
            </label>
          </div>
          
          <div className="flex items-center">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked={filters.highReturn12m}
                  onChange={() => handleCheckboxChange('highReturn12m')}
                />
                <div className={`block w-10 h-6 rounded-full transition-colors ${filters.highReturn12m ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${filters.highReturn12m ? 'translate-x-4' : ''}`}></div>
              </div>
              <div className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                Rendement élevé sur 12 mois
              </div>
            </label>
          </div>
          
          <div className="flex items-center">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked={filters.betaAbove1}
                  onChange={() => handleCheckboxChange('betaAbove1')}
                />
                <div className={`block w-10 h-6 rounded-full transition-colors ${filters.betaAbove1 ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${filters.betaAbove1 ? 'translate-x-4' : ''}`}></div>
              </div>
              <div className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                Bêta supérieur à 1
              </div>
            </label>
          </div>
        </div>
        
        {/* Filtres PER */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
            <FiDollarSign className="mr-1" /> PER (Price-to-Earnings Ratio)
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Min</label>
              <input 
                type="text"
                name="perMin"
                value={filters.perMin}
                onChange={handleInputChange}
                placeholder="Ex: 10"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Max</label>
              <input 
                type="text"
                name="perMax"
                value={filters.perMax}
                onChange={handleInputChange}
                placeholder="Ex: 25"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>
          </div>
        </div>
        
        {/* Filtres ROE */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
            <FiPercent className="mr-1" /> ROE (Return on Equity)
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Min (%)</label>
              <input 
                type="text"
                name="roeMin"
                value={filters.roeMin}
                onChange={handleInputChange}
                placeholder="Ex: 12"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Max (%)</label>
              <input 
                type="text"
                name="roeMax"
                value={filters.roeMax}
                onChange={handleInputChange}
                placeholder="Ex: 30"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          Filtres actifs: {countActiveFilters()}/8
        </div>
        <div className="flex gap-2 flex-wrap">
          {filters.aboveWMA200 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              <FiCheck className="mr-1" /> WMA 200
            </span>
          )}
          {filters.highReturn6m && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              <FiCheck className="mr-1" /> Rendement 6M
            </span>
          )}
          {filters.highReturn12m && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              <FiCheck className="mr-1" /> Rendement 12M
            </span>
          )}
          {filters.betaAbove1 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
              <FiCheck className="mr-1" /> Bêta > 1
            </span>
          )}
          {filters.perMin !== '' && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
              <FiCheck className="mr-1" /> PER ≥ {filters.perMin}
            </span>
          )}
          {filters.perMax !== '' && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
              <FiCheck className="mr-1" /> PER ≤ {filters.perMax}
            </span>
          )}
          {filters.roeMin !== '' && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200">
              <FiCheck className="mr-1" /> ROE ≥ {filters.roeMin}%
            </span>
          )}
          {filters.roeMax !== '' && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200">
              <FiCheck className="mr-1" /> ROE ≤ {filters.roeMax}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
