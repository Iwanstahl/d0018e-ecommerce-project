
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import user, auth, product, order, cart, payment


app = FastAPI()


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(product.router)
app.include_router(user.router)
app.include_router(order.router)
app.include_router(cart.router)
app.include_router(payment.router)


@app.get("/")
async def root():
    return {"status": "API is running"}


