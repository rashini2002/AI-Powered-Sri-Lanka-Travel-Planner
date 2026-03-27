import { useEffect, useState } from "react";

export default function useTripData() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("tripPlaces")) || [];
    setPlaces(data);
  }, []);

  return places;
}