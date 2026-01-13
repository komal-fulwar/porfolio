import { motion } from "framer-motion";
import { Linkedin, Twitter, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Telegram", icon: Send, href: "#" },
  { name: "WhatsApp", icon: MessageCircle, href: "#" },
];

const Footer = () => {
  return (
    <footer className="relative bg-[hsl(var(--footer))]">
      <section className="bc-section">
        <div className="bc-container">
          <motion.div
            className="bc-card p-7 sm:p-10 text-center"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className="inline-flex mb-4">
              <span className="bc-pill-dark">Connect</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-semibold">Ready to connect? 🤝</h3>
            <p className="mt-3 text-muted-foreground max-w-md mx-auto">
              Collaborate, chat about ideas, or just say hi — I’m always up for a good conversation.
            </p>

            <div className="mt-6 flex justify-center gap-3 flex-wrap">
              <Button className="bc-hoverlift">Message Me</Button>
              <Button variant="outline" className="bc-hoverlift">
                Download Resume
              </Button>
            </div>

            <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <Icon className="h-4 w-4" />
                    {link.name}
                  </a>
                );
              })}
            </div>

            <div className="mt-10 pt-6 border-t border-border text-xs text-muted-foreground">
              © {new Date().getFullYear()} Anshita — Built like a chart: steady, honest, trending up.
            </div>
          </motion.div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
