import React, { useState } from 'react';
import { Search, Crown } from 'lucide-react';
import { useStore } from '../store/useStore';
import { ShopCard } from '../components/ShopCard';

export const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { shops, settings } = useStore();

  const sortedShops = [...shops].sort((a, b) => {
    if (a.isPremium && !b.isPremium) return -1;
    if (!a.isPremium && b.isPremium) return 1;
    return b.averageRating - a.averageRating;
  });

  const filteredShops = sortedShops.filter((shop) =>
    shop.instagramHandle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto max-w-2xl px-4 py-6">
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Instagram shops..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm
              ${settings.darkMode 
                ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-700' 
                : 'bg-white text-gray-900 placeholder-gray-500 border-gray-200'}`}
          />
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 
            ${settings.darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
        </div>
      </div>

      {filteredShops.some(shop => shop.isPremium) && (
        <div className="mb-8">
          <h2 className={`text-lg font-semibold flex items-center text-yellow-600 mb-4 
            ${settings.darkMode ? 'text-yellow-500' : 'text-yellow-600'}`}>
            <Crown className="w-5 h-5 mr-2" />
            Featured Shops
          </h2>
          <div className="space-y-4">
            {filteredShops
              .filter(shop => shop.isPremium)
              .map((shop) => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        {filteredShops
          .filter(shop => !shop.isPremium)
          .map((shop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
      </div>
    </div>
  );
};