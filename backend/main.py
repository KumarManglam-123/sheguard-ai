from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from dotenv import load_dotenv

from utils.db import sos_collection, contacts_collection
from routes import sos, location, chatbot, crime

load_dotenv()

app = FastAPI(
    title="SheGuard AI Backend",
    description="Women Safety AI System Backend",
    version="1.0.0"
)

# ---------------- CORS CONFIG ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # simple for now
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- Preflight Fix ----------
@app.options("/{rest_of_path:path}")
async def preflight_handler(rest_of_path: str):
    return JSONResponse(content={"message": "OK"})

# ---------------- CONTACT MODEL ----------------
class Contact(BaseModel):
    name: str
    phone: str

# ---------------- CONTACT ROUTES ----------------
@app.post("/contacts/add")
def add_contact(contact: Contact):
    contacts_collection.insert_one({
        "name": contact.name,
        "phone": contact.phone
    })
    return {"message": "Contact added successfully"}


@app.get("/contacts")
def get_contacts():
    contacts = []
    for c in contacts_collection.find({}, {"_id": 0}):
        contacts.append(c)
    return contacts

# ---------------- ROUTERS ----------------
app.include_router(sos.router, tags=["SOS"])
app.include_router(location.router, tags=["Location"])
app.include_router(chatbot.router, tags=["Chatbot"])
app.include_router(crime.router, tags=["Crime Zones"])

# ---------------- ROOT ----------------
@app.get("/")
def root():
    return {"status": "SheGuard AI Backend Running"}

# ---------------- ADMIN LOG ----------------
@app.get("/admin/sos-logs")
def get_sos_logs():
    logs = []
    for log in sos_collection.find({}, {"_id": 0}):
        logs.append(log)
    return logs
