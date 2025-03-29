import React from 'react';
import { formatDate } from '../../utils/formatDate';

const EventCard = ({ event }) => {
  const eventDate = new Date(event.date);
  const isUpcoming = eventDate > new Date();
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow duration-200">
      <div className="flex">
        {/* Date display */}
        <div className="mr-4 text-center min-w-16">
          <div className="bg-blue-100 text-blue-800 rounded-t-md py-1 text-xs font-bold">
            {eventDate.toLocaleString('default', { month: 'short' })}
          </div>
          <div className="bg-white border border-blue-100 border-t-0 rounded-b-md py-2 text-2xl font-bold text-gray-800">
            {eventDate.getDate()}
          </div>
        </div>
        
        {/* Event details */}
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900">{event.title}</h3>
          
          <div className="mt-2 flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3.586l2.707 2.707a1 1 0 01-1.414 1.414l-3-3A1 1 0 019 10V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span>{formatDate(event.date)}</span>
            
            {event.location && (
              <>
                <span className="mx-2">•</span>
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>{event.location}</span>
              </>
            )}
          </div>
          
          {event.description && (
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">
              {event.description}
            </p>
          )}
          
          <div className="mt-3 flex flex-wrap gap-1">
            {event.tags?.map((tag, index) => (
              <span 
                key={index} 
                className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
        <div>
          <span className="text-sm text-gray-600">
            {event.attendeeCount || 0} {event.attendeeCount === 1 ? 'person' : 'people'} attending
          </span>
        </div>
        
        <button className={`px-4 py-1 text-sm font-medium rounded-md ${
          event.isRegistered 
            ? 'bg-green-100 text-green-800' 
            : isUpcoming 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-gray-100 text-gray-500 cursor-not-allowed'
        }`}>
          {event.isRegistered 
            ? 'Registered' 
            : isUpcoming 
              ? 'Register' 
              : 'Event Ended'}
        </button>
      </div>
    </div>
  );
};

export default EventCard;