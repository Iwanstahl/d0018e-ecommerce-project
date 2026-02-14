from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from config import settings



URL_DATABASE = (
    f"mysql+mysqlconnector://"
    f"{settings.database_username}:{settings.database_password}"
    f"@{settings.database_hostname}:{settings.database_port}"
    f"/{settings.database_name}"
)



engine = create_engine(URL_DATABASE)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

