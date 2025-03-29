import React from 'react';
import { useState } from 'react';
import { UserCircle, MapPin, Briefcase, Calendar, Edit } from 'lucide-react';

const ProfileHeader = ({ user, isOwnProfile, onEditClick }) => {
  // Default user data if not provided
  const defaultUser = {
    name: 'Alex Johnson',
    username: '@alexjohnson',
    location: 'San Francisco, CA',
    occupation: 'Software Engineer',
    joinDate: 'Joined January 2023',
    bio: 'Passionate developer with a love for creating innovative solutions. Always looking to connect with like-minded individuals for collaborative projects.',
    profileImage: null,
    coverImage: null
  };

  // Use provided user or default
  const profileUser = user || defaultUser;

  // State for image loading errors
  const [profileImgError, setProfileImgError] = useState(false);
  const [coverImgError, setCoverImgError] = useState(false);

  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
      {/* Cover Image */}
      <div className="h-48 md:h-64 bg-gradient-to-r from-blue-500 to-purple-600 relative">
        {profileUser.coverImage && !coverImgError ? (
          <img
            src={profileUser.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
            onError={() => setCoverImgError(true)}
          />
        ) : null}
        
        {/* Edit Button (only shows on own profile) */}
        {isOwnProfile && (
          <button 
            onClick={onEditClick}
            className="absolute top-4 right-4 bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-all"
            aria-label="Edit profile"
          >
            <Edit size={20} className="text-gray-700" />
          </button>
        )}
      </div>
      
      {/* Profile Info */}
      <div className="px-4 md:px-8 pb-6 relative">
        {/* Profile Image */}
        <div className="absolute -top-16 left-6 md:left-8">
          <div className="h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-white overflow-hidden bg-gray-200">
            {profileUser.profileImage && !profileImgError ? (
              <img
                src={profileUser.profileImage}
                alt={profileUser.name}
                className="w-full h-full object-cover"
                onError={() => setProfileImgError(true)}
              />
            ) : (
              <UserCircle className="w-full h-full text-gray-400" />
            )}
          </div>
        </div>
        
        {/* User Info */}
        <div className="pt-20 md:pt-24">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{profileUser.name}</h1>
              <p className="text-gray-500">{profileUser.username}</p>
            </div>
            
            {isOwnProfile && (
              <button 
                onClick={onEditClick}
                className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors md:hidden"
              >
                Edit Profile
              </button>
            )}
          </div>
          
          {/* User Details */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-gray-600">
              <MapPin size={18} className="mr-2" />
              <span>{profileUser.location}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <Briefcase size={18} className="mr-2" />
              <span>{profileUser.occupation}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <Calendar size={18} className="mr-2" />
              <span>{profileUser.joinDate}</span>
            </div>
          </div>
          
          {/* Bio */}
          <div className="mt-6">
            <p className="text-gray-700 leading-relaxed">{profileUser.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;