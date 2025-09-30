"use client";

import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../lib/api";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  async function loadTasks() {
    const data = await getTasks();
    setTasks(data);
  }

  async function handleAddTask() {
    if (!title) return;
    await createTask(title, description);
    setTitle("");
    setDescription("");
    loadTasks();
  }

  async function handleToggle(task: Task) {
    await updateTask(task.id, task.title, task.description, !task.completed);
    loadTasks();
  }

  async function handleDelete(id: number) {
    await deleteTask(id);
    loadTasks();
  }

  async function handleUpdate(id: number) {
    await updateTask(id, editTitle, editDesc, false);
    setEditingId(null);
    setEditTitle("");
    setEditDesc("");
    loadTasks();
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">
          Task Manager
        </h1>

        {/* Add Task Form */}
        <div className="flex gap-2 mb-8">
          <input
            className="flex-1 border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="flex-1 border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 transition px-5 py-2 rounded-lg text-white font-medium shadow"
            onClick={handleAddTask}
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <ul className="space-y-4">
          {tasks.length === 0 && (
            <p className="text-center text-gray-400 italic">
              No tasks yet. Add one above!
            </p>
          )}

          {tasks.map((task) => (
            <li
              key={task.id}
              className="bg-gray-50 hover:bg-gray-100 transition rounded-lg shadow-sm p-4 flex justify-between items-start"
            >
              {editingId === task.id ? (
                <div className="flex flex-col gap-2 flex-1">
                  <input
                    className="border rounded p-2"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <input
                    className="border rounded p-2"
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                  />
                </div>
              ) : (
                <div>
                  <h2
                    className={`text-lg font-semibold ${
                      task.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {task.title}
                  </h2>
                  <p className="text-sm text-gray-600 italic">
                    {task.description}
                  </p>
                  <span
                    className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${
                      task.completed
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {task.completed ? "Completed" : "Pending"}
                  </span>
                </div>
              )}

              <div className="flex gap-2 ml-4">
                {editingId === task.id ? (
                  <button
                    className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-full shadow hover:bg-blue-600"
                    onClick={() => handleUpdate(task.id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded-full shadow hover:bg-yellow-600"
                    onClick={() => {
                      setEditingId(task.id);
                      setEditTitle(task.title);
                      setEditDesc(task.description);
                    }}
                  >
                    Edit
                  </button>
                )}
                <button
                  className={`flex items-center gap-1 px-3 py-1 rounded-full shadow ${
                    task.completed
                      ? "bg-yellow-500 text-white hover:bg-yellow-600"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                  onClick={() => handleToggle(task)}
                >
                  {task.completed ? "Undo" : "Done"}
                </button>
                <button
                  className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-full shadow hover:bg-red-600"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
