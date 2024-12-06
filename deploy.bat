@echo off
echo Starting Laptop Store Deployment...

:: Check if PostgreSQL is running
sc query postgresql-x64-16 | find "RUNNING"
if errorlevel 1 (
    echo Starting PostgreSQL...
    net start postgresql-x64-16
    timeout /t 5
)

:: Start Streamlit
echo Starting Streamlit...
start /b streamlit run backend/streamlit_app.py

:: Wait for Streamlit to start
timeout /t 5

:: Start ngrok for PostgreSQL
echo Starting ngrok for PostgreSQL...
start /b ngrok tcp 5432

:: Start ngrok for Streamlit
echo Starting ngrok for Streamlit...
start /b ngrok http 8501

echo Deployment started successfully!
echo.
echo Access your application at:
echo - Streamlit UI: http://localhost:8501
echo - ngrok status: http://localhost:4040 