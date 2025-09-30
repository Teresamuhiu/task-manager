//API Helper
//Wrap FastAPI endpoints
const API_URL = "http://127.0.0.1:8000"; // FastAPI backend

    export async function getTasks() {
    const res = await fetch(`${API_URL}/tasks/`, { cache: "no-store" });
    return res.json();
    }

    export async function createTask(title: string, description: string) {
    const res = await fetch(`${API_URL}/tasks/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
    });
    return res.json();
    }

    export async function updateTask(id: number, title: string, description: string, completed: boolean) {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, title, description, completed }),
    });
    return res.json();
    }

    export async function deleteTask(id: number) {
    const res = await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
    return res.json();
    }
