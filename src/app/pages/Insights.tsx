import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Calendar, MapPin, ThermometerSun, Users } from 'lucide-react';
import { KPICard } from '../components/KPICard';
import { destinations } from '../data/destinations';
import { useTripStore } from '../store/tripStore';
import { useMemo } from "react";



export function Insights() {
    
  const { selectedDestinations } = useTripStore();

  const data = selectedDestinations.length
  ? selectedDestinations
  : [];

  // Calculate KPIs
  const avgCost =
  selectedDestinations.reduce((sum, d) => sum + (d.costPerDay || 50), 0) /
  Math.max(selectedDestinations.length, 1);

  // Cost by destination data
  const costData = selectedDestinations
    .sort((a, b) => a.costPerDay - b.costPerDay)
    .slice(0, 6)
    .map(d => ({
      name: d.name.split(' ')[0],
      cost: d.costPerDay,
    }));

  // Temperature by month data (simulated)
  const tempData = [
    { month: 'Jan', temp: 27 },
    { month: 'Feb', temp: 28 },
    { month: 'Mar', temp: 29 },
    { month: 'Apr', temp: 30 },
    { month: 'May', temp: 30 },
    { month: 'Jun', temp: 29 },
    { month: 'Jul', temp: 28 },
    { month: 'Aug', temp: 28 },
    { month: 'Sep', temp: 28 },
    { month: 'Oct', temp: 28 },
    { month: 'Nov', temp: 27 },
    { month: 'Dec', temp: 27 },
  ];

  // Category distribution
  const categoryData = Object.entries(
    data.reduce((acc, d) => {
      acc[d.category] = (acc[d.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  const COLORS = ['#0369a1', '#059669', '#fbbf24', '#8b5cf6', '#f59e0b'];

  // Get least crowded destinations
  const leastCrowded = selectedDestinations
    .filter(d => d.crowdLevel === 'Low')
    .slice(0, 3);

  // Get budget destinations
  const budgetDests = selectedDestinations
    .sort((a, b) => a.costPerDay - b.costPerDay)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#fef9e7] py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl mb-4">Travel Insights Dashboard</h1>
          <p className="text-gray-600 text-lg">
            Data-driven analytics to help you plan smarter
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Avg Trip Cost"
            value={`$${avgCost}/day`}
            icon={DollarSign}
            color="from-[#0369a1] to-[#0ea5e9]"
          />
          <KPICard
            title="Best Travel Month"
            value="December"
            icon={Calendar}
            color="from-[#059669] to-[#10b981]"
          />
          <KPICard
            title="Total Destinations"
            value={selectedDestinations.length}
            icon={MapPin}
            color="from-[#fbbf24] to-[#f59e0b]"
          />
          <KPICard
            title="Avg Temperature"
            value="28°C"
            icon={ThermometerSun}
            color="from-[#8b5cf6] to-[#a78bfa]"
          />
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Cost by Destination Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl mb-6">Budget-Friendly Destinations</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cost" fill="#0369a1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Temperature by Month Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl mb-6">Monthly Temperature Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={tempData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="temp" 
                  stroke="#059669" 
                  strokeWidth={3}
                  dot={{ fill: '#059669', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution & Tips */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Pie Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl mb-6">Destination Categories</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Best Time to Visit */}
          <div className="bg-gradient-to-br from-[#0369a1] to-[#059669] text-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl mb-4">Best Time to Visit Sri Lanka</h3>
            <div className="space-y-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm text-white/90 mb-1">West & South Coast</p>
                <p className="text-lg">Dec - Mar</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm text-white/90 mb-1">East Coast</p>
                <p className="text-lg">Apr - Sep</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm text-white/90 mb-1">Hill Country</p>
                <p className="text-lg">Jan - Mar</p>
              </div>
            </div>
          </div>

          {/* Crowd Insights */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl mb-4">Least Crowded Locations</h3>
            <div className="space-y-4">
              {leastCrowded.map((dest, index) => (
                <div key={dest.id} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="bg-green-500 w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{dest.name}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Users size={12} />
                      <span>Low crowd</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Budget Destinations */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl mb-6">Top Budget-Friendly Destinations</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {budgetDests.map((dest) => (
              <div key={dest.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow">
                <img 
                  src={dest.image} 
                  alt={dest.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h4 className="text-lg mb-2">{dest.name}</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{dest.location}</span>
                  <span className="text-lg text-[#0369a1] font-medium">${dest.costPerDay}/day</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
