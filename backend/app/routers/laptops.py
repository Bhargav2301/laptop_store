from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas
from ..database import get_db
from sqlalchemy import text

router = APIRouter(
    prefix="/laptops",
    tags=["laptops"]
)

def row_to_dict(row):
    if row is None:
        return None
    if hasattr(row, '_mapping'):
        return dict(row._mapping)
    return dict(row)

@router.get("/", response_model=List[schemas.LaptopResponse])
def get_laptops(
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    try:
        query = text("""
            WITH RankedLaptops AS (
                SELECT DISTINCT ON (b.brand_name)
                    l.laptop_id,
                    l.model_name,
                    b.brand_name,
                    l.price,
                    p.processor_specifications as processor_specs,
                    r.ram_gb,
                    g.gpu_name
                FROM laptop l
                JOIN brand b ON l.brand_id = b.brand_id
                JOIN processor p ON l.processor_id = p.processor_id
                JOIN ram r ON l.ram_id = r.ram_id
                JOIN gpu g ON l.gpu_id = g.gpu_id
                WHERE l.price > 0
                ORDER BY 
                    b.brand_name,
                    r.ram_gb DESC,
                    l.price DESC
            )
            SELECT *
            FROM RankedLaptops
            ORDER BY price DESC
            LIMIT :limit OFFSET :skip
        """)
        result = db.execute(query, {
            "skip": skip,
            "limit": limit
        })
        return [row_to_dict(row) for row in result]
    except Exception as e:
        print(f"Database error: {str(e)}")
        raise HTTPException(status_code=500, detail="Database error")

@router.get("/search")
def search_laptops(
    search_term: str = "",
    min_price: float = 0,
    max_price: float = 999999,
    brand_name: str = None,
    ram_size: int = None,
    db: Session = Depends(get_db)
):
    try:
        query = text("""
            SELECT DISTINCT ON (l.model_name)
                l.laptop_id,
                l.model_name,
                b.brand_name,
                l.price,
                p.processor_specifications as processor_specs,
                r.ram_gb,
                g.gpu_name
            FROM laptop l
            JOIN brand b ON l.brand_id = b.brand_id
            JOIN processor p ON l.processor_id = p.processor_id
            JOIN ram r ON l.ram_id = r.ram_id
            JOIN gpu g ON l.gpu_id = g.gpu_id
            WHERE (
                :search_term = '' OR 
                LOWER(l.model_name) LIKE LOWER('%' || :search_term || '%') OR
                LOWER(b.brand_name) LIKE LOWER('%' || :search_term || '%') OR
                LOWER(p.processor_specifications) LIKE LOWER('%' || :search_term || '%')
            )
            AND l.price >= :min_price
            AND (:max_price = 0 OR l.price <= :max_price)
            AND (
                :brand_name = '' OR 
                LOWER(b.brand_name) = LOWER(:brand_name)
            )
            AND (
                :ram_size IS NULL OR 
                :ram_size = 0 OR 
                r.ram_gb = :ram_size
            )
            ORDER BY l.model_name, l.price ASC
            LIMIT 100
        """)
        
        result = db.execute(query, {
            "search_term": search_term,
            "min_price": min_price,
            "max_price": max_price,
            "brand_name": brand_name or '',
            "ram_size": ram_size or 0
        })
        
        laptops = [row_to_dict(row) for row in result]
        print(f"Found {len(laptops)} laptops matching criteria")
        return laptops
    except Exception as e:
        print(f"Search error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Search error: {str(e)}")

@router.get("/{laptop_id}")
def get_laptop_details(
    laptop_id: int,
    db: Session = Depends(get_db)
):
    try:
        query = text("SELECT * FROM get_laptop_details(:laptop_id)")
        result = db.execute(query, {"laptop_id": laptop_id}).fetchone()
        if not result:
            raise HTTPException(status_code=404, detail="Laptop not found")
        return row_to_dict(result)
    except Exception as e:
        print(f"Error fetching laptop details: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch laptop details")

@router.get("/{laptop_id}/related")
def get_related_laptops(
    laptop_id: int,
    db: Session = Depends(get_db)
):
    try:
        query = text("SELECT * FROM get_related_laptops(:laptop_id)")
        result = db.execute(query, {"laptop_id": laptop_id})
        return [row_to_dict(row) for row in result]
    except Exception as e:
        print(f"Error fetching related laptops: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch related laptops")

@router.post("/{laptop_id}/reaction")
async def add_reaction(
    laptop_id: int,
    is_like: bool,
    db: Session = Depends(get_db)
):
    try:
        query = text("""
            INSERT INTO laptop_reactions (laptop_id, is_like)
            VALUES (:laptop_id, :is_like)
            RETURNING reaction_id
        """)
        result = db.execute(query, {
            "laptop_id": laptop_id,
            "is_like": is_like
        })
        db.commit()
        return {"message": "Reaction recorded successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/featured")
async def get_featured_laptops(db: Session = Depends(get_db)):
    try:
        query = text("""
            SELECT l.*, COUNT(lr.reaction_id) as like_count
            FROM laptop l
            JOIN laptop_reactions lr ON l.laptop_id = lr.laptop_id
            WHERE lr.is_like = true
            GROUP BY l.laptop_id
            HAVING COUNT(lr.reaction_id) >= 2
            ORDER BY like_count DESC
        """)
        result = db.execute(query)
        return [row_to_dict(row) for row in result]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))