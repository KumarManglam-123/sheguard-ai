from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.crime_zones import router as crime_router
from routes.sos import router as sos_router

app = FastAPI(
    title="SheGuard AI Backend",
    docs_url="/docs",        # Swagger URL
    redoc_url="/redoc"       # Optional
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(crime_router)
app.include_router(sos_router)


@app.get("/")
def home():
    return {"status": "Backend running"}
