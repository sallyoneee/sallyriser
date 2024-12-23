import React from 'react';
import { Star, Shield, CheckCircle } from 'lucide-react';
import { Shop } from '../types';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';

interface ShopCardProps {
  shop: Shop;
}

export const ShopCard: React.FC<ShopCardProps> = ({ shop }) => {
  const { settings } = useStore();
  
  return (
    <Link to={`/shop/${shop.id}`} className="block mb-4">
      <div className={`${settings.darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">@{shop.instagramHandle}</h3>
          <div className="flex items-center space-x-2">
            {shop.isVerified && (
              <Shield className="w-5 h-5 text-blue-500" />
            )}
            {shop.ownerVerified && (
              <CheckCircle className="w-5 h-5 text-green-500" />
            )}
          </div>
        </div>
        <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-600'} mb-3 line-clamp-2`}>{shop.description}</p>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(shop.averageRating)
                    ? 'text-yellow-400 fill-current'
                    : settings.darkMode ? 'text-gray-600' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
            ({shop.totalReviews} reviews)
          </span>
        </div>
      </div>
    </Link>
  );
};