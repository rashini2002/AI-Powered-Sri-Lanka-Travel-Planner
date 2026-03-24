from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# Initialize app
app = FastAPI()

# Enable CORS (VERY IMPORTANT for frontend connection)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later replace with your Vercel URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input model
class TripInput(BaseModel):
    budget: int
    days: int
    travel_type: str  # e.g. "beach", "adventure", "culture"

# Root route
@app.get("/")
def home():
    return {"message": "Sri Lanka Travel Planner API is running "}

# Recommendation endpoint
@app.post("/recommend")
def recommend(data: TripInput):
    budget = data.budget
    days = data.days
    travel_type = data.travel_type.lower()

    # Simple logic (can replace with ML later)
    if budget < 50000:
        destinations = ["Ella", "Kandy"]
    elif travel_type == "beach":
        destinations = ["Mirissa", "Galle", "Bentota"]
    elif travel_type == "adventure":
        destinations = ["Ella", "Sigiriya", "Kitulgala"]
    elif travel_type == "culture":
        destinations = ["Kandy", "Anuradhapura", "Polonnaruwa"]
    else:
        destinations = ["Colombo", "Nuwara Eliya"]

    return {
        "recommended_destinations": destinations,
        "input": {
            "budget": budget,
            "days": days,
            "travel_type": travel_type
        }
    }

# Optional: Budget estimation endpoint (nice feature )
@app.post("/budget")
def estimate_budget(data: TripInput):
    base_cost_per_day = 8000

    if data.travel_type == "luxury":
        base_cost_per_day = 15000
    elif data.travel_type == "budget":
        base_cost_per_day = 5000

    total = base_cost_per_day * data.days

    return {
        "estimated_budget": total,
        "currency": "LKR"
    }