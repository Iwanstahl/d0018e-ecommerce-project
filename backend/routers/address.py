from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from database import get_db
from models import  User,  Address
from schemas.address import AddressInput
from datetime import datetime, timedelta, UTC
from oauth2 import get_current_user

router = APIRouter(prefix="/addresses", tags=["addresses"])


@router.get("/")
def get_addresses(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    addresses = db.query(Address).filter(
        Address.user_id == current_user.user_id
    ).all()

    return addresses


@router.post("/add-address")
def add_address(
    address_info: AddressInput,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    new_address = Address(
        user_id=current_user.user_id,
        country=address_info.country,
        state=address_info.state,
        city=address_info.city,
        address=address_info.address
    )

    db.add(new_address)
    db.commit()
    db.refresh(new_address)

    return new_address


@router.delete("/delete-address")
def delete_address(
    address_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    address = db.query(Address).filter(
        Address.address_id == address_id,
        Address.user_id == current_user.user_id   
    ).first()

    if not address:
        raise HTTPException(
            status_code=404,
            detail="Address not found"
        )

    db.delete(address)
    db.commit()

    return {"success": True}



