import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // Vérifie si un thème est déjà enregistré dans localStorage
    const savedTheme = localStorage.getItem('theme');
    // Vérifie également la préférence du système
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    return savedTheme || (prefersDark ? 'dark' : 'light');
  });

  useEffect(() => {
    // Met à jour l'attribut data-theme sur l'élément html
    document.documentElement.setAttribute('data-theme', theme);
    
    // Met à jour la classe dark pour Tailwind si nécessaire
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Enregistre le thème dans localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
};
