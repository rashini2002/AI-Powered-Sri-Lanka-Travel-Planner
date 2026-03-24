import { useState } from 'react';
import { Search, X, ArrowUpDown } from 'lucide-react';
import { DestinationCard } from '../components/DestinationCard';
import { destinations } from '../data/destinations';
import { useTripStore } from '../store/tripStore';
import { toast } from 'sonner';
import { motion } from 'motion/react';

const categories = ['All', 'Beach', 'Adventure', 'Cultural'];
const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'cost-low', label: 'Lowest Cost' },
  { value: 'cost-high', label: 'Highest Cost' },
  { value: 'temp-cool', label: 'Coolest Weather' },
  { value: 'temp-warm', label: 'Warmest Weather' },
  { value: 'crowd-low', label: 'Least Crowded' },
];

export function Explore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  
  const { selectedDestinations, addDestination, removeDestination } = useTripStore();

  const filteredDestinations = destinations
    .filter((dest) => {
      const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           dest.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || dest.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'cost-low':
          return a.costPerDay - b.costPerDay;
        case 'cost-high':
          return b.costPerDay - a.costPerDay;
        case 'temp-cool':
          return a.temperature - b.temperature;
        case 'temp-warm':
          return b.temperature - a.temperature;
        case 'crowd-low':
          const crowdOrder = { 'Low': 0, 'Medium': 1, 'High': 2 };
          return crowdOrder[a.crowdLevel] - crowdOrder[b.crowdLevel];
        default:
          return 0;
      }
    });

  const handleAddToTrip = (destination: typeof destinations[0]) => {
    if (selectedDestinations.find(d => d.id === destination.id)) {
      toast.info('Destination already in your trip');
    } else {
      addDestination(destination);
      toast.success(`${destination.name} added to your trip!`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#fef9e7] py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl mb-4">Explore Destinations</h1>
          <p className="text-gray-600 text-lg">
            Discover amazing places across Sri Lanka with AI-powered recommendations
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0369a1] bg-white shadow-sm"
            />
          </div>
        </div>

        {/* Filter and Sort Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          {/* Filter Chips */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-[#0369a1] to-[#059669] text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <ArrowUpDown size={18} className="text-gray-600" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0369a1] text-sm"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Destinations Grid */}
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-6">
              {filteredDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  {...destination}
                  onAddToTrip={() => handleAddToTrip(destination)}
                  isAdded={!!selectedDestinations.find(d => d.id === destination.id)}
                />
              ))}
            </div>

            {filteredDestinations.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No destinations found. Try a different search or filter.</p>
              </div>
            )}
          </div>

          {/* Trip Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-2xl mb-4">Your Trip</h3>

              {selectedDestinations.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="text-gray-400" size={32} />
                  </div>
                  <p className="text-gray-500">No destinations selected yet</p>
                  <p className="text-sm text-gray-400 mt-2">Browse and add places to start planning</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    {selectedDestinations.map((dest) => (
                      <motion.div
                        key={dest.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#fef3c7] to-[#fef9e7] rounded-lg"
                      >
                        <img
                          src={dest.image}
                          alt={dest.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{dest.name}</p>
                          <p className="text-xs text-gray-600">{dest.location}</p>
                        </div>
                        <button
                          onClick={() => {
                            removeDestination(dest.id);
                            toast.success(`${dest.name} removed from trip`);
                          }}
                          className="p-1.5 hover:bg-white rounded-full transition-colors"
                        >
                          <X size={16} className="text-gray-600" />
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-600">Total Destinations</span>
                      <span className="text-2xl">{selectedDestinations.length}</span>
                    </div>
                    <a
                      href="/planner"
                      className="block w-full bg-gradient-to-r from-[#0369a1] to-[#059669] text-white text-center py-3 rounded-lg hover:shadow-lg transition-shadow"
                    >
                      Continue to Planner
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}