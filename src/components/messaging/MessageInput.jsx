import React, { useState, useRef } from 'react';
import { Paperclip, Image, Send, Smile, X, Mic } from 'lucide-react';

const MessageInput = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const textareaRef = useRef(null);
  
  // Emoji list (simplified)
  const commonEmojis = ['😊', '👍', '❤️', '😂', '🎉', '🔥', '👏', '🙏', '😍', '🤔'];
  
  // Handle textarea input and auto-resize
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };
  
  // Handle file attachment
  const handleFileAttachment = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    const newAttachments = files.map(file => ({
      id: Math.random().toString(36).substring(2),
      file,
      type: file.type.startsWith('image/') ? 'image' : 'file',
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
      name: file.name,
      size: formatFileSize(file.size)
    }));
    
    setAttachments([...attachments, ...newAttachments]);
    e.target.value = null; // Reset input
  };
  
  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };
  
  // Remove attachment
  const removeAttachment = (id) => {
    const updatedAttachments = attachments.filter(attachment => attachment.id !== id);
    setAttachments(updatedAttachments);
  };
  
  // Add emoji to message
  const addEmoji = (emoji) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
    textareaRef.current.focus();
  };
  
  // Handle voice recording toggle
  const toggleRecording = () => {
    // In a real app, you would handle recording permissions and actual recording here
    setIsRecording(prev => !prev);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (message.trim() === '' && attachments.length === 0) return;
    
    onSendMessage({
      text: message.trim(),
      attachments: attachments.map(a => ({
        id: a.id,
        type: a.type,
        name: a.name,
        size: a.size,
        file: a.file
      })),
      timestamp: new Date().toISOString()
    });
    
    // Reset form
    setMessage('');
    setAttachments([]);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };
  
  return (
    <div className="bg-white border-t border-gray-200 px-4 py-3">
      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {attachments.map(attachment => (
            <div 
              key={attachment.id} 
              className="relative bg-gray-100 rounded-lg p-2 pr-8"
            >
              {attachment.type === 'image' ? (
                <div className="relative w-16 h-16">
                  <img 
                    src={attachment.preview} 
                    alt="Attachment" 
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              ) : (
                <div className="flex items-center">
                  <Paperclip className="text-gray-500 mr-2" size={16} />
                  <span className="text-sm text-gray-700 truncate max-w-[120px]">
                    {attachment.name}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">
                    ({attachment.size})
                  </span>
                </div>
              )}
              
              <button 
                className="absolute top-1 right-1 p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                onClick={() => removeAttachment(attachment.id)}
                aria-label="Remove attachment"
              >
                <X size={14} className="text-gray-600" />
              </button>
            </div>
          ))}
        </div>
      )}
      
      {/* Message Input Form */}
      <form onSubmit={handleSubmit} className="flex items-end">
        {/* Attachment Buttons */}
        <div className="flex space-x-2 mr-3">
          <button 
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            disabled={disabled}
            aria-label="Attach file"
          >
            <Paperclip size={20} />
            <input 
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileAttachment}
              multiple
              disabled={disabled}
            />
          </button>
          
          <button 
            type="button"
            onClick={() => imageInputRef.current?.click()}
            className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            disabled={disabled}
            aria-label="Attach image"
          >
            <Image size={20} />
            <input 
              type="file"
              ref={imageInputRef}
              className="hidden"
              onChange={handleFileAttachment}
              accept="image/*"
              multiple
              disabled={disabled}
            />
          </button>
          
          <button 
            type="button"
            onClick={toggleRecording}
            className={`p-2 rounded-full ${
              isRecording 
                ? 'text-red-500 bg-red-100' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            } transition-colors`}
            disabled={disabled}
            aria-label={isRecording ? 'Stop recording' : 'Start voice recording'}
          >
            <Mic size={20} />
          </button>
        </div>
        
        {/* Textarea */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleMessageChange}
            placeholder="Type a message..."
            className="w-full border border-gray-300 rounded-lg pl-3 pr-10 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 max-h-32 resize-none"
            rows={1}
            disabled={disabled || isRecording}
          />
          
          {/* Emoji Button */}
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="absolute right-3 bottom-2 text-gray-500 hover:text-gray-700"
            disabled={disabled}
            aria-label="Add emoji"
          >
            <Smile size={20} />
          </button>
          
          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="absolute bottom-full mb-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10">
              <div className="flex flex-wrap max-w-[200px]">
                {commonEmojis.map(emoji => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => addEmoji(emoji)}
                    className="p-2 text-xl hover:bg-gray-100 rounded"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Send Button */}
        <button
          type="submit"
          className={`ml-3 p-2 rounded-full ${
            message.trim() || attachments.length > 0
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-200 text-gray-500'
          } transition-colors`}
          disabled={disabled || (message.trim() === '' && attachments.length === 0)}
          aria-label="Send message"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;