from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP
from database import Base


#Här kommer vi att skapa våra databasmodeller, alltså hur vår databas kommer att se ut.
#  Vi har modeller för User, Product, Order, Cart och Payment.
#  Varje modell representerar en tabell i databasen och varje attribut i modellen representerar en kolumn i tabellen.
#  Vi använder SQLAlchemy för att definiera våra modeller och deras relationer.
#  Detta kommer hjälpa med att skapa och hantera databasen på ett effektivt sätt i endpoints senare.