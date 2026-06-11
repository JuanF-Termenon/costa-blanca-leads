"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4">
      <h1 className="mb-2 text-6xl font-bold text-slate-900">Error</h1>
      <p className="mb-8 text-lg text-slate-600">
        Algo salió mal. Inténtalo de nuevo.
      </p>
      <button
        onClick={reset}
        className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
      >
        Reintentar
      </button>
    </div>
  );
}
