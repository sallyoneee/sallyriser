import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { useStore } from '../store/useStore';

export const AdminPanel: React.FC = () => {
  const { verificationRequests, handleVerificationRequest } = useStore();
  const pendingRequests = verificationRequests.filter(req => req.status === 'pending');

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Admin Panel</h2>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Pending Verification Requests</h3>
        {pendingRequests.length === 0 ? (
          <p className="text-gray-500">No pending requests</p>
        ) : (
          pendingRequests.map((request) => (
            <div
              key={request.shopId}
              className="border rounded-lg p-4 space-y-2"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">@{request.instagramHandle}</p>
                  <a
                    href={request.proofUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline text-sm"
                  >
                    View Proof
                  </a>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleVerificationRequest(request.shopId, true)}
                    className="p-2 text-green-500 hover:bg-green-50 rounded-full"
                  >
                    <CheckCircle className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => handleVerificationRequest(request.shopId, false)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};