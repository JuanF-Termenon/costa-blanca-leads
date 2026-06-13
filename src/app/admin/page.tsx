"use client";

import { useState, useEffect, useCallback } from "react";
import { useTheme } from "@/lib/providers";
import { Plus, Pencil, Trash2, X, Building2, Eye, EyeOff, Languages, Upload, ImageIcon, Loader, Moon, Sun } from "lucide-react";
import type { Property } from "@/lib/demo-properties";

const emptyForm = {
  title: "", location: "", price: "", beds: 0, baths: 0, m2: 0,
  type: "Apartamento", purpose: "venta" as "venta" | "alquiler" | "temporal",
  desc: "", images: "", lat: 38.645, lng: 0.045,
};

type FormData = typeof emptyForm;

const LOCALES = ["en", "de", "fr", "ru"] as const;
const LOCALE_LABELS: Record<string, string> = { en: "English", de: "Deutsch", fr: "Français", ru: "Русский" };
const EMPTY_TRANSLATIONS = { title: "", location: "", desc: "" };

function PropertyFormModal({
  open, onClose, onSave, initial,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (data: FormData & { translations?: Record<string, { title: string; location: string; desc: string }> }) => void;
  initial?: Property;
}) {
  const [form, setForm] = useState<FormData>(emptyForm);
  const [translations, setTranslations] = useState<Record<string, { title: string; location: string; desc: string }>>({});
  const [showTranslations, setShowTranslations] = useState(false);
  const [transTab, setTransTab] = useState<string>("en");
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [pendingPreviews, setPendingPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");

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
      const t: Record<string, { title: string; location: string; desc: string }> = {};
      for (const loc of LOCALES) {
        const src = initial.translations?.[loc];
        t[loc] = { title: src?.title ?? "", location: src?.location ?? "", desc: src?.desc ?? "" };
      }
      setTranslations(t);
    } else {
      setForm(emptyForm);
      setTranslations({});
    }
    setPendingFiles([]);
    setPendingPreviews((prev) => { prev.forEach((p) => URL.revokeObjectURL(p)); return []; });
    setUploadMsg("");
    setUploading(false);
  }, [initial, open]);

  useEffect(() => {
    if (uploadMsg) {
      const t = setTimeout(() => setUploadMsg(""), 3000);
      return () => clearTimeout(t);
    }
  }, [uploadMsg]);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({ ...form, translations });
  }

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    const previews = files.map((f) => URL.createObjectURL(f));
    setPendingFiles((prev) => [...prev, ...files]);
    setPendingPreviews((prev) => [...prev, ...previews]);
    e.target.value = "";
  }

  function removePending(index: number) {
    URL.revokeObjectURL(pendingPreviews[index]);
    setPendingFiles((prev) => prev.filter((_, i) => i !== index));
    setPendingPreviews((prev) => prev.filter((_, i) => i !== index));
  }

  async function uploadPending(index: number) {
    const file = pendingFiles[index];
    if (!file) return;
    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body });
      if (!res.ok) throw new Error();
      const { url } = await res.json();
      removePending(index);
      setForm((f) => ({ ...f, images: f.images ? f.images + "\n" + url : url }));
    } catch {
      setUploadMsg("Error al subir imagen");
    } finally {
      setUploading(false);
    }
  }

  async function uploadAllPending() {
    if (pendingFiles.length === 0) return;
    setUploading(true);
    for (const file of pendingFiles) {
      try {
        const body = new FormData();
        body.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body });
        if (!res.ok) throw new Error();
        const { url } = await res.json();
        setForm((f) => ({ ...f, images: f.images ? f.images + "\n" + url : url }));
      } catch {
        setUploadMsg("Error al subir alguna imagen");
      }
    }
    pendingPreviews.forEach((p) => URL.revokeObjectURL(p));
    setPendingFiles([]);
    setPendingPreviews([]);
    setUploading(false);
  }

  async function removeImage(url: string) {
    setUploading(true);
    try {
      await fetch("/api/upload", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url }) });
    } catch {
      // ignore blob delete errors (orphaned URL is fine)
    }
    setForm((f) => {
      const urls = f.images.split("\n").map((s) => s.trim()).filter(Boolean).filter((u) => u !== url);
      return { ...f, images: urls.join("\n") };
    });
    setUploading(false);
  }

  function updateTranslation(locale: string, field: "title" | "location" | "desc", value: string) {
    setTranslations((prev) => ({
      ...prev,
      [locale]: { ...(prev[locale] ?? EMPTY_TRANSLATIONS), [field]: value },
    }));
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
              <select
                value={form.type} onChange={(e) => update("type", e.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
              >
                <option value="Apartamento">Apartamento</option>
                <option value="Villa">Villa</option>
                <option value="Ático">Ático</option>
                <option value="Piso">Piso</option>
                <option value="Chalet">Chalet</option>
                <option value="Dúplex">Dúplex</option>
                <option value="Parcela">Parcela</option>
                <option value="Casa Rural">Casa Rural</option>
                <option value="Local">Local</option>
              </select>
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
            <div className="col-span-2 space-y-3">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Imágenes</label>

              {uploadMsg && (
                <div className="rounded bg-emerald-50 px-3 py-2 text-xs text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                  {uploadMsg}
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                {form.images.split("\n").map((s) => s.trim()).filter(Boolean).map((url, i) => (
                  <div key={i} className="group relative h-24 w-32 overflow-hidden rounded-lg border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
                    <img src={url} alt="" className="h-full w-full object-cover" />
                    <button type="button" onClick={() => removeImage(url)}
                      className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {!form.images && (
                  <div className="flex h-24 w-32 items-center justify-center rounded-lg border border-dashed border-slate-300 dark:border-slate-600">
                    <ImageIcon className="h-6 w-6 text-slate-300 dark:text-slate-600" />
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                {pendingPreviews.map((preview, i) => (
                  <div key={i} className="relative h-24 w-32 overflow-hidden rounded-lg border border-blue-300 bg-slate-100 dark:border-blue-700 dark:bg-slate-800">
                    <img src={preview} alt="" className="h-full w-full object-cover" />
                    <button type="button" onClick={() => removePending(i)}
                      className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white"
                    >
                      <X className="h-3 w-3" />
                    </button>
                    <button type="button" onClick={() => uploadPending(i)} disabled={uploading}
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded bg-blue-700 px-2 py-0.5 text-xs text-white hover:bg-blue-800 disabled:opacity-50"
                    >
                      Subir
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <label className="cursor-pointer rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-800">
                  <Upload className="mr-2 inline h-4 w-4" />
                  Seleccionar imágenes
                  <input type="file" accept="image/*" multiple onChange={handleFileSelect} className="hidden" />
                </label>
                {pendingFiles.length > 1 && (
                  <button type="button" onClick={uploadAllPending} disabled={uploading}
                    className="rounded-lg bg-blue-700 px-3 py-2 text-sm font-medium text-white hover:bg-blue-800 disabled:opacity-50"
                  >
                    {uploading ? <Loader className="inline h-4 w-4 animate-spin" /> : null}
                    Subir todas ({pendingFiles.length})
                  </button>
                )}
                {uploading && <span className="text-xs text-slate-400">Subiendo...</span>}
              </div>
            </div>
          </div>

          {initial && (
            <div className="col-span-2 border-t border-slate-200 pt-4 dark:border-slate-700">
              <button type="button" onClick={() => setShowTranslations(!showTranslations)}
                className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
              >
                <Languages className="h-4 w-4" />
                Traducciones {showTranslations ? "▲" : "▼"}
              </button>

              {showTranslations && (
                <div className="mt-3 space-y-3">
                  <div className="flex gap-1 border-b border-slate-200 dark:border-slate-700">
                    {LOCALES.map((loc) => (
                      <button key={loc} type="button" onClick={() => setTransTab(loc)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-t border-b-2 transition-colors ${
                          transTab === loc
                            ? "border-blue-700 text-blue-700 dark:border-blue-400 dark:text-blue-400"
                            : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                        }`}
                      >
                        {LOCALE_LABELS[loc]}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-0.5">Título</label>
                      <input value={translations[transTab]?.title ?? ""}
                        onChange={(e) => updateTranslation(transTab, "title", e.target.value)}
                        className="w-full rounded border border-slate-300 px-2 py-1.5 text-xs dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-0.5">Ubicación</label>
                      <input value={translations[transTab]?.location ?? ""}
                        onChange={(e) => updateTranslation(transTab, "location", e.target.value)}
                        className="w-full rounded border border-slate-300 px-2 py-1.5 text-xs dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-0.5">Descripción</label>
                      <textarea value={translations[transTab]?.desc ?? ""}
                        onChange={(e) => updateTranslation(transTab, "desc", e.target.value)} rows={2}
                        className="w-full rounded border border-slate-300 px-2 py-1.5 text-xs dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

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
  const { theme, toggleTheme } = useTheme();
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

  async function handleSave(form: FormData & { translations?: Record<string, { title: string; location: string; desc: string }> }) {
    const body: Record<string, unknown> = {
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

    if (editing && form.translations) {
      const filled: Record<string, { title: string; location: string; desc: string }> = {};
      for (const [loc, t] of Object.entries(form.translations)) {
        if (t.title || t.location || t.desc) filled[loc] = t;
      }
      if (Object.keys(filled).length > 0) body.translations = filled;
    }

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

  async function handleTranslate(p: Property) {
    setMsg(`Traduciendo ${p.ref}...`);
    try {
      const res = await fetch(`/api/properties/${p.ref}/translate`, { method: "POST" });
      if (!res.ok) throw new Error();
      setMsg(`${p.ref} traducida correctamente`);
      fetchProperties();
    } catch {
      setMsg(`Error al traducir ${p.ref}`);
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
          <div className="flex items-center gap-3">
            <a href="/demo" className="text-sm text-blue-700 hover:underline dark:text-blue-400">Ver demo →</a>
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              aria-label={theme === "light" ? "Activar modo oscuro" : "Activar modo claro"}
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
            <button
              onClick={async () => {
                await fetch("/api/admin/verify", { method: "DELETE" });
                window.location.href = "/admin/login";
              }}
              className="text-sm text-slate-400 hover:text-red-600 dark:hover:text-red-400"
            >
              Cerrar sesión
            </button>
          </div>
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
                        <button onClick={() => handleTranslate(p)}
                          className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-sky-600 dark:hover:bg-slate-800 dark:hover:text-sky-400"
                          title="Traducir a todos los idiomas"
                        >
                          <Languages className="h-4 w-4" />
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
