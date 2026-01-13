import { useMemo, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type CandleType = "up" | "down";

interface Candle {
  year: number;
  type: CandleType;
  intensity: number;
  level: number; // 0(Start) -> 4.5(Moon-ish)
  title: string;
  subtitle: string;
  description: string;
}

const MAX_LEVEL = 4.5;

const DATA: Candle[] = [
  // 2019
  { year: 2019, type: "up", intensity: 22, level: 1.0, title: "2019 — Learning Begins", subtitle: "First Internship", description: "Built foundational experience and curiosity; early exposure to real-world work." },
  { year: 2019, type: "down", intensity: 16, level: 1.0, title: "2019 — Learning Curve", subtitle: "Adjustment Phase", description: "Early challenges adapting to professional environments." },

  // 2020
  { year: 2020, type: "up", intensity: 26, level: 1.35, title: "2020 — Transition & Challenge", subtitle: "Graduated with Honors", description: "Completed graduation successfully and prepared for next steps." },
  { year: 2020, type: "down", intensity: 24, level: 1.35, title: "2020 — The Pandemic Layoff", subtitle: "Unexpected Shift", description: "A sudden shift after graduation; learned adaptability and self-reliance." },

  // 2021
  { year: 2021, type: "up", intensity: 32, level: 1.9, title: "2021 — Imposter Syndrome", subtitle: "Dream Job Offer", description: "Despite career progress, mental and emotional fatigue surfaced." },
  { year: 2021, type: "down", intensity: 28, level: 1.9, title: "2021 — Burnout", subtitle: "Overwork & Stress", description: "Overwork, stress, and work-life imbalance took its toll." },

  // 2022
  { year: 2022, type: "up", intensity: 36, level: 2.55, title: "2022 — Dual Phase", subtitle: "Skill Stacking", description: "New creative outlet, diversifying skills, growth mindset." },
  { year: 2022, type: "down", intensity: 30, level: 2.55, title: "2022 — Burnout Phase", subtitle: "Lesson", description: "Motivation dip, questioning path, mental load heavy." },

  // 2023
  { year: 2023, type: "up", intensity: 42, level: 3.15, title: "2023 — Team Conflicts", subtitle: "Resilience & Leadership", description: "Developed resilience, leadership maturity, and conflict-handling experience." },
  { year: 2023, type: "down", intensity: 34, level: 3.15, title: "2023 — Team Conflicts", subtitle: "Lesson", description: "Team conflicts, difficult decisions, emotional toll." },

  // 2024
  { year: 2024, type: "up", intensity: 50, level: 3.75, title: "2024 — Got Promoted!", subtitle: "Win", description: "Recognition for effort; stepping into leadership and impact roles." },
  { year: 2024, type: "down", intensity: 38, level: 3.75, title: "2024 — Pressure Phase", subtitle: "Lesson", description: "New responsibilities and the weight of expectations." },

  // 2025 (ONLY UP)
  { year: 2025, type: "up", intensity: 62, level: 4.25, title: "2025 — Trending Up", subtitle: "Win", description: "Stability and momentum return; entering a strong growth phase toward the Moon." },
];

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function IconMoon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M21 14.5A8.5 8.5 0 0 1 9.5 3a7 7 0 1 0 11.5 11.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconGrowth() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 17l6-6 4 4 6-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 7v6h-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconStable() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 12h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 8v8M17 8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function IconLearning() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 19V7l8-3 8 3v12l-8-3-8 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 4v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function IconStart() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 7h12v10H6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 10h6M9 13h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function CandlestickChart() {
  const isMobile = useIsMobile();

  const [hovered, setHovered] = useState<{
    key: string;
    candle: Candle;
    rect: DOMRect;
  } | null>(null);

  const [crosshair, setCrosshair] = useState<{ x: number; y: number } | null>(null);

  const plotRef = useRef<HTMLDivElement | null>(null);

  const years = useMemo(() => Array.from(new Set(DATA.map((d) => d.year))), []);

  const plotHeight = isMobile ? 250 : 340;
  const leftAxisWidth = isMobile ? 74 : 165;

  const bodyScale = isMobile ? 0.85 : 1.35;
  const candleWidth = isMobile ? 10 : 16;
  const wickTop = isMobile ? 10 : 14;
  const wickBottom = isMobile ? 10 : 14;

  const perYearOffset = isMobile ? 7 : 18;
  const upDownOffsetY = isMobile ? 7 : 12;

  const hasDownForYear = (year: number) => DATA.some((d) => d.year === year && d.type === "down");

  const yAxis = useMemo(
    () => [
      { label: "Moon", Icon: IconMoon, accent: true },
      { label: "Growth", Icon: IconGrowth, accent: false },
      { label: "Stable", Icon: IconStable, accent: false },
      { label: "Learning", Icon: IconLearning, accent: false },
      { label: "Start", Icon: IconStart, accent: false },
    ],
    []
  );

  const showTooltip = (key: string, candle: Candle, el: HTMLElement | null) => {
    if (!el || isMobile) return;
    const rect = el.getBoundingClientRect();
    setHovered({ key, candle, rect });
  };
  const hideTooltip = () => setHovered(null);

  const onPlotMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const el = plotRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = clamp(e.clientX - r.left, 0, r.width);
    const y = clamp(e.clientY - r.top, 0, r.height);
    setCrosshair({ x, y });
  };

  const onPlotLeave = () => setCrosshair(null);

  const scrollToStoryYear = (year: number) => {
    const id = `story-${year}`;
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    try {
      window.history.replaceState(null, "", `#${id}`);
    } catch {}
  };

  const dottedLine = (dir: "x" | "y") => ({
    backgroundImage:
      dir === "y"
        ? "repeating-linear-gradient(to bottom, rgba(0,0,0,0.0) 0px, rgba(0,0,0,0.0) 6px, rgba(0,0,0,0.18) 6px, rgba(0,0,0,0.18) 8px)"
        : "repeating-linear-gradient(to right, rgba(0,0,0,0.0) 0px, rgba(0,0,0,0.0) 6px, rgba(0,0,0,0.18) 6px, rgba(0,0,0,0.18) 8px)",
  });

  const TooltipOverlay = () => {
    if (!hovered || isMobile) return null;

    const c = hovered.candle;
    const isUp = c.type === "up";

    const tooltipW = 390;
    const margin = 12;

    const ww = typeof window !== "undefined" ? window.innerWidth : 1200;
    let left = hovered.rect.left + hovered.rect.width / 2 - tooltipW / 2;
    left = clamp(left, margin, ww - tooltipW - margin);

    let top = hovered.rect.top - 14;
    const estimatedH = 170;

    if (top - estimatedH < margin) top = hovered.rect.bottom + 14;
    else top = top - estimatedH;

    return (
      <div className="fixed inset-0 z-[9999] pointer-events-none" aria-hidden>
        <div className="absolute" style={{ left, top, width: tooltipW }}>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-[0_26px_90px_-55px_rgba(0,0,0,0.75)]">
            <div
              className="absolute inset-x-0 top-0 h-[2px]"
              style={{
                background: isUp
                  ? "linear-gradient(90deg, rgba(34,197,94,0.95) 0%, rgba(0,0,0,0) 60%)"
                  : "linear-gradient(90deg, rgba(239,68,68,0.95) 0%, rgba(0,0,0,0) 60%)",
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />

            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[12px] text-muted-foreground">
                    {c.year} • {isUp ? "Growth" : "Learning"}
                  </div>
                  <div className="mt-2 text-[16px] font-semibold leading-snug truncate">
                    {c.subtitle}
                  </div>
                  <div className="mt-1 text-[12px] text-muted-foreground line-clamp-1">
                    {c.title}
                  </div>
                </div>

                <span
                  className={[
                    "shrink-0 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[12px] font-semibold",
                    isUp
                      ? "bg-[rgba(34,197,94,0.12)] text-[rgba(16,120,64,1)] border-[rgba(34,197,94,0.25)]"
                      : "bg-[rgba(239,68,68,0.12)] text-[rgba(164,32,32,1)] border-[rgba(239,68,68,0.25)]",
                  ].join(" ")}
                >
                  {isUp ? "📈 Win" : "📚 Lesson"}
                </span>
              </div>

              <div className="mt-3 text-[13px] text-muted-foreground leading-relaxed">
                {c.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <TooltipOverlay />

      {/* Plot wrapper */}
      <div className="relative" style={{ height: plotHeight }}>
        {/* Y axis */}
        <div
          className="absolute left-0 top-0 bottom-0 flex flex-col justify-between"
          style={{ width: leftAxisWidth }}
        >
          {yAxis.map((item) => (
            <div
              key={item.label}
              className={[
                "flex items-center gap-2 text-xs select-none",
                item.accent
                  ? "text-[hsl(var(--candle-green-dark))] font-medium"
                  : "text-muted-foreground",
              ].join(" ")}
            >
              <span
                className={[
                  "inline-flex items-center justify-center h-6 w-6 rounded-lg",
                  item.accent
                    ? "bg-[hsl(var(--candle-green))]/10 text-[hsl(var(--candle-green-dark))]"
                    : "bg-muted/60",
                ].join(" ")}
              >
                <item.Icon />
              </span>
              {!isMobile ? <span>{item.label}</span> : null}
            </div>
          ))}
        </div>

        {/* Plot area */}
        <div
          ref={plotRef}
          className="absolute top-0 right-0 bottom-0 overflow-hidden rounded-2xl"
          style={{ left: leftAxisWidth }}
          onMouseMove={onPlotMove}
          onMouseLeave={onPlotLeave}
        >
          {/* Grid lines */}
          <div className="absolute inset-0 pointer-events-none">
            {yAxis.map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 border-t"
                style={{
                  top: `${(i / (yAxis.length - 1)) * 100}%`,
                  borderColor: "rgba(0,0,0,0.06)",
                }}
              />
            ))}
          </div>

          {/* Dotted Crosshair (desktop only) */}
          {crosshair && !isMobile && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 bottom-0 w-px opacity-70" style={{ left: crosshair.x, ...dottedLine("y") }} />
              <div className="absolute left-0 right-0 h-px opacity-70" style={{ top: crosshair.y, ...dottedLine("x") }} />
            </div>
          )}

          {/* Year columns */}
          <div
            className="absolute inset-0 grid"
            style={{
              gridTemplateColumns: `repeat(${years.length}, minmax(0, 1fr))`,
            }}
          >
            {years.map((year) => {
              const items = DATA.filter((d) => d.year === year);
              return (
                <div key={year} className="relative">
                  {items.map((c, j) => {
                    const key = `${c.year}-${c.type}-${j}`;
                    const isUp = c.type === "up";

                    const bodyH = Math.round(c.intensity * bodyScale);
                    const totalH = wickTop + bodyH + wickBottom;

                    const baselineY = plotHeight - (c.level / MAX_LEVEL) * plotHeight;
                    const centerY = baselineY + (isUp ? -upDownOffsetY : upDownOffsetY);

                    const top = clamp(centerY - totalH / 2, 10, plotHeight - totalH - 10);
                    const xShift = isUp ? -perYearOffset : perYearOffset;

                    return (
                      <div
                        key={key}
                        className="absolute cursor-pointer"
                        style={{
                          top,
                          left: "50%",
                          transform: `translateX(calc(-50% + ${xShift}px))`,
                          width: isMobile ? 56 : 70,
                        }}
                        role="button"
                        tabIndex={0}
                        onClick={() => scrollToStoryYear(c.year)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") scrollToStoryYear(c.year);
                        }}
                        onMouseEnter={(e) => showTooltip(key, c, e.currentTarget as unknown as HTMLElement)}
                        onMouseLeave={hideTooltip}
                      >
                        <div className="relative mx-auto" style={{ width: candleWidth }}>
                          <div
                            className="w-px mx-auto"
                            style={{
                              height: wickTop,
                              backgroundColor: isUp ? "rgba(34,197,94,0.75)" : "rgba(239,68,68,0.75)",
                            }}
                          />
                          <div
                            className="relative"
                            style={{
                              height: bodyH,
                              borderRadius: 10,
                              background: isUp
                                ? "linear-gradient(180deg, rgba(34,197,94,0.98), rgba(34,197,94,0.66))"
                                : "linear-gradient(180deg, rgba(239,68,68,0.95), rgba(239,68,68,0.62))",
                              boxShadow: isUp
                                ? "0 14px 30px rgba(34,197,94,0.16)"
                                : "0 14px 30px rgba(239,68,68,0.12)",
                            }}
                          >
                            <div
                              className="pointer-events-none absolute inset-0"
                              style={{
                                borderRadius: 10,
                                background: "linear-gradient(90deg, rgba(255,255,255,0.20), rgba(255,255,255,0))",
                              }}
                            />
                          </div>
                          <div
                            className="w-px mx-auto"
                            style={{
                              height: wickBottom,
                              backgroundColor: isUp ? "rgba(34,197,94,0.75)" : "rgba(239,68,68,0.75)",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* X Axis (aligned under plot area only) */}
      <div className="mt-4 sm:mt-6" style={{ paddingLeft: leftAxisWidth }}>
        <div
          className="grid text-[10px] sm:text-xs text-muted-foreground"
          style={{ gridTemplateColumns: `repeat(${years.length}, minmax(0, 1fr))` }}
        >
          {years.map((y) => (
            <button
              key={y}
              type="button"
              className="text-center hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 rounded-md py-1"
              onClick={() => scrollToStoryYear(y)}
              aria-label={`Jump to ${y} story`}
            >
              {y}
            </button>
          ))}
        </div>

        {!isMobile ? (
          <div
            className="grid mt-2 text-[10px]"
            style={{ gridTemplateColumns: `repeat(${years.length}, minmax(0, 1fr))` }}
          >
            {years.map((y) => (
              <div key={y} className="flex items-center justify-center gap-3">
                <span className="text-[hsl(var(--candle-green-dark))]">● UP</span>
                {hasDownForYear(y) ? <span className="text-red-500">● DN</span> : null}
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {/* ✅ Legend centered in FULL card (no padding-left) */}
      <div className="flex justify-center gap-6 sm:gap-8 mt-4 sm:mt-6 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full" />
          Growth
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full" />
          Learning
        </div>
      </div>
    </div>
  );
}
