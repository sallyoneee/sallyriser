import React from 'react';
import { Crown, Shield } from 'lucide-react';
import { useStore } from '../store/useStore';

interface PremiumFeaturesProps {
  shopId: string;
}

export const PremiumFeatures: React.FC<PremiumFeaturesProps> = ({ shopId }) => {
  const { upgradeToBlueCheck, promoteShop } = useStore();

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-6 text-white">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Shield className="w-6 h-6 mr-2" />
          Get Blue Check
        </h3>
        <p className="mb-4">
          Stand out with a verified badge and build trust with your customers
        </p>
        <button
          onClick={() => upgradeToBlueCheck(shopId)}
          className="bg-white text-blue-500 px-4 py-2 rounded-md hover:bg-blue-50"
        >
          Upgrade Now
        </button>
      </div>

      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg p-6 text-white">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Crown className="w-6 h-6 mr-2" />
          Promote Your Shop
        </h3>
        <p className="mb-4">
          Get featured at the top of search results and reach more customers
        </p>
        <button
          onClick={() => promoteShop(shopId)}
          className="bg-white text-orange-500 px-4 py-2 rounded-md hover:bg-orange-50"
        >
          Boost Visibility
        </button>
      </div>
    </div>
  );
};