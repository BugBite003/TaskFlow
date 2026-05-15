"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../../services/taskService";

export default function DashboardPage() {
  const router = useRouter();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const completedCount = useMemo(
    () => tasks.filter((task) => task.status === "Completed").length,
    [tasks]
  );

  const pendingCount = tasks.length - completedCount;

  const refreshTasks = async () => {
    try {
      const data = await getTasks();

      setTasks(data);
    } catch (error) {
      console.log(error);

      localStorage.removeItem("token");

      router.push("/login");
    }
  };

  useEffect(() => {
    let isMounted = true;

    getTasks()
      .then((data) => {
        if (isMounted) {
          setTasks(data);
        }
      })
      .catch((error) => {
        console.log(error);

        localStorage.removeItem("token");

        router.push("/login");
      });

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleCreateTask = async (e) => {
    e.preventDefault();

    try {
      await createTask({
        title,
        description,
      });

      setTitle("");
      setDescription("");

      refreshTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);

      refreshTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggle = async (task) => {
    try {
      await updateTask(task._id, {
        status: task.status === "Pending" ? "Completed" : "Pending",
      });

      refreshTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <section className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-teal-700">
            Workspace
          </p>

          <h1 className="text-4xl font-black text-slate-950">
            Dashboard
          </h1>

          <p className="mt-2 max-w-2xl text-slate-600">
            Create, complete, and clear tasks from one focused view.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:min-w-80">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Total
            </p>
            <p className="mt-1 text-2xl font-black text-slate-950">
              {tasks.length}
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Pending
            </p>
            <p className="mt-1 text-2xl font-black text-amber-600">
              {pendingCount}
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Done
            </p>
            <p className="mt-1 text-2xl font-black text-emerald-600">
              {completedCount}
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <form
          onSubmit={handleCreateTask}
          className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/10"
        >
          <h2 className="text-xl font-black text-slate-950">
            Add task
          </h2>

          <p className="mt-1 text-sm text-slate-600">
            Capture the next thing before it slips away.
          </p>

          <label className="mt-5 block text-sm font-bold text-slate-700">
            Title
            <input
              type="text"
              placeholder="Task title"
              className="mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 font-normal outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <label className="mt-4 block text-sm font-bold text-slate-700">
            Description
            <textarea
              placeholder="Add useful details"
              className="mt-2 min-h-28 w-full resize-y rounded-md border border-slate-300 bg-white px-4 py-3 font-normal outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <button className="mt-5 w-full rounded-md bg-slate-950 px-5 py-3 font-bold text-white shadow-lg shadow-slate-900/10 hover:bg-slate-800">
            Add Task
          </button>
        </form>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/10">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-slate-950">
                Tasks
              </h2>

              <p className="text-sm text-slate-600">
                Your current list, sorted by latest updates.
              </p>
            </div>

            <span className="rounded-md bg-teal-50 px-3 py-1 text-sm font-bold text-teal-700">
              {pendingCount} open
            </span>
          </div>

          <div className="space-y-3">
            {tasks.length === 0 ? (
              <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                <p className="font-bold text-slate-900">
                  No tasks yet
                </p>

                <p className="mt-1 text-sm text-slate-600">
                  Add your first task to start tracking progress.
                </p>
              </div>
            ) : (
              tasks.map((task) => (
                <article
                  key={task._id}
                  className="rounded-md border border-slate-200 p-4 hover:border-teal-300 hover:shadow-sm"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <h3
                          className={`text-lg font-black ${
                            task.status === "Completed"
                              ? "text-slate-400 line-through"
                              : "text-slate-950"
                          }`}
                        >
                          {task.title}
                        </h3>

                        <span
                          className={`rounded-md px-2.5 py-1 text-xs font-black ${
                            task.status === "Completed"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {task.status}
                        </span>
                      </div>

                      <p className="leading-7 text-slate-600">
                        {task.description || "No description added."}
                      </p>
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <button
                        onClick={() => handleToggle(task)}
                        className="rounded-md border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700 hover:border-teal-500 hover:text-teal-700"
                      >
                        Toggle
                      </button>

                      <button
                        onClick={() => handleDelete(task._id)}
                        className="rounded-md bg-rose-500 px-3 py-2 text-sm font-bold text-white hover:bg-rose-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
