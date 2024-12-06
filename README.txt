# Laptop Store Project

A full-stack web application for browsing and searching laptops with detailed specifications and reviews.

## Project Overview

The Laptop Store is a web application built with:
- Frontend: React + TypeScript + Material-UI
- Backend: FastAPI + SQLAlchemy
- Database: PostgreSQL

The application allows users to:
- Browse laptops with detailed specifications
- Search laptops using various filters (price, brand, RAM, etc.)
- View detailed laptop information
- Read and write reviews
- View related laptop recommendations

## Project Structure

laptop_store/
├── backend/
│   ├── app/
│   │   ├── routers/      # API route handlers
│   │   ├── models.py     # Database models
│   │   ├── schemas.py    # Pydantic schemas
│   │   └── database.py   # Database configuration
│   ├── sql/             # SQL scripts
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── types/       # TypeScript interfaces
│   │   └── utils/       # Utility functions
│   └── package.json
└── .env                 # Environment variables

## Setup Instructions

1. Database Setup:
   # Create PostgreSQL database
   createdb laptop_db
   
   # Run SQL scripts from backend/sql/ directory
   psql -d laptop_db -f backend/sql/create.sql
   psql -d laptop_db -f backend/sql/constraints.sql

2. Backend Setup:
   cd backend
   
   # Create virtual environment
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   
   # Install dependencies
   pip install -r requirements.txt
   
   # Start the backend server
   uvicorn main:app --reload
   
   The backend will run on http://localhost:8000

3. Frontend Setup:
   cd frontend
   
   # Install dependencies
   npm install
   
   # Start the development server
   npm start
   
   The frontend will run on http://localhost:3000

## Environment Variables

Create .env files in both backend and frontend directories:

Backend (.env):
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DB=laptop_db
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

Frontend (.env):
REACT_APP_API_URL=http://localhost:8000/api

## API Endpoints

- GET /api/laptops/ - List all laptops
- GET /api/laptops/search - Search laptops with filters
- GET /api/laptops/popular - Get popular laptops
- GET /api/laptops/{id} - Get laptop details
- GET /api/laptops/{id}/related - Get related laptops

## Development Notes

1. The backend uses FastAPI with SQLAlchemy for database operations and includes:
   - Database models for laptops, brands, specifications, and reviews
   - API endpoints for searching and retrieving laptop information
   - PostgreSQL functions for complex queries

2. The frontend is built with React and includes:
   - Material-UI components for consistent styling
   - TypeScript for type safety
   - Responsive design for mobile and desktop
   - Component-based architecture

3. Database includes tables for:
   - Laptops
   - Brands
   - Processors
   - RAM
   - GPU
   - Storage
   - Display
   - Operating Systems
   - Customer Reviews

## Testing

To test the database connection:
cd backend
python test_db.py

## Troubleshooting

1. Database Connection Issues:
   - Verify PostgreSQL is running
   - Check credentials in .env file
   - Ensure database exists

2. Frontend API Connection:
   - Verify backend is running
   - Check REACT_APP_API_URL in frontend .env
   - Check browser console for CORS issues

3. Node Modules Issues:
   - Delete node_modules and package-lock.json
   - Run npm install again

 