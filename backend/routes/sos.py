from fastapi import APIRouter
from pydantic import BaseModel
from utils.db import contacts_collection, sos_collection
from datetime import datetime
import os

from utils.telegram_service import send_alert

try:
    from openai import OpenAI
except Exception:
    OpenAI = None

router = APIRouter(prefix="/sos")

# Create OpenAI client only if the package is available and key provided
OPENAI_KEY = os.getenv("OPENAI_API_KEY")
client = None
if OpenAI and OPENAI_KEY:
    try:
        client = OpenAI(api_key=OPENAI_KEY)
    except Exception as _:
        client = None


class LocationData(BaseModel):
    latitude: float
    longitude: float


@router.post("/trigger")
def trigger_sos(location: LocationData):

    contacts = list(contacts_collection.find({}, {"_id": 0}))

    if not contacts:
        return {"status": "no_contacts"}

    maps_link = f"https://www.google.com/maps?q={location.latitude},{location.longitude}"

    message = f"""
🚨 SOS ALERT 🚨

Help needed immediately!

📍 Live Location:
{maps_link}
"""

    # Telegram alert
    try:
        send_alert(message)
    except Exception as e:
        print("Telegram Error:", e)

    # Save to DB
    sos_collection.insert_one({
        "latitude": location.latitude,
        "longitude": location.longitude,
        "map_link": maps_link,
        "contacts_notified": len(contacts),
        "time": datetime.now()
    })

    # AI Safety Tips
    ai_steps = "Stay calm. Move to a public place and call emergency services."

    try:
        ai_help = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Give calm emergency safety instructions"},
                {"role": "user", "content": "User triggered SOS. What should they do now?"}
            ]
        )

        ai_steps = ai_help.choices[0].message.content

    except Exception as e:
        print("OpenAI Error:", e)

    return {
        "status": "sent",
        "location": maps_link,
        "ai_help": ai_steps
    }
