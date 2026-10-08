import { motion } from "framer-motion";
import { Linkedin, Twitter, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/anshita-soni-630796211?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  { name: "Twitter", icon: Twitter, href: "https://x.com/anshitaksoni" },
  { name: "Telegram", icon: Send, href: "https://t.me/anshitaksoni1" },
];

function openTelegram() {
  const url = "https://t.me/anshitaksoni1";
  window.open(url, "_blank", "noopener,noreferrer");
}

const Footer = () => {
  return (
    <footer className="relative bg-[hsl(var(--footer))]">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

      <section className="bc-section">
        <div className="bc-container">
          <motion.div
            className="bc-card p-7 sm:p-10 text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
            <div className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[720px] -translate-x-1/2 rounded-full blur-3xl opacity-35 bg-[hsl(var(--candle-green))]/18" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full gap-6 mt-4">
              <p className="text-sm sm:text-base text-muted-foreground text-center md:text-left max-w-lg">
                Collaborate, chat about ideas, or just say hi - I’m always up for a good conversation.
              </p>

              <div className="flex items-center gap-3 flex-wrap shrink-0 justify-center md:justify-end">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className={[
                        "inline-flex items-center gap-2 rounded-full border border-border",
                        "bg-card/70 backdrop-blur px-4 py-2 text-sm font-medium",
                        "shadow-sm transition-all",
                        "hover:-translate-y-0.5 hover:shadow-md hover:bg-card",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/25 dark:focus-visible:ring-white/25",
                      ].join(" ")}
                      aria-label={link.name}
                    >
                      <Icon className="h-4 w-4" />
                      {link.name}
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="mt-16 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between w-full gap-4 text-xs text-muted-foreground">
              <div className="text-center md:text-left">
                Made with <span className="font-medium text-foreground">conviction</span> and a little bit of <span className="font-medium text-foreground">lessons</span> by <span className="font-medium text-foreground">Anshita</span>. 
              </div>
              <div className="text-center md:text-right">
                © {new Date().getFullYear()} Anshita - Built like a chart: steady, honest, trending up.
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
