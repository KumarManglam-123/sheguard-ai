from fastapi import APIRouter
from utils.db import crime_collection

router = APIRouter(prefix="/crime")

@router.get("/zones")
def get_crime_zones():

    data = []

    for c in crime_collection.find({}, {"_id": 0}):
        data.append(c)

    return data
