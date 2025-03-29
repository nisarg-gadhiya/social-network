import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';
import StepIndicator from '../components/onboarding/StepIndicator';
import PersonalInfoForm from '../components/onboarding/PersonalInfoForm';
import InterestsForm from '../components/onboarding/InterestsForm';
import ProfilePhotoUpload from '../components/onboarding/ProfilePhotoUpload';

const Onboarding = () => {
  const navigate = useNavigate();
  const { updateUser } = useContext(AuthContext);
  const { completeOnboarding } = useContext(UserContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      bio: '',
      location: '',
      profession: '',
      education: ''
    },
    interests: [],
    profilePhoto: null
  });

  const totalSteps = 3;

  const updateFormData = (step, data) => {
    setFormData(prev => ({
      ...prev,
      ...data
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      await completeOnboarding(formData);
      updateUser({ onboardingCompleted: true });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Complete Your Profile</h1>
      
      <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      
      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        {currentStep === 1 && (
          <PersonalInfoForm 
            data={formData.personalInfo}
            onUpdate={(data) => updateFormData('personalInfo', { personalInfo: data })}
            onNext={handleNext}
          />
        )}
        
        {currentStep === 2 && (
          <InterestsForm 
            selectedInterests={formData.interests}
            onUpdate={(interests) => updateFormData('interests', { interests })}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        
        {currentStep === 3 && (
          <ProfilePhotoUpload 
            photo={formData.profilePhoto}
            onUpdate={(photo) => updateFormData('profilePhoto', { profilePhoto: photo })}
            onNext={handleSubmit}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
};

export default Onboarding;