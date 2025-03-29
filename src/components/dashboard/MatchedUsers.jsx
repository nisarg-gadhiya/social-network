import React from 'react';
import { Link } from 'react-router-dom';
import ConnectionCard from './ConnectionCard';

const MatchedUsers = ({ matches = [] }) => {
  if (matches.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">No connections found yet.</p>
        <p className="text-sm text-gray-500">
          Add more interests to your profile to discover connections with similar interests.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {matches.slice(0, 6).map((match) => (
          <ConnectionCard key={match.id} connection={match} />
        ))}
      </div>
      
      {matches.length > 6 && (
        <div className="mt-4 text-center">
          <Link 
            to="/connections" 
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View all {matches.length} connections
          </Link>
        </div>
      )}
    </div>
  );
};

export default MatchedUsers;