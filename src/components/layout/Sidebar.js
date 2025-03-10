import React from 'react';
import { useIndex, INDICES } from '../../contexts/IndexContext';
import { FiBarChart2, FiTrendingUp, FiGlobe, FiServer } from 'react-icons/fi';

const Sidebar = () => {
  const { selectedIndex, setSelectedIndex } = useIndex();

  // Mapping des icônes pour chaque indice
  const indexIcons = {
    [INDICES.NASDAQ]: <FiBarChart2 className="w-5 h-5" />,
    [INDICES.SP500]: <FiTrendingUp className="w-5 h-5" />,
    [INDICES.MSCI_WORLD]: <FiGlobe className="w-5 h-5" />,
    [INDICES.MSCI_WORLD_TECH]: <FiServer className="w-5 h-5" />,
  };

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-md hidden md:block min-h-screen">
      <div className="px-4 py-6">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Indices</h2>
        <ul className="space-y-2">
          {Object.values(INDICES).map((index) => (
            <li key={index}>
              <button
                onClick={() => setSelectedIndex(index)}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${selectedIndex === index
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                <span className="mr-3">{indexIcons[index]}</span>
                <span>{index}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="px-4 py-6 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Ressources</h2>
        <ul className="space-y-2">
          <li>
            <a href="#" className="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <span className="mr-3">📚</span>
              <span>Documentation</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <span className="mr-3">📊</span>
              <span>Graphiques avancés</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <span className="mr-3">💡</span>
              <span>Tutoriels</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
