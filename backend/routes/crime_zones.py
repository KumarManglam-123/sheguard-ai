from fastapi import APIRouter
from utils.db import crime_zones_collection

router = APIRouter()

@router.get("/zones")
def get_crime_zones():

    data = list(crime_zones_collection.find({}, {"_id": 0}))

    return data
