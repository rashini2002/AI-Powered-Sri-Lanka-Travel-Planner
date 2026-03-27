import { Star, MapPin, Plus, DollarSign, Thermometer, Users, Calendar, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useTripStore } from '../store/tripStore';


interface DestinationCardProps {
  name: string;
  location: string;
  image: string;
  rating: number;
  description: string;
  onAddToTrip: () => void;
  isAdded?: boolean;
  // New AI-powered props
  costPerDay?: number;
  bestMonths?: string[];
  temperature?: number;
  crowdLevel?: 'Low' | 'Medium' | 'High';
  aiRecommended?: boolean;
}

export function DestinationCard({
  name,
  location,
  image,
  rating,
  description,
  onAddToTrip,
  isAdded = false,
  costPerDay,
  bestMonths,
  temperature,
  crowdLevel,
  aiRecommended
}: DestinationCardProps) {
  const getCrowdColor = (level?: string) => {
    switch (level) {
      case 'Low': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'High': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };



  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group relative"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
          <Star className="text-yellow-500 fill-yellow-500" size={16} />
          <span className="text-sm">{rating}</span>
        </div>
        {aiRecommended && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] text-white px-3 py-1 rounded-full flex items-center gap-1 text-xs">
            <Sparkles size={14} />
            <span>AI Pick</span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-xl mb-1">{name}</h3>
        <div className="flex items-center gap-1 text-gray-600 mb-3">
          <MapPin size={14} />
          <span className="text-sm">{location}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        {/* New AI-powered data section */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {costPerDay && (
            <div className="flex items-center gap-1.5 text-sm">
              <DollarSign size={14} className="text-[#0369a1]" />
              <span className="text-gray-700">${costPerDay}/day</span>
            </div>
          )}
          {temperature !== undefined && (
            <div className="flex items-center gap-1.5 text-sm">
              <Thermometer size={14} className="text-[#f59e0b]" />
              <span className="text-gray-700">{temperature}°C</span>
            </div>
          )}
          {bestMonths && bestMonths.length > 0 && (
            <div className="flex items-center gap-1.5 text-sm col-span-2">
              <Calendar size={14} className="text-[#059669]" />
              <span className="text-gray-700 truncate">Best: {bestMonths.slice(0, 3).join(', ')}</span>
            </div>
          )}
        </div>

        {crowdLevel && (
          <div className="mb-4">
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getCrowdColor(crowdLevel)}`}>
              <Users size={12} />
              {crowdLevel} Crowd
            </span>
          </div>
        )}

        <button
          onClick={onAddToTrip}
          disabled={isAdded}
          className={`w-full py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
            isAdded
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#0369a1] to-[#059669] text-white hover:shadow-lg hover:scale-105'
          }`}
        >
          <Plus size={18} />
          {isAdded ? 'Added to Trip' : 'Add to Trip'}
        </button>
      </div>
    </motion.div>
  );
}