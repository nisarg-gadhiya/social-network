import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import MatchedUsers from '../components/dashboard/MatchedUsers';
import EventsList from '../components/dashboard/EventsList';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Dashboard = () => {
  const { userProfile, matches, events, loading, refreshMatches, refreshEvents } = useContext(UserContext);

  useEffect(() => {
    refreshMatches();
    refreshEvents();
  }, []);

  if (loading || !userProfile) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {userProfile.fullName}</h1>
        <p className="text-gray-600">Find new connections and upcoming events</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Profile Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center mb-4">
              <img 
                src={userProfile.profilePhoto || '/assets/images/default-avatar.png'} 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h2 className="text-xl font-semibold">{userProfile.fullName}</h2>
              <p className="text-gray-600">{userProfile.profession}</p>
            </div>
            
            <div className="mt-4">
              <h3 className="font-medium mb-2">Your Interests</h3>
              <div className="flex flex-wrap gap-2">
                {userProfile.interests?.slice(0, 5).map((interest, index) => (
                  <span 
                    key={index} 
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                  >
                    {interest}
                  </span>
                ))}
                {userProfile.interests?.length > 5 && (
                  <span className="text-blue-600 text-sm">+{userProfile.interests.length - 5} more</span>
                )}
              </div>
            </div>
            
            <div className="mt-6">
              <Link 
                to="/profile" 
                className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded transition duration-150"
              >
                View Full Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Matched Users */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Connections for You</h2>
              <button 
                onClick={refreshMatches}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Refresh
              </button>
            </div>
            <MatchedUsers matches={matches} />
          </div>

          {/* Events */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Upcoming Events</h2>
              <button 
                onClick={refreshEvents}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Refresh
              </button>
            </div>
            <EventsList events={events} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;