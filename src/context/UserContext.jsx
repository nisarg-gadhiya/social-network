import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import api from '../services/api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(null);
  const [matches, setMatches] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch user profile data when user changes
  useEffect(() => {
    if (user && user.id) {
      fetchUserProfile();
      fetchMatches();
      fetchEvents();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const profileData = await api.get(`/users/${user.id}/profile`);
      setUserProfile(profileData);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMatches = async () => {
    if (!user) return;
    try {
      const matchesData = await api.get(`/users/${user.id}/matches`);
      setMatches(matchesData);
    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  };

  const fetchEvents = async () => {
    try {
      const eventsData = await api.get('/events');
      setEvents(eventsData);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      const updatedProfile = await api.put(`/users/${user.id}/profile`, profileData);
      setUserProfile(updatedProfile);
      return updatedProfile;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const completeOnboarding = async (onboardingData) => {
    try {
      setLoading(true);
      const updatedProfile = await api.post(`/users/${user.id}/onboarding`, onboardingData);
      setUserProfile(updatedProfile);
      return updatedProfile;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider 
      value={{ 
        userProfile, 
        matches, 
        events, 
        loading, 
        updateProfile, 
        completeOnboarding,
        refreshProfile: fetchUserProfile,
        refreshMatches: fetchMatches,
        refreshEvents: fetchEvents
      }}
    >
      {children}
    </UserContext.Provider>
  );
};