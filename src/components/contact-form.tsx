"use client";

import { useState, FormEvent } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          preferred_time: data.get("preferred_time"),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error al enviar");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Error al enviar");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700 text-2xl">
          ✓
        </div>
        <h3 className="text-lg font-semibold text-green-900">Solicitud enviada</h3>
        <p className="mt-2 text-sm text-green-700">
          Te escribo en breve para concretar el día y la hora de la videollamada.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
        required
        placeholder="Teléfono"
        pattern="(\+34)?[679][0-9]{8}"
        title="Introduce un número de teléfono español válido (ej: 691157183 o +34691157183)"
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
      />
      <input
        name="preferred_time"
        type="text"
        required
        placeholder="¿Cuándo prefieres? Ej: Mañana a las 11h / Martes por la tarde"
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Enviando..." : "Quiero ver la demo"}
      </button>
      {status === "error" && (
        <p className="text-center text-sm text-red-600">{errorMsg}</p>
      )}
      <p className="text-center text-xs text-slate-500">
        Te escribo por WhatsApp para concretar el día. Sin compromiso.
      </p>
    </form>
  );
}
