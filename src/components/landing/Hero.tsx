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
        <Button size="lg" className="rounded-full w-full sm:w-auto h-14 px-8 text-lg font-semibold bg-white text-black hover:bg-white/90">
          Download App
        </Button>
        <Button size="lg" variant="outline" className="rounded-full w-full sm:w-auto h-14 px-8 text-lg font-semibold border-white/20 hover:bg-white/5 bg-transparent text-white">
          View Web App
        </Button>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-20 relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/5 bg-black/50"
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
