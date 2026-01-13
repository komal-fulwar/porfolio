import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import StorySection, { type StoryMediaItem } from "@/components/StorySection";
import Footer from "@/components/Footer";

const stories = [
  {
    type: "green" as const,
    title: "First Internship 🎯",
    year: "2019",
    description:
      "Landed my first tech internship at a startup. Everything was new, fast, and a little scary — but this is where it all began — my first taste of the real tech world.",
  },
  {
    type: "green" as const,
    title: "Graduated with Honors 🎓",
    year: "2020",
    description:
      "Wrapped up my degree with strong results. I felt unstoppable — until the world changed overnight.",
  },
  {
    type: "red" as const,
    title: "The Pandemic Layoff 😬",
    year: "2020",
    description:
      "First big reality check. A sudden layoff forced me to rebuild from scratch — resilience became a skill.",
  },
  {
    type: "green" as const,
    title: "Dream Job Offer 💼",
    year: "2021",
    description:
      "After hundreds of applications and countless rejections, I finally got the offer I’d been chasing. Sometimes the best opportunities come from the worst setbacks.",
  },
  {
    type: "red" as const,
    title: "Burnout Phase 🔥",
    year: "2022",
    description:
      "Pushed too hard, burned too bright. Had to learn to slow down, touch grass, and rediscover what work-life balance actually means.",
  },
  {
    type: "green" as const,
    title: "Led My First Major Project 🚀",
    year: "2023",
    description:
      "From team member to project lead! Managed a team, shipped on time, and grew into leadership through challenges.",
  },
  {
    type: "green" as const,
    title: "Got Promoted 🎉",
    year: "2024",
    description:
      "Recognition for effort — stepping into bigger responsibilities, higher impact, and the next level of growth.",
  },
  {
    type: "green" as const,
    title: "New Chapter Begins ✨",
    year: "2025",
    description:
      "Taking everything I’ve learned — the wins, the lessons, and the pivots — and aiming higher. Still bullish on my career. 🐂",
  },
];

// Replace these placeholders with your real images/videos + X links.
const storyMediaByYear: Record<string, StoryMediaItem[]> = {
  "2019": [
    { kind: "image", src: "/placeholder.svg", alt: "First internship photo", href: "https://x.com/", label: "Photo" },
    { kind: "video", src: "/placeholder.svg", alt: "First internship clip", href: "https://x.com/", label: "Video" },
    { kind: "image", src: "/placeholder.svg", alt: "Team moment", href: "https://x.com/", label: "Photo" },
    { kind: "image", src: "/placeholder.svg", alt: "Work desk", href: "https://x.com/", label: "Photo" },
  ],
  "2020": [
    { kind: "image", src: "/placeholder.svg", alt: "Graduation moment", href: "https://x.com/", label: "Photo" },
    { kind: "image", src: "/placeholder.svg", alt: "Certificate", href: "https://x.com/", label: "Photo" },
    { kind: "video", src: "/placeholder.svg", alt: "A short clip", href: "https://x.com/", label: "Video" },
    { kind: "image", src: "/placeholder.svg", alt: "Reset & rebuild", href: "https://x.com/", label: "Photo" },
  ],
  "2021": [
    { kind: "image", src: "/placeholder.svg", alt: "Offer letter moment", href: "https://x.com/", label: "Photo" },
    { kind: "video", src: "/placeholder.svg", alt: "First day clip", href: "https://x.com/", label: "Video" },
    { kind: "image", src: "/placeholder.svg", alt: "Late nights", href: "https://x.com/", label: "Photo" },
    { kind: "image", src: "/placeholder.svg", alt: "Learning curve", href: "https://x.com/", label: "Photo" },
  ],
  "2022": [
    { kind: "video", src: "/placeholder.svg", alt: "Skill stacking clip", href: "https://x.com/", label: "Video" },
    { kind: "image", src: "/placeholder.svg", alt: "Burnout reflection", href: "https://x.com/", label: "Photo" },
    { kind: "image", src: "/placeholder.svg", alt: "New hobbies", href: "https://x.com/", label: "Photo" },
    { kind: "image", src: "/placeholder.svg", alt: "Comeback prep", href: "https://x.com/", label: "Photo" },
  ],
  "2023": [
    { kind: "image", src: "/placeholder.svg", alt: "Team moment", href: "https://x.com/", label: "Photo" },
    { kind: "image", src: "/placeholder.svg", alt: "Project shipping", href: "https://x.com/", label: "Photo" },
    { kind: "video", src: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXlzc250czdjczZ0aW5wZDNmZmp5OWtudjNyY3YyMXhnZmVhbmV4diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/toXKzaJP3WIgM/giphy.gif", alt: "Presentation clip", href: "https://x.com/", label: "Video" },
    { kind: "image", src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVjaHxlbnwwfHwwfHx8MA%3D%3D", alt: "Leadership", href: "https://x.com/", label: "Photo" },
  ],
  "2024": [
    { kind: "image", src: "/placeholder.svg", alt: "Promotion moment", href: "https://x.com/", label: "Photo" },
    { kind: "video", src: "/placeholder.svg", alt: "Celebration clip", href: "https://x.com/", label: "Video" },
    { kind: "image", src: "/placeholder.svg", alt: "New responsibilities", href: "https://x.com/", label: "Photo" },
    { kind: "image", src: "/placeholder.svg", alt: "Impact", href: "https://x.com/", label: "Photo" },
  ],
  "2025": [
    { kind: "video", src: "/placeholder.svg", alt: "Trending up clip", href: "https://x.com/", label: "Video" },
    { kind: "image", src: "/placeholder.svg", alt: "Momentum", href: "https://x.com/", label: "Photo" },
    { kind: "image", src: "/placeholder.svg", alt: "Next goals", href: "https://x.com/", label: "Photo" },
    { kind: "image", src: "/placeholder.svg", alt: "New chapter", href: "https://x.com/", label: "Photo" },
  ],
};

const Index = () => {
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

          {/* Full-width story rows (rail extends to screen edge) */}
          <div className="space-y-20 sm:space-y-24">
            {stories.map((story, index) => (
              <StorySection
                key={index}
                type={story.type}
                title={story.title}
                year={story.year}
                description={story.description}
                index={index}
                id={`story-${story.year}`}
                media={storyMediaByYear[story.year]}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Index;
