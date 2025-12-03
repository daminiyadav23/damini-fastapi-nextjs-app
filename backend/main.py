# backend/main.py

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import Base, engine, SessionLocal  # your DB setup
from . import models, schemas, utils, auth         # your modules

# Create all database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Enable CORS for frontend
origins = ["http://localhost:3000"]  # only allow your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
# Root route
@app.get("/")
def root():
    return {"message": "Backend running successfully!"}

# Signup route
@app.post("/signup", response_model=schemas.Message)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if user exists
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already exists")

    # Hash password and save user
    hashed_password = utils.hash_password(user.password)
    new_user = models.User(email=user.email, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "Signup successful!"}

# Login route
@app.post("/login", response_model=schemas.Token)
def login(data: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == data.email).first()
    if not user or not utils.verify_password(data.password, user.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    token = auth.create_access_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}
