# backend/main.py

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import Base, engine, SessionLocal  # relative import
from . import models, schemas, utils, auth         # relative imports for other modules

# Create all database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS settings
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency for DB session
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
@app.post("/signup")
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already exists")

    hashed = utils.hash_password(user.password)
    new_user = models.User(email=user.email, password=hashed)
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
