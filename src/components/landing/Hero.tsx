"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden max-w-7xl mx-auto flex flex-col items-center text-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl"
      >
        The only crypto wallet you&apos;ll ever need.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl"
      >
        Trade faster, track smarter, and discover trending tokens on Solana before anyone else. Welcome to the ChadWallet experience.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
      >
        <a
          href="https://apps.apple.com/us/app/chadwallet/id6757367474"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download on the App Store"
        >
          <Button size="lg" className="rounded-full w-full sm:w-auto h-14 px-8 text-lg font-semibold bg-white text-black hover:bg-white/90">
            App Store
          </Button>
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Get it on Google Play"
        >
          <Button size="lg" className="rounded-full w-full sm:w-auto h-14 px-8 text-lg font-semibold bg-white text-black hover:bg-white/90">
            Google Play
          </Button>
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mt-20 relative w-full max-w-[300px] sm:max-w-[340px] aspect-[9/19.5] rounded-[2.5rem] overflow-hidden border-[8px] border-[#111] shadow-[0_0_80px_-20px_rgba(255,255,255,0.2)] bg-black ring-1 ring-white/10"
      >
        <video
          src="/assets/video/chadwallet.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </motion.div>
    </section>
  );
}
