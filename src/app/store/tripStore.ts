import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Destination } from '../data/destinations';

interface TripStore {
  selectedDestinations: Destination[];
  travelDays: number;
  travelStyle: 'Budget' | 'Standard' | 'Luxury';
  numberOfTravelers: number;
  addDestination: (destination: Destination) => void;
  removeDestination: (id: string) => void;
  setSelectedDestinations: (destinations: Destination[]) => void;
  setTravelDays: (days: number) => void;
  setTravelStyle: (style: 'Budget' | 'Standard' | 'Luxury') => void;
  setNumberOfTravelers: (count: number) => void;
  resetStore: () => void;
  
}

export const useTripStore = create<TripStore>()(
  persist(
    (set) => ({
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
      setSelectedDestinations: (destinations) => set({ selectedDestinations: destinations }),
      setTravelDays: (days) => set({ travelDays: days }),
      setTravelStyle: (style) => set({ travelStyle: style }),
      setNumberOfTravelers: (count) => set({ numberOfTravelers: count }),
      resetStore: () => {
        set({
          selectedDestinations: [],
          travelDays: 7,
          travelStyle: 'Standard',
          numberOfTravelers: 2,
        });
      },
    }),
    {
      name: 'tripSelectedDestinations',
      partialize: (state) => ({ selectedDestinations: state.selectedDestinations }),
    }
  )
);
