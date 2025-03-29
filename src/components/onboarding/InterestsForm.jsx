import React, { useState } from 'react';
import { getAllInterests, searchInterests } from "../../utils/interestTags";

const InterestsForm = ({ selectedInterests = [], onUpdate, onNext, onBack }) => {
  const [interests, setInterests] = useState(selectedInterests);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  // Use searchInterests function instead of manually filtering
  const availableInterests = searchTerm ? searchInterests(searchTerm) : getAllInterests();

  const handleToggleInterest = (interest) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
      setError(''); // Reset error when an interest is removed
    } else {
      if (interests.length >= 10) {
        setError('You can select up to 10 interests');
        return;
      }
      setInterests([...interests, interest]);
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (interests.length < 3) {
      setError('Please select at least 3 interests');
      return;
    }

    onUpdate(interests);
    onNext();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Select Your Interests</h2>
      <p className="text-gray-600 mb-6">
        Choose 3-10 interests to help us find connections that match your preferences.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Search Input */}
        <div className="mb-6">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search Interests
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type to search interests..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-2 rounded-md mb-4">
            {error}
          </div>
        )}

        {/* Selected Interests */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Selected Interests ({interests.length}/10)
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {interests.length > 0 ? (
              interests.map((interest, index) => (
                <span 
                  key={index} 
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center"
                >
                  {interest}
                  <button
                    type="button"
                    onClick={() => handleToggleInterest(interest)}
                    className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                  >
                    ×
                  </button>
                </span>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No interests selected yet</p>
            )}
          </div>
        </div>

        {/* Available Interests */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Available Interests
          </p>
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-2 border border-gray-200 rounded-md">
            {availableInterests.length > 0 ? (
              availableInterests.map((interest, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleToggleInterest(interest)}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    interests.includes(interest)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {interest}
                </button>
              ))
            ) : (
              <p className="text-gray-500 text-sm p-2">No matching interests found</p>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition duration-150"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-150"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default InterestsForm;
