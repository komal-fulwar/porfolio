import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useIsMobile } from "@/hooks/use-mobile";

// ✅ Put avatar.png in the SAME folder as this file:
const AVATAR_SRC = new URL("./avatar.png", import.meta.url).toString();

export type CandleType = "up" | "down";

export interface Candle {
  year: string;
  type: CandleType;
  intensity: number;
  level: number; // 0(Start) -> 4.5(Moon-ish)
  title: string;
  description: string;
}

const MAX_LEVEL = 4.5;

/**
 * ✅ 2025 last candle is GREEN (down first, then up)
 */
export const CANDLE_DATA: Candle[] = [
  // 2020
  {
    year: "2020",
    type: "up",
    intensity: 26,
    level: 1.35,
    title: "Spark of curiosity",
    description:
      "A simple tech idea during COVID sparked my curiosity toward startups, problem-solving, and technology — the beginning of my journey.",
  },
  {
    year: "2020",
    type: "down",
    intensity: 22,
    level: 1.35,
    title: "Starting From Zero in a Tier-2 City",
    description:
      "Had ideas and ambition but lacked execution frameworks, technical knowledge, and direction — figuring everything out alone from scratch.",
  },

  // 2021
  {
    year: "2021",
    type: "up",
    intensity: 32,
    level: 2.1,
    title: "First Real-World Exposure",
    description:
      "Entered real communities and programs, gaining hands-on exposure by executing initiatives and learning fast in public.",
  },
  {
    year: "2021",
    type: "down",
    intensity: 26,
    level: 2.1,
    title: "Too Many Paths, No Map",
    description:
      "While executing and managing large-scale initiatives, I was personally unsure about long-term direction — without the right mentors to navigate choices.",
  },

  // 2022-23
  {
    year: "2022-23",
    type: "up",
    intensity: 40,
    level: 3.05,
    title: "Entering Web3 With Lumos Labs",
    description:
      "Landed my first proper Web3 role, leading community programs, partnerships, hackathons, and large-scale events.",
  },
  {
    year: "2022-23",
    type: "down",
    intensity: 30,
    level: 3.05,
    title: "Bull Dreams, Bear Lessons",
    description:
      "Bull to bear taught hard lessons — watching narratives rise and disappear overnight was unsettling, but it taught me to build with conviction.",
  },

  // 2024
  {
    year: "2024",
    type: "up",
    intensity: 52,
    level: 4.05,
    title: "Going Global with Capx AI",
    description:
      "Led growth and ecosystem efforts at Capx AI — owning ideation → builder outreach → operations → demo day, while continuously upskilling in AI.",
  },
  {
    year: "2024",
    type: "down",
    intensity: 36,
    level: 4.05,
    title: "New model everyday!!!!",
    description:
      "First deep year in AI during extreme ecosystem acceleration. Learned to stay grounded, execute consistently, and build conviction beyond hype.",
  },

  // 2025 (RED then GREEN)
  {
    year: "2025",
    type: "down",
    intensity: 30,
    level: 4.2,
    title: "COVID",
    description:
      "Contracted COVID during peak execution — forcing a temporary slowdown and a rethink on pace, health, and sustainability.",
  },
  {
    year: "2025",
    type: "up",
    intensity: 58,
    level: 4.2,
    title: "deAI era with Aethir",
    description:
      "Built Aethir India end-to-end across brand, content, community, partnerships, IRL — driving early B2B, ecosystem, and institutional momentum in the deAI era.",
  },
];

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function IconMoon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 14.5A8.5 8.5 0 0 1 9.5 3a7 7 0 1 0 11.5 11.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconGrowth() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 17l6-6 4 4 6-8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 7v6h-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
      <path
        d="M4 19V7l8-3 8 3v12l-8-3-8 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
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
    hasStory: boolean;
  } | null>(null);

  const [crosshair, setCrosshair] = useState<{ x: number; y: number } | null>(null);
  const plotRef = useRef<HTMLDivElement | null>(null);

  const years = useMemo(() => Array.from(new Set(CANDLE_DATA.map((d) => d.year))), []);

  // ✅ Responsive sizing
  const plotHeight = isMobile ? 250 : 340;
  const leftAxisWidth = isMobile ? 74 : 165;

  const bodyScale = isMobile ? 0.85 : 1.35;
  const candleWidth = isMobile ? 10 : 16;
  const wickTop = isMobile ? 10 : 14;
  const wickBottom = isMobile ? 10 : 14;

  const perYearOffset = isMobile ? 7 : 18;
  const upDownOffsetY = isMobile ? 7 : 12;

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

  const getIsDark = () =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark");

  const dottedLine = (dir: "x" | "y") => {
    const dot = getIsDark() ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.18)";
    return {
      backgroundImage:
        dir === "y"
          ? `repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 6px, ${dot} 6px, ${dot} 8px)`
          : `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 6px, ${dot} 6px, ${dot} 8px)`,
    };
  };

  // ✅ Normalize year -> id
  const normalizeYearForId = (year: string) => {
    const y = year.trim();
    const dashFixed = y.replace(/[–—]/g, "-");
    if (dashFixed === "2022-2023") return "2022-23";
    return dashFixed;
  };

  const resolveStoryId = (year: string) => {
    const ny = normalizeYearForId(year);

    // These match the IDs you’re using in Index.tsx (story-2025, story-2024, story-2022-23...)
    const candidates = [
      `story-${ny}`,
      `story-${ny}-green`,
      `story-${ny}-red`,
      ny === "2022-23" ? "story-2022-2023" : "",
      ny === "2022-2023" ? "story-2022-23" : "",
    ].filter(Boolean);

    for (const id of candidates) {
      const el = typeof document !== "undefined" ? document.getElementById(id) : null;
      if (el) return id;
    }
    return null;
  };

  const hasStoryForYear = (year: string) => Boolean(resolveStoryId(year));

  const scrollToStory = (year: string) => {
    const id = resolveStoryId(year);
    if (!id) return;

    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "start" });
    try {
      window.history.replaceState(null, "", `#${id}`);
    } catch {}
  };

  const showTooltip = (
    key: string,
    candle: Candle,
    el: HTMLElement | null,
    opts?: { snapCrosshair?: boolean }
  ) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const storyOk = hasStoryForYear(candle.year);
    setHovered({ key, candle, rect, hasStory: storyOk });

    // snap crosshair to candle center (desktop)
    const plotEl = plotRef.current;
    if (plotEl && (opts?.snapCrosshair ?? true)) {
      const pr = plotEl.getBoundingClientRect();
      const x = clamp(rect.left + rect.width / 2 - pr.left, 0, pr.width);
      const y = clamp(rect.top + rect.height / 2 - pr.top, 0, pr.height);
      setCrosshair({ x, y });
    }
  };

  const hideTooltip = () => setHovered(null);

  // ✅ Lock background scroll on mobile while tooltip is open
  useEffect(() => {
    if (!isMobile) return;
    if (!hovered) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev;
    };
  }, [hovered, isMobile]);

  const onPlotMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const el = plotRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = clamp(e.clientX - r.left, 0, r.width);
    const y = clamp(e.clientY - r.top, 0, r.height);
    setCrosshair({ x, y });
  };

  const onPlotLeave = () => {
    setCrosshair(null);
    hideTooltip();
  };

  const openStoryFromTooltip = () => {
    if (!hovered?.hasStory) return;
    const c = hovered.candle;
    hideTooltip();
    scrollToStory(c.year);
  };

  const TooltipOverlay = () => {
    if (!hovered) return null;

    const c = hovered.candle;
    const isUp = c.type === "up";

    // ✅ MOBILE: Portal + fixed overlay so nothing can cover it
    if (isMobile) {
      const overlay = (
        <div
          className="fixed inset-0"
          style={{ zIndex: 2147483647 }}
          role="dialog"
          aria-modal="true"
        >
          <button
            aria-label="Close"
            className="absolute inset-0 bg-black/45"
            onClick={() => {
              setCrosshair(null);
              hideTooltip();
            }}
          />

          <div className="absolute left-3 right-3 bottom-3">
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
                    <div className="text-[12px] text-muted-foreground">{c.year}</div>
                    <div className="mt-2 text-[16px] font-semibold leading-snug">
                      {c.title}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="shrink-0 h-9 w-9 rounded-xl border border-border bg-muted/40 text-foreground grid place-items-center"
                    onClick={() => {
                      setCrosshair(null);
                      hideTooltip();
                    }}
                    aria-label="Close"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                <div className="mt-3 text-[13px] text-muted-foreground leading-relaxed">
                  {c.description}
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    className={[
                      "h-10 px-4 rounded-xl border border-border text-sm font-semibold",
                      hovered.hasStory
                        ? "bg-muted/40"
                        : "bg-muted/20 opacity-60 cursor-not-allowed",
                    ].join(" ")}
                    onClick={openStoryFromTooltip}
                    disabled={!hovered.hasStory}
                  >
                    Open story
                  </button>

                  {hovered.hasStory ? (
                    <div className="text-[11px] text-muted-foreground">
                      Tip: tap candle again to jump
                    </div>
                  ) : (
                    <div className="text-[11px] text-muted-foreground">
                      No story section for this candle
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );

      return typeof document !== "undefined"
        ? createPortal(overlay, document.body)
        : null;
    }

    // ✅ DESKTOP: keep web behavior the same (anchored tooltip, no portal needed)
    const tooltipW = 390;
    const margin = 12;

    const ww = typeof window !== "undefined" ? window.innerWidth : 1200;
    let left = hovered.rect.left + hovered.rect.width / 2 - tooltipW / 2;
    left = clamp(left, margin, ww - tooltipW - margin);

    let top = hovered.rect.top - 14;
    const estimatedH = 190;

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
              <div className="text-[12px] text-muted-foreground">{c.year}</div>
              <div className="mt-2 text-[16px] font-semibold leading-snug">{c.title}</div>
              <div className="mt-3 text-[13px] text-muted-foreground leading-relaxed">
                {c.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const gridLineColor = getIsDark() ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";

  return (
    <div className="w-full">
      <TooltipOverlay />

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
                  borderColor: gridLineColor,
                }}
              />
            ))}
          </div>

          {/* Crosshair + Avatar (desktop only) */}
          {crosshair && !isMobile && (
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute top-0 bottom-0 w-px opacity-70"
                style={{ left: crosshair.x, ...dottedLine("y") }}
              />
              <div
                className="absolute left-0 right-0 h-px opacity-70"
                style={{ top: crosshair.y, ...dottedLine("x") }}
              />

              <div
                className="absolute"
                style={{
                  left: crosshair.x,
                  top: crosshair.y,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="h-9 w-9 rounded-full border border-white/20 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.8)] overflow-hidden bg-black/20">
                  <img
                    src={AVATAR_SRC}
                    alt="Avatar"
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Year columns */}
          <div
            className="absolute inset-0 grid"
            style={{ gridTemplateColumns: `repeat(${years.length}, minmax(0, 1fr))` }}
          >
            {years.map((year) => {
              const items = CANDLE_DATA.filter((d) => d.year === year);

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
                          width: "100%",
                          maxWidth: isMobile ? 56 : 70,
                        }}
                        role="button"
                        tabIndex={0}
                        onClick={(e) => {
                          const storyOk = hasStoryForYear(c.year);

                          if (isMobile) {
                            // ✅ If no story exists: only show tooltip
                            if (!storyOk) {
                              showTooltip(key, c, e.currentTarget as unknown as HTMLElement, {
                                snapCrosshair: false,
                              });
                              return;
                            }

                            // ✅ First tap shows tooltip, second tap jumps
                            if (hovered?.key === key) {
                              scrollToStory(c.year);
                              return;
                            }

                            showTooltip(key, c, e.currentTarget as unknown as HTMLElement, {
                              snapCrosshair: false,
                            });
                            return;
                          }

                          // ✅ Desktop click jumps (web stays as-is)
                          if (storyOk) scrollToStory(c.year);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            if (hasStoryForYear(c.year)) scrollToStory(c.year);
                          }
                        }}
                        onMouseEnter={(e) =>
                          showTooltip(key, c, e.currentTarget as unknown as HTMLElement)
                        }
                        onMouseLeave={hideTooltip}
                      >
                        <div className="relative mx-auto" style={{ width: candleWidth }}>
                          <div
                            className="w-px mx-auto"
                            style={{
                              height: wickTop,
                              backgroundColor: isUp
                                ? "rgba(34,197,94,0.75)"
                                : "rgba(239,68,68,0.75)",
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
                                background:
                                  "linear-gradient(90deg, rgba(255,255,255,0.20), rgba(255,255,255,0))",
                              }}
                            />
                          </div>
                          <div
                            className="w-px mx-auto"
                            style={{
                              height: wickBottom,
                              backgroundColor: isUp
                                ? "rgba(34,197,94,0.75)"
                                : "rgba(239,68,68,0.75)",
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

      {/* X Axis */}
      <div className="mt-4 sm:mt-6">
        <div style={{ paddingLeft: leftAxisWidth }}>
          <div
            className="grid text-[10px] sm:text-xs text-muted-foreground"
            style={{ gridTemplateColumns: `repeat(${years.length}, minmax(0, 1fr))` }}
          >
            {years.map((y) => {
              const ok = hasStoryForYear(y);
              return (
                <button
                  key={y}
                  type="button"
                  className={[
                    "text-center transition-colors rounded-md py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30",
                    ok ? "hover:text-foreground" : "opacity-50 cursor-not-allowed",
                  ].join(" ")}
                  onClick={() => {
                    if (!ok) return;
                    scrollToStory(y);
                  }}
                  aria-label={`Jump to ${y} story`}
                  disabled={!ok}
                >
                  {y}
                </button>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 sm:mt-6 flex items-center justify-center w-full text-xs sm:text-sm">
          <div className="inline-flex items-center justify-center gap-6 sm:gap-8">
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
      </div>
    </div>
  );
}
