"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const screenshots = [
  "/assets/flow/kol-4.png",
  "/assets/flow/memecoin-4.png",
  "/assets/flow/launch-4.png",
  "/assets/flow/buy-sell-4.png",
  "/assets/flow/relaunch-4.png",
  "/assets/flow/portfolio-4.png"
];

export function ProductShowcase() {
  return (
    <section className="py-24 px-6 bg-black/40 border-t border-white/5 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Built for degens</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Take a look inside the app. Clean, fast, and packed with alpha.
        </p>
      </div>

      <div className="relative w-full flex overflow-hidden pb-10 max-w-7xl mx-auto">
        <motion.div 
          className="flex gap-8 px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        >
          {[...screenshots, ...screenshots].map((src, i) => (
            <div key={i} className="relative min-w-[280px] aspect-[1/2] rounded-[2rem] overflow-hidden border-8 border-card shadow-2xl flex-shrink-0 bg-black">
              <Image 
                src={src} 
                alt={`Screenshot ${i + 1}`} 
                fill 
                className="object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
