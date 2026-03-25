import { useTripStore } from '../store/tripStore';
import { KPICard } from '../components/KPICard';
import { MapPin, Calendar, DollarSign, Cloud, Lightbulb } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Link } from 'react-router';


export function Summary() {
  const { selectedDestinations, travelDays, numberOfTravelers, travelStyle } = useTripStore();

  // Calculate budget
  const calculateBudget = () => {
    const basePerDay = travelStyle === 'Budget' ? 50 : travelStyle === 'Standard' ? 100 : 200;
    return basePerDay * travelDays * numberOfTravelers;
  };

  // Budget breakdown for pie chart
  const budgetData = [
    { name: 'Transport', value: 25, color: '#0369a1' },
    { name: 'Accommodation', value: 35, color: '#059669' },
    { name: 'Meals', value: 25, color: '#fbbf24' },
    { name: 'Activities', value: 15, color: '#8b5cf6' },
  ];

  const travelTips = [
    'Best time to visit Sri Lanka is December to March for the west and south coasts',
    'Always carry a reusable water bottle to stay hydrated',
    'Dress modestly when visiting temples and religious sites',
    'Haggling is common in local markets - don\'t be shy to negotiate',
    'Try local cuisine like rice and curry, hoppers, and kottu roti',
    'Keep small bills for tuk-tuk rides and small purchases',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#fef9e7] py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl mb-4">Trip Summary Dashboard</h1>
          <p className="text-gray-600 text-lg">
            Complete overview of your Sri Lanka adventure
          </p>
        </div>

        {selectedDestinations.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="text-gray-400" size={40} />
            </div>
            <h3 className="text-2xl mb-2">No Trip Planned Yet</h3>
            <p className="text-gray-600 mb-6">
              Start planning your Sri Lanka adventure to see your trip summary
            </p>
            <Link
              to="/explore"
              className="inline-block bg-gradient-to-r from-[#0369a1] to-[#059669] text-white px-8 py-3 rounded-lg hover:shadow-lg transition-shadow"
            >
              Start Planning
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard
                title="Total Destinations"
                value={selectedDestinations.length}
                icon={MapPin}
                color="from-[#0369a1] to-[#0ea5e9]"
              />
              <KPICard
                title="Total Travel Days"
                value={travelDays}
                icon={Calendar}
                color="from-[#059669] to-[#10b981]"
              />
              <KPICard
                title="Estimated Budget"
                value={`$${calculateBudget().toLocaleString()}`}
                icon={DollarSign}
                color="from-[#fbbf24] to-[#f59e0b]"
              />
              <KPICard
                title="Average Weather"
                value="28°C"
                icon={Cloud}
                color="from-[#8b5cf6] to-[#a78bfa]"
              />
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Route Map */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl mb-6">Route Overview</h3>
                
                <div className="bg-gradient-to-br from-[#0ea5e9] to-[#10b981] rounded-lg h-[300px] flex items-center justify-center relative overflow-hidden mb-6">
                  {/* Decorative Map */}
                  <div className="absolute inset-0 opacity-20">
                    {selectedDestinations.slice(0, 5).map((_, index) => (
                      <div
                        key={index}
                        className="absolute w-3 h-3 bg-white rounded-full animate-pulse"
                        style={{
                          top: `${20 + index * 15}%`,
                          left: `${25 + index * 12}%`,
                          animationDelay: `${index * 0.2}s`,
                        }}
                      />
                    ))}
                  </div>

                  <div className="text-center z-10">
                    <MapPin className="text-white mx-auto mb-4" size={48} />
                    <p className="text-white text-lg">Your Travel Route</p>
                    <p className="text-white/80 text-sm mt-2">
                      {selectedDestinations.length} destinations mapped
                    </p>
                  </div>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {selectedDestinations.map((dest, index) => (
                    <div key={dest.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="bg-gradient-to-br from-[#0369a1] to-[#059669] w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{dest.name}</p>
                        <p className="text-sm text-gray-600 truncate">{dest.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Budget Pie Chart */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl mb-6">Budget Breakdown</h3>
                
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={budgetData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {budgetData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 text-sm mb-1">Per Person</p>
                    <p className="text-2xl">
                      ${(calculateBudget() / numberOfTravelers).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 text-sm mb-1">Total Cost</p>
                    <p className="text-2xl">${calculateBudget().toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Travel Tips */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] p-3 rounded-lg">
                  <Lightbulb className="text-white" size={24} />
                </div>
                <h3 className="text-2xl">Recommended Travel Tips</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {travelTips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-[#fef3c7] to-[#fef9e7] rounded-lg">
                    <div className="bg-[#059669] w-6 h-6 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="grid md:grid-cols-3 gap-4">
                <Link
                  to="/planner"
                  className="bg-white border-2 border-[#0369a1] text-[#0369a1] text-center py-3 rounded-lg hover:bg-[#0369a1] hover:text-white transition-all"
                >
                  Modify Trip
                </Link>
                <Link
                  to="/itinerary"
                  className="bg-white border-2 border-[#059669] text-[#059669] text-center py-3 rounded-lg hover:bg-[#059669] hover:text-white transition-all"
                >
                  View Itinerary
                </Link>
                <Link
                  to="/budget"
                  className="bg-gradient-to-r from-[#0369a1] to-[#059669] text-white text-center py-3 rounded-lg hover:shadow-lg transition-shadow"
                >
                  Budget Details
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
