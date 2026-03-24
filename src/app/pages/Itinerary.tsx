import { useTripStore } from '../store/tripStore';
import { Clock, MapPin, Sun, Cloud, CloudRain, Car } from 'lucide-react';
import { Link } from 'react-router';

interface DayActivity {
  time: string;
  activity: string;
  location?: string;
}

export function Itinerary() {
  const { selectedDestinations, travelDays } = useTripStore();

  // Generate itinerary based on selected destinations
  const generateItinerary = () => {
    if (selectedDestinations.length === 0) return [];

    const days = [];
    const destsPerDay = Math.ceil(selectedDestinations.length / travelDays);

    for (let i = 0; i < travelDays; i++) {
      const dayDests = selectedDestinations.slice(i * destsPerDay, (i + 1) * destsPerDay);
      
      const activities: DayActivity[] = [];
      
      if (dayDests.length > 0) {
        if (i === 0) {
          activities.push({
            time: '08:00 AM',
            activity: 'Start your journey',
            location: 'Colombo Airport / Hotel'
          });
        }

        dayDests.forEach((dest, idx) => {
          const startTime = 8 + (idx * 4);
          activities.push({
            time: `${startTime.toString().padStart(2, '0')}:00 ${startTime < 12 ? 'AM' : 'PM'}`,
            activity: `Arrive at ${dest.name}`,
            location: dest.location
          });
          activities.push({
            time: `${(startTime + 1).toString().padStart(2, '0')}:00 ${(startTime + 1) < 12 ? 'AM' : 'PM'}`,
            activity: `Explore ${dest.name}`,
            location: dest.description.slice(0, 60) + '...'
          });
        });

        activities.push({
          time: '07:00 PM',
          activity: 'Evening relaxation and dinner',
          location: dayDests[dayDests.length - 1]?.name || 'Hotel'
        });
      }

      days.push({
        day: i + 1,
        title: dayDests.length > 0 
          ? `${dayDests[0]?.name}${dayDests.length > 1 ? ` to ${dayDests[dayDests.length - 1]?.name}` : ''}`
          : 'Free Day',
        activities,
        weather: ['Sunny', 'Partly Cloudy', 'Light Rain'][Math.floor(Math.random() * 3)],
        temperature: Math.floor(Math.random() * 8) + 25,
        travelTime: dayDests.length > 1 ? `${dayDests.length * 2}h` : '0h',
      });
    }

    return days;
  };

  const itinerary = generateItinerary();

  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case 'Sunny':
        return Sun;
      case 'Partly Cloudy':
        return Cloud;
      case 'Light Rain':
        return CloudRain;
      default:
        return Sun;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#fef9e7] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl mb-4">Your Itinerary</h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-gray-600 text-lg">
              Day-by-day breakdown of your {travelDays}-day Sri Lanka adventure
            </p>
            {selectedDestinations.length > 0 && (
              <div className="bg-gradient-to-r from-[#0369a1] to-[#059669] text-white px-6 py-3 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <MapPin size={20} />
                  <div>
                    <p className="text-sm text-white/90">Total Destinations</p>
                    <p className="text-2xl">{selectedDestinations.length}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {selectedDestinations.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="text-gray-400" size={40} />
            </div>
            <h3 className="text-2xl mb-2">No Destinations Selected</h3>
            <p className="text-gray-600 mb-6">
              Add destinations to your trip to generate your personalized itinerary
            </p>
            <Link
              to="/explore"
              className="inline-block bg-gradient-to-r from-[#0369a1] to-[#059669] text-white px-8 py-3 rounded-lg hover:shadow-lg transition-shadow"
            >
              Explore Destinations
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {itinerary.map((day) => {
              const WeatherIcon = getWeatherIcon(day.weather);
              
              return (
                <div key={day.day} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  {/* Day Header */}
                  <div className="bg-gradient-to-r from-[#0369a1] to-[#059669] text-white p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm text-white/90 mb-1">Day {day.day}</div>
                        <h3 className="text-2xl mb-2">{day.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-white/90">
                          <div className="flex items-center gap-1">
                            <Car size={16} />
                            <span>Travel time: {day.travelTime}</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                        <WeatherIcon size={24} className="mx-auto mb-1" />
                        <div className="text-sm">{day.temperature}°C</div>
                        <div className="text-xs text-white/80">{day.weather}</div>
                      </div>
                    </div>
                  </div>

                  {/* Activities Timeline */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {day.activities.map((activity, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="bg-gradient-to-br from-[#0369a1] to-[#059669] w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0">
                              <Clock size={18} />
                            </div>
                            {idx < day.activities.length - 1 && (
                              <div className="w-0.5 h-full bg-gradient-to-b from-[#0369a1] to-[#059669] my-2 flex-grow" />
                            )}
                          </div>
                          <div className="flex-1 pb-6">
                            <div className="text-sm text-[#0369a1] mb-1">{activity.time}</div>
                            <h4 className="text-lg mb-1">{activity.activity}</h4>
                            {activity.location && (
                              <p className="text-sm text-gray-600">{activity.location}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Action Buttons */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Link
                  to="/planner"
                  className="bg-white border-2 border-[#0369a1] text-[#0369a1] text-center py-3 rounded-lg hover:bg-[#0369a1] hover:text-white transition-all"
                >
                  Modify Trip
                </Link>
                <Link
                  to="/summary"
                  className="bg-gradient-to-r from-[#0369a1] to-[#059669] text-white text-center py-3 rounded-lg hover:shadow-lg transition-shadow"
                >
                  View Summary
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}