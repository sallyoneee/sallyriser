import React from 'react';
import { Image as ImageIcon, Plus } from 'lucide-react';
import { Screenshot } from '../types';

interface ScreenshotGalleryProps {
  screenshots: Screenshot[];
  shopId: string;
  isOwner: boolean;
  onAddScreenshot?: (url: string, caption: string) => void;
}

export const ScreenshotGallery: React.FC<ScreenshotGalleryProps> = ({
  screenshots,
  shopId,
  isOwner,
  onAddScreenshot,
}) => {
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [newUrl, setNewUrl] = React.useState('');
  const [newCaption, setNewCaption] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAddScreenshot) {
      onAddScreenshot(newUrl, newCaption);
      setNewUrl('');
      setNewCaption('');
      setShowAddForm(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Screenshots</h3>
        {isOwner && (
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center text-blue-500 hover:text-blue-600"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Screenshot
          </button>
        )}
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-4 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Caption</label>
            <input
              type="text"
              value={newCaption}
              onChange={(e) => setNewCaption(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-2 gap-4">
        {screenshots.map((screenshot) => (
          <div key={screenshot.id} className="relative group">
            <img
              src={screenshot.url}
              alt={screenshot.caption || 'Shop screenshot'}
              className="w-full h-48 object-cover rounded-lg"
            />
            {screenshot.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
                <p className="text-sm">{screenshot.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};