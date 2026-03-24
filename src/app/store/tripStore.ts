import { create } from 'zustand';
import { Destination } from '../data/destinations';

interface TripStore {
  selectedDestinations: Destination[];
  travelDays: number;
  travelStyle: 'Budget' | 'Standard' | 'Luxury';
  numberOfTravelers: number;
  addDestination: (destination: Destination) => void;
  removeDestination: (id: string) => void;
  setTravelDays: (days: number) => void;
  setTravelStyle: (style: 'Budget' | 'Standard' | 'Luxury') => void;
  setNumberOfTravelers: (count: number) => void;
}

export const useTripStore = create<TripStore>((set) => ({
  selectedDestinations: [],
  travelDays: 7,
  travelStyle: 'Standard',
  numberOfTravelers: 2,
  addDestination: (destination) =>
    set((state) => ({
      selectedDestinations: [...state.selectedDestinations, destination],
    })),
  removeDestination: (id) =>
    set((state) => ({
      selectedDestinations: state.selectedDestinations.filter((d) => d.id !== id),
    })),
  setTravelDays: (days) => set({ travelDays: days }),
  setTravelStyle: (style) => set({ travelStyle: style }),
  setNumberOfTravelers: (count) => set({ numberOfTravelers: count }),
}));
