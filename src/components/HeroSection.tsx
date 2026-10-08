import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CandlestickChart from "./CandlestickChart";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";

import avatarImg from "./avatar.png";

const HeroSection = () => {
  const [avatarOk, setAvatarOk] = useState(true);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    try {
      window.history.replaceState(null, "", `#${id}`);
    } catch {}
  };

  return (
    <section className="min-h-screen relative overflow-hidden bg-black text-white selection:bg-white selection:text-black">




      <div className="bc-container pt-32 sm:pt-40 pb-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left Text Column */}
          <motion.div
            className="flex-1 space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center bc-pill border-white/20 tracking-[0.2em] text-[10px] sm:text-[11px] opacity-80">
              Career Index // 2020 - 2026
            </div>

            <h1 className="text-6xl sm:text-7xl md:text-8xl font-normal leading-[1.05] tracking-tight">
              Anshita&apos;s <br />
              <span className="italic text-white/70 font-serif tracking-normal">Pump & Dump</span><br />
              Story
            </h1>

            <p className="text-lg sm:text-xl max-w-md text-white/60 font-light leading-relaxed">
              A volatile, high-signal journey living life onchain. 
              Green for wins, red for lessons. Tap the candles to explore.
            </p>

            <div className="flex gap-4 pt-4">
              <Button 
                className="rounded-full px-8 h-12 bg-white text-black hover:bg-white/90 text-sm tracking-wide font-medium transition-transform duration-300 hover:scale-105" 
                onClick={() => scrollToId("story")} 
              >
                Explore Story
              </Button>
              <Button 
                variant="outline"
                className="rounded-full px-8 h-12 border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white text-sm tracking-wide font-medium transition-transform duration-300 hover:scale-105" 
                onClick={() => scrollToId("skills")} 
              >
                View Skills
              </Button>
            </div>
          </motion.div>

          {/* Right Video Composition (Blended) */}
          <motion.div 
            className="flex-1 relative w-full h-[600px] lg:h-[800px] flex items-center justify-center lg:justify-end pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          >
            <motion.div 
              className="absolute right-[-10%] sm:right-[-20%] lg:right-[-30%] w-[120%] sm:w-[140%] lg:w-[150%] h-[120%] lg:h-[130%]"
              animate={{ y: [-15, 15, -15] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              style={{
                WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 70%)",
                maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 70%)"
              }}
            >
              <video
                src="/uploaded/hero-video-v2.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover object-center opacity-80"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Chart Card */}
        <motion.div
          className="bg-[#050505] border border-white/10 rounded-[2rem] p-6 sm:p-10 mt-24 sm:mt-32 relative overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-between gap-3 mb-8">
            <div className="flex items-center gap-4 min-w-0">
              <div className="min-w-0">
                <div className="text-sm sm:text-base font-medium text-white uppercase tracking-widest flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-white rounded-full" />
                  $ANSHITA INDEX
                </div>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-[10px] text-white/50 uppercase tracking-[0.2em]">
              Tap a year to explore
            </div>
          </div>

          <CandlestickChart />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
