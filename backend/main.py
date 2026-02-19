from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import asyncio

from routers import products, auth, cart, orders
from database import SessionLocal
from utils import delete_expired_carts 


async def cart_cleanup_scheduler():
    while True:
        db = SessionLocal()
        try:
            delete_expired_carts(db)
        finally:
            db.close()

        await asyncio.sleep(4) 



@asynccontextmanager
async def lifespan(app: FastAPI):
    task = asyncio.create_task(cart_cleanup_scheduler())
    yield
    task.cancel()


app = FastAPI(lifespan=lifespan)

app.include_router(orders.router)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



app.include_router(products.router)
app.include_router(auth.router)
app.include_router(cart.router)


@app.get("/")
async def root():
    return {"status": "API is running"}
