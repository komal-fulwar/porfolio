import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import StorySection from "@/components/StorySection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection />

      <SkillsSection />

      {/* JOURNEY (no "Story" heading; only Journey) */}
      <section id="story" className="bc-section">
        <div className="bc-container">
          <div className="mb-10 sm:mb-12 text-center">
            <div className="inline-flex mb-5">
              <span className="bc-pill-dark">Journey</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              Journey
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
              The moments that shaped everything — lessons, leaps, and the compounding effect of showing up.
            </p>
          </div>

          <div className="space-y-16 sm:space-y-20">
            {/* 2025 — RAIL + X LINKS */}
            <StorySection
              id="story-2025"
              index={0}
              type="green"
              year="2025"
              title="Building Aethir India from scratch"
              subtitle="India Marketing Lead at Aethir (Feb 2025 - Jan 2026)"
              description="As India Marketing Lead, I built Aethir India end-to-end — positioning, GTM, community, content, partnerships, KOL strategy, and IRL presence across India’s AI × Web3 ecosystem."
              mediaVariant="rail"
              media={[
                {
                  kind: "image",
                  src: "https://www.notion.so/image/attachment%3A7445c4de-f61d-44e4-8635-180bf1abcb40%3A6f2732e4-0fdd-43f7-a672-512ad033c0ba.jpeg?table=block&id=2ead6181-d1a7-8040-ac35-f53ed1a13864&spaceId=e40a6633-b9f4-410a-a045-757a2508c818&width=1420&userId=&cache=v2",
                  alt: "Aethir — moment 1",
                  label: "Moment",
                  href: "https://x.com",
                },
                {
                  kind: "image",
                  src: "https://www.notion.so/image/attachment%3Aaf638f40-aff2-4fe0-a88e-72e81a2a2442%3A70b1da2d-3a89-4c50-ae35-5e9cfca5b9d5.jpeg?table=block&id=2ead6181-d1a7-80bf-997f-c4a0c714ab1a&spaceId=e40a6633-b9f4-410a-a045-757a2508c818&width=1420&userId=&cache=v2",
                  alt: "Aethir — moment 2",
                  label: "Moment",
                  href: "https://x.com",
                },
                {
                  kind: "image",
                  src: "https://www.notion.so/image/attachment%3A548bd38e-ef9d-4a94-8ba4-0dbc2472ae6c%3A402de0ba-9c38-4307-a6c2-188cb75f8222.jpeg?table=block&id=2ead6181-d1a7-801e-9201-e19a4d64e9b8&spaceId=e40a6633-b9f4-410a-a045-757a2508c818&width=1420&userId=&cache=v2",
                  alt: "Aethir — moment 3",
                  label: "Moment",
                  href: "https://x.com",
                },
                {
                  kind: "image",
                  src: "https://www.notion.so/image/attachment%3A23c4d3e5-5ca5-4c92-a789-448c00608b7b%3A679f3323-fd3e-44ad-b05c-dbd49e83b9fd.jpeg?table=block&id=2ead6181-d1a7-8032-a1d1-f30796727d75&spaceId=e40a6633-b9f4-410a-a045-757a2508c818&width=1420&userId=&cache=v2",
                  alt: "Aethir — moment 4",
                  label: "Moment",
                  href: "https://x.com",
                },
              ]}
              content={[
                "India Marketing Lead at Aethir (Feb 2025 - Jan 2026)",
                "My time at Aethir marked my transition into full regional ownership. As India Marketing Lead, I built Aethir India from the ground up owning everything from positioning and GTM to community, content, partnerships, KOL strategy, and IRL presence.",
                "The goal was simple but ambitious: make Aethir a credible, visible, and trusted name in India’s AI, compute, DePIN, and Web3 ecosystem. I focused on building long-term ecosystem relationships first—knowing that brand trust, adoption, and B2B opportunities would follow.",
                "### Key Highlights",
                "### IRL & On-Ground Presence",
                "### Content & Thought Leadership",
              ]}
              highlights={[
                "Built and executed India GTM end-to-end, aligning local strategy with global objectives",
                "Established deep ecosystem relationships with active Indian Web3 communities and leading L1/L2 ecosystems",
                "Scaled Aethir India to 2,000+ X followers and 1,000+ Telegram members via community-led growth",
                "Represented Aethir across IBW (Media Partner), Solana DePIN Summit, Base ATW, Avalanche Demo Day, Aptos Winter School",
                "Designed and led the “AI for Bharat” tour across Tier-1 cities",
                "150K+ impressions organically and opened early B2B pipelines",
                "Next in AI podcast + Builders of the Future series (IBW)",
                "1.5M+ total impressions through organic content, partnerships, and micro-KOL campaigns",
              ]}
            />

            {/* 2024 — RAIL + X LINKS */}
            <StorySection
              id="story-2024"
              index={1}
              type="green"
              year="2024"
              title="Owning growth and ecosystem"
              subtitle="Head of Growth & Ecosystem at Capx AI and Capx Collective (Dec 2023 - Jan 2025)"
              description="At Capx AI, I shifted from community execution to owning growth and ecosystem strategy end-to-end — scaling Capx Collective into a global support system for Web3 and AI builders."
              mediaVariant="rail"
              media={[
                {
                  kind: "image",
                  src: "https://www.notion.so/image/attachment%3Ac4af0139-51bb-4687-904f-9c2c4ac1035c%3AGavb9waaAAQP8Sv.jpeg?table=block&id=2ead6181-d1a7-8055-acd1-e85896f3a271&spaceId=e40a6633-b9f4-410a-a045-757a2508c818&width=1420&userId=&cache=v2",
                  alt: "Capx — moment 1",
                  label: "Moment",
                  href: "https://x.com",
                },
                {
                  kind: "image",
                  src: "https://www.notion.so/image/attachment%3A23ba3d68-a760-4206-be88-b4fae28bcd1a%3AGNh1dAjbYAEAn-p.jpeg?table=block&id=2ead6181-d1a7-80b9-856e-dac90dc91eed&spaceId=e40a6633-b9f4-410a-a045-757a2508c818&width=1420&userId=&cache=v2",
                  alt: "Capx — moment 2",
                  label: "Moment",
                  href: "https://x.com",
                },
                {
                  kind: "image",
                  src: "https://www.notion.so/image/attachment%3A08ab5e2f-75c8-4cf9-9321-6af381bc2ec3%3AGY5YSO8XcAApJ87.jpeg?table=block&id=2ead6181-d1a7-8095-a81e-edd303a761c0&spaceId=e40a6633-b9f4-410a-a045-757a2508c818&width=1420&userId=&cache=v2",
                  alt: "Capx — moment 3",
                  label: "Moment",
                  href: "https://x.com",
                },
                {
                  kind: "image",
                  src: "https://www.notion.so/image/attachment%3Ac4af0139-51bb-4687-904f-9c2c4ac1035c%3AGavb9waaAAQP8Sv.jpeg?table=block&id=2ead6181-d1a7-8055-acd1-e85896f3a271&spaceId=e40a6633-b9f4-410a-a045-757a2508c818&width=1420&userId=&cache=v2",
                  alt: "Capx — moment 4",
                  label: "Moment",
                  href: "https://x.com",
                },
              ]}
              content={[
                "Head of Growth and Ecosystem at Capx AI and Capx Collective (Dec 2023 - Jan 2025)",
                "My time at Capx AI marked a shift from community execution to owning growth and ecosystem strategy end-to-end. As Head of Growth and Ecosystem, I scaled Capx Collective - the community arm of Capx AI turning it into a global support system for Web3 and AI builders.",
                "What started as an idea quickly grew into a multi-country ecosystem. I focused on creating real value for builders through programs, events, and partnerships while ensuring everything tied back to Capx AI’s long-term growth and developer adoption.",
                "### Key Highlights",
              ]}
              highlights={[
                "Scaled Capx Collective, impacting 10,000+ students, developers, and builders globally",
                "Grew and managed a 5,000+ member community across Telegram and X",
                "Hosted 100+ online and offline events with major Web3 & AI conferences worldwide",
                "Expanded Capx Collective to 10+ countries (India, Nigeria, Turkey, Thailand, Vietnam, Singapore, UAE, Bolivia, Mexico, France)",
                "Managed ecosystem programs: Level Up with Capx, Dev Workshops, Builder Program, Hackfest, Capx Taking Over",
                "Capx Casa (Devcon Bangkok 2024): ran a two-week AI residency + demo day execution",
                "Capx Captains Program: designed a global ambassador program with 15+ captains",
                "Berachain India × Capx: ran BERATRAIL (30+ IRL events) → grew community to 2,000+ organic members",
              ]}
            />

            {/* 2022–2023 — SINGLE IMAGE */}
            <StorySection
              id="story-2022-2023"
              index={2}
              type="green"
              year="2022–2023"
              title="Scaling communities at speed"
              subtitle="Community Evangelist & Partnerships Associate at Lumos Labs (May 2022 - Dec 2023)"
              description="My time at Lumos Labs marked the transition from building programs to scaling communities at speed — turning interest into long-term participation through campus programs, hackathons, and partnerships."
              mediaVariant="single"
              media={[
                {
                  kind: "image",
                  src: "https://www.notion.so/image/attachment%3A3641fc67-3742-4f1a-8aa2-cbec6d98f5a4%3AI_am_Anshita_Soni_and_here_are_all_your_answers_(1).png?table=block&id=2ead6181-d1a7-802e-ad19-e836c4d7dc51&spaceId=e40a6633-b9f4-410a-a045-757a2508c818&width=1420&userId=&cache=v2",
                  alt: "Lumos Labs — community & partnerships",
                  fit: "contain",
                },
              ]}
              content={[
                "Community Evangelist and Partnerships Associate at Lumos Labs (May 2022 - December 2023)",
                "My time at Lumos Labs marked the transition from building programs to scaling communities at speed. As a Community Evangelist and Partnerships Associate, I worked at the intersection of students, developers, and Web3 ecosystems - turning interest into long-term participation.",
                "I led initiatives that helped Lumos grow its grassroots presence across India, from campus ambassadors to large-scale hackathons. This phase taught me how to manage communities across platforms, collaborate with partners, and keep momentum alive through consistent engagement - both online and on the ground.",
              ]}
              highlights={[
                "Hosted BUILD FOR WEB3 SUMMIT — a 1 day conference in Bangalore",
                "Led the Lumos Wizard Program (campus ambassadors): structure, incentives, workflows, end-to-end management",
                "Managed HACK DELHI — a 24-hour offline Web3 hackathon with 200+ builders",
                "Planned and executed 70+ offline and online events across India",
                "Built and executed partnerships with developer communities, student groups, DAOs, and institutes",
              ]}
            />

            {/* 2021 — NO IMAGE RAIL */}
            <StorySection
              id="story-2021"
              index={3}
              type="green"
              year="2021"
              title="First real community building"
              subtitle="Program Manager Web3camp at GirlScript Foundation (Sept 2021 - Nov 2022)"
              description="I began my work journey at GirlScript Foundation, a non-profit focused on making tech education accessible. What started as a social media internship became my first real lesson in communities, events, and scaling education through community-led growth."
              mediaVariant="none"
              content={[
                "Program Manager Web3camp at Girlscript Foundation (Sept 2021-Nov 2022)",
                "I began my work journey at GirlScript Foundation, a non-profit focused on making tech education accessible to everyone. At the time, I didn’t have a grand plan, I just knew I wanted to help people find their way into tech the way I was trying to find mine.",
                "What started as a social media internship slowly turned into my first real lesson in communities, events, and the Web2 world. Over time, I grew into the role of Program Manager for Web3Camp, a global Web3 bootcamp that would go on to impact thousands of learners across India.",
                "Web3Camp became my first experience of managing something backed by leading Web3 ecosystems - Polygon, The Graph, Nervos, Sino Global Capital, EPNS. I learned how to design programs, tell stories that attract the right partners, and scale education through community-led growth.",
              ]}
            />

            {/* 2020 — NO IMAGE RAIL */}
            <StorySection
              id="story-2020"
              index={4}
              type="green"
              year="2020"
              title="Spark of curiosity"
              subtitle="Starting from zero in a Tier-2 city"
              description="At 16, in the middle of the COVID lockdown, I was a student in a regular junior college in Nagpur, Maharashtra — with no exposure to startups, business jargon, or tech careers. What I did have was curiosity, and one simple idea pushed me into the world of building."
              mediaVariant="none"
              content={[
                "At 16, in the middle of the COVID lockdown, I was a student in a regular junior college in Nagpur, Maharashtra - a Tier-2 city - with no exposure to startups, business jargon, or tech careers. I didn’t know what a pitch deck was, what “skills” meant in a professional sense, or how ideas were supposed to turn into companies.",
                "What I did have was curiosity!",
                "I was deeply interested in identifying problems and trying to solve them, and I admired people who built things - entrepreneurs, public speakers, content creators, and women in tech. During the lockdown, a simple tech app idea pushed me to ask a question that changed everything: How do ideas actually become real?",
                "That question led me into the world of startups, business, marketing, and sales — first as a learner, then as a doer. I taught myself skills by experimenting, building, and failing fast: content creation (design, writing, video), cold emailing, public speaking, operations, marketing, and business development.",
                "That same early idea eventually earned me my first investment proposal of $200,000 at the age of 16. I didn’t end up pursuing the idea -  but I found something more valuable : direction.",
                "I realized I wanted to be close to builders, ideas, and ecosystems. And from that moment on, my journey into tech, communities, and onchain ecosystems truly began.",
              ]}
              highlights={["First investment proposal of $200,000 at age 16"]}
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Index;
