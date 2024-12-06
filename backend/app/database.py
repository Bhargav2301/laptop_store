from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os
import urllib.parse
# Load environment variables
load_dotenv()

# Get database credentials from environment variables
POSTGRES_USER = os.getenv("POSTGRES_USER", "postgres")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD", "Sato@010801")
POSTGRES_DB = os.getenv("POSTGRES_DB", "laptop_db")
POSTGRES_HOST = os.getenv("POSTGRES_HOST", "localhost")
POSTGRES_PORT = os.getenv("POSTGRES_PORT", "5432")

# URL-encode the username and password
POSTGRES_USER_ENC = urllib.parse.quote_plus(POSTGRES_USER)
POSTGRES_PASSWORD_ENC = urllib.parse.quote_plus(POSTGRES_PASSWORD)


# Print connection details for debugging
print("Connecting to database with:")
print(f"User: {POSTGRES_USER}")
print(f"Host: {POSTGRES_HOST}")
print(f"Port: {POSTGRES_PORT}")
print(f"Database: {POSTGRES_DB}")

# Construct database URL
SQLALCHEMY_DATABASE_URL = (
    f"postgresql://{POSTGRES_USER_ENC}:{POSTGRES_PASSWORD_ENC}@"
    f"{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"
)
# Create engine
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close() 