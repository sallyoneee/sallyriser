import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useStore } from '../store/useStore';

interface ReviewFormProps {
  shopId: string;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ shopId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { currentUser, addReview, settings } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const review = {
      id: Math.random().toString(),
      shopId,
      userId: currentUser.id,
      userName: currentUser.name,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    };

    addReview(review);
    setRating(0);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-2">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setRating(value)}
            className="focus:outline-none"
          >
            <Star
              className={`w-6 h-6 ${
                value <= rating
                  ? 'text-yellow-400 fill-current'
                  : settings.darkMode ? 'text-gray-600' : 'text-gray-300'
              } transition-colors duration-150 hover:text-yellow-400`}
            />
          </button>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review..."
        className={`w-full p-3 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          settings.darkMode
            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
        }`}
        rows={3}
      />
      <button
        type="submit"
        disabled={!rating || !comment}
        className={`w-full px-4 py-2 rounded-md transition-colors duration-200 ${
          !rating || !comment
            ? settings.darkMode
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        Submit Review
      </button>
    </form>
  );
};