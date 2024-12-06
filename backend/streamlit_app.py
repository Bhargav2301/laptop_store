import streamlit as st
import psycopg2
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Get the ngrok URL from user input or environment
NGROK_URL = st.sidebar.text_input(
    "Enter ngrok URL (e.g., 0.tcp.ngrok.io:12345)",
    value=os.getenv("NGROK_URL", "")
)

# Database connection
def get_db_connection():
    try:
        if NGROK_URL:
            host, port = NGROK_URL.split(':')
            conn = psycopg2.connect(
                host=host,
                port=port,
                database=os.getenv("POSTGRES_DB", "laptop_db"),
                user=os.getenv("POSTGRES_USER", "postgres"),
                password=os.getenv("POSTGRES_PASSWORD", "Sato@010801")
            )
        else:
            conn = psycopg2.connect(
                host=os.getenv("POSTGRES_HOST", "localhost"),
                database=os.getenv("POSTGRES_DB", "laptop_db"),
                user=os.getenv("POSTGRES_USER", "postgres"),
                password=os.getenv("POSTGRES_PASSWORD", "Sato@010801")
            )
        return conn
    except Exception as e:
        st.error(f"Database connection failed: {str(e)}")
        return None

# Streamlit interface
st.title("Laptop Store Database")

# Add search functionality
search_term = st.text_input("Search laptops by brand or model:")
price_range = st.slider("Price Range ($)", 0, 5000, (0, 5000))

# Display laptops with search
def show_laptops():
    conn = get_db_connection()
    if conn:
        try:
            cur = conn.cursor()
            query = """
                SELECT l.model_name, b.brand_name, l.price, p.processor_specifications
                FROM laptop l
                JOIN brand b ON l.brand_id = b.brand_id
                JOIN processor p ON l.processor_id = p.processor_id
                WHERE (LOWER(b.brand_name) LIKE LOWER(%s) OR LOWER(l.model_name) LIKE LOWER(%s))
                AND l.price BETWEEN %s AND %s
                LIMIT 10
            """
            search_pattern = f"%{search_term}%" if search_term else "%%"
            cur.execute(query, (search_pattern, search_pattern, price_range[0], price_range[1]))
            laptops = cur.fetchall()
            
            if not laptops:
                st.info("No laptops found matching your criteria.")
            
            for laptop in laptops:
                st.write(f"""
                **{laptop[1]} {laptop[0]}**
                - Price: ${laptop[2]:,.2f}
                - Processor: {laptop[3]}
                """)
            
            cur.close()
            conn.close()
        except Exception as e:
            st.error(f"Error querying database: {str(e)}")

show_laptops()

# Add statistics section
st.sidebar.title("Statistics")
if st.sidebar.button("Show Database Stats"):
    conn = get_db_connection()
    if conn:
        cur = conn.cursor()
        cur.execute("""
            SELECT 
                COUNT(*) as total_laptops,
                AVG(price)::numeric(10,2) as avg_price,
                MIN(price) as min_price,
                MAX(price) as max_price
            FROM laptop
        """)
        stats = cur.fetchone()
        st.sidebar.write(f"""
        ### Database Statistics
        - Total Laptops: {stats[0]}
        - Average Price: ${stats[1]:,.2f}
        - Price Range: ${stats[2]:,.2f} - ${stats[3]:,.2f}
        """)
        cur.close()
        conn.close() 