import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Store, PlusCircle, UserCog, Settings } from 'lucide-react';
import { useStore } from '../store/useStore';

export const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { settings } = useStore();

  return (
    <div className={`fixed bottom-0 left-0 right-0 border-t ${
      settings.darkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="container mx-auto max-w-md flex justify-around items-center px-4 py-2">
        <button
          onClick={() => navigate('/')}
          className={`flex flex-col items-center p-2 ${
            location.pathname === '/' 
              ? 'text-blue-500' 
              : settings.darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          <Store className="w-6 h-6" />
          <span className="text-xs mt-1">Shops</span>
        </button>
        <button
          onClick={() => navigate('/add-shop')}
          className={`flex flex-col items-center p-2 ${
            location.pathname === '/add-shop'
              ? 'text-blue-500'
              : settings.darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          <PlusCircle className="w-6 h-6" />
          <span className="text-xs mt-1">Add Shop</span>
        </button>
        <button
          onClick={() => navigate('/shop-owners')}
          className={`flex flex-col items-center p-2 ${
            location.pathname === '/shop-owners'
              ? 'text-blue-500'
              : settings.darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          <UserCog className="w-6 h-6" />
          <span className="text-xs mt-1">Shop Owners</span>
        </button>
        <button
          onClick={() => navigate('/personalization')}
          className={`flex flex-col items-center p-2 ${
            location.pathname === '/personalization'
              ? 'text-blue-500'
              : settings.darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          <Settings className="w-6 h-6" />
          <span className="text-xs mt-1">Settings</span>
        </button>
      </div>
    </div>
  );
};