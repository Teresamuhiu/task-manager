#Task model that describes the database table for tasks
from sqlalchemy import Column, Integer, String, Boolean
from .database import Base

class Task(Base):
    __tablename__ = "tasks" #create a table called tasks

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    completed = Column(Boolean, default=False)
