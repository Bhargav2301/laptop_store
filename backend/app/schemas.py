from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from decimal import Decimal

class LaptopBase(BaseModel):
    model_name: str
    price: Decimal
    battery_life_hours: Optional[float] = None
    adapter_watt: Optional[int] = None
    
    model_config = ConfigDict(
        protected_namespaces=(),
        from_attributes=True
    )

class LaptopCreate(LaptopBase):
    brand_id: int
    processor_id: int
    ram_id: int
    gpu_id: int
    storage_id: int
    display_id: int
    os_id: int

class LaptopResponse(LaptopBase):
    laptop_id: int
    brand_name: str
    processor_specs: str
    ram_gb: int
    gpu_name: str
    
    model_config = ConfigDict(from_attributes=True)

class ReviewBase(BaseModel):
    review_text: str

class ReviewCreate(ReviewBase):
    laptop_id: int

class ReviewResponse(ReviewBase):
    review_id: int
    laptop_id: int
    
    class Config:
        orm_mode = True 