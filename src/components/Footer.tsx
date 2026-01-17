import { motion } from "framer-motion";
import { Linkedin, Twitter, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Telegram", icon: Send, href: "#" },
];

// ✅ Tiny “temp resume” PDF (works immediately)
// You can replace this later with a real file in /public and just link it.
const TEMP_PDF_BASE64 =
  "JVBERi0xLjQKMSAwIG9iago8PCAvVHlwZSAvQ2F0YWxvZyAvUGFnZXMgMiAwIFIgPj4KZW5kb2JqCjIgMCBvYmoKPDwgL1R5cGUgL1BhZ2VzIC9LaWRzIFszIDAgUl0gL0NvdW50IDEgPj4KZW5kb2JqCjMgMCBvYmoKPDwgL1R5cGUgL1BhZ2UgL1BhcmVudCAyIDAgUiAvTWVkaWFCb3ggWzAgMCA2MTIgNzkyXSAvQ29udGVudHMgNCAwIFIgL1Jlc291cmNlcyA8PCAvRm9udCA8PCAvRjEgNSAwIFIgPj4gPj4gPj4KZW5kb2JqCjQgMCBvYmoKPDwgL0xlbmd0aCA5MSA+PgpzdHJlYW0KQlQKL0YxIDI0IFRmCjcyIDcyMCBUZAooVGVtcG9yYXJ5IFJlc3VtZSBQbGFjZWhvbGRlcikgVGoKMCAtMzYgVGQKKEFkZCB5b3VyIHJlYWwgUERGIGxhdGVyLikgVGoKRVQKZW5kc3RyZWFtCmVuZG9iago1IDAgb2JqCjw8IC9UeXBlIC9Gb250IC9TdWJ0eXBlIC9UeXBlMSAvQmFzZUZvbnQgL0hlbHZldGljYSA+PgplbmRvYmoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDA5IDAwMDAwIG4gCjAwMDAwMDAwNTggMDAwMDAgbiAKMDAwMDAwMDExNSAwMDAwMCBuIAowMDAwMDAwMjQxIDAwMDAwIG4gCjAwMDAwMDAzODMgMDAwMDAgbiAKdHJhaWxlcgo8PCAvU2l6ZSA2IC9Sb290IDEgMCBSID4+CnN0YXJ0eHJlZgo0NTMKJSVFT0YK";

function downloadTempPdf() {
  const byteChars = atob(TEMP_PDF_BASE64);
  const byteNumbers = new Array(byteChars.length);
  for (let i = 0; i < byteChars.length; i++) byteNumbers[i] = byteChars.charCodeAt(i);

  const blob = new Blob([new Uint8Array(byteNumbers)], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "Anshita-Resume-Temp.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
}

function openTelegram() {
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const text = "Hi Anshita — would love to connect!";
  const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(text)}`;
  window.open(shareUrl, "_blank", "noopener,noreferrer");
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

            <div className="relative z-10">
              <div className="inline-flex mb-4">
                <span className="bc-pill-dark">Connect</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-semibold">Ready to connect?</h3>
              <p className="mt-3 text-muted-foreground max-w-md mx-auto">
                Collaborate, chat about ideas, or just say hi — I’m always up for a good conversation.
              </p>

              <div className="mt-6 flex justify-center gap-3 flex-wrap">
                <Button className="bc-hoverlift bc-hovershadow" onClick={openTelegram}>
                  Message Me
                </Button>

                <Button variant="outline" className="bc-hoverlift" onClick={downloadTempPdf}>
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

              <div className="mt-10 pt-6 border-t border-border text-xs text-muted-foreground space-y-2">
                <div>
                  Made with{" "}
                  <span className="font-medium text-[hsl(var(--candle-green))]">💚</span> and a little bit of{" "}
                  <span className="font-medium text-[hsl(var(--candle-red))]">📉</span> by{" "}
                  <span className="font-medium text-foreground">Anshita</span>.
                </div>

                <div>Not financial advice. Past career performance is not indicative of future results.</div>

                <div className="pt-2 text-[11px] text-muted-foreground/80">
                  © {new Date().getFullYear()} Anshita — Built like a chart: steady, honest, trending up.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
