"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { DemoPropertyCard } from "@/components/demo-property-card";
import type { Property } from "@/lib/demo-properties";
import { useLang } from "@/lib/providers";
import { localizeProperty } from "@/lib/property-translations";

function parsePrice(price: string): number {
  return parseInt(price.replace(/\./g, "").replace(/\s.*$/, "").replace(/\D/g, ""), 10) || 0;
}

const propertyColors = [
  "from-blue-400 to-blue-600",
  "from-emerald-400 to-emerald-600",
  "from-amber-400 to-amber-600",
  "from-rose-400 to-rose-600",
  "from-violet-400 to-violet-600",
  "from-teal-400 to-teal-600",
  "from-orange-400 to-orange-600",
  "from-cyan-400 to-cyan-600",
  "from-pink-400 to-pink-600",
  "from-lime-400 to-lime-600",
  "from-blue-500 to-purple-600",
  "from-green-400 to-green-600",
  "from-red-400 to-red-600",
  "from-yellow-400 to-yellow-600",
];

const bedOptions = [1, 2, 3, 4];

function DualRangeSlider({
  min,
  max,
  valueMin,
  valueMax,
  onChangeMin,
  onChangeMax,
}: {
  min: number;
  max: number;
  valueMin: number;
  valueMax: number;
  onChangeMin: (v: number) => void;
  onChangeMax: (v: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef({ valueMin, valueMax });
  valueRef.current = { valueMin, valueMax };

  function valueFromX(clientX: number): number {
    if (!trackRef.current) return min;
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return Math.round(min + ratio * (max - min));
  }

  function handlePointerDown(e: React.MouseEvent | React.TouchEvent, thumb: "min" | "max") {
    e.preventDefault();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const v = valueFromX(clientX);

    if (thumb === "min" && v < valueRef.current.valueMax) onChangeMin(v);
    if (thumb === "max" && v > valueRef.current.valueMin) onChangeMax(v);

    function onMove(ev: MouseEvent | TouchEvent) {
      const cx = "touches" in ev ? ev.touches[0].clientX : (ev as MouseEvent).clientX;
      const val = valueFromX(cx);
      if (thumb === "min" && val < valueRef.current.valueMax) onChangeMin(val);
      if (thumb === "max" && val > valueRef.current.valueMin) onChangeMax(val);
    }

    function onUp() {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    }

    document.body.style.userSelect = "none";
    document.body.style.cursor = "grabbing";
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);
  }

  const pct = (v: number) => ((v - min) / (max - min)) * 100;

  return (
    <div className="relative w-56">
      <div className="relative h-6" ref={trackRef}>
        <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 rounded-full bg-slate-200 dark:bg-slate-700" />
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-blue-700 dark:bg-blue-500"
          style={{
            left: `${pct(valueMin)}%`,
            width: `${pct(valueMax) - pct(valueMin)}%`,
          }}
        />
        <div
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white border-2 border-blue-700 shadow-md cursor-grab active:cursor-grabbing dark:bg-slate-200 dark:border-blue-500"
          style={{ left: `${pct(valueMin)}%` }}
          onMouseDown={(e) => handlePointerDown(e, "min")}
          onTouchStart={(e) => handlePointerDown(e, "min")}
        />
        <div
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white border-2 border-blue-700 shadow-md cursor-grab active:cursor-grabbing dark:bg-slate-200 dark:border-blue-500"
          style={{ left: `${pct(valueMax)}%` }}
          onMouseDown={(e) => handlePointerDown(e, "max")}
          onTouchStart={(e) => handlePointerDown(e, "max")}
        />
      </div>
      <div className="flex justify-between text-[10px] text-blue-700 font-semibold mt-1 dark:text-blue-400">
        <span>{valueMin.toLocaleString("es-ES")} €</span>
        <span>{valueMax.toLocaleString("es-ES")} €</span>
      </div>
    </div>
  );
}

function MultiselectDropdown<T extends string | number>({
  label,
  options,
  selected,
  onChange,
  selectedLabel,
}: {
  label: string;
  options: readonly T[];
  selected: T[];
  onChange: (val: T[]) => void;
  selectedLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const display = selected.length === 0 ? label : (selectedLabel ?? `${selected.length} seleccionados`);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
          selected.length > 0
            ? "border-blue-700 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-900/30 dark:text-blue-300"
            : "border-slate-300 text-slate-700 hover:border-slate-400 dark:border-slate-600 dark:text-slate-300 dark:hover:border-slate-500"
        }`}
      >
        <span className="whitespace-nowrap">{display}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-20 mt-1 min-w-44 rounded-xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-800">
          {options.length === 1 && <p className="px-2 py-1 text-xs text-slate-400 dark:text-slate-500">Sin opciones</p>}
          {options.map((opt) => {
            const isSelected = selected.includes(opt);
            return (
              <label
                key={String(opt)}
                className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onChange(isSelected ? selected.filter((v) => v !== opt) : [...selected, opt])}
                  className="h-4 w-4 rounded border-slate-300 text-blue-700 focus:ring-blue-700/20 dark:border-slate-600 dark:bg-slate-700 dark:text-blue-500"
                />
                {opt}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}


export function DemoPropertyGrid({ search = "", initialRef }: { search?: string; initialRef?: string }) {
  const [activeTab, setActiveTab] = useState<"todas" | "venta" | "alquiler">("todas");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedBeds, setSelectedBeds] = useState<number[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loadingProps, setLoadingProps] = useState(true);
  const { t, locale } = useLang();

  useEffect(() => {
    fetch("/api/properties")
      .then((r) => r.json())
      .then((data) => {
        setProperties(data);
        const prices = data.map((p: Property) => parsePrice(p.price));
        if (prices.length > 0) {
          setRangeMin(Math.min(...prices));
          setRangeMax(Math.max(...prices));
        }
      })
      .catch(() => {})
      .finally(() => setLoadingProps(false));
  }, []);

  const localizedProperties = useMemo(() => properties.map((p) => localizeProperty(p, locale)), [properties, locale]);

  const types = useMemo(() => [...new Set(localizedProperties.map((p) => p.type))].sort(), [localizedProperties]);

  const tabs = [
    { id: "todas" as const, label: t("demo.grid.tab-all") },
    { id: "venta" as const, label: t("demo.grid.tab-buy") },
    { id: "alquiler" as const, label: t("demo.grid.tab-rent") },
  ];

  const currentBounds = useMemo(() => {
    const pool = activeTab === "todas" ? localizedProperties : localizedProperties.filter((p) => p.purpose === activeTab);
    if (pool.length === 0) return { min: 0, max: 0 };
    const prices = pool.map((p) => parsePrice(p.price));
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [activeTab, localizedProperties]);

  const [rangeMin, setRangeMin] = useState(0);
  const [rangeMax, setRangeMax] = useState(0);

  useEffect(() => {
    setRangeMin(currentBounds.min);
    setRangeMax(currentBounds.max);
  }, [currentBounds.min, currentBounds.max]);

  const filtered = localizedProperties.filter((p) => {
    if (!(activeTab === "todas" || p.purpose === activeTab)) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) &&
        !p.location.toLowerCase().includes(search.toLowerCase()) &&
        !p.type.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedTypes.length > 0 && !selectedTypes.includes(p.type)) return false;
    const price = parsePrice(p.price);
    if (price < rangeMin || price > rangeMax) return false;
    if (selectedBeds.length > 0 && !selectedBeds.includes(p.beds)) return false;
    return true;
  });

  const hasFilters = selectedTypes.length > 0 || selectedBeds.length > 0 || rangeMin > currentBounds.min || rangeMax < currentBounds.max;

  function clearFilters() {
    setSelectedTypes([]);
    setSelectedBeds([]);
    setRangeMin(currentBounds.min);
    setRangeMax(currentBounds.max);
  }

  return (
    <section id="propiedades" className="scroll-mt-20 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{t("demo.grid.title")}</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {t("demo.grid.subtitle")}
          </p>
        </div>

        <div className="mt-6">
          <div className="flex gap-1 rounded-xl bg-slate-100 p-1 w-fit dark:bg-slate-800">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-lg px-5 py-2 text-sm font-semibold transition-colors ${
                  activeTab === tab.id
                    ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-slate-100"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                {tab.label}
                {tab.id !== "todas" && (
                  <span className="ml-1.5 text-xs text-slate-400 dark:text-slate-500">
                    ({localizedProperties.filter((p) => p.purpose === tab.id).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <MultiselectDropdown
              label={t("demo.grid.filter-type")}
              options={types as readonly string[]}
              selected={selectedTypes}
              onChange={setSelectedTypes}
              selectedLabel={selectedTypes.length > 0 ? t("demo.grid.filter-selected").replace("{n}", String(selectedTypes.length)) : undefined}
            />
            <MultiselectDropdown
              label={t("demo.grid.filter-beds")}
              options={bedOptions as readonly number[]}
              selected={selectedBeds}
              onChange={setSelectedBeds}
              selectedLabel={selectedBeds.length > 0 ? t("demo.grid.filter-selected").replace("{n}", String(selectedBeds.length)) : undefined}
            />
            <DualRangeSlider
              min={currentBounds.min}
              max={currentBounds.max}
              valueMin={rangeMin}
              valueMax={rangeMax}
              onChangeMin={setRangeMin}
              onChangeMax={setRangeMax}
            />
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-blue-700 hover:text-blue-800 hover:underline whitespace-nowrap dark:text-blue-400 dark:hover:text-blue-300"
              >
                {t("demo.grid.filter-clear")}
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <DemoPropertyCard
              key={p.ref}
              property={p}
              color={propertyColors[i % propertyColors.length]}
              defaultOpen={p.ref === initialRef}
            />
          ))}
        </div>

        {loadingProps && (
          <p className="mt-12 text-center text-sm text-slate-400 dark:text-slate-500">Cargando propiedades...</p>
        )}

        {!loadingProps && filtered.length === 0 && (
          <p className="mt-12 text-center text-sm text-slate-500 dark:text-slate-400">
            {t("demo.grid.empty")}
          </p>
        )}
      </div>
    </section>
  );
}
