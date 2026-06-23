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

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full flex overflow-hidden pb-20 max-w-7xl mx-auto"
      >
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/40 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/40 to-transparent z-10 pointer-events-none" />
        <motion.div 
          className="flex gap-12 px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
        >
          {[...screenshots, ...screenshots].map((src, i) => (
            <div key={i} className="relative min-w-[700px] md:min-w-[900px] aspect-[16/9] rounded-3xl overflow-hidden flex-shrink-0 bg-black/20 border border-white/5 shadow-2xl">
              <Image 
                src={src} 
                alt={`App Flow ${i + 1}`} 
                fill 
                className="object-contain"
              />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
