import { MapPin, Facebook, Instagram, Twitter, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#0369a1] to-[#059669] text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={28} />
              <span className="text-xl">Sri Lanka Travel</span>
            </div>
            <p className="text-white/90 text-sm">
              Plan your perfect adventure across the beautiful island of Sri Lanka with our comprehensive travel planner.
            </p>
          </div>

          <div>
            <h4 className="mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/explore" className="hover:text-[#fef3c7] transition-colors">Destinations</a></li>
              <li><a href="/planner" className="hover:text-[#fef3c7] transition-colors">Trip Planner</a></li>
              <li><a href="/budget" className="hover:text-[#fef3c7] transition-colors">Budget Calculator</a></li>
              <li><a href="/itinerary" className="hover:text-[#fef3c7] transition-colors">Itinerary</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Popular Destinations</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[#fef3c7] transition-colors">Sigiriya</a></li>
              <li><a href="#" className="hover:text-[#fef3c7] transition-colors">Ella</a></li>
              <li><a href="#" className="hover:text-[#fef3c7] transition-colors">Galle</a></li>
              <li><a href="#" className="hover:text-[#fef3c7] transition-colors">Kandy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Connect With Us</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#fef3c7] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-[#fef3c7] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-[#fef3c7] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-[#fef3c7] transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/90">
          <p>&copy; 2026 Sri Lanka Travel Planner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
