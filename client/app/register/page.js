"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { registerUser } from "../../services/authService";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
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
      await registerUser(formData);

      router.push("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <main className="mx-auto grid min-h-[calc(100vh-73px)] max-w-5xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="hidden lg:block">
        <p className="mb-4 text-sm font-bold uppercase tracking-widest text-teal-700">
          Start organized
        </p>

        <h1 className="text-4xl font-black leading-tight text-slate-950">
          Build a calmer workspace for every task.
        </h1>

        <p className="mt-4 max-w-md leading-7 text-slate-600">
          Create your account and turn scattered work into a clear, trackable
          list.
        </p>
      </section>

      <form
        onSubmit={handleSubmit}
        className="w-full rounded-lg border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/10 sm:p-8"
      >
        <h2 className="text-3xl font-black text-slate-950">
          Register
        </h2>

        <p className="mt-2 text-slate-600">
          Set up your TaskFlow workspace.
        </p>

        <label className="mt-6 block text-sm font-bold text-slate-700">
          Name
          <input
            type="text"
            name="name"
            placeholder="Your name"
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 font-normal outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
            onChange={handleChange}
            required
          />
        </label>

        <label className="mt-4 block text-sm font-bold text-slate-700">
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
            placeholder="Create a password"
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 font-normal outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
            onChange={handleChange}
            required
          />
        </label>

        <button className="mt-6 w-full rounded-md bg-slate-950 px-5 py-3 font-bold text-white shadow-lg shadow-slate-900/10 hover:bg-slate-800">
          Register
        </button>

        <p className="mt-5 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold text-teal-700 hover:text-teal-800"
          >
            Sign in
          </Link>
        </p>
      </form>
    </main>
  );
}
