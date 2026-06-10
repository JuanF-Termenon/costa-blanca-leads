"use client";

import { useState, FormEvent } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          message: form.get("message"),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al enviar");
      }

      setStatus("success");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Error al enviar");
    }
  }

  if (status === "success") {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700 text-2xl">
          ✓
        </div>
        <h3 className="text-lg font-semibold text-green-900">Mensaje enviado</h3>
        <p className="mt-2 text-sm text-green-700">
          Te respondemos en menos de 24h por WhatsApp o email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-12 max-w-xl space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <input
          name="name"
          type="text"
          required
          placeholder="Nombre"
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
        />
      </div>
      <input
        name="phone"
        type="tel"
        placeholder="Teléfono (opcional)"
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
      />
      <textarea
        name="message"
        required
        placeholder="Cuéntanos qué necesitas..."
        rows={4}
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Enviando..." : "Enviar solicitud"}
      </button>
      {status === "error" && (
        <p className="text-center text-sm text-red-600">{errorMsg}</p>
      )}
      <p className="text-center text-xs text-slate-500">
        Te respondemos en menos de 24h por WhatsApp o email.
      </p>
    </form>
  );
}
