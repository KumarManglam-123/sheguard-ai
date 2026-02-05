from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)

db = client["sheguard_db"]

crime_collection = db["crime_zones"]
sos_collection = db["sos_logs"]
contacts_collection = db["users"]
