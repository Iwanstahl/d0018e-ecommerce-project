
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import product, order, cart, payment


app = FastAPI()




# Detta ser till att alla har åtkomst till våran api.
# Vi kommer att ändra detta senare när vi har en frontend och vill begränsa åtkomsten till vissa domänder
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Kommer ändras 
#app.include_router(product.router)
#app.include_router(order.router)
#app.include_router(cart.router)
#app.include_router(payment.router)


@app.get("/")
async def root():
    return {"status": "API is running"}


