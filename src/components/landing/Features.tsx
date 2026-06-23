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
            transition={{ delay: i * 0.2 }}
            className="flex flex-col items-center text-center group"
          >
            <div className="w-full max-w-[280px] aspect-[1/2] relative mb-8 rounded-[2rem] overflow-hidden border-8 border-card shadow-2xl group-hover:-translate-y-4 transition-transform duration-500 ease-out bg-black">
              <Image 
                src={feature.image} 
                alt={feature.title} 
                fill 
                className="object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
