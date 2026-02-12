from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base


#Ändra URL_DATABASE med dina egna databasuppgifter
#kommer använas env
URL_DATABASE = "mysql+mysqlconnector://root:password@localhost:3306/ecommerce"



engine = create_engine(URL_DATABASE)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

