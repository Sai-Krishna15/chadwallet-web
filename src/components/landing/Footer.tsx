import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6 bg-black w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3 opacity-80">
          <Image src="/assets/logo/dark.png" alt="ChadWallet Logo" width={28} height={28} className="w-7 h-7 object-contain" />
          <span className="text-lg font-bold tracking-tight">ChadWallet</span>
        </div>
        <div className="flex gap-8 text-sm font-medium text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">Twitter</a>
          <a href="#" className="hover:text-primary transition-colors">Discord</a>
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
        </div>
        <div className="text-sm text-muted-foreground/60">
          © {new Date().getFullYear()} ChadWallet. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
