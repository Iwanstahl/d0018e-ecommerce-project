from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
from pydantic.types import conint



# Detta är en Pydantic-modell som används för att definiera strukturen av en användare i vårt system.
# Detta kommer att användas för att validera data som skickas till och från API:et, samt för att skapa och hantera användare i databasen.