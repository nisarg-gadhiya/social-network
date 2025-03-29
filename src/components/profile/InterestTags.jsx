import React from 'react';
import { X } from 'lucide-react';

const InterestTags = ({ 
  interests, 
  editable = false, 
  onRemove, 
  onAdd,
  suggestedInterests = []
}) => {
  // Default interests if none provided
  const defaultInterests = [
    { id: 1, name: 'Web Development', category: 'tech' },
    { id: 2, name: 'Machine Learning', category: 'tech' },
    { id: 3, name: 'Hiking', category: 'outdoor' },
    { id: 4, name: 'Photography', category: 'art' },
    { id: 5, name: 'Cooking', category: 'food' }
  ];

  // Use provided interests or default
  const userInterests = interests || defaultInterests;
  
  // State for new interest input
  const [newInterest, setNewInterest] = React.useState('');
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  
  // Get color based on category
  const getCategoryColor = (category) => {
    const colors = {
      tech: 'bg-blue-100 text-blue-800',
      outdoor: 'bg-green-100 text-green-800',
      art: 'bg-purple-100 text-purple-800',
      food: 'bg-yellow-100 text-yellow-800',
      music: 'bg-pink-100 text-pink-800',
      default: 'bg-gray-100 text-gray-800'
    };
    
    return colors[category] || colors.default;
  };
  
  // Handle adding new interest
  const handleAddInterest = (e) => {
    e.preventDefault();
    
    if (newInterest.trim() && onAdd) {
      onAdd({
        id: Date.now(),
        name: newInterest.trim(),
        category: 'default'
      });
      setNewInterest('');
      setShowSuggestions(false);
    }
  };
  
  // Handle selecting a suggested interest
  const handleSuggestionSelect = (interest) => {
    if (onAdd) {
      onAdd(interest);
      setNewInterest('');
      setShowSuggestions(false);
    }
  };
  
  // Filter suggestions based on input
  const filteredSuggestions = suggestedInterests.filter(interest => 
    !userInterests.some(ui => ui.id === interest.id) && 
    interest.name.toLowerCase().includes(newInterest.toLowerCase())
  );
  
  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 md:p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Interests & Hobbies</h2>
      
      {/* Interest Tags */}
      <div className="flex flex-wrap gap-2">
        {userInterests.map(interest => (
          <div 
            key={interest.id} 
            className={`px-3 py-1 rounded-full ${getCategoryColor(interest.category)} flex items-center`}
          >
            <span>{interest.name}</span>
            {editable && onRemove && (
              <button 
                onClick={() => onRemove(interest.id)} 
                className="ml-2 hover:bg-white hover:bg-opacity-30 rounded-full p-1"
                aria-label={`Remove ${interest.name}`}
              >
                <X size={14} />
              </button>
            )}
          </div>
        ))}
      </div>
      
      {/* Add New Interest (Only in edit mode) */}
      {editable && onAdd && (
        <div className="mt-6">
          <form onSubmit={handleAddInterest} className="relative">
            <div className="flex">
              <input
                type="text"
                value={newInterest}
                onChange={(e) => {
                  setNewInterest(e.target.value);
                  setShowSuggestions(e.target.value.length > 0);
                }}
                placeholder="Add a new interest..."
                className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onFocus={() => newInterest && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
            
            {/* Suggestions Dropdown */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                {filteredSuggestions.map(suggestion => (
                  <div
                    key={suggestion.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSuggestionSelect(suggestion)}
                  >
                    <span className={`px-2 py-0.5 rounded-full text-sm ${getCategoryColor(suggestion.category)}`}>
                      {suggestion.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default InterestTags;