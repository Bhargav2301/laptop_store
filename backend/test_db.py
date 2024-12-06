from app.database import engine
from sqlalchemy import text

def format_price(price):
    if price >= 1000:
        return f"${price/1000:,.1f}K"
    return f"${price:,.2f}"

def test_connection():
    try:
        with engine.connect() as connection:
            # Test basic connection
            result = connection.execute(text("SELECT COUNT(*) FROM laptop"))
            count = result.scalar()
            print(f"Successfully connected to database. Found {count:,} laptops.")
            
            try:
                # Test stored procedure
                result = connection.execute(text("SELECT * FROM get_popular_laptops(5)"))
                laptops = result.fetchall()
                print("\nPopular Laptops:")
                print("=" * 80)
                
                for laptop in laptops:
                    print(f"\n📎 {laptop.brand_name} {laptop.model_name}")
                    print(f"💰 Price: {format_price(laptop.price)}")
                    if hasattr(laptop, 'specs_summary'):
                        print(f"🔧 Specs: {laptop.specs_summary}")
                    if hasattr(laptop, 'review_count') and hasattr(laptop, 'avg_rating'):
                        stars = "★" * round(laptop.avg_rating) + "☆" * (5 - round(laptop.avg_rating))
                        print(f"📊 Reviews: {laptop.review_count} ({stars} {laptop.avg_rating:.1f}/5)")
                    print("-" * 80)
                    
            except Exception as e:
                print(f"\nError testing stored procedure: {str(e)}")
                print("Make sure you've run the functions.sql script to create the necessary functions.")
                
                if 'laptops' in locals() and laptops:
                    print("\nAvailable columns:")
                    for column in laptops[0]._mapping.keys():
                        print(f"- {column}")
            
    except Exception as e:
        print(f"Error connecting to database: {str(e)}")

if __name__ == "__main__":
    test_connection()