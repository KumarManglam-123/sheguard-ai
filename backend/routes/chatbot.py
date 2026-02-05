from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/chat")

class ChatRequest(BaseModel):
    message: str


@router.post("/ask")
def ask_ai(req: ChatRequest):

    user_msg = req.message.lower()

    # SIMPLE SMART RESPONSE LOGIC
    if "unsafe" in user_msg or "scared" in user_msg:
        reply = "🚨 Stay calm. Move to a safe public area. Share your location with trusted contacts and keep your phone charged."

    elif "night" in user_msg:
        reply = "🌙 Avoid isolated streets, keep SOS ready, share live location and call a trusted person."

    elif "follow" in user_msg:
        reply = "⚠️ Enter a crowded place immediately. Call someone loudly and use SOS if needed."

    elif "help" in user_msg:
        reply = "🆘 Use the SOS button. Stay calm. Reach nearest police station or public place."

    else:
        reply = (
            "🤖 SheGuard Tip:\n"
            "Always keep emergency contacts updated, enable location sharing, "
            "and trust your instincts. Use SOS anytime you feel unsafe."
        )

    return {
        "reply": reply
    }
