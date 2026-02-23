from pydantic import BaseModel, Field
from datetime import datetime



class AddRatingInput(BaseModel):
    product_id : int
    score: int = Field(ge=1, le=5, default=None)
    comment :str | None = None

class RatingResponse(BaseModel):
    product_id: int
    score: int
    comment : str | None
    created_at: datetime
    updated_at: datetime | None

    class Config:
        from_attributes = True




    