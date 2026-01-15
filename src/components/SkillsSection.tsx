import { motion } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";

const skillCards = [
  {
    category: "Frontend",
    year: "2025",
    title: "React & TypeScript",
    desc: "Interfaces that feel premium — fast, responsive, pixel-tight.",
    tags: ["Expert", "UI polish"],
    tone: "amber",
    rotation: -6,
    pos: { top: 54, left: 46 },
    z: 4,
  },
  {
    category: "Backend",
    year: "2024",
    title: "Node.js & APIs",
    desc: "Reliable systems, clean contracts, and realtime patterns.",
    tags: ["Strong", "Systems"],
    tone: "blue",
    rotation: 7,
    pos: { top: 84, left: 304 },
    z: 3,
  },
  {
    category: "Design",
    year: "2024",
    title: "UI/UX & Figma",
    desc: "Design that ships — crisp flows, prototypes, and product taste.",
    tags: ["Figma", "Polish"],
    tone: "emerald",
    rotation: -3,
    pos: { top: 270, left: 96 },
    z: 2,
  },
  {
    category: "Growth",
    year: "2022",
    title: "Skill Stacking",
    desc: "Curiosity-first learning — I pick up tools fast and apply it.",
    tags: ["Curious", "Fast learner"],
    tone: "pink",
    rotation: 8,
    pos: { top: 314, left: 354 },
    z: 1,
  },
];

const toneMap: Record<
  string,
  {
    line: string;
    chipBg: string;
    chipText: string;
    ring: string;
    glow: string;
  }
> = {
  amber: {
    line: "bg-amber-500",
    chipBg: "bg-amber-500/10",
    chipText: "text-amber-700 dark:text-amber-300",
    ring: "ring-amber-500/25",
    glow: "shadow-[0_30px_90px_rgba(245,158,11,0.18)]",
  },
  blue: {
    line: "bg-blue-500",
    chipBg: "bg-blue-500/10",
    chipText: "text-blue-700 dark:text-blue-300",
    ring: "ring-blue-500/25",
    glow: "shadow-[0_30px_90px_rgba(59,130,246,0.18)]",
  },
  emerald: {
    line: "bg-emerald-500",
    chipBg: "bg-emerald-500/10",
    chipText: "text-emerald-700 dark:text-emerald-300",
    ring: "ring-emerald-500/25",
    glow: "shadow-[0_30px_90px_rgba(34,197,94,0.18)]",
  },
  pink: {
    line: "bg-pink-500",
    chipBg: "bg-pink-500/10",
    chipText: "text-pink-700 dark:text-pink-300",
    ring: "ring-pink-500/25",
    glow: "shadow-[0_30px_90px_rgba(236,72,153,0.18)]",
  },
};

function SkillNote({
  card,
  compact,
  active,
  hoverable,
  style,
  onEnter,
  onLeave,
}: {
  card: (typeof skillCards)[number];
  compact?: boolean;
  active?: boolean;
  hoverable?: boolean;
  style?: React.CSSProperties;
  onEnter?: () => void;
  onLeave?: () => void;
}) {
  const t = toneMap[card.tone];

  return (
    <motion.div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      id="skills"
      className={[
        "relative overflow-hidden rounded-2xl",
        "bg-white/92 dark:bg-white/6",
        "border border-black/10 dark:border-white/10",
        "backdrop-blur-md",
        "shadow-[0_16px_55px_rgba(0,0,0,0.12)]",
        "ring-1",
        active ? `${t.ring} ${t.glow}` : "ring-black/5 dark:ring-white/10",
      ].join(" ")}
      style={style}
      whileHover={hoverable ? { rotate: 0, scale: 1.045, y: -7 } : undefined}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      <div className="absolute left-0 top-0 w-full h-[3px]">
        <div className={`h-full w-full ${t.line}`} />
      </div>

      <div
        className="absolute -top-20 -left-20 h-52 w-52 rounded-full opacity-40 blur-2xl"
        style={{
          background:
            card.tone === "amber"
              ? "rgba(245,158,11,0.22)"
              : card.tone === "blue"
              ? "rgba(59,130,246,0.20)"
              : card.tone === "emerald"
              ? "rgba(34,197,94,0.20)"
              : "rgba(236,72,153,0.20)",
        }}
      />

      <div className="relative p-4 sm:p-5">
        <div className="flex items-start justify-between">
          <div className="text-xs font-semibold text-foreground/80">
            {card.category}
          </div>
          <div className="text-[11px] text-foreground/45">{card.year}</div>
        </div>

        <div
          className={[
            "mt-2 font-extrabold leading-snug text-foreground",
            compact ? "text-[16px]" : "text-[22px]",
          ].join(" ")}
        >
          {card.title}
        </div>

        <div
          className={[
            "mt-2 leading-relaxed text-foreground/70",
            compact ? "text-[12px]" : "text-[14px]",
          ].join(" ")}
        >
          {card.desc}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {card.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className={[
                "px-3 py-1 rounded-full text-[11px] font-medium",
                "border border-black/10 dark:border-white/10",
                "bg-black/5 dark:bg-white/7",
                t.chipText,
              ].join(" ")}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4">
          <span
            className={[
              "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold",
              t.chipBg,
              t.chipText,
              "border border-black/10 dark:border-white/10",
            ].join(" ")}
          >
            <span className={`h-2 w-2 rounded-full ${t.line}`} />
            Highlight
          </span>
        </div>
      </div>
    </motion.div>
  );
}

const SkillsSection = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const mobileRot = useMemo(() => [-2, 2, -1, 2], []);
  const deckRef = useRef<HTMLDivElement | null>(null);
  const [deckSize, setDeckSize] = useState({ w: 0, h: 0 });

  // Measure the deck so we can scale the whole "scene" to never overflow
  useEffect(() => {
    if (!deckRef.current) return;

    const el = deckRef.current;
    const ro = new ResizeObserver((entries) => {
      const r = entries[0]?.contentRect;
      if (!r) return;
      setDeckSize({ w: r.width, h: r.height });
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // IMPORTANT: baseline scene size (fits your exact original positions)
  // We scale this entire scene down when the container is smaller.
  const BASE_W = 720; // maxLeft(354) + cardW(330) + margin
  const BASE_H = 600; // gives bottom room so it never clips in smaller panels
  const HOVER_FACTOR = 1.045; // keep your original hover scale feel
  const SAFE_PAD = 18; // internal safe padding (prevents edges clipping)

  const sceneScale = useMemo(() => {
    const w = deckSize.w || 1;
    const h = deckSize.h || 1;

    const availW = Math.max(1, w - SAFE_PAD * 2);
    const availH = Math.max(1, h - SAFE_PAD * 2);

    const sW = availW / (BASE_W * HOVER_FACTOR);
    const sH = availH / (BASE_H * HOVER_FACTOR);

    return Math.min(1, sW, sH);
  }, [deckSize.w, deckSize.h]);

  // Center scene horizontally a bit like your screenshot (not spread)
  const sceneOffset = useMemo(() => {
    const w = deckSize.w || 0;
    const scaledW = BASE_W * sceneScale;
    const left = Math.max(SAFE_PAD, (w - scaledW) / 2);
    return { left, top: SAFE_PAD };
  }, [deckSize.w, sceneScale]);

  return (
    <section id="skills" className="bc-section bc-section-lime">
      <div className="bc-container">
        <div className="bc-card p-6 sm:p-10 relative overflow-hidden">
          {/* ✅ Light mode background: DO NOT TOUCH */}

          {/* ✅ Dark mode background: only dark gets custom bg (kept as-is) */}
          <div className="absolute inset-0 pointer-events-none hidden dark:block">
            <div className="absolute inset-0 bg-[#07090c]" />
            <div
              className="absolute inset-0 opacity-90"
              style={{
                background:
                  "radial-gradient(70% 60% at 18% 18%, rgba(34,197,94,0.12), rgba(0,0,0,0) 55%), radial-gradient(70% 60% at 80% 28%, rgba(236,72,153,0.10), rgba(0,0,0,0) 55%), radial-gradient(90% 80% at 50% 95%, rgba(59,130,246,0.08), rgba(0,0,0,0) 60%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.18]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
                backgroundSize: "34px 34px",
              }}
            />
          </div>

          <div className="relative z-10">
            <div className="inline-flex mb-6">
              <span className="bc-pill-dark">Skills</span>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-start">
              {/* LEFT */}
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
                  Because understanding means nothing until you{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-lime-500 to-pink-500">
                    create
                  </span>
                </h2>

                <p className="text-muted-foreground text-base sm:text-lg max-w-xl">
                  My core stack that turns ideas into shipped products — from clean UI to solid APIs.
                </p>

               

                <ul className="space-y-3 text-sm sm:text-base text-foreground/80">
                  {[
                    "Frontend development (React, TypeScript, Next.js patterns)",
                    "Backend APIs (Node.js, REST, realtime & sockets)",
                    "UI/UX design (Figma, prototypes, interaction polish)",
                    "Product thinking + execution under pressure",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-black/5 dark:bg-white/10">
                        ✦
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* RIGHT */}
              <div className="relative">
                {/* ✅ MOBILE: no scroll, all visible */}
                <div className="lg:hidden">
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {skillCards.map((card, idx) => (
                      <SkillNote
                        key={idx}
                        card={card}
                        compact
                        style={{
                          transform: `rotate(${mobileRot[idx % mobileRot.length]}deg)`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* ✅ DESKTOP: SAME OVERLAP STYLE, but scaled scene so it NEVER overflows */}
                <div className="hidden lg:block">
                  <div
                    ref={deckRef}
                    className="relative h-[520px] w-full overflow-hidden rounded-3xl"
                  >
                    <div className="absolute inset-0 rounded-3xl border border-black/5 dark:border-white/10 bg-white/45 dark:bg-white/5 backdrop-blur-md" />

                    {/* scaled "scene" */}
                    <div
                      className="absolute"
                      style={{
                        left: sceneOffset.left,
                        top: sceneOffset.top,
                        width: BASE_W,
                        height: BASE_H,
                        transform: `scale(${sceneScale})`,
                        transformOrigin: "top left",
                      }}
                    >
                      {skillCards.map((card, i) => {
                        const isHovered = hovered === i;
                        return (
                          <SkillNote
                            key={i}
                            card={card}
                            active={isHovered}
                            hoverable
                            onEnter={() => setHovered(i)}
                            onLeave={() => setHovered(null)}
                            style={{
                              position: "absolute",
                              top: card.pos.top,
                              left: card.pos.left,
                              width: 330,
                              transform: `rotate(${card.rotation}deg)`,
                              zIndex: isHovered ? 99 : card.z,
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              {/* end right */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
