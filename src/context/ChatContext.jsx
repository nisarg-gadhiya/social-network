import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import api from '../services/api';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user.id) {
      fetchConversations();
    }
  }, [user]);

  useEffect(() => {
    if (activeConversation) {
      fetchMessages(activeConversation.id);
    }
  }, [activeConversation]);

  const fetchConversations = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const conversationsData = await api.get(`/users/${user.id}/conversations`);
      setConversations(conversationsData);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (conversationId) => {
    try {
      setLoading(true);
      const messagesData = await api.get(`/conversations/${conversationId}/messages`);
      setMessages(messagesData);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (conversationId, content) => {
    try {
      const newMessage = await api.post(`/conversations/${conversationId}/messages`, { content });
      setMessages(prev => [...prev, newMessage]);
      return newMessage;
    } catch (error) {
      throw error;
    }
  };

  const startConversation = async (userId) => {
    try {
      const newConversation = await api.post('/conversations', { participantId: userId });
      setConversations(prev => [...prev, newConversation]);
      setActiveConversation(newConversation);
      return newConversation;
    } catch (error) {
      throw error;
    }
  };

  return (
    <ChatContext.Provider 
      value={{ 
        conversations, 
        activeConversation,
        setActiveConversation, 
        messages, 
        loading, 
        sendMessage,
        startConversation,
        refreshConversations: fetchConversations
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};