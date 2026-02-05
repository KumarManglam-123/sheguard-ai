from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")

client = MongoClient(MONGODB_URI)

db = client["sheguard_ai"]

# Collections
sos_collection = db["sos_alerts"]
location_collection = db["locations"]
chat_collection = db["chat_messages"]
user_collection = db["users"]

print("✅ MongoDB Connected Successfully")
