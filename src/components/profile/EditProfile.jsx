import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle, Camera, X, Save } from 'lucide-react';

const EditProfile = ({ user, onSave, onCancel }) => {
  const navigate = useNavigate();
  
  // Default user if not provided
  const defaultUser = {
    name: '',
    username: '',
    location: '',
    occupation: '',
    bio: '',
    profileImage: null,
    coverImage: null,
    interests: []
  };
  
  // Set initial form state
  const [formData, setFormData] = useState(user || defaultUser);
  const [profileImagePreview, setProfileImagePreview] = useState(user?.profileImage || null);
  const [coverImagePreview, setCoverImagePreview] = useState(user?.coverImage || null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Update form if user prop changes
  useEffect(() => {
    if (user) {
      setFormData(user);
      setProfileImagePreview(user.profileImage);
      setCoverImagePreview(user.coverImage);
    }
  }, [user]);
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  // Handle profile image upload
  const handleProfileImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
        setFormData(prev => ({
          ...prev,
          profileImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle cover image upload
  const handleCoverImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result);
        setFormData(prev => ({
          ...prev,
          coverImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (!/^@[a-zA-Z0-9_]{3,15}$/.test(formData.username)) {
      newErrors.username = 'Username must start with @ and be 4-16 alphanumeric characters';
    }
    
    if (formData.bio && formData.bio.length > 250) {
      newErrors.bio = 'Bio must be 250 characters or less';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Call onSave prop with updated data
      if (onSave) {
        await onSave(formData);
      }
      
      // Navigate back to profile page
      navigate('/profile');
    } catch (error) {
      console.error('Error saving profile:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to save profile. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        {/* Cover Image Section */}
        <div className="h-48 md:h-64 bg-gray-200 relative overflow-hidden">
          {coverImagePreview ? (
            <img
              src={coverImagePreview}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600" />
          )}
          
          {/* Cover Image Upload Button */}
          <label className="absolute bottom-4 right-4 bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-all cursor-pointer">
            <Camera size={20} className="text-gray-700" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverImageChange}
            />
          </label>
        </div>
        
        {/* Profile Content */}
        <div className="px-4 md:px-8 py-6 relative">
          {/* Profile Image */}
          <div className="absolute -top-16 left-6 md:left-8">
            <div className="h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-white overflow-hidden bg-gray-200 relative">
              {profileImagePreview ? (
                <img
                  src={profileImagePreview}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserCircle className="w-full h-full text-gray-400" />
              )}
              
              {/* Profile Image Upload Button */}
              <label className="absolute bottom-0 inset-x-0 bg-black bg-opacity-50 text-white text-center py-1 cursor-pointer hover:bg-opacity-70 transition-all">
                <Camera size={16} className="inline-block mr-1" />
                <span className="text-xs">Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfileImageChange}
                />
              </label>
            </div>
          </div>
          
          {/* Form Fields */}
          <div className="pt-20 md:pt-24 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
              
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="@username"
                  className={`w-full px-3 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">
                  Occupation
                </label>
                <input
                  type="text"
                  id="occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            {/* Bio */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                Bio <span className="text-gray-500 text-xs">({formData.bio?.length || 0}/250)</span>
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-3 py-2 border ${errors.bio ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Tell others about yourself..."
              />
              {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio}</p>}
            </div>
            
            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
                disabled={isSubmitting}
              >
                <X size={16} className="mr-1" />
                Cancel
              </button>
              
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                <Save size={16} className="mr-1" />
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
            
            {errors.submit && (
              <div className="p-3 bg-red-100 text-red-700 rounded-md mt-4">
                {errors.submit}
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;