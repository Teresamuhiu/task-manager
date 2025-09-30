from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # import CORS
from . import models, database
from .routes import tasks

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Task Manager API", version="1.0")

# Allow frontend (Next.js on port 3000) to call backend (FastAPI on port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# added /tasks router
app.include_router(tasks.router)

@app.get("/")
def root():
    return {"message": "Welcome to Task Manager API", "docs": "/docs"}
