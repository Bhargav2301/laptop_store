#!/bin/bash

# Start Streamlit
streamlit run streamlit_app.py &

# Wait for Streamlit to start
sleep 5

# Start ngrok for PostgreSQL
ngrok tcp 5432 &

# Start ngrok for Streamlit
ngrok http 8501 