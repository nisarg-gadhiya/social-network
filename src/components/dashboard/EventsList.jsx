import React from 'react';
import EventCard from './EventCard';

const EventsList = ({ events = [] }) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No upcoming events at the moment.</p>
        <p className="text-sm text-gray-500 mt-2">
          Check back later for hackathons, meetups, and other networking opportunities.
        </p>
      </div>
    );
  }

  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  // Group events by month
  const groupedEvents = sortedEvents.reduce((groups, event) => {
    const date = new Date(event.date);
    const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    
    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    
    groups[monthYear].push(event);
    return groups;
  }, {});

  return (
    <div>
      {Object.entries(groupedEvents).map(([monthYear, monthEvents]) => (
        <div key={monthYear} className="mb-6">
          <h3 className="text-lg font-semibold mb-3">{monthYear}</h3>
          <div className="space-y-4">
            {monthEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventsList;