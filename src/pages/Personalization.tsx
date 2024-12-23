import React from 'react';
import { Moon, Eye, Languages } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Personalization: React.FC = () => {
  const { settings, toggleDarkMode, toggleAnonymous, setLanguage } = useStore();

  return (
    <div className="container mx-auto max-w-md px-4 py-6">
      <h1 className={`text-2xl font-bold mb-6 text-center ${
        settings.darkMode ? 'text-white' : 'text-gray-900'
      }`}>Personalization</h1>
      
      <div className="space-y-4">
        <div className={`rounded-lg shadow-md p-4 ${
          settings.darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Moon className="w-5 h-5 text-blue-500" />
              <span className={`font-medium ${
                settings.darkMode ? 'text-white' : 'text-gray-900'
              }`}>Dark Mode</span>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.darkMode ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div className={`rounded-lg shadow-md p-4 ${
          settings.darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Eye className="w-5 h-5 text-blue-500" />
              <span className={`font-medium ${
                settings.darkMode ? 'text-white' : 'text-gray-900'
              }`}>Anonymous Mode</span>
            </div>
            <button
              onClick={toggleAnonymous}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.anonymous ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.anonymous ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div className={`rounded-lg shadow-md p-4 ${
          settings.darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Languages className="w-5 h-5 text-blue-500" />
              <span className={`font-medium ${
                settings.darkMode ? 'text-white' : 'text-gray-900'
              }`}>Language</span>
            </div>
            <select
              value={settings.language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'fa')}
              className={`block rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                settings.darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="en">English</option>
              <option value="fa">فارسی</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};