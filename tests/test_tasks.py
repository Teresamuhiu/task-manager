#unit tests using pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_task():
    response = client.post("/tasks/", json={"title": "Test task", "description": "Testing API"})
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test task"
    assert data["description"] == "Testing API"
    assert data["completed"] is False

def test_get_tasks():
    response = client.get("/tasks/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0

def test_update_task():
    # First, create a task
    create_res = client.post("/tasks/", json={"title": "Update me", "description": "Old"})
    task_id = create_res.json()["id"]

    # Then, update it
    update_res = client.put(f"/tasks/{task_id}", json={
        "id": task_id,
        "title": "Updated Title",
        "description": "Updated Desc",
        "completed": True
    })
    assert update_res.status_code == 200
    data = update_res.json()
    assert data["title"] == "Updated Title"
    assert data["completed"] is True

def test_delete_task():
    # Create a task to delete
    create_res = client.post("/tasks/", json={"title": "Delete me", "description": "Temp"})
    task_id = create_res.json()["id"]

    # Delete it
    delete_res = client.delete(f"/tasks/{task_id}")
    assert delete_res.status_code == 200

    # Confirm it’s gone
    get_res = client.get(f"/tasks/{task_id}")
    assert get_res.status_code == 404
