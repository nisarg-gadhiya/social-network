import React from 'react';
import { Check, CheckCheck, Clock } from 'lucide-react';

const Message = ({ message, isOwn, showAvatar = true, previousSender }) => {
  // Format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    
    const messageDate = new Date(timestamp);
    return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Determine if we should show the avatar (only show for first message in a sequence)
  const shouldShowAvatar = showAvatar && previousSender !== message.senderId;
  
  // Status icons
  const getStatusIcon = () => {
    if (isOwn) {
      switch (message.status) {
        case 'sent':
          return <Check size={14} className="text-gray-500" />;
        case 'delivered':
          return <CheckCheck size={14} className="text-gray-500" />;
        case 'read':
          return <CheckCheck size={14} className="text-blue-500" />;
        case 'pending':
        default:
          return <Clock size={14} className="text-gray-400" />;
      }
    }
    return null;
  };
  
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      {/* Avatar for received messages */}
      {!isOwn && shouldShowAvatar ? (
        <div className="mr-2 flex-shrink-0">
          <img 
            src={message.sender?.avatar || '/api/placeholder/32/32'} 
            alt={message.sender?.name || 'User'} 
            className="w-8 h-8 rounded-full"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/api/placeholder/32/32';
            }}
          />
        </div>
      ) : !isOwn ? (
        <div className="mr-2 w-8"></div> // Placeholder to maintain alignment
      ) : null}
      
      <div className={`max-w-xs md:max-w-md lg:max-w-lg ${isOwn ? 'order-1' : 'order-2'}`}>
        {/* Message Content */}
        <div 
          className={`px-4 py-3 rounded-lg ${
            isOwn 
              ? 'bg-blue-600 text-white rounded-br-none' 
              : 'bg-gray-100 text-gray-800 rounded-bl-none'
          }`}
        >
          {message.text}
          
          {/* Handle different content types */}
          {message.imageUrl && (
            <div className="mt-2">
              <img 
                src={message.imageUrl} 
                alt="Shared image" 
                className="rounded max-w-full h-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/api/placeholder/200/150';
                }}
              />
            </div>
          )}
          
          {message.fileUrl && (
            <div className={`mt-2 p-2 rounded flex items-center ${isOwn ? 'bg-blue-700' : 'bg-gray-200'}`}>
              <div className={`text-sm ${isOwn ? 'text-blue-100' : 'text-gray-700'}`}>
                <div className="font-medium">{message.fileName || 'Attachment'}</div>
                <div className="text-xs">{message.fileSize || ''}</div>
              </div>
            </div>
          )}
        </div>
        
        {/* Timestamp and Status */}
        <div className={`flex items-center mt-1 text-xs text-gray-500 ${isOwn ? 'justify-end' : 'justify-start'}`}>
          <span>{formatTime(message.timestamp)}</span>
          {getStatusIcon() && <span className="ml-1">{getStatusIcon()}</span>}
        </div>
      </div>
    </div>
  );
};

export default Message;