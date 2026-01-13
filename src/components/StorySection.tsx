import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type MediaKind = "image" | "video";

export interface StoryMediaItem {
  kind: MediaKind;
  src: string;
  alt: string;
  href?: string;
  label?: string;
}

interface StorySectionProps {
  type: "green" | "red";
  title: string;
  year: string;
  description: string;
  index: number;
  id?: string;
  media?: StoryMediaItem[];
  /** ✅ where the "Back to chart" should scroll */
  chartTargetId?: string; // default: "career-chart"
}

export default function StorySection({
  type,
  title,
  year,
  description,
  index,
  id,
  media,
  chartTargetId = "career-chart",
}: StorySectionProps) {
  const isMobile = useIsMobile();

  const fromRight = index % 2 === 0;
  const tilt = isMobile ? 0 : fromRight ? -6 : 6;

  const x = useMotionValue(0);
  const railBP = useMotionValue(0);
  const [paused, setPaused] = useState(false);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [cardW, setCardW] = useState<number>(420);
  const gap = isMobile ? 14 : 18;

  const cards = useMemo<StoryMediaItem[]>(() => {
    if (media && media.length) return media;
    return Array.from({ length: 6 }).map((_, i) => ({
      kind: i % 3 === 0 ? "video" : "image",
      src: "/placeholder.svg",
      alt: `Story media ${i + 1} for ${year}`,
      href: i % 2 === 0 ? "https://x.com/" : undefined,
      label: i % 3 === 0 ? "Video" : "Photo",
    }));
  }, [media, year]);

  const loopCards = useMemo(() => [...cards, ...cards], [cards]);

  useEffect(() => {
    const calc = () => {
      const vp = viewportRef.current?.getBoundingClientRect().width ?? window.innerWidth;

      if (isMobile) {
        setCardW(Math.max(260, Math.min(340, Math.floor(vp * 0.82))));
      } else {
        setCardW(Math.max(380, Math.min(520, Math.floor(vp * 0.28))));
      }
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [isMobile]);

  const loopDistance = (cardW + gap) * cards.length;

  useEffect(() => {
    if (paused) return;
    if (!loopDistance) return;

    x.set(0);

    const controls = animate(x, [0, -loopDistance], {
      duration: isMobile ? 22 : 20,
      ease: "linear",
      repeat: Infinity,
    });

    return () => controls.stop();
  }, [paused, loopDistance, isMobile, x]);

  useEffect(() => {
    const distance = 1400;
    railBP.set(0);

    const controls = animate(railBP, [0, -distance], {
      duration: isMobile ? 11 : 9,
      ease: "linear",
      repeat: Infinity,
    });

    return () => controls.stop();
  }, [railBP, isMobile]);

  const dotClass =
    type === "green" ? "bg-[hsl(var(--candle-green))]" : "bg-[hsl(var(--candle-red))]";

  const accentText =
    type === "green" ? "text-[hsl(var(--candle-green))]" : "text-[hsl(var(--candle-red))]";

  const accentBorder =
    type === "green"
      ? "border-[hsl(var(--candle-green))]/20"
      : "border-[hsl(var(--candle-red))]/20";

  const badge = type === "green" ? "Achievement" : "Lesson";

  const badgeChip =
    type === "green"
      ? "bg-[hsl(var(--candle-green))]/12 text-[hsl(var(--candle-green))] border-[hsl(var(--candle-green))]/25"
      : "bg-[hsl(var(--candle-red))]/12 text-[hsl(var(--candle-red))] border-[hsl(var(--candle-red))]/25";

  const plateBg =
    type === "green" ? "bg-[hsl(var(--candle-green))]/10" : "bg-[hsl(var(--candle-red))]/8";

  const isXLink = (href?: string) => {
    if (!href) return false;
    const h = href.toLowerCase();
    return h.includes("x.com") || h.includes("twitter.com");
  };

  const goToChart = () => {
    const el = document.getElementById(chartTargetId);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    try {
      window.history.replaceState(null, "", `#${chartTargetId}`);
    } catch {}
  };

  const floatLift = isMobile ? 0 : -10;

  return (
    <motion.section
      id={id}
      className="relative min-w-0 scroll-mt-24"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* ✅ STORY TEXT CARD */}
      <div className="relative z-50">
        <div className="mx-auto max-w-[720px] rounded-[28px] bg-[hsl(var(--background))]">
          <div
            className={[
              "relative overflow-hidden rounded-[28px] border bg-card",
              "shadow-[0_18px_70px_-55px_rgba(0,0,0,0.85)]",
              "px-5 py-5 sm:px-7 sm:py-7",
              "min-h-[196px] sm:min-h-[220px]",
              "flex flex-col",
              accentBorder,
            ].join(" ")}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
            <div
              className={[
                "pointer-events-none absolute -top-24 left-1/2 h-48 w-[520px] -translate-x-1/2 rounded-full blur-3xl opacity-40",
                type === "green"
                  ? "bg-[hsl(var(--candle-green))]/30"
                  : "bg-[hsl(var(--candle-red))]/24",
              ].join(" ")}
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-white/10" />

            {/* header row */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className={`h-2.5 w-2.5 rounded-full ${dotClass}`} />
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] font-medium text-muted-foreground">
                  <span className="opacity-80">Year</span>
                  <span className="text-foreground/90">{year}</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goToChart}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] font-medium text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black/25"
                >
                  ↖ Back to chart
                </button>

                <span
                  className={[
                    "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[12px] font-semibold",
                    badgeChip,
                  ].join(" ")}
                >
                  {type === "green" ? "📈" : "📚"} {badge}
                </span>
              </div>
            </div>

            {/* title */}
            <h3 className="mt-4 text-[18px] sm:text-[20px] font-semibold leading-tight tracking-[-0.02em]">
              <span className={accentText}>{title}</span>
            </h3>

            {/* description */}
            <p className="mt-3 text-[14px] sm:text-[15px] text-muted-foreground leading-relaxed line-clamp-4">
              {description}
            </p>

            {/* bottom meta row */}
            <div className="mt-auto pt-5 flex items-center justify-between">
              <div className="text-[12px] text-muted-foreground/90">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
                  <span>Moment • Story timeline</span>
                </span>
              </div>

              <div className="text-[12px] font-medium text-muted-foreground/90">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
                  <span>Scroll to explore</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* spacing */}
      <div className="relative mt-14 sm:mt-16">
        <div className="relative isolate overflow-visible lg:mx-[calc(50%-50vw)]">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 z-40" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 z-40" />

          {/* ✅ ONE WRAPPER rotated + flipped (stable tilt) */}
          <div
            className="relative overflow-visible"
            style={{
              transform: isMobile ? "none" : `rotate(${tilt}deg)`,
              transformOrigin: "center",
            }}
          >
            {/* rail */}
            <div
              className="pointer-events-none absolute left-1/2 -translate-x-1/2 z-0"
              style={{
                top: isMobile ? "58%" : "60%",
                width: isMobile ? "260vw" : "320vw",
              }}
            >
              <div className="h-[3px] w-full rounded-full bg-black/12" />
              {!isMobile ? <div className="mt-3 h-[16px] w-full bg-black/6 blur-[12px]" /> : null}

              <motion.div
                className="mt-[-10px] h-[3px] w-full opacity-85"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to right, rgba(0,0,0,0.0) 0px, rgba(0,0,0,0.0) 18px, rgba(0,0,0,0.18) 18px, rgba(0,0,0,0.18) 34px)",
                  backgroundPositionX: railBP,
                }}
              />

              <motion.div
                className="mt-[6px] h-[2px] w-full opacity-35"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to right, rgba(0,0,0,0.0) 0px, rgba(0,0,0,0.0) 30px, rgba(0,0,0,0.12) 30px, rgba(0,0,0,0.12) 56px)",
                  backgroundPositionX: railBP,
                }}
              />
            </div>

            {/* viewport */}
            <div
              ref={viewportRef}
              className={["relative z-10 overflow-visible", isMobile ? "pt-12 pb-12" : "pt-16 pb-18"].join(
                " "
              )}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <motion.div
                className="flex items-center will-change-transform"
                style={{
                  x,
                  gap,
                  paddingLeft: isMobile ? 16 : 64,
                  paddingRight: isMobile ? 16 : 64,
                }}
                drag="x"
                dragConstraints={{ left: -999999, right: 999999 }}
                dragElastic={0.06}
                onDragStart={() => setPaused(true)}
                onDragEnd={() => setPaused(false)}
              >
                {loopCards.map((c, i) => {
                  const clickable = Boolean(c.href);
                  const showX = isXLink(c.href);

                  const Wrapper: any = clickable ? "a" : "div";
                  const wrapperProps = clickable
                    ? { href: c.href, target: "_blank", rel: "noreferrer" }
                    : {};

                  return (
                    <motion.div
                      key={`${c.src}-${i}`}
                      className="shrink-0 relative z-20"
                      style={{
                        width: cardW,
                        y: floatLift,
                      }}
                      whileHover={
                        isMobile ? undefined : { y: floatLift - 4, rotate: fromRight ? -1.2 : 1.2 }
                      }
                      transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    >
                      <Wrapper
                        {...wrapperProps}
                        className={[
                          "relative block rounded-2xl",
                          clickable
                            ? "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black/25"
                            : "cursor-default",
                        ].join(" ")}
                      >
                        <div
                          className={[
                            "absolute -inset-0.5 rounded-[1.35rem] -z-10",
                            plateBg,
                            "shadow-[0_30px_90px_-55px_rgba(0,0,0,0.65)]",
                            "translate-x-2 translate-y-2",
                          ].join(" ")}
                        />

                        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-[0_22px_70px_-55px_rgba(0,0,0,0.75)] transition-shadow duration-200 hover:shadow-[0_26px_86px_-58px_rgba(0,0,0,0.85)]">
                          <div className="relative aspect-[16/9] bg-muted/35">
                            <img
                              src={c.src}
                              alt={c.alt}
                              className="h-full w-full object-cover"
                              loading="lazy"
                              draggable={false}
                            />

                            {c.kind === "video" ? (
                              <div className="absolute inset-0 grid place-items-center bg-black/10">
                                <div className="h-12 w-12 rounded-full bg-white/90 shadow-md grid place-items-center">
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M9 18V6l12 6-12 6Z" fill="currentColor" />
                                  </svg>
                                </div>
                              </div>
                            ) : null}

                            <div className="absolute left-3 top-3">
                              <span className="bc-pill">{c.label ?? "Story"}</span>
                            </div>
                          </div>

                          <div className="p-4 min-h-[64px]">
                            <div className="flex items-center justify-between gap-3">
                              <div className="text-sm font-semibold">{year} moment</div>
                              {clickable ? <div className="text-xs text-muted-foreground">Open ↗</div> : null}
                            </div>

                            {showX ? <div className="mt-1 text-xs text-muted-foreground">View on X</div> : null}
                          </div>

                          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/14 via-transparent to-transparent" />
                        </div>
                      </Wrapper>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
