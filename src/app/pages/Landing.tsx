import { Link } from 'react-router';
import { useEffect } from 'react';
import { useTripStore } from '../store/tripStore';
import { ArrowRight, Map, Cloud, DollarSign, Calendar, Mountain, Palmtree } from 'lucide-react';
import { motion } from 'motion/react';

const heroImage = 'https://images.unsplash.com/photo-1745182274038-d3fef1c4af83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcmklMjBsYW5rYSUyMHRyb3BpY2FsJTIwc2NlbmVyeXxlbnwxfHx8fDE3NzMwNDM4Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080';

const popularDestinations = [
  {
    name: 'Sigiriya',
    image: 'https://images.unsplash.com/photo-1704797390901-e1d20bd46647?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcmklMjBsYW5rYSUyMHNpZ2lyaXlhJTIwcm9ja3xlbnwxfHx8fDE3NzMwNDM4MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Ella',
    image: 'https://images.unsplash.com/photo-1704797389166-c7dac99fc633?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGxhJTIwc3JpJTIwbGFua2ElMjB0cmFpbnxlbnwxfHx8fDE3NzMwNDM4MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Galle',
    image: 'https://images.unsplash.com/photo-1704797390682-76479a29dc9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYWxsZSUyMGZvcnQlMjBzcmklMjBsYW5rYXxlbnwxfHx8fDE3NzMwNDM4MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Kandy',
    image: 'https://images.unsplash.com/photo-1707324021005-a3d0c48cfcbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYW5keSUyMHRlbXBsZSUyMHRvb3RofGVufDF8fHx8MTc3MzA0MzgzNHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Mirissa',
    image: 'https://images.unsplash.com/photo-1594476191313-c2a8d227ce61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXJpc3NhJTIwYmVhY2glMjBzcmklMjBsYW5rYXxlbnwxfHx8fDE3NzMwNDM4MzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

const features = [
  {
    icon: Calendar,
    title: 'Smart Itinerary Generator',
    description: 'Create personalized day-by-day travel plans based on your preferences.',
    color: 'from-[#0369a1] to-[#0ea5e9]',
  },
  {
    icon: Cloud,
    title: 'Live Weather Updates',
    description: 'Real-time weather information for all your selected destinations.',
    color: 'from-[#059669] to-[#10b981]',
  },
  {
    icon: DollarSign,
    title: 'Budget Estimation',
    description: 'Detailed cost breakdown for transport, accommodation, and activities.',
    color: 'from-[#fbbf24] to-[#f59e0b]',
  },
];

export function Landing() {
  const { resetStore } = useTripStore();
  useEffect(() => {
    resetStore();
  }, [resetStore]);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Sri Lanka"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl mb-6"
          >
            Plan Your Dream Trip Across Sri Lanka
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto"
          >
            Discover beaches, mountains, wildlife, and heritage sites
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/planner"
              className="bg-gradient-to-r from-[#0369a1] to-[#059669] text-white px-8 py-4 rounded-lg flex items-center justify-center gap-2 hover:shadow-2xl hover:scale-105 transition-all"
            >
              Start Planning
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/explore"
              className="bg-white/20 backdrop-blur-md text-white border-2 border-white/50 px-8 py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-white/30 transition-all"
            >
              <Map size={20} />
              Explore Destinations
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-white rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 bg-gradient-to-b from-white to-[#fef9e7]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl mb-4">Popular Destinations</h2>
            <p className="text-gray-600 text-lg">
              Explore the most visited places in Sri Lanka
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {popularDestinations.map((dest, index) => (
              <motion.div
                key={dest.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative h-64 rounded-xl overflow-hidden cursor-pointer"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h3 className="text-white text-xl">{dest.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl mb-4">Plan Smarter, Travel Better</h2>
            <p className="text-gray-600 text-lg">
              Everything you need to organize the perfect Sri Lanka adventure
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow"
              >
                <div className={`bg-gradient-to-br ${feature.color} w-16 h-16 rounded-lg flex items-center justify-center mb-6`}>
                  <feature.icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#0369a1] to-[#059669] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl mb-6">Ready to Start Your Adventure?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Create a custom itinerary, estimate your budget, and discover hidden gems across Sri Lanka
          </p>
          <Link
            to="/planner"
            className="inline-flex items-center gap-2 bg-white text-[#0369a1] px-8 py-4 rounded-lg hover:shadow-2xl hover:scale-105 transition-all"
          >
            <Mountain size={20} />
            Start Planning Now
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
