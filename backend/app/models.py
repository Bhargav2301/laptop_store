from sqlalchemy import Column, Integer, String, Numeric, ForeignKey, Text
from sqlalchemy.orm import relationship
from .database import Base

class Brand(Base):
    __tablename__ = "brand"
    
    brand_id = Column(Integer, primary_key=True, index=True)
    brand_name = Column(String, unique=True, nullable=False)
    laptops = relationship("Laptop", back_populates="brand")

class Laptop(Base):
    __tablename__ = "laptop"
    
    laptop_id = Column(Integer, primary_key=True, index=True)
    brand_id = Column(Integer, ForeignKey("brand.brand_id"))
    processor_id = Column(Integer, ForeignKey("processor.processor_id"))
    ram_id = Column(Integer, ForeignKey("ram.ram_id"))
    gpu_id = Column(Integer, ForeignKey("gpu.gpu_id"))
    storage_id = Column(Integer, ForeignKey("storage.storage_id"))
    display_id = Column(Integer, ForeignKey("display.display_id"))
    os_id = Column(Integer, ForeignKey("operating_system.os_id"))
    model_name = Column(String, nullable=False)
    price = Column(Numeric(10, 2), nullable=False)
    battery_life_hours = Column(Numeric(4, 1))
    adapter_watt = Column(Integer)
    
    brand = relationship("Brand", back_populates="laptops")
    reviews = relationship("CustomerReview", back_populates="laptop")

class CustomerReview(Base):
    __tablename__ = "customer_review"
    
    review_id = Column(Integer, primary_key=True, index=True)
    laptop_id = Column(Integer, ForeignKey("laptop.laptop_id"))
    review_text = Column(Text, nullable=False)
    
    laptop = relationship("Laptop", back_populates="reviews") 