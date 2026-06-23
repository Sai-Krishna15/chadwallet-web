"use client";

import { motion } from "framer-motion";

export function MarketPreview() {
  const cards = [
    { name: "Top Gainers", value: "+24.5%", desc: "In the last 24h" },
    { name: "Trending", value: "$CHAD", desc: "Most searched token" },
    { name: "24h Volume", value: "$1.2B", desc: "Across all pairs" }
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5 w-full">
      <div className="mb-12 text-center md:text-left">
        <h2 className="text-3xl font-bold mb-4">Market Preview</h2>
        <p className="text-muted-foreground">Live Solana ecosystem data (Powered by BirdEye)</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-3xl bg-card border border-white/5 shadow-lg"
          >
            <h3 className="text-lg font-medium text-muted-foreground mb-4">{card.name}</h3>
            <p className="text-4xl sm:text-5xl font-bold mb-2 text-foreground tracking-tighter">{card.value}</p>
            <p className="text-sm text-muted-foreground">{card.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
