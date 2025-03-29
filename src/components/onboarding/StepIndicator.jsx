import React from 'react';

const StepIndicator = ({ currentStep, totalSteps }) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center">
      {steps.map((step) => (
        <React.Fragment key={step}>
          {/* Step Circle */}
          <div className="relative">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                step === currentStep
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : step < currentStep
                  ? 'border-blue-600 bg-white text-blue-600'
                  : 'border-gray-300 bg-white text-gray-500'
              }`}
            >
              {step < currentStep ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <span className="text-sm font-semibold">{step}</span>
              )}
            </div>
            
            {/* Step Label below the circle */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-max text-xs font-medium">
              {step === 1 && 'Personal Info'}
              {step === 2 && 'Interests'}
              {step === 3 && 'Profile Photo'}
            </div>
          </div>
          
          {/* Connector Line */}
          {step < totalSteps && (
            <div
              className={`w-12 h-1 ${
                step < currentStep ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;