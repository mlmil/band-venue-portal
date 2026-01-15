
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  bottomNav?: React.ReactNode;
}

const Logo: React.FC = () => {
  return (
    <div className="font-display font-black text-3xl tracking-tighter flex items-center gap-3 select-none">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-neonPink to-neonPurple flex items-center justify-center text-white text-xl shadow-neon-pink">
        NB
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-neonPink neon-text-glow-pink text-xl">NEON</span>
        <span className="text-neonBlue neon-text-glow text-xl -mt-1">BLONDE</span>
      </div>
    </div>
  );
};

const Layout: React.FC<LayoutProps> = ({ children, bottomNav }) => {
  return (
    <div className="flex flex-col h-screen bg-cyber-gradient text-textMain overflow-hidden relative font-sans selection:bg-neonPink selection:text-white">
      {/* Background Grid Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-grid-pattern bg-[length:40px_40px]"></div>
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-neonBlue/5 to-transparent z-0 pointer-events-none"></div>

      {/* Top Bar */}
      <header className="h-20 shrink-0 bg-surface/50 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-8 relative z-20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
        <Logo />
        <div className="font-mono text-neonBlue text-xs md:text-sm tracking-[0.3em] uppercase neon-text-glow border border-neonBlue/30 px-4 py-2 rounded bg-neonBlue/5">
          ASSETS PORTAL
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 overflow-hidden flex flex-col">
        {children}
      </main>

      {/* Bottom Bar - Navigation */}
      <footer className="h-20 shrink-0 bg-surface/50 backdrop-blur-xl border-t border-white/10 relative z-20 flex items-center justify-center px-4 md:px-8">
         {bottomNav ? bottomNav : (
            <div className="w-full h-full flex items-center justify-center opacity-20 border-2 border-dashed border-white/5 m-2 rounded">
                <span className="font-mono text-xs tracking-widest">BOTTOM_BAR_MODULE</span>
            </div>
         )}
      </footer>
    </div>
  );
};

export default Layout;
