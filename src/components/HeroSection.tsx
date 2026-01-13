import { useState } from "react";
import { motion } from "framer-motion";
import CandlestickChart from "./CandlestickChart";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";

const AVATAR_SRC = "/anshita.jpg";
const AVATAR_NAME = "Anshita";

const HeroSection = () => {
  const [avatarOk, setAvatarOk] = useState(true);

  return (
    <section className="min-h-screen relative overflow-hidden bg-background">
      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Floating playful elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-28 left-10 text-2xl sm:text-3xl p-3 bc-sticky bc-sticky-blue bc-hoverlift"
          style={{ rotate: -8 }}
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
        >
          🚀
        </motion.div>

        <motion.div
          className="absolute top-40 right-12 text-2xl sm:text-3xl p-3 bc-sticky bc-sticky-green bc-hoverlift"
          style={{ rotate: 9 }}
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 4.7, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        >
          📈
        </motion.div>

        <motion.div
          className="absolute bottom-64 right-10 text-2xl sm:text-3xl p-3 bc-sticky bc-sticky-yellow bc-hoverlift"
          style={{ rotate: 10 }}
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        >
          🌙
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

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
            Anshita&apos;s{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-lime-500 to-pink-500">
              Pump &amp; Dump
            </span>
            <br />
            Story
          </h1>

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
            <Button className="bc-hoverlift bc-hovershadow">Explore Story</Button>
            <Button variant="outline" className="bc-hoverlift">
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
          {/* ✅ CLEAN header row that fits the chart perfectly */}
          <div className="flex items-center justify-between gap-3 mb-4">
            {/* Top-left personal touch */}
            <div className="flex items-center gap-3 min-w-0">
              {/* Avatar with subtle ring + glow */}
              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/30 via-lime-300/20 to-pink-400/20 blur-[10px]" />
                <div className="relative rounded-full p-[2px] bg-gradient-to-br from-emerald-500 via-lime-400 to-pink-500">
                  <div className="rounded-full bg-background p-[2px]">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-black/10 dark:border-white/10 bg-muted/50">
                      {avatarOk ? (
                        <img
                          src={AVATAR_SRC}
                          alt={AVATAR_NAME}
                          className="h-full w-full object-cover"
                          draggable={false}
                          onError={() => setAvatarOk(false)}
                        />
                      ) : (
                        <div className="h-full w-full grid place-items-center text-[12px] font-semibold text-foreground/80">
                          A
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* live dot */}
                <span className="absolute -right-0.5 -bottom-0.5 h-3.5 w-3.5 rounded-full bg-[hsl(var(--candle-green))] border-2 border-background shadow-sm" />
              </div>

              {/* Name + label (no unnecessary pills) */}
              <div className="min-w-0">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="text-sm sm:text-[15px] font-semibold text-foreground/90 truncate">
                    {AVATAR_NAME}'s Career chart ✨
                  </div>
                 

              
                </div>

                <div className="text-[11px] sm:text-xs text-muted-foreground truncate">
                  Hover candles for clean tooltips 
                </div>
              </div>
            </div>

            {/* Right side hint (desktop only) */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
              Click a year to jump to the story ↗
            </div>
          </div>
          <br></br>

          <CandlestickChart />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
