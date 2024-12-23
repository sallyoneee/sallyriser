import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Shop, Review, User, VerificationRequest, Screenshot, Settings } from '../types';

interface State {
  shops: Shop[];
  reviews: Review[];
  screenshots: Screenshot[];
  currentUser: User | null;
  verificationRequests: VerificationRequest[];
  settings: Settings;
  setShops: (shops: Shop[]) => void;
  setReviews: (reviews: Review[]) => void;
  setScreenshots: (screenshots: Screenshot[]) => void;
  setCurrentUser: (user: User | null) => void;
  addReview: (review: Review) => void;
  addScreenshot: (screenshot: Screenshot) => void;
  verifyShop: (shopId: string) => void;
  submitVerificationRequest: (request: Omit<VerificationRequest, 'status'>) => void;
  handleVerificationRequest: (shopId: string, approved: boolean) => void;
  upgradeToBlueCheck: (shopId: string) => void;
  promoteShop: (shopId: string) => void;
  toggleDarkMode: () => void;
  toggleAnonymous: () => void;
  setLanguage: (lang: 'en' | 'fa') => void;
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      shops: [],
      reviews: [],
      screenshots: [],
      currentUser: null,
      verificationRequests: [],
      settings: {
        darkMode: false,
        anonymous: false,
        language: 'en' as const,
      },
      
      setShops: (shops) => set({ shops }),
      setReviews: (reviews) => set({ reviews }),
      setScreenshots: (screenshots) => set({ screenshots }),
      setCurrentUser: (user) => set({ currentUser: user }),
      
      addReview: (review) => set((state) => {
        const newReviews = [...state.reviews, review];
        const shopReviews = newReviews.filter(r => r.shopId === review.shopId);
        const averageRating = shopReviews.reduce((acc, r) => acc + r.rating, 0) / shopReviews.length;
        
        const updatedShops = state.shops.map(shop => 
          shop.id === review.shopId 
            ? { 
                ...shop, 
                averageRating, 
                totalReviews: shopReviews.length 
              } 
            : shop
        );

        return { 
          reviews: newReviews,
          shops: updatedShops
        };
      }),

      addScreenshot: (screenshot) => set((state) => ({
        screenshots: [...state.screenshots, screenshot]
      })),

      verifyShop: (shopId) => set((state) => ({
        shops: state.shops.map(shop => 
          shop.id === shopId ? { ...shop, ownerVerified: true } : shop
        )
      })),

      submitVerificationRequest: (request) => set((state) => ({
        verificationRequests: [
          ...state.verificationRequests,
          { ...request, status: 'pending' }
        ]
      })),

      handleVerificationRequest: (shopId, approved) => set((state) => {
        const updatedRequests = state.verificationRequests.map(req =>
          req.shopId === shopId ? { ...req, status: approved ? 'approved' : 'rejected' } : req
        );

        const updatedShops = state.shops.map(shop =>
          shop.id === shopId ? { 
            ...shop, 
            ownerVerified: approved,
            verificationRequest: {
              status: approved ? 'approved' : 'rejected',
              proofUrl: state.verificationRequests.find(r => r.shopId === shopId)?.proofUrl || '',
              requestDate: new Date().toISOString()
            }
          } : shop
        );

        return {
          verificationRequests: updatedRequests,
          shops: updatedShops
        };
      }),

      upgradeToBlueCheck: (shopId) => set((state) => ({
        shops: state.shops.map(shop =>
          shop.id === shopId ? { ...shop, isVerified: true } : shop
        )
      })),

      promoteShop: (shopId) => set((state) => ({
        shops: state.shops.map(shop =>
          shop.id === shopId ? { ...shop, isPremium: true } : shop
        )
      })),

      toggleDarkMode: () => set((state) => ({
        settings: {
          ...state.settings,
          darkMode: !state.settings.darkMode,
        }
      })),

      toggleAnonymous: () => set((state) => ({
        settings: {
          ...state.settings,
          anonymous: !state.settings.anonymous,
        }
      })),

      setLanguage: (language: 'en' | 'fa') => set((state) => ({
        settings: {
          ...state.settings,
          language,
        }
      })),
    }),
    {
      name: 'shop-ratings-storage',
    }
  )
);