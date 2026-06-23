"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const features = [
  {
    title: "Discover Tokens",
    description: "Find the next 100x gem before it hits the mainstream with our advanced discovery engine.",
    image: "/assets/app store/discover.png"
  },
  {
    title: "Track Portfolio",
    description: "Monitor your gains and losses in real-time with beautiful, easy-to-read charts.",
    image: "/assets/app store/portfolio.png"
  },
  {
    title: "Trade Instantly",
    description: "Execute swaps directly within the wallet using Jupiter liquidity routing for the best prices.",
    image: "/assets/app store/search.png"
  }
];

export function Features() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5 w-full">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Everything you need</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          ChadWallet combines discovery, trading, and tracking into one seamless experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {features.map((feature, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center group"
          >
            <div className="w-full max-w-[260px] aspect-[9/19.5] relative mb-8 rounded-[2.5rem] overflow-hidden border-[6px] border-[#111] shadow-[0_20px_50px_-12px_rgba(255,255,255,0.05)] group-hover:-translate-y-4 group-hover:shadow-[0_20px_60px_-12px_rgba(255,255,255,0.1)] transition-all duration-500 ease-out bg-black ring-1 ring-white/10">
              <Image 
                src={feature.image} 
                alt={feature.title} 
                fill 
                className="object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a 
          href="https://apps.apple.com/us/app/chadwallet/id6757367474" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10"
        >
          <div className="flex flex-col text-left">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Download on the</span>
            <span className="text-xl font-bold">App Store</span>
          </div>
        </a>
        <a 
          href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10"
        >
          <div className="flex flex-col text-left">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Get it on</span>
            <span className="text-xl font-bold">Google Play</span>
          </div>
        </a>
      </div>
    </section>
  );
}
