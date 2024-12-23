import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { ShopDetail } from './pages/ShopDetail';
import { AddShop } from './pages/AddShop';
import { ShopOwners } from './pages/ShopOwners';
import { Personalization } from './pages/Personalization';
import { BottomNavigation } from './components/BottomNavigation';
import { useStore } from './store/useStore';
import { initializeTelegramWebApp } from './utils/telegram';

// Mock data for demonstration
const MOCK_SHOPS = [
  {
    id: '1',
    instagramHandle: 'fashion_store',
    name: 'Fashion Store',
    description: 'Trendy fashion and accessories',
    isVerified: true,
    averageRating: 4.5,
    totalReviews: 128,
    ownerVerified: true,
    screenshots: [
      {
        id: '1',
        shopId: '1',
        url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
        caption: 'Our latest collection of handmade bags',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        shopId: '1',
        url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e',
        caption: 'Summer fashion collection 2024',
        createdAt: new Date().toISOString()
      }
    ]
  },
  {
    id: '2',
    instagramHandle: 'tech_gadgets',
    name: 'Tech Gadgets',
    description: 'Latest tech accessories and gadgets',
    isVerified: false,
    averageRating: 3.8,
    totalReviews: 57,
    ownerVerified: false,
    screenshots: []
  },
];

function App() {
  const { setShops, setCurrentUser, setScreenshots, settings } = useStore();

  useEffect(() => {
    const { userId, userName } = initializeTelegramWebApp();

    // Set mock data
    setShops(MOCK_SHOPS);
    setCurrentUser({
      id: userId || 'demo-user',
      name: userName || 'Demo User',
      isAdmin: false,
    });
    
    // Set screenshots
    const allScreenshots = MOCK_SHOPS.reduce((acc, shop) => [...acc, ...(shop.screenshots || [])], []);
    setScreenshots(allScreenshots);
  }, [setShops, setCurrentUser, setScreenshots]);

  return (
    <BrowserRouter>
      <div className={`min-h-screen pb-16 ${settings.darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop/:id" element={<ShopDetail />} />
          <Route path="/add-shop" element={<AddShop />} />
          <Route path="/shop-owners" element={<ShopOwners />} />
          <Route path="/personalization" element={<Personalization />} />
        </Routes>
        <BottomNavigation />
      </div>
    </BrowserRouter>
  );
}

export default App;