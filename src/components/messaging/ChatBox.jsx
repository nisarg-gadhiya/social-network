import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Video, MoreVertical, Info } from 'lucide-react';
import Message from './Message';
import MessageInput from './MessageInput';

const ChatBox = ({ 
  conversation = null, 
  onSendMessage, 
  onGoBack,
  currentUserId = 'current-user'
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  
  const [messages, setMessages] = useState(conversation?.messages || []);
  const [isTyping, setIsTyping] = useState(false);
  
  // Simulate fetching messages if not provided
  useEffect(() => {
    if (conversation?.messages) {
      setMessages(conversation.messages);
    } else if (id) {
      // Simulate API call
      console.log(`Fetching messages for conversation ${id}`);
      // In a real app, you would fetch messages from your API here
    }
    
    // Simulate typing indicators
    const typingTimer = setTimeout(() => {
      if (messages.length > 0 && Math.random() > 0.7) {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 3000);
      }
    }, 2000);
    
    return () => clearTimeout(typingTimer);
  }, [conversation, id]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Handle sending a new message
  const handleSendMessage = (messageData) => {
    const newMessage = {
      id: Date.now().toString(),
      senderId: currentUserId,
      text: messageData.text,
      timestamp: new Date().toISOString(),
      status: 'pending',
      ...messageData
    };
    
    // Add to local state
    setMessages(prev => [...prev, newMessage]);
    
    // Call parent handler
    if (onSendMessage) {
      onSendMessage(newMessage, id);
    }
    
    // Simulate message status updates
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'sent' } : msg
        )
      );
      
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
          )
        );
        
        setTimeout(() => {
          setMessages(prev => 
            prev.map(msg => 
              msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
            )
          );
        }, 1500);
      }, 1000);
    }, 500);
  };
  
  // Group messages by date
  const groupMessagesByDate = () => {
    const groups = {};
    
    messages.forEach(message => {
      const date = new Date(message.timestamp).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    
    return Object.entries(groups).map(([date, messages]) => ({
      date,
      messages
    }));
  };
  
  // Format date for message groups
  const formatMessageDate = (dateString) => {
    const messageDate = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return messageDate.toLocaleDateString(undefined, { 
        weekday: 'long', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };
  
  // Handle back button click
  const handleBack = () => {
    if (onGoBack) {
      onGoBack();
    } else {
      navigate('/messaging');
    }
  };
  
  // Show empty state if no conversation
  if (!conversation && !id) {
    return (
      <div className="flex flex-col h-full justify-center items-center bg-gray-50 p-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Message className="text-blue-600" size={24} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No conversation selected</h3>
          <p className="text-gray-500 mb-6">Select a conversation from the list or start a new chat</p>
          <button
            onClick={() => navigate('/messaging/new')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Start New Conversation
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header */}
      <div className="px-4 py-3 border-b border-gray-200 flex items-center">
        <button
          onClick={handleBack}
          className="mr-2 p-1 rounded-full hover:bg-gray-100 transition-colors md:hidden"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        
        {conversation?.user && (
          <div className="flex items-center flex-1">
            <div className="relative">
              <img
                src={conversation.user.avatar || '/api/placeholder/40/40'}
                alt={conversation.user.name}
                className="w-10 h-10 rounded-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/api/placeholder/40/40';
                }}
              />
              {conversation.user.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            
            <div className="ml-3">
              <h2 className="text-base font-semibold text-gray-800">{conversation.user.name}</h2>
              <p className="text-xs text-gray-500">
                {conversation.user.isOnline ? 'Online' : 'Last seen ' + formatTimeAgo(conversation.user.lastSeen)}
              </p>
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex">
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
            <Phone size={20} />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
            <Video size={20} />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
            <Info size={20} />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {groupMessagesByDate().map((group, groupIndex) => (
          <div key={group.date}>
            {/* Date Separator */}
            <div className="flex justify-center my-4">
              <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                {formatMessageDate(group.date)}
              </div>
            </div>
            
            {/* Messages */}
            {group.messages.map((message, index) => (
              <Message
                key={message.id}
                message={message}
                isOwn={message.senderId === currentUserId}
                showAvatar={true}
                previousSender={index > 0 ? group.messages[index - 1].senderId : null}
              />
            ))}
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center my-4">
            <div className="w-8 h-8 rounded-full bg-gray-200 mr-2"></div>
            <div className="bg-gray-100 px-4 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          </div>
        )}
        
        {/* Scroll to bottom reference */}
        <div ref={messagesEndRef}></div>
      </div>
      
      {/* Message Input */}
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

// Helper function for formatting time
const formatTimeAgo = (timestamp) => {
  if (!timestamp) return 'recently';
  
  const now = new Date();
  const messageTime = new Date(timestamp);
  const diffInSeconds = Math.floor((now - messageTime) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  
  return messageTime.toLocaleDateString();
};

export default ChatBox;