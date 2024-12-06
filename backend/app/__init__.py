from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import laptops

# Create FastAPI app instance
app = FastAPI(
    title="Laptop Store API",
    description="API for managing laptop store data",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(laptops.router, prefix="/api")

# Health check endpoint
@app.get("/")
async def root():
    return {
        "status": "ok",
        "message": "Laptop Store API is running"
    }

# Make these available when importing the package
__all__ = ['app']
