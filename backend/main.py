
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import products,auth, cart

app = FastAPI()


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


