import React from 'react';
import { Link } from 'react-router-dom';
import { useIndex, INDICES } from '../contexts/IndexContext';
import { FiBarChart2, FiTrendingUp, FiGlobe, FiServer, FiArrowRight } from 'react-icons/fi';

const Dashboard = () => {
  const { setSelectedIndex } = useIndex();

  // Données pour les tuiles d'indices
  const indexTiles = [
    {
      name: INDICES.NASDAQ,
      icon: <FiBarChart2 className="w-6 h-6" />,
      color: 'bg-blue-500',
      description: 'Filtrer les actions technologiques américaines',
      stockCount: '100+'
    },
    {
      name: INDICES.SP500,
      icon: <FiTrendingUp className="w-6 h-6" />,
      color: 'bg-green-500',
      description: "Filtrer les grandes entreprises américaines",
      stockCount: '500+'
    },
    {
      name: INDICES.MSCI_WORLD,
      icon: <FiGlobe className="w-6 h-6" />,
      color: 'bg-purple-500',
      description: 'Filtrer les actions globales des marchés développés',
      stockCount: '1000+'
    },
    {
      name: INDICES.MSCI_WORLD_TECH,
      icon: <FiServer className="w-6 h-6" />,
      color: 'bg-indigo-500',
      description: 'Filtrer les entreprises technologiques mondiales',
      stockCount: '300+'
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Tableau de bord</h1>
        <p className="text-gray-600 dark:text-gray-400">Bienvenue sur la plateforme de screening d'actions. Sélectionnez un indice pour commencer à filtrer les actions.</p>
      </div>

      {/* Tuiles d'indices */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {indexTiles.map((index) => (
          <Link 
            key={index.name} 
            to="/screener"
            onClick={() => setSelectedIndex(index.name)}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
          >
            <div className={`h-2 ${index.color}`}></div>
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  {index.icon}
                </div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                  {index.stockCount} actions
                </div>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">{index.name}</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{index.description}</p>
              <div className="mt-4 flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium">
                Explorer <FiArrowRight className="ml-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Section des fonctionnalités */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-10">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Fonctionnalités principales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3">
              <span>🔍</span>
            </div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100">Filtrage multiple</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Filtrez les actions selon plusieurs critères techniques et fondamentaux</p>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400 mb-3">
              <span>📊</span>
            </div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100">Analyse technique</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Analysez les moyennes mobiles pondérées et les tendances</p>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400 mb-3">
              <span>💹</span>
            </div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100">Performance</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Comparez les rendements sur 6 et 12 mois</p>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center text-orange-600 dark:text-orange-400 mb-3">
              <span>🧮</span>
            </div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100">Bêta et volatilité</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Évaluez le risque avec les mesures de bêta</p>
          </div>
        </div>
      </div>

      {/* Bannière de démarrage rapide */}
      <div className="bg-primary-500 dark:bg-primary-700 rounded-xl shadow-md p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Prêt à commencer ?</h2>
            <p className="text-primary-100">Accédez au screener pour filtrer les actions selon vos critères</p>
          </div>
          <Link 
            to="/screener" 
            className="mt-4 md:mt-0 px-6 py-2 bg-white text-primary-600 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Ouvrir le screener
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
