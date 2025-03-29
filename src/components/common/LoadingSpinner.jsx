import React from "react";

const LoadingSpinner = ({ size = "medium", color = "blue", fullScreen = false }) => {
    const sizeClasses = {
      small: "w-4 h-4",
      medium: "w-8 h-8",
      large: "w-12 h-12",
    }
  
    const colorClasses = {
      blue: "text-blue-600",
      gray: "text-gray-600",
      white: "text-white",
    }
  
    const containerClasses = fullScreen
      ? "fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50"
      : "flex items-center justify-center"
  
    return (
      <div className={containerClasses}>
        <svg
          className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3.067 7.946l2.667-2.655z"
          ></path>
        </svg>
      </div>
    )
  }
  
  export default LoadingSpinner
    