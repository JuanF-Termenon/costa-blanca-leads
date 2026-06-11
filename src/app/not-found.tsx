import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4">
      <h1 className="mb-2 text-6xl font-bold text-slate-900">404</h1>
      <p className="mb-8 text-lg text-slate-600">Página no encontrada</p>
      <Link
        href="/"
        className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
