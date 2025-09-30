#API endpoints
#connect the CRUD functions to HTTP routes
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, crud, database


router = APIRouter(prefix="/tasks", tags=["tasks"])

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

#GET all tasks
@router.get("/", response_model=list[schemas.Task])
def read_tasks(db: Session = Depends(get_db)):
    return crud.get_tasks(db)

#GET one task
@router.get("/{task_id}", response_model=schemas.Task)
def read_task(task_id: int, db: Session = Depends(get_db)):
    task = crud.get_task(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

#POST-Create new task 
@router.post("/", response_model=schemas.Task)
def create_new_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    return crud.create_task(db, task)

#DELETE-delete task
@router.delete("/{task_id}", response_model=schemas.Task)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = crud.delete_task(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

#PUT-update task
@router.put("/{task_id}", response_model=schemas.Task)
def update_task(task_id: int, task: schemas.Task, db: Session = Depends(get_db)):
    updated = crud.update_task(db, task_id, task.title, task.description, task.completed)
    if not updated:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated

