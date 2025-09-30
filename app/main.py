from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models, database
from .routes import tasks

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Task Manager API", version="1.0")

# Explicit origins (local + deployed)
origins = [
    "http://localhost:3000",
    "https://task-manager-54y7.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https://.*\.vercel\.app",  # Allows all Vercel deployments
    #allow_origins=origins,       # only this, no regex
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(tasks.router)

@app.get("/")
def root():
    return {"message": "Welcome to Task Manager API", "docs": "/docs"}
