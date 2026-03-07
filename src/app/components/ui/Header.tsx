import { Search, Bell, Menu, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      setDarkMode(false);
    } else {
      html.classList.add('dark');
      setDarkMode(true);
    }
  };

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <header className="h-20 bg-white dark:bg-[#2f3640] border-b border-gray-200 dark:border-gray-700 px-6 lg:px-8 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-[#2c3e50] dark:text-white">
            Hello, Admin 👋
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {today}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-2.5 rounded-xl w-80">
          <Search className="w-5 h-5 text-gray-400" />
          <input 
            type="text"
            placeholder="Search donors, requests..."
            className="bg-transparent border-none outline-none text-sm text-gray-700 dark:text-gray-200 placeholder:text-gray-400 w-full"
          />
        </div>

        {/* Dark Mode Toggle */}
        <button 
          onClick={toggleDarkMode}
          className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          )}
        </button>

        {/* Notification Bell */}
        <button className="relative p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200">
          <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#c0392b] rounded-full border-2 border-white dark:border-[#2f3640]" />
        </button>

        {/* Profile Avatar */}
        <div className="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-gray-700">
          <div className="w-10 h-10 bg-gradient-to-br from-[#c0392b] to-[#e74c3c] rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
            A
          </div>
        </div>
      </div>
    </header>
  );
}
