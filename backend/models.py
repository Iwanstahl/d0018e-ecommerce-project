from sqlalchemy import Column, Integer, String, INTEGER
from database import Base


class Product(Base):
   __tablename__ = "products"

   id = Column(Integer, primary_key=True, index=True)
   name = Column(String(100), index=True)
   price = Column(INTEGER, index=True)