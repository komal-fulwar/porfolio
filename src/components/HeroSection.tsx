import { useState } from "react";
import { motion } from "framer-motion";
import CandlestickChart from "./CandlestickChart";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";

// avatar
import avatarImg from "./avatar.png";

// ✅ IMAGE icons (same folder). Rename if needed.
import rocketIcon from "./rocket.png";
import growthIcon from "./growth.png";

const AVATAR_NAME = "ANSHITA";

function ShineText({ children, className }: { children: string; className?: string }) {
  return (
    <span className={["bc-shine-wrap", className ?? ""].join(" ")}>
      <span className="bc-shine-base">{children}</span>
      <span aria-hidden className="bc-shine-layer">
        {children}
      </span>
    </span>
  );
}

const HeroSection = () => {
  const [avatarOk, setAvatarOk] = useState(true);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    try {
      window.history.replaceState(null, "", `#${id}`);
    } catch {}
  };

  return (
    <section className="min-h-screen relative overflow-hidden bg-background">
      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* ✅ BIG floating ICONS (no sticky box container) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Rocket (left) */}
        <motion.div
          className="absolute left-3 top-20 sm:left-10 sm:top-24"
          style={{ rotate: -8 }}
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src={rocketIcon}
            alt="Rocket icon"
            className="h-14 w-14 sm:h-20 sm:w-20 md:h-24 md:w-24 object-contain select-none drop-shadow-[0_18px_30px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_22px_36px_rgba(0,0,0,0.55)]"
            draggable={false}
          />
        </motion.div>

        {/* Growth (right) - positioned so it never collides with the theme toggle */}
        <motion.div
          className="absolute right-2 top-24 sm:right-12 sm:top-28"
          style={{ rotate: 9 }}
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 4.7, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        >
          <img
            src={growthIcon}
            alt="Growth icon"
            className="h-14 w-14 sm:h-20 sm:w-20 md:h-24 md:w-24 object-contain select-none drop-shadow-[0_18px_30px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_22px_36px_rgba(0,0,0,0.55)]"
            draggable={false}
          />
        </motion.div>
      </div>

      <div className="bc-container pt-16 sm:pt-20 pb-10 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-10 sm:mb-12 space-y-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bc-pill-dark"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--candle-green))] opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[hsl(var(--candle-green))]" />
            </span>
            Live Career Index
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            Anshita&apos;s <ShineText className="align-baseline">Pump &amp; Dump</ShineText>
            <br />
            Story
          </motion.h1>

          <p className="text-base sm:text-lg max-w-2xl mx-auto text-muted-foreground">
            A visual journey through my career — the highs, the lows, and everything in between.
            <span className="font-medium text-[hsl(var(--candle-green-dark))]"> Green candles</span> for wins,
            <span className="font-medium text-[hsl(var(--candle-red-dark))]"> red candles</span> for lessons learned.
          </p>

          <motion.div
            className="flex justify-center gap-3 pt-2 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            <Button className="bc-hoverlift bc-hovershadow" onClick={() => scrollToId("story")} type="button">
              Explore Story
            </Button>

            <Button variant="outline" className="bc-hoverlift" onClick={() => scrollToId("skills")} type="button">
              View Skills
            </Button>
          </motion.div>
        </motion.div>

        {/* Chart Card */}
        <motion.div
          className="bc-card p-4 sm:p-6 md:p-8"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/30 via-lime-300/20 to-pink-400/20 blur-[10px]" />
                <div className="relative rounded-full p-[2px] bg-gradient-to-br from-emerald-500 via-lime-400 to-pink-500">
                  <div className="rounded-full bg-background p-[2px]">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-black/10 dark:border-white/10 bg-muted/50">
                      {avatarOk ? (
                        <img
                          src={avatarImg}
                          alt="Avatar"
                          className="h-full w-full object-cover"
                          draggable={false}
                          onError={() => setAvatarOk(false)}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>

                <span className="absolute -right-0.5 -bottom-0.5 h-3.5 w-3.5 rounded-full bg-[hsl(var(--candle-green))] border-2 border-background shadow-sm" />
              </div>

              <div className="min-w-0">
                <div className="text-sm sm:text-[15px] font-semibold text-foreground/90 truncate">
                  ${AVATAR_NAME}
                </div>

                <div className="text-[11px] sm:text-xs text-muted-foreground truncate">
                
                </div>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
              Click a year to jump to the story ↗
            </div>
          </div>

          <br />

          <CandlestickChart />
        </motion.div>
      </div>

      {/* Shine (unchanged) */}
      <style>{`
        .bc-shine-wrap{
          position: relative;
          display: inline-block;
          white-space: nowrap;
          vertical-align: baseline;
          line-height: 1;
        }
        .bc-shine-base{
          display: inline-block;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          background-image: linear-gradient(
            90deg,
            rgba(16,185,129,1) 0%,
            rgba(163,230,53,1) 35%,
            rgba(236,72,153,1) 78%,
            rgba(244,114,182,1) 100%
          );
        }
        .bc-shine-layer{
          position: absolute;
          inset: 0;
          display: inline-block;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          background-image: repeating-linear-gradient(
            115deg,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0) 42%,
            rgba(255,255,255, var(--bc-shine-a)) 48%,
            rgba(255,255,255,0) 54%,
            rgba(255,255,255,0) 100%
          );
          background-size: 240% 100%;
          background-position: 0% 0%;
          animation: bcTextShine 6.2s linear infinite;
          mix-blend-mode: screen;
          opacity: 0.95;
          pointer-events: none;
          will-change: background-position;
        }
        :root{ --bc-shine-a: 0.55; }
        .dark{ --bc-shine-a: 0.9; }
        @keyframes bcTextShine{
          0%{ background-position: 0% 0%; }
          100%{ background-position: -240% 0%; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
