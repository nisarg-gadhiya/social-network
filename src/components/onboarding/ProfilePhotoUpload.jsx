import React, { useState, useRef } from 'react';

const ProfilePhotoUpload = ({ photo, onUpdate, onNext, onBack }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(photo || null);
  const [previewUrl, setPreviewUrl] = useState(photo ? URL.createObjectURL(photo) : null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      validateAndSetPhoto(file);
    }
  };

  const validateAndSetPhoto = (file) => {
    setError(null);
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }
    
    setSelectedPhoto(file);
    
    // Create preview URL
    const filePreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(filePreviewUrl);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetPhoto(e.dataTransfer.files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleRemovePhoto = () => {
    setSelectedPhoto(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedPhoto && !photo) {
      setError('Please upload a profile photo');
      return;
    }
    
    onUpdate(selectedPhoto);
    onNext();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Profile Photo</h2>
      <p className="text-gray-600 mb-6">
        Add a profile photo to help others recognize you.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <div
            className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {previewUrl ? (
              <div className="text-center">
                <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden">
                  <img 
                    src={previewUrl} 
                    alt="Profile Preview" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Remove Photo
                </button>
              </div>
            ) : (
              <>
                <div className="mb-4 text-center">
                  <svg 
                    className="mx-auto h-12 w-12 text-gray-400" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    Drag and drop or browse
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleBrowseClick}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Browse Files
                </button>
              </>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition duration-150"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-150"
          >
            Complete Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePhotoUpload;