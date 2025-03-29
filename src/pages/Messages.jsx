import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChatContext } from '../context/ChatContext';
import ChatList from '../components/messaging/ChatList';
import ChatBox from '../components/messaging/ChatBox';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Messages = () => {
  const { conversationId } = useParams();
  const { 
    conversations, 
    activeConversation, 
    setActiveConversation, 
    messages, 
    loading, 
    sendMessage,
    refreshConversations
  } = useContext(ChatContext);

  useEffect(() => {
    refreshConversations();
  }, []);
  
  useEffect(() => {
    if (conversationId && conversations.length > 0) {
      const conversation = conversations.find(c => c.id === conversationId);
      if (conversation) {
        setActiveConversation(conversation);
      }
    } else if (conversations.length > 0 && !activeConversation) {
      setActiveConversation(conversations[0]);
    }
  }, [conversationId, conversations]);

  const handleSelectConversation = (conversation) => {
    setActiveConversation(conversation);
  };

  const handleSendMessage = async (message) => {
    if (!activeConversation) return;
    
    try {
      await sendMessage(activeConversation.id, message);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (loading && conversations.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <div className="md:col-span-1 border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold">Messages</h2>
            </div>
            <ChatList 
              conversations={conversations}
              activeConversation={activeConversation}
              onSelectConversation={handleSelectConversation}
            />
          </div>
          
          {/* Chat Area */}
          <div className="md:col-span-2 flex flex-col">
            {activeConversation ? (
              <ChatBox 
                conversation={activeConversation}
                messages={messages}
                onSendMessage={handleSendMessage}
                loading={loading}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Select a conversation to start chatting</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;