import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useStore } from '../store/useStore';

export const ShopOwners: React.FC = () => {
  const { settings } = useStore();

  return (
    <div className="container mx-auto max-w-md px-4 py-6">
      <h1 className={`text-2xl font-bold mb-6 text-center ${
        settings.darkMode ? 'text-white' : 'text-gray-900'
      }`}>Shop Owners</h1>
      
      <div className="space-y-6">
        <div className={`rounded-lg shadow-md p-6 ${
          settings.darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex items-center space-x-3 mb-4">
            <ShieldCheck className="w-6 h-6 text-blue-500" />
            <h2 className={`text-lg font-semibold ${
              settings.darkMode ? 'text-white' : 'text-gray-900'
            }`}>Get Verified</h2>
          </div>
          <p className={`mb-4 ${
            settings.darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Verify your shop ownership to build trust with customers and access premium features.
          </p>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
            Start Verification
          </button>
        </div>
      </div>
    </div>
  );
};