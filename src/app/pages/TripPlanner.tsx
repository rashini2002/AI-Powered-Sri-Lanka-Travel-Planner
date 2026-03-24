import { useState } from 'react';
import { useTripStore } from '../store/tripStore';
import { MapPin, Users, Calendar, Sparkles, CloudSun, UserCircle, Loader2, TrendingUp } from 'lucide-react';
import { Link } from 'react-router';
import { destinations } from '../data/destinations';
import { toast } from 'sonner';

export function TripPlanner() {
  const {
    selectedDestinations,
    travelDays,
    travelStyle,
    numberOfTravelers,
    setTravelDays,
    setTravelStyle,
    setNumberOfTravelers,
    addDestination,
  } = useTripStore();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState<[number, number]>([20, 70]);
  const [weatherPref, setWeatherPref] = useState<'cool' | 'warm'>('warm');
  const [crowdPref, setCrowdPref] = useState<'low' | 'medium' | 'high'>('medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendations, setRecommendations] = useState<typeof destinations>([]);

  const categories = ['Beach', 'Adventure', 'Cultural'];

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleGenerateSmartPlan = () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const filtered = destinations.filter(dest => {
        const matchesBudget = dest.costPerDay >= budgetRange[0] && dest.costPerDay <= budgetRange[1];
        const matchesWeather = weatherPref === 'cool' ? dest.temperature < 25 : dest.temperature >= 25;
        const matchesCrowd = crowdPref === 'low' ? dest.crowdLevel === 'Low' : 
                           crowdPref === 'medium' ? dest.crowdLevel === 'Medium' : 
                           dest.crowdLevel === 'High';
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(dest.category);
        
        return matchesBudget && matchesWeather && matchesCrowd && matchesCategory;
      });

      setRecommendations(filtered.slice(0, 4));
      setIsGenerating(false);
      toast.success('Smart plan generated successfully!');
    }, 2000);
  };

  const getMatchScore = (dest: typeof destinations[0]) => {
    let score = 70;
    if (dest.costPerDay >= budgetRange[0] && dest.costPerDay <= budgetRange[1]) score += 10;
    if ((weatherPref === 'cool' && dest.temperature < 25) || (weatherPref === 'warm' && dest.temperature >= 25)) score += 10;
    if (dest.crowdLevel === crowdPref) score += 10;
    return Math.min(score, 98);
  };

  const getRecommendationReason = (dest: typeof destinations[0]) => {
    const reasons = [];
    if (dest.costPerDay < 40) reasons.push('budget-friendly');
    if (dest.temperature < 25) reasons.push('cool weather');
    if (dest.crowdLevel === 'Low') reasons.push('less crowded');
    if (dest.aiRecommended) reasons.push('AI pick');
    return `Perfect for ${reasons.join(', ')}`;
  };

  const estimatedCost = () => {
    const basePerDay = travelStyle === 'Budget' ? 50 : travelStyle === 'Standard' ? 100 : 200;
    return basePerDay * travelDays * numberOfTravelers;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#fef9e7] py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl mb-4">Smart Trip Planner</h1>
          <p className="text-gray-600 text-lg">
            AI-powered planning to create your perfect Sri Lanka adventure
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Smart Form Inputs */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl mb-6">Trip Preferences</h3>

            <div className="space-y-6">
              {/* Travel Days */}
              <div>
                <label className="flex items-center gap-2 mb-3">
                  <Calendar className="text-[#0369a1]" size={20} />
                  Number of Days
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={travelDays}
                  onChange={(e) => setTravelDays(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0369a1]"
                />
              </div>

              {/* Budget Range */}
              <div>
                <label className="flex items-center gap-2 mb-3">
                  <TrendingUp className="text-[#059669]" size={20} />
                  Budget per Day: ${budgetRange[0]} - ${budgetRange[1]}
                </label>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={budgetRange[1]}
                  onChange={(e) => setBudgetRange([budgetRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>

              {/* Travel Style */}
              <div>
                <label className="flex items-center gap-2 mb-3">
                  <Sparkles className="text-[#8b5cf6]" size={20} />
                  Travel Style
                </label>
                <div className="space-y-2">
                  {['Budget', 'Standard', 'Luxury'].map((style) => (
                    <button
                      key={style}
                      onClick={() => setTravelStyle(style as any)}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all ${
                        travelStyle === style
                          ? 'border-[#0369a1] bg-[#0369a1] text-white'
                          : 'border-gray-200 hover:border-[#0369a1]'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Number of Travelers */}
              <div>
                <label className="flex items-center gap-2 mb-3">
                  <Users className="text-[#fbbf24]" size={20} />
                  Number of Travelers
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={numberOfTravelers}
                  onChange={(e) => setNumberOfTravelers(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0369a1]"
                />
              </div>

              {/* Preferred Categories */}
              <div>
                <label className="mb-3 block">Preferred Categories</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`px-3 py-2 rounded-lg text-sm transition-all ${
                        selectedCategories.includes(category)
                          ? 'bg-[#059669] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weather Preference */}
              <div>
                <label className="flex items-center gap-2 mb-3">
                  <CloudSun className="text-[#059669]" size={20} />
                  Preferred Weather
                </label>
                <div className="space-y-2">
                  {['cool', 'warm'].map((pref) => (
                    <button
                      key={pref}
                      onClick={() => setWeatherPref(pref as any)}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all ${
                        weatherPref === pref
                          ? 'border-[#0369a1] bg-[#0369a1] text-white'
                          : 'border-gray-200 hover:border-[#0369a1]'
                      }`}
                    >
                      {pref.charAt(0).toUpperCase() + pref.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Crowd Preference */}
              <div>
                <label className="flex items-center gap-2 mb-3">
                  <UserCircle className="text-[#059669]" size={20} />
                  Preferred Crowd Level
                </label>
                <div className="space-y-2">
                  {['low', 'medium', 'high'].map((pref) => (
                    <button
                      key={pref}
                      onClick={() => setCrowdPref(pref as any)}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all ${
                        crowdPref === pref
                          ? 'border-[#0369a1] bg-[#0369a1] text-white'
                          : 'border-gray-200 hover:border-[#0369a1]'
                      }`}
                    >
                      {pref.charAt(0).toUpperCase() + pref.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Smart Plan */}
              <div>
                <button
                  onClick={handleGenerateSmartPlan}
                  className={`w-full px-4 py-3 rounded-lg transition-all ${
                    isGenerating ? 'bg-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-[#0369a1] to-[#059669] hover:shadow-lg'
                  }`}
                >
                  {isGenerating ? <Loader2 className="animate-spin" size={20} /> : 'Generate Smart Plan'}
                </button>
              </div>
            </div>
          </div>

          {/* Center Panel - Map */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl mb-6">Route Map</h3>
            
            <div className="bg-gradient-to-br from-[#0ea5e9] to-[#10b981] rounded-lg h-[500px] flex items-center justify-center relative overflow-hidden">
              {/* Decorative Map Background */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-white rounded-full animate-pulse" />
                <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-white rounded-full animate-pulse delay-100" />
                <div className="absolute top-3/4 left-1/3 w-3 h-3 bg-white rounded-full animate-pulse delay-200" />
              </div>

              <div className="text-center z-10">
                <MapPin className="text-white mx-auto mb-4" size={48} />
                <p className="text-white text-lg mb-2">Interactive Map View</p>
                <p className="text-white/80 text-sm px-4">
                  {selectedDestinations.length > 0
                    ? `${selectedDestinations.length} destinations on your route`
                    : 'Add destinations to see your travel route'}
                </p>
              </div>
            </div>

            {selectedDestinations.length > 0 && (
              <div className="mt-6 space-y-2">
                <p className="text-sm text-gray-600 mb-3">Selected Destinations:</p>
                {selectedDestinations.map((dest, index) => (
                  <div key={dest.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="bg-gradient-to-br from-[#0369a1] to-[#059669] w-8 h-8 rounded-full flex items-center justify-center text-white">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{dest.name}</p>
                      <p className="text-sm text-gray-600">{dest.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Panel - Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl mb-6">Trip Summary</h3>

            <div className="space-y-4 mb-6">
              <div className="bg-gradient-to-r from-[#fef3c7] to-[#fef9e7] p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Total Days</p>
                <p className="text-3xl">{travelDays}</p>
              </div>

              <div className="bg-gradient-to-r from-[#fef3c7] to-[#fef9e7] p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Destinations</p>
                <p className="text-3xl">{selectedDestinations.length}</p>
              </div>

              <div className="bg-gradient-to-r from-[#fef3c7] to-[#fef9e7] p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Travel Style</p>
                <p className="text-xl">{travelStyle}</p>
              </div>

              <div className="bg-gradient-to-r from-[#0369a1] to-[#059669] text-white p-4 rounded-lg">
                <p className="text-sm text-white/90 mb-1">Estimated Cost</p>
                <p className="text-3xl">${estimatedCost().toLocaleString()}</p>
                <p className="text-xs text-white/80 mt-1">For {numberOfTravelers} traveler(s)</p>
              </div>
            </div>

            <div className="space-y-3">
              {selectedDestinations.length === 0 && (
                <Link
                  to="/explore"
                  className="block w-full bg-gray-100 text-gray-700 text-center py-3 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Add Destinations
                </Link>
              )}
              
              <Link
                to="/itinerary"
                className={`block w-full text-white text-center py-3 rounded-lg transition-all ${
                  selectedDestinations.length > 0
                    ? 'bg-gradient-to-r from-[#0369a1] to-[#059669] hover:shadow-lg'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Generate Itinerary
              </Link>

              <Link
                to="/budget"
                className="block w-full bg-white border-2 border-[#0369a1] text-[#0369a1] text-center py-3 rounded-lg hover:bg-[#0369a1] hover:text-white transition-all"
              >
                View Budget Details
              </Link>
            </div>
          </div>
        </div>

        {/* AI Recommendations Section */}
        {recommendations.length > 0 && (
          <div className="mt-8">
            <div className="bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] text-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles size={28} />
                <h3 className="text-2xl">AI-Powered Recommendations</h3>
              </div>
              <p className="text-white/90">
                Based on your preferences, we've found {recommendations.length} perfect destinations for you
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendations.map((dest) => (
                <div key={dest.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-40">
                    <img 
                      src={dest.image} 
                      alt={dest.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] text-white px-3 py-1 rounded-full text-sm">
                      {getMatchScore(dest)}% Match
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg mb-2">{dest.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{dest.location}</p>
                    <p className="text-xs text-gray-500 mb-3 italic">{getRecommendationReason(dest)}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600">${dest.costPerDay}/day</span>
                      <span className="text-sm text-gray-600">{dest.temperature}°C</span>
                    </div>
                    <button
                      onClick={() => {
                        addDestination(dest);
                        toast.success(`${dest.name} added to your trip!`);
                      }}
                      className="w-full bg-gradient-to-r from-[#0369a1] to-[#059669] text-white py-2 rounded-lg hover:shadow-lg transition-shadow"
                    >
                      Add to Trip
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}