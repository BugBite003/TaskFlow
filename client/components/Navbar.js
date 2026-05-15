"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";

const subscribeToAuth = (callback) => {
  window.addEventListener("storage", callback);
  window.addEventListener("auth-change", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("auth-change", callback);
  };
};

const getToken = () => localStorage.getItem("token");
const getServerToken = () => null;

export default function Navbar() {
  const router = useRouter();
  const token = useSyncExternalStore(
    subscribeToAuth,
    getToken,
    getServerToken
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("auth-change"));

    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-3 text-slate-950"
        >
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-teal-600 text-lg font-black text-white shadow-sm">
            T
          </span>

          <span className="text-xl font-black tracking-tight">
            TaskFlow
          </span>
        </Link>

        <div className="flex items-center gap-2 text-sm font-semibold">
          {!token ? (
            <>
              <Link
                href="/login"
                className="rounded-md px-4 py-2 text-slate-700 hover:bg-slate-100"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-md bg-slate-950 px-4 py-2 text-white shadow-sm hover:bg-slate-800"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="rounded-md px-4 py-2 text-slate-700 hover:bg-slate-100"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-md bg-rose-500 px-4 py-2 text-white shadow-sm hover:bg-rose-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
