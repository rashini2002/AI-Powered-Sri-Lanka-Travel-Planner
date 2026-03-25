const BASE_URL = "https://sl-travel-backend-upci.onrender.com";

export const createTrip = async (data: any) => {
  const res = await fetch(`${BASE_URL}/plan-trip`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};