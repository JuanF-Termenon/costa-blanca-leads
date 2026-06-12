"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, X, Building2, Eye, EyeOff } from "lucide-react";
import type { Property } from "@/lib/demo-properties";

const emptyForm = {
  title: "", location: "", price: "", beds: 0, baths: 0, m2: 0,
  type: "Apartamento", purpose: "venta" as "venta" | "alquiler" | "temporal",
  desc: "", images: "", lat: 38.645, lng: 0.045,
};

type FormData = typeof emptyForm;

function PropertyFormModal({
  open, onClose, onSave, initial,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
  initial?: Property;
}) {
  const [form, setForm] = useState<FormData>(emptyForm);

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title,
        location: initial.location,
        price: initial.price,
        beds: initial.beds,
        baths: initial.baths,
        m2: initial.m2,
        type: initial.type,
        purpose: initial.purpose,
        desc: initial.desc,
        images: (initial.images || []).join("\n"),
        lat: initial.coords.lat,
        lng: initial.coords.lng,
      });
    } else {
      setForm(emptyForm);
    }
  }, [initial, open]);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(form);
  }

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm">
      <div className="mt-8 mb-8 w-full max-w-xl rounded-2xl bg-white p-8 shadow-2xl dark:bg-slate-900">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {initial ? "Editar propiedad" : "Nueva propiedad"}
          </h2>
          <button onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Título *</label>
              <input
                value={form.title} onChange={(e) => update("title", e.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Ubicación</label>
              <input
                value={form.location} onChange={(e) => update("location", e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Precio *</label>
              <input
                value={form.price} onChange={(e) => update("price", e.target.value)}
                required
                placeholder="295.000 €"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Propósito *</label>
              <select
                value={form.purpose} onChange={(e) => update("purpose", e.target.value as "venta" | "alquiler" | "temporal")}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
              >
                <option value="venta">Venta</option>
                <option value="alquiler">Alquiler</option>
                <option value="temporal">Temporada</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tipo *</label>
              <input
                value={form.type} onChange={(e) => update("type", e.target.value)}
                required
                placeholder="Apartamento, Villa..."
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">m²</label>
              <input type="number"
                value={form.m2} onChange={(e) => update("m2", Number(e.target.value))}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Habitaciones</label>
              <input type="number"
                value={form.beds} onChange={(e) => update("beds", Number(e.target.value))}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Baños</label>
              <input type="number"
                value={form.baths} onChange={(e) => update("baths", Number(e.target.value))}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Latitud</label>
              <input type="number" step="0.001"
                value={form.lat} onChange={(e) => update("lat", Number(e.target.value))}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Longitud</label>
              <input type="number" step="0.001"
                value={form.lng} onChange={(e) => update("lng", Number(e.target.value))}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Descripción *</label>
              <textarea
                value={form.desc} onChange={(e) => update("desc", e.target.value)}
                required rows={3}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Imágenes (URLs, una por línea)</label>
              <textarea
                value={form.images} onChange={(e) => update("images", e.target.value)}
                rows={3} placeholder="https://images.unsplash.com/..."
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <button type="button" onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancelar
            </button>
            <button type="submit"
              className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              {initial ? "Guardar cambios" : "Crear propiedad"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteConfirm({ open, onClose, onConfirm, title }: {
  open: boolean; onClose: () => void; onConfirm: () => void; title: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Eliminar propiedad</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          ¿Estás seguro de querer eliminar <strong>{title}</strong>? Esta acción no se puede deshacer.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Cancelar
          </button>
          <button onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Property | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);
  const [deleting, setDeleting] = useState<Property | undefined>(undefined);
  const [msg, setMsg] = useState("");

  const fetchProperties = useCallback(async () => {
    try {
      const res = await fetch("/api/properties");
      const data = await res.json();
      setProperties(data);
    } catch {
      setMsg("Error al cargar propiedades");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProperties(); }, [fetchProperties]);

  async function handleSave(form: FormData) {
    const body = {
      title: form.title,
      location: form.location,
      price: form.price,
      beds: form.beds,
      baths: form.baths,
      m2: form.m2,
      type: form.type,
      purpose: form.purpose,
      desc: form.desc,
      images: form.images ? form.images.split("\n").map((s) => s.trim()).filter(Boolean) : [],
      coords: { lat: form.lat, lng: form.lng },
    };

    try {
      if (editing) {
        const res = await fetch(`/api/properties/${editing.ref}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error();
      } else {
        const res = await fetch("/api/properties", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error();
      }
      setShowForm(false);
      setEditing(undefined);
      setMsg(editing ? "Propiedad actualizada" : "Propiedad creada");
      fetchProperties();
    } catch {
      setMsg("Error al guardar");
    }
  }

  async function handleDelete() {
    if (!deleting) return;
    try {
      const res = await fetch(`/api/properties/${deleting.ref}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setDeleting(undefined);
      setMsg("Propiedad eliminada");
      fetchProperties();
    } catch {
      setMsg("Error al eliminar");
    }
  }

  async function handleToggleAvailable(p: Property) {
    try {
      const res = await fetch(`/api/properties/${p.ref}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ available: !(p.available ?? true) }),
      });
      if (!res.ok) throw new Error();
      setMsg(p.available === false ? "Propiedad visible" : "Propiedad oculta");
      fetchProperties();
    } catch {
      setMsg("Error al actualizar");
    }
  }

  useEffect(() => {
    if (msg) {
      const t = setTimeout(() => setMsg(""), 3000);
      return () => clearTimeout(t);
    }
  }, [msg]);

  return (
    <div className="min-h-dvh bg-white dark:bg-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-700 text-white text-sm font-bold">IC</div>
            <span className="text-base font-bold text-slate-900 dark:text-slate-100">Admin</span>
            <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">panel</span>
          </div>
          <a href="/" className="text-sm text-blue-700 hover:underline dark:text-blue-400">Ver web →</a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Propiedades</h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{properties.length} propiedades en total</p>
          </div>
          <button onClick={() => { setEditing(undefined); setShowForm(true); }}
            className="flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500"
          >
            <Plus className="h-4 w-4" />
            Nueva propiedad
          </button>
        </div>

        {msg && (
          <div className="mb-4 rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-300">
            {msg}
          </div>
        )}

        {loading ? (
          <div className="text-center py-20 text-sm text-slate-400">Cargando...</div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  <th className="px-4 py-3">Ref</th>
                  <th className="px-4 py-3">Título</th>
                  <th className="px-4 py-3">Tipo</th>
                  <th className="px-4 py-3">Precio</th>
                  <th className="px-4 py-3 hidden sm:table-cell">Estado</th>
                  <th className="px-4 py-3 hidden sm:table-cell">Propósito</th>
                  <th className="px-4 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {properties.map((p) => (
                  <tr key={p.ref} className={`hover:bg-slate-50 dark:hover:bg-slate-900/50 ${p.available === false ? "opacity-50" : ""}`}>
                    <td className="px-4 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">{p.ref}</td>
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100 max-w-xs truncate">{p.title}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{p.type}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400 whitespace-nowrap">{p.price}</td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                        p.available !== false ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"
                      }`}>
                        <span className={`inline-block h-2 w-2 rounded-full ${
                          p.available !== false ? "bg-emerald-500" : "bg-red-400"
                        }`} />
                        {p.available !== false ? "Visible" : "Oculta"}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        p.purpose === "venta"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                          : p.purpose === "alquiler"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                      }`}>
                        {p.purpose === "venta" ? "Venta" : p.purpose === "alquiler" ? "Alquiler" : "Temporada"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => handleToggleAvailable(p)}
                          className={`rounded-lg p-2 transition-colors ${
                            p.available !== false
                              ? "text-slate-400 hover:bg-slate-100 hover:text-amber-600 dark:hover:bg-slate-800 dark:hover:text-amber-400"
                              : "text-emerald-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                          }`}
                          title={p.available !== false ? "Ocultar propiedad" : "Mostrar propiedad"}
                        >
                          {p.available !== false ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                        <button onClick={() => { setEditing(p); setShowForm(true); }}
                          className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-blue-700 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                          title="Editar"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button onClick={() => setDeleting(p)}
                          className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-red-600 dark:hover:bg-slate-800 dark:hover:text-red-400"
                          title="Eliminar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {properties.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-slate-400">
                      <Building2 className="mx-auto h-8 w-8 mb-2 opacity-50" />
                      <p>No hay propiedades aún</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <PropertyFormModal
        open={showForm}
        onClose={() => { setShowForm(false); setEditing(undefined); }}
        onSave={handleSave}
        initial={editing}
      />

      <DeleteConfirm
        open={!!deleting}
        onClose={() => setDeleting(undefined)}
        onConfirm={handleDelete}
        title={deleting?.title ?? ""}
      />
    </div>
  );
}
