from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.laptops import router as laptops_router
from app.database import engine, Base

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Laptop Store API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(laptops_router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Welcome to Laptop Store API"} 