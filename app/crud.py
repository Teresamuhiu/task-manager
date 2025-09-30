#Database Operations
#Functions: get all, get by id, create, update, delete
from sqlalchemy.orm import Session
from . import models, schemas

def get_tasks(db: Session):
    return db.query(models.Task).all()

def get_task(db: Session, task_id: int):
    return db.query(models.Task).filter(models.Task.id == task_id).first()

def create_task(db: Session, task: schemas.TaskCreate):
    db_task = models.Task(**task.dict())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def delete_task(db: Session, task_id: int):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if task:
        db.delete(task)
        db.commit()
    return task

def update_task(db: Session, task_id: int, title: str, description: str, completed: bool):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if task:
        task.title = title
        task.description = description
        task.completed = completed
        db.commit()
        db.refresh(task)
    return task
