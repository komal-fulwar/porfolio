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


          {/* ✅ Newest first: 2026 → 2025 → 2024 → 2022-23 → 2021 → 2020 */}
          <div className="space-y-10 sm:space-y-14">
            {/* 2026 */}
            <StorySection
              id="story-2026"
              index={0}
              type="green"
              year="2026"
              title="Marketing Lead - Bento.fun"
              subtitle="Apr 2026 - Sep 2026"
              description="Owned every non-engineering function for Bento.fun - scaling organic social distribution, building automated AI video workflows, running paid acquisition, and driving developer adoption through IRL events."
              media={[
                {
                  kind: "video",
                  src: "/bento/bento_video_1.mp4",
                  poster: "https://pbs.twimg.com/amplify_video_thumb/2089246399120699392/img/FIeWY7GS5qw-xrGg.jpg",
                  alt: "Bento.fun - Premier League Announcement",
                  href: "https://x.com/Bentodotfun/status/2089246532247937153?s=20",
                },
                {
                  kind: "video",
                  src: "/bento/bento_video_2.mp4",
                  poster: "https://pbs.twimg.com/amplify_video_thumb/2088284839028076544/img/myA1EWaY7S6gxL8z.jpg",
                  alt: "Bento.fun - Football Season Launch",
                  href: "https://x.com/Bentodotfun/status/2088284877066252769?s=20",
                },
                {
                  kind: "video",
                  src: "/bento/bento_video_3.mp4",
                  poster: "https://pbs.twimg.com/amplify_video_thumb/2084307588204974080/img/8zRhIAFDTlO7hDwy.jpg",
                  alt: "Bento.fun - Last Week in Sports Recap",
                  href: "https://x.com/Bentodotfun/status/2084314258452685133?s=20",
                },
                {
                  kind: "video",
                  src: "/bento/bento_video_4.mp4",
                  poster: "https://pbs.twimg.com/amplify_video_thumb/2084243235359309825/img/3NckFQ8WdlO77vee.jpg",
                  alt: "Bento.fun - Story of a Legend",
                  href: "https://x.com/Bentodotfun/status/2084243357027463514?s=20",
                },
                {
                  kind: "video",
                  src: "/bento/bento_video_5.mp4",
                  poster: "https://pbs.twimg.com/amplify_video_thumb/2079923843519700992/img/4vwIr4PecYuqvDbJ.jpg",
                  alt: "Bento.fun - Build on Bento Hackathon Highlights",
                  href: "https://x.com/Bentodotfun/status/2079924209124614315?s=20",
                },
                {
                  kind: "video",
                  src: "/bento/bento_video_6.mp4",
                  poster: "https://pbs.twimg.com/amplify_video_thumb/2079250588295155712/img/fqwh6dE_rxubEyIn.jpg",
                  alt: "Bento.fun - World Cup Final Recap",
                  href: "https://x.com/Bentodotfun/status/2079250705953763557?s=20",
                },
                {
                  kind: "video",
                  src: "/bento/bento_video_7.mp4",
                  poster: "https://pbs.twimg.com/amplify_video_thumb/2078917665759092736/img/t7H2s2NQnz0HLNYH.jpg",
                  alt: "Bento.fun - Finals Night Live Event",
                  href: "https://x.com/Bentodotfun/status/2078917790925492489?s=20",
                },
                {
                  kind: "video",
                  src: "/bento/bento_video_8.mp4",
                  poster: "https://pbs.twimg.com/amplify_video_thumb/2077000439707619328/img/I9MO7XVdLU8KxSMI.jpg",
                  alt: "Bento.fun - Bangalore Hackathon Announcement",
                  href: "https://x.com/Bentodotfun/status/2077000507592503437?s=20",
                },
                {
                  kind: "video",
                  src: "/bento/bento_video_9.mp4",
                  poster: "https://pbs.twimg.com/amplify_video_thumb/2075629546070736896/img/8Fn2Yi8mcEtJT5qq.jpg",
                  alt: "Bento.fun - FIFA Watch Party Recap",
                  href: "https://x.com/Bentodotfun/status/2075629625112506879?s=20",
                },
                {
                  kind: "video",
                  src: "/bento/bento_video_10.mp4",
                  poster: "https://pbs.twimg.com/amplify_video_thumb/2074750041819111425/img/ofj56MDQgKRQFInQ.jpg",
                  alt: "Bento.fun - FIFAMAXXING Bengaluru Event",
                  href: "https://x.com/Bentodotfun/status/2074750116972695995?s=20",
                },
                {
                  kind: "video",
                  src: "/bento/bento_video_11.mp4",
                  poster: "https://pbs.twimg.com/ext_tw_video_thumb/2064991809215004672/pu/img/ae_IClPXpK0sNGgs.jpg",
                  alt: "Bento.fun - Bento Beta LIVE on BNB Chain",
                  href: "https://x.com/Bentodotfun/status/2064991880128217388?s=20",
                },
                {
                  kind: "video",
                  src: "/bento/bento_video_12.mp4",
                  poster: "https://pbs.twimg.com/ext_tw_video_thumb/2063252728189800448/pu/img/ONe_tsEH3Jxr_0xF.jpg",
                  alt: "Bento.fun - French Open Final Spotlight",
                  href: "https://x.com/Bentodotfun/status/2063252940413116500?s=20",
                },
                {
                  kind: "video",
                  src: "/bento/bento_video_13.mp4",
                  poster: "https://pbs.twimg.com/ext_tw_video_thumb/2061883334473793536/pu/img/Z9k8iwAXsmr30Vgz.jpg",
                  alt: "Bento.fun - NBA Finals Prediction Packs",
                  href: "https://x.com/Bentodotfun/status/2061883370980925503?s=20",
                },
                {
                  kind: "video",
                  src: "/bento/bento_video_14.mp4",
                  poster: "https://pbs.twimg.com/amplify_video_thumb/2088682099478069249/img/WFVLZATkTBlTbTu-.jpg",
                  alt: "Anshita Soni - Football Season Kickoff Video",
                  href: "https://x.com/anshitaksoni/status/2088682164703666635?s=20",
                },
                {
                  kind: "video",
                  src: "/bento/bento_video_15.mp4",
                  poster: "https://pbs.twimg.com/amplify_video_thumb/2070941172370231296/img/nbZftK38-2V6jZx_.jpg",
                  alt: "Anshita Soni - Bento.fun Marketing Reel",
                  href: "https://x.com/anshitaksoni/status/2070941300053152061?s=20",
                },
                {
                  kind: "video",
                  src: "/bento/bento_video_16.mp4",
                  poster: "https://pbs.twimg.com/amplify_video_thumb/2079204930024321025/img/wn_fqKwDpDOjKjEc.jpg",
                  alt: "Abhitej - Bento SDK Overview Video",
                  href: "https://x.com/abhitejxyz/status/2079205266092900680?s=20",
                },
              ]}
              content={[
                "As the Marketing Lead for Bento.fun, a sports prediction markets platform, I operated as a one-person growth engine. I owned every non-engineering function - from brand and content strategy to paid acquisition and on-the-ground developer relations.",
                "### The 17-Million View Distribution Engine",
                "I single-handedly built and scaled an automated AI video studio using Higgsfield, HeyGen, ElevenLabs, and VEED. By owning the entire pipeline - scripting, AI voiceovers, visual generation, and final edits - I turned organic social into Bento’s primary acquisition channel. The result? Over 15M+ views on Instagram, 2M+ on Facebook, and 300K+ on Threads, establishing a massive footprint with zero agency support.",
                "### Full-Funnel Growth & Community Engagement",
                "I ran targeted paid campaigns, built partnerships with major sports fan communities, and personally conducted user feedback calls that directly shaped our product roadmap.",
                "### Driving Developer Adoption IRL",
                "To accelerate adoption for the Bento SDK, I took the brand offline. I conceptualized and executed a FIFA IRL pop-up in Bangalore and hosted a major hackathon for SDK adoption."
              ]}
            />

            {/* 2025 */}
            <StorySection
              id="story-2025"
              index={1}
              type="green"
              year="2025"
              title="India Marketing Lead - Aethir"
              subtitle="Feb 2025 - Jan 2026"
              description="My transition into full regional ownership - I built Aethir India from the ground up across positioning, GTM, community, partnerships, KOL strategy, content, and IRL presence."
              mediaVariant="rail"
              media={[
                {
                  kind: "video",
                  src: "/video1.mp4",
                  poster: "/videos/2025-1.jpg",
                  alt: "Aethir - highlight video 1",
                  label: "Video",
                  href: "https://x.com/AethirIndia/status/1937520550014018030?s=20",
                },

                {
                  kind: "video",
                  src: "/video2.mp4",
                  poster: "/videos/2025-1.jpg",
                  alt: "Aethir - highlight video 2",
                  label: "Video",
                  href: "https://x.com/AethirIndia/status/2003155130477347102?s=20",
                },

                {
                  kind: "video",
                  src: "/video3.mp4",
                  poster: "/videos/2025-1.jpg",
                  alt: "Aethir - highlight video 3",
                  label: "Video",
                  href: "https://x.com/AethirIndia/status/1969011434886398426?s=20",
                },
                { kind: "image", src: "/1.jpeg", alt: "Aethir - moment", label: "Moment" },
                { kind: "image", src: "/2.jpeg", alt: "Aethir - moment", label: "Moment" },
                { kind: "image", src: "/3.jpeg", alt: "Aethir - moment", label: "Moment" },
                { kind: "image", src: "/4.jpeg", alt: "Aethir - moment", label: "Moment" },
                { kind: "image", src: "/5.jpeg", alt: "Aethir - moment", label: "Moment" },
                { kind: "image", src: "/6.jpeg", alt: "Aethir - moment", label: "Moment" },
                { kind: "image", src: "/7.jpeg", alt: "Aethir - moment", label: "Moment" },
                { kind: "image", src: "/8.jpeg", alt: "Aethir - moment", label: "Moment" },
                { kind: "image", src: "/9.jpeg", alt: "Aethir - moment", label: "Moment" },
                { kind: "image", src: "/10.jpeg", alt: "Aethir - moment", label: "Moment" },
              ]}
              content={[
                "India Marketing Lead at Aethir (Feb 2025 - Jan 2026)",
                "My time at Aethir marked my transition into full regional ownership. As India Marketing Lead, I built Aethir India from the ground up - owning everything from positioning and GTM to community, content, partnerships, KOL strategy, and IRL presence.",
                "The goal was simple but ambitious: make Aethir a credible, visible, and trusted name in India's AI, compute, DePIN, and Web3 ecosystem. I focused on building long-term ecosystem relationships first - knowing that brand trust, adoption, and B2B opportunities would follow.",
                "### IRL & On-Ground Presence",
                "I designed and led Aethir India's IRL strategy with a strong focus on relationship-building and long-term ecosystem value. I conceptualized and executed the “AI for Bharat” tour, establishing Aethir's presence across major Tier-1 cities in India.",
                "Through curated speaker lineups, focused community onboarding, and partner-first execution, the tour generated 150K+ impressions organically and opened early-stage pipelines for B2B collaborations, ecosystem partnerships, government incubators, and institutional stakeholders.",
                "### Content & Thought Leadership",
                "To strengthen Aethir's narrative in India, I led content strategy and execution to position the brand as a thought leader at the intersection of AI, compute, DePIN, and Web3.",
                "Next in AI: A long-form podcast featuring leading AI projects and major blockchain ecosystems like Base, Avalanche, Arbitrum, Aptos (and more).",
                "Builders of the Future: A 10-episode flagship series with India Blockchain Week, featuring Tier-1 projects like EigenCloud, Wormhole, Boundless, Monad, GEODNET, and India leads from major L1/L2 chains.",
                "Consistent educational content including AI & DePIN explainers, buzzword breakdowns, staking demos, threads, and AI-generated visual/video assets.",
                "1.5M+ total impressions generated through organic content, partnerships, and micro-KOL campaigns.",
              ]}
              highlights={[
                "Built and executed India GTM end-to-end, aligning local strategy with Aethir's global objectives",
                "Established Aethir India as a deeply connected ecosystem participant across active Indian Web3 communities and multiple leading L1/L2 ecosystems",
                "Scaled Aethir India's digital presence to 2,000+ followers on X and 1,000+ Telegram members through community-led growth",
                "Represented Aethir across India Blockchain Week (Media Partner), Solana DePIN Summit, Base Around the World, Avalanche Demo Day, and Aptos Winter School",
              ]}
            />

            {/* 2024 */}
            <StorySection
              id="story-2024"
              index={2}
              type="green"
              year="2024"
              title="Head of Growth & Ecosystem - Capx AI"
              subtitle="Dec 2023 - Jan 2025"
              description="A shift from community execution to owning growth and ecosystem strategy end-to-end - scaling Capx Collective into a global support system for Web3 and AI builders."
              mediaVariant="rail"
              media={[
                {
                  kind: "video",
                  src: "/video4.mp4",
                  poster: "/videos/2024-1.jpg",
                  alt: "Capx - highlight video 1",
                  label: "Video",
                  href: "https://x.com/anshitaksoni/status/1855996325634187428?s=20",
                },

                {
                  kind: "video",
                  src: "/video5.mp4",
                  poster: "/videos/2024-2.jpg",
                  alt: "Capx - highlight video 2",
                  label: "Video",
                  href: "https://x.com/CapxCollective/status/1772512003564683510?s=20",
                },
                {
                  kind: "image",
                  src: "https://pbs.twimg.com/media/GbnMs6raAAANst7?format=jpg&name=medium",
                  alt: "Capx - moment 4",
                  label: "Moment",
                  href: "https://x.com/CapxCollective/status/1772512003564683510?s=20",
                },
              ]}
              content={[
                "Head of Growth and Ecosystem at Capx AI and Capx Collective (Dec 2023 - Jan 2025)",
                "My time at Capx AI marked a shift from community execution to owning growth and ecosystem strategy end-to-end. As Head of Growth and Ecosystem, I scaled Capx Collective - the community arm of Capx AI - turning it into a global support system for Web3 and AI builders.",
                "What started as an idea quickly grew into a multi-country ecosystem. I focused on creating real value for builders through programs, events, and partnerships while ensuring everything tied back to Capx AI's long-term growth and developer adoption.",
              ]}
              highlights={[
                "Scaled Capx Collective, impacting 10,000+ students, developers, and builders globally",
                "Grew and managed a 5,000+ member community across Telegram and X",
                "Hosted 100+ online and offline events, collaborating with major Web3 and AI conferences worldwide",
                "Expanded Capx Collective to 10+ countries including India, Nigeria, Turkey, Thailand, Vietnam, Singapore, UAE, Bolivia, Mexico, and France",
                "Managed ecosystem programs such as Level Up with Capx, Dev Workshops, Capx AI Builder Program, Capx AI Hackfest, and Capx Taking Over",
                "Capx Casa (Devcon Bangkok 2024): managed Capx AI’s first two-week AI residency from outreach to content, marketing, and demo day execution",
                "Capx Captains Program: designed a global ambassador program with 15+ active captains enabling regional community growth",
                "Berachain India × Capx Collective: executed BERATRAIL (30+ IRL events) helping grow Berachain India to 2,000+ organic members",
              ]}
            />

            {/* 2022-2023 */}
            <StorySection
              id="story-2022-23"
              index={3}
              type="green"
              year="2022-2023"
              title="Community Evangelist & Partnerships - Lumos Labs"
              subtitle="May 2022 - Dec 2023"
              description="The transition from building programs to scaling communities at speed - turning interest into long-term participation through ambassadors, hackathons, events, and partnerships."
              mediaVariant="none"
              content={[
                "Community Evangelist and Partnerships Associate at Lumos Labs (May 2022 - December 2023)",
                "My time at Lumos Labs marked the transition from building programs to scaling communities at speed. As a Community Evangelist and Partnerships Associate, I worked at the intersection of students, developers, and Web3 ecosystems - turning interest into long-term participation.",
                "I led initiatives that helped Lumos grow its grassroots presence across India, from campus ambassadors to large-scale hackathons. This phase taught me how to manage communities across platforms, collaborate with partners, and keep momentum alive through consistent engagement - both online and on the ground.",
              ]}
              highlights={[
                "Hosted BUILD FOR WEB3 SUMMIT - a large-scale 1-day conference in Bangalore with best-in-industry speakers and partners",
                "Led the Lumos Wizard Program (campus ambassadors): designed structure, incentives, and workflows; managed ambassadors end-to-end",
                "Managed HACK DELHI - a 24-hour offline Web3 hackathon with 200+ builders",
                "Planned and executed 70+ offline and online events across India",
                "Built and executed partnerships with developer communities, student groups, DAOs, and institutes",
              ]}
            />

            {/* 2021 */}
            <StorySection
              id="story-2021"
              index={4}
              type="green"
              year="2021"
              title="Program Manager - Web3Camp (GirlScript)"
              subtitle="Sept 2021 - Nov 2022"
              description="My first real lesson in communities, events, and scaling education - from a social internship to running Web3Camp backed by major ecosystems."
              mediaVariant="none"
              content={[
                "Program Manager Web3camp at GirlScript Foundation (Sept 2021 - Nov 2022)",
                "I began my work journey at GirlScript Foundation, a non-profit focused on making tech education accessible to everyone. At the time, I didn’t have a grand plan - I just knew I wanted to help people find their way into tech the way I was trying to find mine.",
                "What started as a social media internship slowly turned into my first real lesson in communities, events, and the Web2 world. Over time, I grew into the role of Program Manager for Web3Camp, a global Web3 bootcamp that would go on to impact thousands of learners across India.",
                "Web3Camp became my first experience of managing something backed by leading Web3 ecosystems - Polygon, The Graph, Nervos, Sino Global Capital, EPNS. I learned how to design programs, tell stories that attract the right partners, and scale education through community-led growth.",
              ]}
            />

            {/* 2020 */}
            <StorySection
              id="story-2020"
              index={5}
              type="green"
              year="2020"
              title="The Spark - Curiosity in lockdown"
              subtitle="Starting from zero in a Tier-2 city"
              description="At 16 during COVID lockdown in Nagpur, I had no exposure to startups or tech careers - but curiosity pulled me into building, learning, and finding direction."
              mediaVariant="none"
              content={[
                "At 16, in the middle of the COVID lockdown, I was a student in a regular junior college in Nagpur, Maharashtra - a Tier-2 city - with no exposure to startups, business jargon, or tech careers. I didn’t know what a pitch deck was, what “skills” meant in a professional sense, or how ideas were supposed to turn into companies.",
                "What I did have was curiosity!",
                "I was deeply interested in identifying problems and trying to solve them, and I admired people who built things - entrepreneurs, public speakers, content creators, and women in tech. During the lockdown, a simple tech app idea pushed me to ask a question that changed everything: How do ideas actually become real?",
                "That question led me into the world of startups, business, marketing, and sales - first as a learner, then as a doer. I taught myself skills by experimenting, building, and failing fast: content creation (design, writing, video), cold emailing, public speaking, operations, marketing, and business development.",
                "That same early idea eventually earned me my first investment proposal of $200,000 at the age of 16. I didn’t end up pursuing the idea - but I found something more valuable: direction.",
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
