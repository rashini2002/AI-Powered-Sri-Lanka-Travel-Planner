import { useState } from 'react';
import { useTripStore } from '../store/tripStore';
import { DollarSign, Car, Hotel, Utensils, MapPin } from 'lucide-react';
import { useMemo } from "react";

export function Budget() {
  const { travelDays, numberOfTravelers, travelStyle, selectedDestinations } = useTripStore();
  
  const [transportType, setTransportType] = useState('Car Rental');
  const [accommodationType, setAccommodationType] = useState('Hotel');
  const [foodBudget, setFoodBudget] = useState('Standard');

  const baseDestinationCost = selectedDestinations.reduce(
  (sum, d) => sum + ( 50),
  0
); 


  const calculateCosts = () => {
    // Base rates per day per person
    const transportRates: Record<string, number> = {
      'Car Rental': 40,
      'Public Transport': 10,
      'Private Driver': 80,
    };

    const accommodationRates: Record<string, number> = {
      'Hostel': 45,
      'Hotel': 120,
      'Luxury Resort': 280,
    };

    const foodRates: Record<string, number> = {
      'Budget': 15,
      'Standard': 30,
      'Premium': 60,
    };

    const activitiesRate =
  travelStyle === "Budget"
    ? 20
    : travelStyle === "Standard"
    ? 40
    : 80;

    const transport =transportRates[transportType as keyof typeof transportRates] *travelDays *Math.max(1, numberOfTravelers / 2);
    const accommodationBase = accommodationRates[accommodationType] * travelDays;
    const accommodation = accommodationBase + baseDestinationCost;
    const meals = foodRates[foodBudget] * travelDays * numberOfTravelers;
    const activities =
  selectedDestinations.length * activitiesRate;



    return {
      transport,
      accommodation,
      meals,
      activities,
      total: transport + accommodation + meals + activities,
    };
  };

  const costs = useMemo(
  () => calculateCosts(),
  [
    selectedDestinations,
    travelDays,
    numberOfTravelers,
    travelStyle,
    transportType,
    accommodationType,
    foodBudget,
  ]
);

  const costBreakdown = [
    {
      icon: Car,
      label: 'Transport',
      amount: costs.transport,
      color: 'from-[#0369a1] to-[#0ea5e9]',
      percentage: costs.total ? (costs.transport / costs.total) * 100 : 0
    },
    {
      icon: Hotel,
      label: 'Accommodation',
      amount: costs.accommodation,
      color: 'from-[#059669] to-[#10b981]',
      percentage: costs.total ? (costs.accommodation / costs.total) * 100 : 0
    },
    {
      icon: Utensils,
      label: 'Meals',
      amount: costs.meals,
      color: 'from-[#fbbf24] to-[#f59e0b]',
      percentage: costs.total ? (costs.meals / costs.total) * 100 : 0,
    },
    {
      icon: MapPin,
      label: 'Activities',
      amount: costs.activities,
      color: 'from-[#8b5cf6] to-[#a78bfa]',
      percentage: costs.total ? (costs.activities / costs.total) * 100 : 0,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#fef9e7] py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl mb-4">Budget Estimator</h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-gray-600 text-lg">
              Get a detailed cost breakdown for your {travelDays}-day trip
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Budget Inputs */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl mb-6">Budget Options</h3>

            <div className="space-y-6">
              {/* Transport Type */}
              <div>
                <label className="flex items-center gap-2 mb-3">
                  <Car className="text-[#0369a1]" size={20} />
                  Transport Type
                </label>
                <div className="space-y-2">
                  {['Car Rental', 'Public Transport', 'Private Driver'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setTransportType(type)}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all text-left ${
                        transportType === type
                          ? 'border-[#0369a1] bg-[#0369a1] text-white'
                          : 'border-gray-200 hover:border-[#0369a1]'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Accommodation Type */}
              <div>
                <label className="flex items-center gap-2 mb-3">
                  <Hotel className="text-[#059669]" size={20} />
                  Accommodation Type
                </label>
                <div className="space-y-2">
                  {['Hostel', 'Hotel', 'Luxury Resort'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setAccommodationType(type)}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all text-left ${
                        accommodationType === type
                          ? 'border-[#059669] bg-[#059669] text-white'
                          : 'border-gray-200 hover:border-[#059669]'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Food Budget */}
              <div>
                <label className="flex items-center gap-2 mb-3">
                  <Utensils className="text-[#fbbf24]" size={20} />
                  Food Budget Level
                </label>
                <div className="space-y-2">
                  {['Budget', 'Standard', 'Premium'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setFoodBudget(level)}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all text-left ${
                        foodBudget === level
                          ? 'border-[#fbbf24] bg-[#fbbf24] text-white'
                          : 'border-gray-200 hover:border-[#fbbf24]'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Middle & Right - Cost Breakdown */}
          <div className="lg:col-span-2 space-y-6">
            {/* Total Cost Card */}
            <div className="bg-gradient-to-r from-[#0369a1] to-[#059669] text-white rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/90 mb-2">Total Estimated Cost</p>
                  <h2 className="text-5xl">${costs.total.toLocaleString()}</h2>
                  <p className="text-white/80 mt-2">
                    ${(costs.total / numberOfTravelers).toFixed(0)} per person • {travelDays} days
                  </p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl">
                  <DollarSign size={48} />
                </div>
              </div>
            </div>

            {/* Cost Breakdown Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {costBreakdown.map((item) => (
                <div key={item.label} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">{item.label}</p>
                      <p className="text-3xl">${item.amount.toLocaleString()}</p>
                    </div>
                    <div className={`bg-gradient-to-br ${item.color} p-3 rounded-lg`}>
                      <item.icon className="text-white" size={24} />
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${item.color} transition-all duration-500`}
                      style={{ width: `${Math.min(item.percentage, 100)}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {item.percentage.toFixed(1)}% of total budget
                  </p>
                </div>
              ))}
            </div>

            {/* Trip Details Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl mb-4">Trip Details</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-sm mb-1">Duration</p>
                  <p className="text-2xl">{travelDays}</p>
                  <p className="text-xs text-gray-500">days</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-sm mb-1">Travelers</p>
                  <p className="text-2xl">{numberOfTravelers}</p>
                  <p className="text-xs text-gray-500">people</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-sm mb-1">Destinations</p>
                  <p className="text-2xl">{selectedDestinations.length}</p>
                  <p className="text-xs text-gray-500">places</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-sm mb-1">Style</p>
                  <p className="text-xl">{travelStyle}</p>
                  <p className="text-xs text-gray-500">level</p>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-r from-[#fef3c7] to-[#fef9e7] rounded-xl shadow-lg p-6">
              <h3 className="text-xl mb-4">Budget Tips</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#059669] mt-1">•</span>
                  <span>Book accommodations in advance for better rates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#059669] mt-1">•</span>
                  <span>Try local restaurants for authentic and affordable meals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#059669] mt-1">•</span>
                  <span>Consider group tours for popular attractions to save money</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#059669] mt-1">•</span>
                  <span>Public transport is economical for short distances</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}