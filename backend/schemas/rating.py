from pydantic import BaseModel, Field
from datetime import datetime



class AddRatingInput(BaseModel):
    product_id : int
    score: int = Field(ge=1, le=5)

class RatingResponse(BaseModel):
    product_id: int
    score: int
    created_at: datetime
    updated_at: datetime | None

    class Config:
        from_attributes = True




    