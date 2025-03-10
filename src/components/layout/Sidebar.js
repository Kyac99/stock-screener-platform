import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiFilter, FiBarChart2, FiStar, FiSettings } from 'react-icons/fi';
import { useIndex, INDICES } from '../../contexts/IndexContext';

const Sidebar = () => {
  const location = useLocation();
  const { selectedIndex, setSelectedIndex } = useIndex();
  
  // Vérifier si le chemin actuel est actif
  const isActive = (path) => location.pathname === path;
  
  return (
    <aside className="w-64 border-r border-gray-200 dark:border-gray-700 hidden lg:block bg-white dark:bg-gray-800">
      <div className="h-full flex flex-col py-4">
        <nav className="mt-6 flex-1 px-4 space-y-1">
          <Link 
            to="/"
            className={`flex items-center px-4 py-3 rounded-lg ${isActive('/') ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            <FiHome className="mr-3 h-5 w-5" />
            <span className="font-medium">Tableau de bord</span>
          </Link>
          
          <Link 
            to="/screener"
            className={`flex items-center px-4 py-3 rounded-lg ${isActive('/screener') ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            <FiFilter className="mr-3 h-5 w-5" />
            <span className="font-medium">Screener</span>
          </Link>
          
          <div className="mt-8 mb-4 px-4">
            <h3 className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 tracking-wider">Indices</h3>
          </div>
          
          {Object.values(INDICES).map((index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`flex w-full items-center px-4 py-2 rounded-lg text-left ${selectedIndex === index ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              <FiBarChart2 className="mr-3 h-5 w-5" />
              <span className="font-medium">{index}</span>
            </button>
          ))}
          
          <div className="mt-8 mb-4 px-4">
            <h3 className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 tracking-wider">Vos listes</h3>
          </div>
          
          <button className="flex w-full items-center px-4 py-2 rounded-lg text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            <FiStar className="mr-3 h-5 w-5" />
            <span className="font-medium">Favoris</span>
          </button>
        </nav>
        
        <div className="mt-auto px-4">
          <button className="flex w-full items-center px-4 py-2 rounded-lg text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            <FiSettings className="mr-3 h-5 w-5" />
            <span className="font-medium">Paramètres</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
