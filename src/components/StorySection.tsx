import { motion, useMotionValue } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

type MediaKind = "image" | "video";
type MediaVariant = "none" | "single" | "rail";

export interface StoryMediaItem {
  kind: MediaKind;
  src: string; // image src or video src
  alt: string;
  href?: string;
  label?: string;
  poster?: string; // optional: for videos
  /**
   * How the media should fit inside the 16:9 frame.
   * - cover (default): fills the frame (may crop)
   * - contain: shows the full media without cropping
   */
  fit?: "cover" | "contain";
}

interface StorySectionProps {
  type: "green" | "red";
  title: string;
  subtitle?: string;
  year: string;
  description: string;
  index: number;
  id?: string;

  content?: string[];
  highlights?: string[];

  mediaVariant?: MediaVariant;
  media?: StoryMediaItem[];
}

function RichBlock({
  content,
  highlights,
}: {
  content?: string[];
  highlights?: string[];
}) {
  const lines = (content ?? []).flatMap((p) =>
    p
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean)
  );

  const blocks: Array<
    | { type: "h3"; text: string }
    | { type: "p"; text: string }
    | { type: "spacer" }
  > = [];

  for (const ln of lines) {
    if (ln.startsWith("### ")) {
      blocks.push({ type: "h3", text: ln.replace(/^###\s+/, "") });
      continue;
    }
    if (ln === "---") {
      blocks.push({ type: "spacer" });
      continue;
    }
    blocks.push({ type: "p", text: ln });
  }

  return (
    <div className="space-y-4">
      {blocks.map((b, i) => {
        if (b.type === "spacer") return <div key={i} className="h-2" />;
        if (b.type === "h3") {
          return (
            <h4
              key={i}
              className="text-base sm:text-lg font-semibold tracking-[-0.01em] text-foreground"
            >
              {b.text}
            </h4>
          );
        }
        return (
          <p
            key={i}
            className="text-sm sm:text-[15px] leading-relaxed text-muted-foreground"
          >
            {b.text}
          </p>
        );
      })}

      {highlights?.length ? (
        <div className="pt-2">
          <div className="text-sm font-semibold text-foreground">
            Key highlights
          </div>
          <ul className="mt-3 space-y-2">
            {highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/60" />
                <span className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
                  {h}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default function StorySection({
  type,
  title,
  subtitle,
  year,
  description,
  index,
  id,
  mediaVariant = "rail",
  media,
  content,
  highlights,
}: StorySectionProps) {
  const isMobile = useIsMobile();
  const fromRight = index % 2 === 0;

  const showRail = mediaVariant === "rail";
  const showSingle = mediaVariant === "single";
  const showNone = mediaVariant === "none";

  const x = useMotionValue(0);
  const [paused, setPaused] = useState(false);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [vpW, setVpW] = useState(0);
  const [cardW, setCardW] = useState<number>(420);
  const gap = isMobile ? 14 : 18;

  const cards = useMemo<StoryMediaItem[]>(() => {
    if (!media || !media.length) return [];
    return media;
  }, [media]);

  // measure viewport width (used to repeat enough cards so it never "ends")
  useEffect(() => {
    if (!showRail) return;

    const calc = () => {
      const rect = viewportRef.current?.getBoundingClientRect();
      const w = rect?.width ?? window.innerWidth;
      setVpW(w);

      if (isMobile) {
        setCardW(Math.max(260, Math.min(340, Math.floor(w * 0.82))));
      } else {
        setCardW(Math.max(380, Math.min(520, Math.floor(w * 0.28))));
      }
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [isMobile, showRail]);

  // one "base" loop distance (only original cards count)
  const baseLoopDistance = useMemo(() => {
    if (!showRail) return 0;
    if (!cards.length) return 0;
    return (cardW + gap) * cards.length;
  }, [showRail, cardW, gap, cards.length]);

  // ✅ build a long enough sequence so there's NEVER a visible end on ultra-wide screens
  const loopCards = useMemo(() => {
    if (!showRail) return [];
    if (!cards.length) return [];

    // minimum total width we want rendered:
    // viewport + 2 loops buffer (so wrap is never visible)
    const minTotal = (vpW || 1200) + baseLoopDistance * 2;

    const oneSetW = (cardW + gap) * cards.length;
    const repeats = Math.max(3, Math.ceil(minTotal / Math.max(1, oneSetW)));

    const out: StoryMediaItem[] = [];
    for (let r = 0; r < repeats; r++) out.push(...cards);
    return out;
  }, [showRail, cards, vpW, baseLoopDistance, cardW, gap]);

  // ✅ NO-GLITCH infinite loop (wrap math, no snapping)
  useEffect(() => {
    if (!showRail) return;
    if (!baseLoopDistance) return;

    let raf = 0;
    let last = performance.now();
    const duration = isMobile ? 22 : 20; // same feel
    const speed = baseLoopDistance / duration; // px/sec

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      if (!paused) {
        let next = x.get() - speed * dt;

        // wrap smoothly using ONLY baseLoopDistance (one original set)
        if (next <= -baseLoopDistance) next += baseLoopDistance;
        if (next > 0) next -= baseLoopDistance;

        x.set(next);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, baseLoopDistance, isMobile, x, showRail]);

  const dotClass =
    type === "green"
      ? "bg-[hsl(var(--candle-green))]"
      : "bg-[hsl(var(--candle-red))]";

  const accentText =
    type === "green"
      ? "text-[hsl(var(--candle-green))]"
      : "text-[hsl(var(--candle-red))]";

  const accentBorder =
    type === "green"
      ? "border-[hsl(var(--candle-green))]/20"
      : "border-[hsl(var(--candle-red))]/20";

  const plateBg =
    type === "green"
      ? "bg-[hsl(var(--candle-green))]/10"
      : "bg-[hsl(var(--candle-red))]/8";

  const isXLink = (href?: string) => {
    if (!href) return false;
    const h = href.toLowerCase();
    return h.includes("x.com") || h.includes("twitter.com");
  };

  const floatLift = isMobile ? 0 : -10;
  const hoverRotate = fromRight ? -1.2 : 1.2;

  const hasReadMore = Boolean(
    (content && content.length) || (highlights && highlights.length)
  );

  const fitClass = (fit?: StoryMediaItem["fit"]) =>
    fit === "contain" ? "object-contain" : "object-cover";

  const single = showSingle ? cards[0] : null;

  return (
    <motion.section
      id={id}
      className="relative min-w-0"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* TEXT CARD */}
      <div className="relative z-50">
        <div className="mx-auto max-w-[760px]">
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

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className={`h-2.5 w-2.5 rounded-full ${dotClass}`} />
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] font-medium text-muted-foreground">
                  <span className="opacity-80">Year</span>
                  <span className="text-foreground/90">{year}</span>
                </span>
              </div>
            </div>

            <h3 className="mt-4 text-[18px] sm:text-[20px] font-semibold leading-tight tracking-[-0.02em]">
              <span className={accentText}>{title}</span>
            </h3>

            {subtitle ? (
              <div className="mt-2 text-[13px] sm:text-[14px] text-muted-foreground">
                {subtitle}
              </div>
            ) : null}

            <p className="mt-3 text-[14px] sm:text-[15px] text-muted-foreground leading-relaxed line-clamp-5">
              {description}
            </p>

            {hasReadMore ? (
              <div className="mt-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="bc-hoverlift">
                      Read more
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="w-[calc(100vw-24px)] max-w-[calc(100vw-24px)] sm:max-w-[860px] p-0 overflow-hidden">
                    <div className="p-5 sm:p-6 border-b border-border">
                      <DialogHeader>
                        <DialogTitle className="text-lg sm:text-xl font-semibold tracking-[-0.02em]">
                          {title}{" "}
                          <span className="text-muted-foreground font-medium">
                            · {year}
                          </span>
                        </DialogTitle>
                      </DialogHeader>
                    </div>

                    <ScrollArea className="max-h-[72vh]">
                      <div className="p-5 sm:p-6">
                        <RichBlock content={content} highlights={highlights} />
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* MEDIA */}
      {showNone ? null : showSingle ? (
        single ? (
          <div className="relative mt-10 sm:mt-12">
            <div className="mx-auto max-w-[760px] px-3 sm:px-0">
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <div
                  className={[
                    "absolute -inset-0.5 rounded-[1.6rem] -z-10",
                    plateBg,
                    "shadow-[0_30px_90px_-55px_rgba(0,0,0,0.65)]",
                    "translate-x-2 translate-y-2",
                  ].join(" ")}
                />
                <div className="relative rounded-[1.4rem] border border-border bg-card overflow-hidden shadow-[0_22px_70px_-55px_rgba(0,0,0,0.75)]">
                  <div className="relative aspect-[16/9] bg-muted/35">
                    {single.kind === "video" ? (
                      <video
                        className={"h-full w-full " + fitClass(single.fit)}
                        src={single.src}
                        poster={single.poster}
                        preload="metadata"
                        muted
                        playsInline
                        loop
                        autoPlay
                      />
                    ) : (
                      <img
                        src={single.src}
                        alt={single.alt}
                        className={"h-full w-full " + fitClass(single.fit)}
                        loading="lazy"
                        draggable={false}
                      />
                    )}
                    <div className="pointer-events-none absolute inset-0 rounded-[1.4rem] bg-gradient-to-br from-white/14 via-transparent to-transparent" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        ) : null
      ) : showRail && cards.length ? (
        <div className="relative mt-14 sm:mt-16">
          {/* ✅ Prevent page-level horizontal overflow */}
          <div className="relative overflow-x-hidden">
            {/* ✅ Full-bleed rail without widening the document */}
            <div className="relative left-1/2 w-screen -translate-x-1/2">
              <div
                ref={viewportRef}
                className={[
                  "relative z-10",
                  isMobile ? "pt-10 pb-10" : "pt-14 pb-16",
                ].join(" ")}
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
                        style={{ width: cardW, y: floatLift }}
                        whileHover={
                          isMobile
                            ? undefined
                            : { y: floatLift - 4, rotate: hoverRotate }
                        }
                        transition={{ type: "spring", stiffness: 260, damping: 22 }}
                      >
                        <Wrapper
                          {...wrapperProps}
                          className={[
                            "relative block rounded-2xl",
                            clickable
                              ? "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black/25 dark:focus-visible:ring-white/20"
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

                          <div className="relative rounded-2xl border border-border bg-card overflow-hidden shadow-[0_22px_70px_-55px_rgba(0,0,0,0.75)] transition-shadow duration-200 hover:shadow-[0_26px_86px_-58px_rgba(0,0,0,0.85)]">
                            <div className="relative aspect-[16/9] bg-muted/35">
                              {c.kind === "video" ? (
                                <video
                                  className={`h-full w-full ${fitClass(c.fit)}`}
                                  src={c.src}
                                  poster={c.poster}
                                  preload="metadata"
                                  muted
                                  playsInline
                                  loop
                                  autoPlay
                                />
                              ) : (
                                <img
                                  src={c.src}
                                  alt={c.alt}
                                  className={`h-full w-full ${fitClass(c.fit)}`}
                                  loading="lazy"
                                  draggable={false}
                                />
                              )}

                              {/* overlay play icon for video */}
                              {c.kind === "video" ? (
                                <div className="pointer-events-none absolute inset-0 grid place-items-center bg-black/10 dark:bg-black/35">
                                  <div className="h-12 w-12 rounded-full bg-white/90 dark:bg-black/70 border border-black/10 dark:border-white/15 shadow-md grid place-items-center">
                                    <svg
                                      width="18"
                                      height="18"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      aria-hidden="true"
                                      className="text-black dark:text-white"
                                    >
                                      <path
                                        d="M9 18V6l12 6-12 6Z"
                                        fill="currentColor"
                                      />
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
                                <div className="text-sm font-semibold">
                                  {year} moment
                                </div>
                                {clickable ? (
                                  <div className="text-xs text-muted-foreground">
                                    Open ↗
                                  </div>
                                ) : null}
                              </div>

                              {showX ? (
                                <div className="mt-1 text-xs text-muted-foreground">
                                  View on X
                                </div>
                              ) : null}
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
      ) : null}
    </motion.section>
  );
}
