import React from 'react';
import { FiTrendingUp, FiZap } from 'react-icons/fi';

const StockMetricsCard = ({ stock }) => {
  // Calculer le ratio du cours actuel par rapport à la moyenne mobile
  const wmaRatio = stock.currentPrice / stock.wma200;
  const wmaPercentage = ((wmaRatio - 1) * 100).toFixed(2);
  
  // Déterminer si le stock est au-dessus de sa moyenne mobile
  const isAboveWMA = stock.currentPrice > stock.wma200;
  
  // Évaluer la force du stock basée sur divers indicateurs
  const calculateStrengthScore = () => {
    let score = 0;
    
    // Points basés sur la performance de 6 mois
    if (stock.return6m > 20) score += 25;
    else if (stock.return6m > 10) score += 15;
    else if (stock.return6m > 0) score += 5;
    
    // Points basés sur la performance de 12 mois
    if (stock.return12m > 30) score += 25;
    else if (stock.return12m > 15) score += 15;
    else if (stock.return12m > 0) score += 5;
    
    // Points basés sur la relation au WMA 200
    if (wmaRatio > 1.15) score += 25;
    else if (wmaRatio > 1.05) score += 15;
    else if (wmaRatio > 1) score += 5;
    
    // Points basés sur le bêta (volatilité)
    if (stock.beta > 1.5 && stock.return12m > 0) score += 15;
    else if (stock.beta > 1 && stock.return12m > 0) score += 10;
    
    return Math.min(score, 100); // Plafonner à 100
  };
  
  const strengthScore = calculateStrengthScore();
  
  // Déterminer la couleur de la force (rouge à vert)
  const getStrengthColor = (score) => {
    if (score >= 75) return 'text-green-600 dark:text-green-400';
    if (score >= 50) return 'text-blue-600 dark:text-blue-400';
    if (score >= 25) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };
  
  const strengthColor = getStrengthColor(strengthScore);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Analyse technique
      </h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <FiTrendingUp className="mr-1" /> Relation au WMA 200
          </h3>
          <div className="mt-2 flex items-center">
            <div className={`text-lg font-semibold ${isAboveWMA ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {isAboveWMA ? 'Au-dessus' : 'En-dessous'}
            </div>
            <div className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              ({isAboveWMA ? '+' : ''}{wmaPercentage}%)
            </div>
          </div>
          <div className="mt-2 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${isAboveWMA ? 'bg-green-500' : 'bg-red-500'}`}
              style={{ width: `${Math.min(Math.abs(wmaPercentage) * 2, 100)}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <FiZap className="mr-1" /> Force relative
          </h3>
          <div className="mt-2">
            <div className={`text-xl font-bold ${strengthColor}`}>
              {strengthScore}/100
            </div>
          </div>
          <div className="mt-2 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                strengthScore >= 75 ? 'bg-green-500' : 
                strengthScore >= 50 ? 'bg-blue-500' : 
                strengthScore >= 25 ? 'bg-yellow-500' : 
                'bg-red-500'
              }`}
              style={{ width: `${strengthScore}%` }}
            ></div>
          </div>
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {strengthScore >= 75 ? 'Fort' : 
             strengthScore >= 50 ? 'Modéré' : 
             strengthScore >= 25 ? 'Faible' : 
             'Très faible'}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <h3 className="text-xs text-gray-500 dark:text-gray-400">Rend. 6M</h3>
            <div className={`mt-1 font-semibold ${stock.return6m >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {stock.return6m.toFixed(2)}%
            </div>
          </div>
          
          <div>
            <h3 className="text-xs text-gray-500 dark:text-gray-400">Rend. 12M</h3>
            <div className={`mt-1 font-semibold ${stock.return12m >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {stock.return12m.toFixed(2)}%
            </div>
          </div>
          
          <div>
            <h3 className="text-xs text-gray-500 dark:text-gray-400">Bêta</h3>
            <div className="mt-1 font-semibold text-gray-800 dark:text-gray-200">
              {stock.beta.toFixed(2)}
            </div>
          </div>
          
          <div>
            <h3 className="text-xs text-gray-500 dark:text-gray-400">Volatilité</h3>
            <div className="mt-1 font-semibold text-gray-800 dark:text-gray-200">
              {stock.beta > 1.5 ? 'Élevée' : stock.beta > 1 ? 'Moyenne' : 'Faible'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockMetricsCard;
