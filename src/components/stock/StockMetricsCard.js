import React from 'react';
import { FiTrendingUp, FiZap, FiDollarSign, FiPercent } from 'react-icons/fi';

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
    if (stock.return6m > 20) score += 20;
    else if (stock.return6m > 10) score += 12;
    else if (stock.return6m > 0) score += 5;
    
    // Points basés sur la performance de 12 mois
    if (stock.return12m > 30) score += 20;
    else if (stock.return12m > 15) score += 12;
    else if (stock.return12m > 0) score += 5;
    
    // Points basés sur la relation au WMA 200
    if (wmaRatio > 1.15) score += 20;
    else if (wmaRatio > 1.05) score += 12;
    else if (wmaRatio > 1) score += 5;
    
    // Points basés sur le bêta (volatilité)
    if (stock.beta > 1.5 && stock.return12m > 0) score += 10;
    else if (stock.beta > 1 && stock.return12m > 0) score += 5;
    
    // Points basés sur le PER
    if (stock.per < 15) score += 15;
    else if (stock.per < 20) score += 10;
    else if (stock.per < 25) score += 5;
    
    // Points basés sur le ROE
    if (stock.roe > 20) score += 15;
    else if (stock.roe > 15) score += 10;
    else if (stock.roe > 10) score += 5;
    
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
  
  // Évaluer le PER
  const getPERClass = (per) => {
    if (per < 10) return 'text-green-600 dark:text-green-400'; // très bon
    if (per < 20) return 'text-blue-600 dark:text-blue-400';   // bon
    if (per < 30) return 'text-yellow-600 dark:text-yellow-400'; // moyen
    return 'text-red-600 dark:text-red-400'; // élevé
  };
  
  // Évaluer le ROE
  const getROEClass = (roe) => {
    if (roe > 20) return 'text-green-600 dark:text-green-400'; // excellent
    if (roe > 15) return 'text-blue-600 dark:text-blue-400';   // très bon
    if (roe > 10) return 'text-yellow-600 dark:text-yellow-400'; // bon
    return 'text-gray-600 dark:text-gray-400'; // moyen ou faible
  };
  
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
        
        {/* Nouvelles sections pour PER et ROE */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <FiDollarSign className="mr-1" /> PER (Price-to-Earnings Ratio)
          </h3>
          <div className="mt-2 flex items-center">
            <div className={`text-lg font-semibold ${getPERClass(stock.per)}`}>
              {stock.per.toFixed(1)}
            </div>
            <div className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              ({stock.per < 15 ? 'Attractif' : stock.per > 25 ? 'Élevé' : 'Moyen'})
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {stock.per < 15 
              ? "Un ratio PER bas suggère une valorisation potentiellement attractive."
              : stock.per > 25 
              ? "Un PER élevé peut indiquer une valorisation premium ou des attentes de forte croissance."
              : "PER modéré, généralement considéré comme équilibré."}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <FiPercent className="mr-1" /> ROE (Return on Equity)
          </h3>
          <div className="mt-2 flex items-center">
            <div className={`text-lg font-semibold ${getROEClass(stock.roe)}`}>
              {stock.roe.toFixed(2)}%
            </div>
            <div className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              ({stock.roe > 20 ? 'Excellent' : stock.roe > 15 ? 'Très bon' : stock.roe > 10 ? 'Bon' : 'Moyen/Faible'})
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {stock.roe > 15 
              ? "ROE élevé : l'entreprise génère un bon retour sur les capitaux propres."
              : stock.roe > 10 
              ? "ROE satisfaisant, au-dessus de la moyenne de nombreux secteurs."
              : "ROE modéré à faible, peut indiquer une efficacité limitée."}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
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
