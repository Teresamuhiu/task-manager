# Task Manager App 

A full-stack Task Manager built with **FastAPI** (backend) and **Next.js** (frontend).  
Users can add, edit, mark tasks as done, undo, and delete, with a polished UI and API backend.

## Tech Stack
- **Backend**: FastAPI, SQLAlchemy, SQLite/Postgres ready
- **Frontend**: Next.js 15, TailwindCSS
- **DevOps**: Docker, GitHub Actions (tests + build)
- **Testing**: Pytest (backend API tests)

## Features
- Create, read, update, delete tasks
- Mark tasks as Completed / Pending
- Inline editing with Save/Cancel
- Responsive Tailwind UI
- REST API with Swagger docs (`/docs`)

## Running Locally

### Backend
```bash
cd task-manager-api
uvicorn app.main:app --reload
