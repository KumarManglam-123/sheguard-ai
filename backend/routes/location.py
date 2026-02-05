from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime
from config import location_collection

router = APIRouter()

class LocationRequest(BaseModel):
    latitude: float
    longitude: float


@router.post("/location/update")
async def update_location(data: LocationRequest):

    location_collection.insert_one({
        "latitude": data.latitude,
        "longitude": data.longitude,
        "timestamp": datetime.utcnow()
    })

    return {"status": "Location saved"}
