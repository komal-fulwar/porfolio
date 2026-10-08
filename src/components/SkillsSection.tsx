import { motion } from "framer-motion";
import React, { useMemo, useRef, useState } from "react";

type Tone = "amber" | "blue" | "emerald" | "pink";
import gtmImg from "./gtm.png";
import communityImg from "./community.png";
import contentImg from "./content.png";
import growthImg from "/11.jpeg";


const skillCards = [
  {
    category: "GTM",
    title: "GTM & Market Entry",
    tone: "amber" as const,
    rotation: -6,
    pos: { top: 38, left: 42 },
    z: 4,
    image: gtmImg,
  },
  {
    category: "Community",
    title: "Community & Ecosystem Building",
    tone: "blue" as const,
    rotation: 7,
    pos: { top: 64, left: 292 },
    z: 3,
    image: "https://www.notion.so/image/attachment%3A1350aa23-ebea-4cbd-96f3-89b56845ce2d%3A57d6725f-793b-44f0-8982-a54269803d78.jpeg?table=block&id=2ead6181-d1a7-805e-aea0-d53f3d7e68e1&spaceId=e40a6633-b9f4-410a-a045-757a2508c818&width=1420&userId=&cache=v2",
  },
  {
    category: "Content",
    title: "Content & Storytelling",
    tone: "emerald" as const,
    rotation: -3,
    pos: { top: 232, left: 92 },
    z: 2,
    image: contentImg,
  },
  {
    category: "Growth",
    title: "Growth, Partnerships & KOLs",
    tone: "pink" as const,
    rotation: 8,
    pos: { top: 270, left: 332 },
    z: 1,
    image: growthImg,
  },
];


const toneMap: Record<
  Tone,
  {
    ring: string;
    glow: string;
    border: string;
  }
> = {
  amber: {
    ring: "ring-amber-500/25",
    glow: "shadow-[0_26px_80px_-40px_rgba(245,158,11,0.16)]",
    border: "border-amber-500/30",
  },
  blue: {
    ring: "ring-blue-500/25",
    glow: "shadow-[0_26px_80px_-40px_rgba(59,130,246,0.16)]",
    border: "border-blue-500/30",
  },
  emerald: {
    ring: "ring-emerald-500/25",
    glow: "shadow-[0_26px_80px_-40px_rgba(34,197,94,0.16)]",
    border: "border-emerald-500/30",
  },
  pink: {
    ring: "ring-pink-500/25",
    glow: "shadow-[0_26px_80px_-40px_rgba(236,72,153,0.16)]",
    border: "border-pink-500/30",
  },
};

function ImageCard({
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
      className={[
        "relative overflow-hidden rounded-2xl",
        "bg-white/92 dark:bg-white/6",
        "border border-black/10 dark:border-white/10",
        "backdrop-blur-md",
        "ring-1",
        active ? `${t.ring} ${t.glow}` : "ring-black/5 dark:ring-white/10",
      ].join(" ")}
      style={style}
      whileHover={hoverable ? { rotate: 0, scale: 1.045, y: -7 } : undefined}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      {/* subtle tint border for vibe */}
      <div
        className={[
          "absolute inset-0 pointer-events-none rounded-2xl border",
          t.border,
          "opacity-60",
        ].join(" ")}
      />

      {/* IMAGE ONLY */}
      <div
        className={[
          "relative w-full overflow-hidden",
          compact ? "aspect-[4/3]" : "aspect-[16/10]",
        ].join(" ")}
      >
        <img
          src={card.image}
          alt={card.title}
          className="h-full w-full object-cover"
          loading="lazy"
          draggable={false}
        />
        {/* soft top glass */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/14 via-transparent to-transparent" />
      </div>
    </motion.div>
  );
}

const SkillsSection = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const mobileRot = useMemo(() => [-2, 2, -1, 2], []);
  const deckRef = useRef<HTMLDivElement | null>(null);

  // desktop “scene” config (same idea as your old one)
  const BASE_W = 720;
  const BASE_H = 520;

  return (
    <section id="skills" className="bc-section bc-section-lime">
      <div className="bc-container">
        <div className="bc-card p-6 sm:p-9 relative overflow-hidden">
          {/* ✅ Light mode background stays as your theme provides (don’t touch) */}

          {/* ✅ Dark mode custom bg */}
          <div className="absolute inset-0 pointer-events-none hidden dark:block">
            <div className="absolute inset-0 bg-[#07090c]" />
            <div
              className="absolute inset-0 opacity-85"
              style={{
                background:
                  "radial-gradient(70% 60% at 18% 18%, rgba(34,197,94,0.12), rgba(0,0,0,0) 55%), radial-gradient(70% 60% at 80% 28%, rgba(236,72,153,0.10), rgba(0,0,0,0) 55%), radial-gradient(90% 80% at 50% 95%, rgba(59,130,246,0.08), rgba(0,0,0,0) 60%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.14]"
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

            {/* slightly tighter + smaller to match right */}
            <div className="grid lg:grid-cols-2 gap-10 items-stretch">
              {/* LEFT */}
              <div className="space-y-5">
                <h2 className="text-[40px] sm:text-[46px] lg:text-[52px] font-normal leading-tight tracking-tight text-foreground">
                  GM, I’m{" "}
                  <span className="text-white italic">
                    Anshita
                  </span>
                </h2>

                <div className="space-y-4 text-base sm:text-lg text-white/70 leading-relaxed max-w-xl font-light">
                  <p>
                    I build communities, narratives, and GTM strategies for Web3 and AI projects. 
                    (I also lose money on memecoins, purely for research)
                  </p>

                </div>

                <div className="pt-1">
                  <div className="text-[13px] sm:text-[14px] font-semibold text-foreground/90 mb-3">
                    Here’s everything I can do -
                  </div>

                  <ul className="space-y-3 text-[13px] sm:text-[14px] text-foreground/80">
                    {[
                      "GTM & Market Entry",
                      "Community & Ecosystem Building",
                      "Content & Storytelling",
                      "Growth, Partnerships & KOLs",
                      "Social Media Management",
                      "Can always pick a new task/role and figure it out",
                    ].map((line) => (
                      <li key={line} className="flex items-start gap-3">
                        <span className="mt-[2px] inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/10 dark:bg-white/10">
                          <span className="h-2 w-2 rounded-full bg-foreground/70" />
                        </span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* RIGHT */}
              <div className="relative flex justify-center items-center w-full">
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-center">
                  {skillCards.map((card, idx) => {
                    const isHovered = hovered === idx;
                    return (
                      <ImageCard
                        key={idx}
                        card={card}
                        compact
                        active={isHovered}
                        hoverable
                        onEnter={() => setHovered(idx)}
                        onLeave={() => setHovered(null)}
                      />
                    );
                  })}
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
