import Link from "next/link";

export default function Home() {
  const previewTasks = [
    ["Design dashboard", "Completed", "bg-emerald-50 text-emerald-700"],
    ["Review API flow", "Pending", "bg-amber-50 text-amber-700"],
    ["Ship task updates", "Pending", "bg-amber-50 text-amber-700"],
  ];

  return (
    <main className="mx-auto grid min-h-[calc(100vh-73px)] max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
      <section>
        <p className="mb-4 text-sm font-bold uppercase tracking-widest text-teal-700">
          Simple task management
        </p>

        <h1 className="max-w-3xl text-5xl font-black leading-tight text-slate-950 sm:text-6xl">
          TaskFlow
        </h1>

        <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
          Plan your day, track progress, and keep every task moving without
          losing the thread.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/register"
            className="rounded-md bg-slate-950 px-6 py-3 font-bold text-white shadow-lg shadow-slate-900/10 hover:bg-slate-800"
          >
            Get started
          </Link>

          <Link
            href="/login"
            className="rounded-md border border-slate-300 bg-white px-6 py-3 font-bold text-slate-800 shadow-sm hover:border-teal-500 hover:text-teal-700"
          >
            Sign in
          </Link>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/10">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-slate-500">
              Today
            </p>

            <h2 className="text-2xl font-black text-slate-950">
              Project sprint
            </h2>
          </div>

          <span className="rounded-md bg-teal-50 px-3 py-1 text-sm font-bold text-teal-700">
            3 active
          </span>
        </div>

        <div className="space-y-3">
          {previewTasks.map(([title, status, color]) => (
            <div
              key={title}
              className="flex items-center justify-between gap-4 rounded-md border border-slate-200 p-4"
            >
              <div>
                <p className="font-bold text-slate-900">
                  {title}
                </p>

                <p className="text-sm text-slate-500">
                  TaskFlow workspace
                </p>
              </div>

              <span className={`rounded-md px-3 py-1 text-xs font-black ${color}`}>
                {status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
