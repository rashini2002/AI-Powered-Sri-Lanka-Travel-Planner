import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { Explore } from './pages/Explore';
import { TripPlanner } from './pages/TripPlanner';
import { Itinerary } from './pages/Itinerary';
import { Budget } from './pages/Budget';
import { Summary } from './pages/Summary';
import { Insights } from './pages/Insights';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Landing },
      { path: 'explore', Component: Explore },
      { path: 'planner', Component: TripPlanner },
      { path: 'itinerary', Component: Itinerary },
      { path: 'budget', Component: Budget },
      { path: 'insights', Component: Insights },
      { path: 'summary', Component: Summary },
    ],
  },
]);