````markdown
# Task Manager App 

A full-stack Task Manager built with FastAPI (backend) and Next.js (frontend).  
Users can add, edit, mark tasks as done/undo, and delete tasks — with a polished UI and API backend.

---

## Tech Stack

- Backend: FastAPI, SQLAlchemy, SQLite (Postgres ready)  
- Frontend: Next.js 15, TailwindCSS  
- DevOps: Docker, GitHub Actions (tests + build)  
- Testing: Pytest (backend API tests)  

---

## Features

- Create, read, update, delete tasks  
- Mark tasks as Completed / Pending  
- Inline editing with Save/Cancel  
- Responsive Tailwind UI  
- REST API with Swagger docs (`/docs`)  
- CI/CD with GitHub Actions  

---

## Running Locally

### Backend
cd task-manager-api
pip install -r requirements.txt
uvicorn app.main:app --reload
````

Backend runs at: [http://127.0.0.1:8000](http://127.0.0.1:8000)
Swagger docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: [http://localhost:3000](http://localhost:3000)

---

### With Docker

You can also run both backend + frontend in containers:

```bash
docker-compose up --build
```

---

## API Endpoints

| Method | Endpoint      | Description       |
| ------ | ------------- | ----------------- |
| GET    | `/tasks/`     | Get all tasks     |
| POST   | `/tasks/`     | Create a new task |
| PUT    | `/tasks/{id}` | Update a task     |
| DELETE | `/tasks/{id}` | Delete a task     |

---

## CI/CD

* GitHub Actions runs pytest on every push
* Docker build workflow validates container builds

```
