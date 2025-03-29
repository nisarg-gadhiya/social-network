import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import ProfileHeader from '../components/profile/ProfileHeader';
import InterestTags from '../components/profile/InterestTags';
import EditProfile from '../components/profile/EditProfile';
import LoadingSpinner from '../components/common/LoadingSpinner';
import api from '../services/api';

const Profile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { userProfile, loading: userLoading, updateProfile } = useContext(UserContext);
  const { startConversation } = useContext(ChatContext);
  
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const isOwnProfile = !userId || userId === user?.id;

  useEffect(() => {
    if (isOwnProfile) {
      setProfile(userProfile);
    } else {
      fetchUserProfile();
    }
  }, [userId, userProfile, isOwnProfile]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const profileData = await api.get(`/users/${userId}/profile`);
      setProfile(profileData);
    } catch (err) {
      setError('Failed to load profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async (profileData) => {
    try {
      setLoading(true);
      const updatedProfile = await updateProfile(profileData);
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleStartChat = async () => {
    try {
      const conversation = await startConversation(userId);
      navigate(`/messages/${conversation.id}`);
    } catch (err) {
      setError('Failed to start conversation');
      console.error(err);
    }
  };

  if (userLoading || loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={() => navigate('/dashboard')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  if (!profile) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {isEditing ? (
        <EditProfile 
          profile={profile} 
          onSave={handleSaveProfile}
          onCancel={handleCancelEdit}
        />
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <ProfileHeader 
            profile={profile} 
            isOwnProfile={isOwnProfile}
            onEdit={handleEditProfile}
            onMessage={handleStartChat}
          />
          
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <p className="text-gray-700">{profile.bio || 'No bio provided'}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
                <ul className="space-y-2">
                  <li className="flex">
                    <span className="font-medium w-24">Location:</span>
                    <span className="text-gray-700">{profile.location || 'Not specified'}</span>
                  </li>
                  <li className="flex">
                    <span className="font-medium w-24">Profession:</span>
                    <span className="text-gray-700">{profile.profession || 'Not specified'}</span>
                  </li>
                  <li className="flex">
                    <span className="font-medium w-24">Education:</span>
                    <span className="text-gray-700">{profile.education || 'Not specified'}</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Interests</h3>
                {profile.interests && profile.interests.length > 0 ? (
                  <InterestTags interests={profile.interests} />
                ) : (
                  <p className="text-gray-500">No interests added yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;