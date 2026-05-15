"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { loginUser } from "../../services/authService";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData);

      localStorage.setItem("token", data.token);
      window.dispatchEvent(new Event("auth-change"));

      router.push("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <main className="mx-auto grid min-h-[calc(100vh-73px)] max-w-5xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="hidden lg:block">
        <p className="mb-4 text-sm font-bold uppercase tracking-widest text-teal-700">
          Welcome back
        </p>

        <h1 className="text-4xl font-black leading-tight text-slate-950">
          Pick up exactly where your work left off.
        </h1>

        <p className="mt-4 max-w-md leading-7 text-slate-600">
          Your dashboard keeps today&apos;s tasks, progress, and next actions in
          one focused place.
        </p>
      </section>

      <form
        onSubmit={handleSubmit}
        className="w-full rounded-lg border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/10 sm:p-8"
      >
        <h2 className="text-3xl font-black text-slate-950">
          Login
        </h2>

        <p className="mt-2 text-slate-600">
          Enter your details to open your workspace.
        </p>

        <label className="mt-6 block text-sm font-bold text-slate-700">
          Email
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 font-normal outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
            onChange={handleChange}
            required
          />
        </label>

        <label className="mt-4 block text-sm font-bold text-slate-700">
          Password
          <input
            type="password"
            name="password"
            placeholder="Your password"
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 font-normal outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
            onChange={handleChange}
            required
          />
        </label>

        <button className="mt-6 w-full rounded-md bg-slate-950 px-5 py-3 font-bold text-white shadow-lg shadow-slate-900/10 hover:bg-slate-800">
          Login
        </button>

        <p className="mt-5 text-center text-sm text-slate-600">
          New here?{" "}
          <Link
            href="/register"
            className="font-bold text-teal-700 hover:text-teal-800"
          >
            Create an account
          </Link>
        </p>
      </form>
    </main>
  );
}
