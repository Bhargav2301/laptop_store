# Laptop Store

A full-stack web application for browsing and comparing laptops.

## Project Structure
```bash
laptop_store/
├── backend/         # FastAPI backend
└── frontend/        # React frontend
```

## Features
- Browse laptops with detailed specifications
- Search and filter laptops
- Like/Dislike system
- Featured laptops section
- Animated welcome screen

## Tech Stack
- Frontend: React, TypeScript, Material-UI
- Backend: FastAPI, PostgreSQL
- Database: PostgreSQL

## Getting Started

### Prerequisites
- Node.js (v14+)
- Python (v3.8+)
- PostgreSQL (v12+)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/laptop_store.git
cd laptop_store
```

2. Backend Setup:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. Frontend Setup:
```bash
cd frontend
npm install
```

4. Database Setup:
```bash
cd backend
# On Windows
setup_db.bat
# On Unix
./setup_db.sh
```

5. Start Development Servers:

Backend:
```bash
cd backend
uvicorn main:app --reload
```

Frontend:
```bash
cd frontend
npm start
```

Visit http://localhost:3000 to view the application.
```

5. Commit the README:
```bash
git add README.md
git commit -m "Add project README"
git push origin main
```

## Step 3: Branch Strategy

1. Create development branch:
```bash
git checkout -b development
git push -u origin development
```

2. Create feature branches as needed:
```bash
git checkout -b feature/like-dislike-system
git checkout -b feature/welcome-animation
```