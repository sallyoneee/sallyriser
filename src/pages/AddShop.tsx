import React, { useState } from 'react';
import { Instagram } from 'lucide-react';
import { useStore } from '../store/useStore';

export const AddShop: React.FC = () => {
  const [instagramHandle, setInstagramHandle] = useState('');
  const [description, setDescription] = useState('');
  const { settings } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement shop creation
    console.log('Creating shop:', { instagramHandle, description });
  };

  return (
    <div className="container mx-auto max-w-md px-4 py-6">
      <h1 className={`text-2xl font-bold mb-6 text-center ${
        settings.darkMode ? 'text-white' : 'text-gray-900'
      }`}>Add New Shop</h1>
      
      <form onSubmit={handleSubmit} className={`rounded-lg shadow-md p-6 ${
        settings.darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="space-y-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              settings.darkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Instagram Handle
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Instagram className={`h-5 w-5 ${
                  settings.darkMode ? 'text-gray-400' : 'text-gray-400'
                }`} />
              </span>
              <input
                type="text"
                value={instagramHandle}
                onChange={(e) => setInstagramHandle(e.target.value)}
                className={`block w-full pl-10 pr-3 py-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  settings.darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                placeholder="@shopname"
                required
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              settings.darkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Shop Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className={`block w-full px-3 py-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                settings.darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="Describe what your shop sells..."
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Add Shop
          </button>
        </div>
      </form>
    </div>
  );
};