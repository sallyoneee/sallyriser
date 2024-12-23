import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { useStore } from '../store/useStore';

interface VerificationRequestProps {
  shopId: string;
  instagramHandle: string;
}

export const VerificationRequest: React.FC<VerificationRequestProps> = ({
  shopId,
  instagramHandle,
}) => {
  const [proofUrl, setProofUrl] = useState('');
  const { submitVerificationRequest } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitVerificationRequest({
      shopId,
      instagramHandle,
      proofUrl,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Proof of Ownership
        </label>
        <div className="mt-1">
          <input
            type="url"
            value={proofUrl}
            onChange={(e) => setProofUrl(e.target.value)}
            placeholder="Link to Instagram post/story proving ownership"
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Post a story or post on your Instagram account mentioning this verification
        </p>
      </div>
      <button
        type="submit"
        className="flex items-center justify-center w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        <Upload className="w-4 h-4 mr-2" />
        Submit Verification Request
      </button>
    </form>
  );
};