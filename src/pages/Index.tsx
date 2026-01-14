import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import StorySection, { type StoryMediaItem } from "@/components/StorySection";
import Footer from "@/components/Footer";
import { CANDLE_DATA } from "@/components/CandlestickChart";

const toneFromCandle = (type: "up" | "down") => (type === "up" ? ("green" as const) : ("red" as const));

// Replace placeholders with your real media.
// ✅ KEY CHANGE: use `${year}-${tone}` so each candle maps to the correct story section.
const storyMediaByKey: Record<string, StoryMediaItem[]> = {
  // Example:
  // "2020-green": [...],
  // "2020-red": [...],
};

const Index = () => {
  // ✅ stories generated from chart candles (titles/headings always match)
  const stories = CANDLE_DATA.map((c) => ({
    type: toneFromCandle(c.type),
    year: c.year,
    title: c.title,
    subtitle: c.subtitle,
    description: c.description,
  }));

  return (
    <main className="min-h-screen bc-page">
      <HeroSection />
      <SkillsSection />

      {/* Full story */}
      <section className="bc-section">
        <div className="bc-container">
          <div className="text-center mb-12 sm:mb-16 pt-2">
            <div className="inline-flex">
              <span className="bc-pill-dark">Journey</span>
            </div>
            <h2 className="mt-4">The Full Story 📖</h2>
            <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              The moments behind the candles — the wins, the lessons, and the pivots that shaped the climb.
            </p>
          </div>

          {/* Story rows */}
          <div className="space-y-20 sm:space-y-24">
            {stories.map((story, index) => {
              const key = `${story.year}-${story.type}`;
              return (
                <StorySection
                  key={`${key}-${index}`}
                  type={story.type}
                  title={story.title}
                  subtitle={story.subtitle}
                  year={story.year}
                  description={story.description}
                  index={index}
                  // ✅ EXACT ID the chart scrolls to:
                  id={`story-${story.year}-${story.type}`}
                  media={storyMediaByKey[key]}
                />
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Index;
