import React from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { Shield, CheckCircle, Star, Crown } from 'lucide-react';
import { useStore } from '../store/useStore';
import { ReviewForm } from '../components/ReviewForm';
import { VerificationRequest } from '../components/VerificationRequest';
import { PremiumFeatures } from '../components/PremiumFeatures';
import { AdminPanel } from '../components/AdminPanel';
import { ScreenshotGallery } from '../components/ScreenshotGallery';
import { BackButton } from '../components/BackButton';

export const ShopDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { shops, reviews, screenshots, currentUser, settings } = useStore();
  const shop = shops.find((s) => s.id === id);
  const shopReviews = reviews.filter((r) => r.shopId === id);
  const shopScreenshots = screenshots.filter((s) => s.shopId === id);
  const isOwner = currentUser?.ownedShopId === id;
  const isAdmin = currentUser?.isAdmin;

  if (!shop) return <div className={settings.darkMode ? 'text-white' : 'text-gray-900'}>Shop not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-4">
        <BackButton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className={`rounded-lg shadow-md p-6 ${
            settings.darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h1 className={`text-2xl font-bold ${
                settings.darkMode ? 'text-white' : 'text-gray-900'
              }`}>@{shop.instagramHandle}</h1>
              <div className="flex items-center space-x-2">
                {shop.isPremium && (
                  <div className="flex items-center text-yellow-500">
                    <Crown className="w-5 h-5 mr-1" />
                    <span className="text-sm">Premium</span>
                  </div>
                )}
                {shop.isVerified && (
                  <div className="flex items-center text-blue-500">
                    <Shield className="w-5 h-5 mr-1" />
                    <span className="text-sm">Verified</span>
                  </div>
                )}
                {shop.ownerVerified && (
                  <div className="flex items-center text-green-500">
                    <CheckCircle className="w-5 h-5 mr-1" />
                    <span className="text-sm">Owner Verified</span>
                  </div>
                )}
              </div>
            </div>
            <p className={`mb-4 ${
              settings.darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>{shop.description}</p>
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(shop.averageRating)
                        ? 'text-yellow-400 fill-current'
                        : settings.darkMode ? 'text-gray-600' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className={`text-lg font-semibold ${
                settings.darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {shop.averageRating.toFixed(1)}
              </span>
              <span className={`${
                settings.darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>({shop.totalReviews} reviews)</span>
            </div>
          </div>

          <div className={`rounded-lg shadow-md p-6 ${
            settings.darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <ScreenshotGallery
              screenshots={shopScreenshots}
              shopId={shop.id}
              isOwner={isOwner}
            />
          </div>

          {currentUser && !isOwner && (
            <div className={`rounded-lg shadow-md p-6 ${
              settings.darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <h2 className={`text-xl font-semibold mb-4 ${
                settings.darkMode ? 'text-white' : 'text-gray-900'
              }`}>Write a Review</h2>
              <ReviewForm shopId={shop.id} />
            </div>
          )}

          <div className="space-y-4">
            <h2 className={`text-xl font-semibold ${
              settings.darkMode ? 'text-white' : 'text-gray-900'
            }`}>Reviews</h2>
            {shopReviews.map((review) => (
              <div key={review.id} className={`rounded-lg shadow-md p-4 ${
                settings.darkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-semibold ${
                    settings.darkMode ? 'text-white' : 'text-gray-900'
                  }`}>{review.userName}</span>
                  <span className={`text-sm ${
                    settings.darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {format(new Date(review.createdAt), 'MMM d, yyyy')}
                  </span>
                </div>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'text-yellow-400 fill-current'
                          : settings.darkMode ? 'text-gray-600' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className={`${
                  settings.darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {isOwner && !shop.ownerVerified && (
            <div className={`rounded-lg shadow-md p-6 ${
              settings.darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <h2 className={`text-xl font-semibold mb-4 ${
                settings.darkMode ? 'text-white' : 'text-gray-900'
              }`}>Verify Ownership</h2>
              <VerificationRequest
                shopId={shop.id}
                instagramHandle={shop.instagramHandle}
              />
            </div>
          )}

          {isOwner && shop.ownerVerified && !shop.isVerified && (
            <PremiumFeatures shopId={shop.id} />
          )}

          {isAdmin && <AdminPanel />}
        </div>
      </div>
    </div>
  );
};