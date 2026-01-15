
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { ASSETS, PAYMENTS, GOOGLE_DRIVE_URL, ASSET_FOLDERS, GOOGLE_DRIVE_EMBED_URL } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'form' | 'dashboard' | 'assets' | 'pay'>('landing');
  const [venueName, setVenueName] = useState('');
  const [performanceDate, setPerformanceDate] = useState('');

  // Drive Link State (Persisted in LocalStorage)
  const [driveLink, setDriveLink] = useState(() => localStorage.getItem('neon_drive_link') || '');
  const [isEditingLink, setIsEditingLink] = useState(false);
  const [tempLink, setTempLink] = useState('');

  // Dashboard Form State
  const [rate, setRate] = useState('');
  const [performanceTime, setPerformanceTime] = useState('');
  const [loadInTime, setLoadInTime] = useState('');
  const [pointOfContact, setPointOfContact] = useState('');
  const [hospitality, setHospitality] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (venueName.trim()) {
      setView('dashboard');
    }
  };

  const handleSaveLink = () => {
    if (tempLink.trim()) {
      setDriveLink(tempLink);
      localStorage.setItem('neon_drive_link', tempLink);
      setIsEditingLink(false);
    }
  };

  const handleEditLink = () => {
    setTempLink(driveLink);
    setIsEditingLink(true);
  };

  const getFormattedDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    // Explicitly construct date parts to ensure 4-digit year
    // Format: FRI MARCH 23 2026
    const weekday = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
    const month = date.toLocaleDateString('en-US', { month: 'long' }).toUpperCase();
    const day = date.getDate();
    const year = date.getFullYear(); // Guarantee 4-digit year

    return `${weekday} ${month} ${day} ${year}`;
  };

  // Helper for Nav Items
  const NavItem = ({ label, target, isActive, colorClass = 'bg-neonBlue shadow-[0_0_10px_#00F0FF]' }: { label: string, target: any, isActive: boolean, colorClass?: string }) => (
    <button
      onClick={() => setView(target)}
      className="group relative px-4 py-2 focus:outline-none"
    >
      <span className={`font-mono text-xs md:text-sm uppercase tracking-[0.2em] transition-colors ${isActive ? 'text-white' : 'text-textDim group-hover:text-white'}`}>
        {label}
      </span>
      {isActive && <div className={`absolute bottom-0 left-0 right-0 h-[2px] ${colorClass}`}></div>}
    </button>
  );

  const bottomNav = (
    <div className="w-full flex items-center justify-between max-w-6xl mx-auto">
      {/* Left Status Indicator */}
      <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-textDim tracking-widest uppercase opacity-70">
        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
        System Online
      </div>

      {/* Navigation Links */}
      <div className="flex-1 flex items-center justify-center gap-6 md:gap-12">
        <NavItem label="Home" target="landing" isActive={view === 'landing'} />
        <NavItem label="Booking" target="form" isActive={view === 'form' || view === 'dashboard'} />
        <NavItem
          label="Downloads"
          target="assets"
          isActive={view === 'assets'}
          colorClass="bg-neonPink shadow-[0_0_10px_#FF0099]"
        />
      </div>

      {/* Right Spacer for Balance */}
      <div className="hidden md:block w-[120px]"></div>
    </div>
  );

  // Find Venmo data and a profile pic
  const venmoData = PAYMENTS.find(p => p.platform === 'Venmo');
  const profilePic = ASSETS[0]?.previewUrl || 'https://picsum.photos/200';

  return (
    <Layout bottomNav={bottomNav}>
      <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-enter {
          animation: fadeInScale 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .glitch-hover:hover {
          text-shadow: 2px 0 #FF0099, -2px 0 #00F0FF;
        }
      `}</style>

      {(view === 'landing' || view === 'form') && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 relative w-full h-full">

          {/* Landing View */}
          {view === 'landing' && (
            <div className="flex flex-col md:flex-row items-center justify-center animate-enter gap-8">

              {/* Booking Form Button */}
              <button
                onClick={() => setView('form')}
                className="group relative w-64 h-20 bg-transparent focus:outline-none"
              >
                {/* Button Glitch Layers */}
                <div className="absolute inset-0 border border-neonBlue/50 skew-x-12 transition-all duration-300 group-hover:skew-x-0 group-hover:border-neonBlue group-hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] group-hover:bg-neonBlue/10"></div>

                {/* Text Layer */}
                <div className="absolute inset-0 flex items-center justify-center skew-x-12 group-hover:skew-x-0 transition-all duration-300">
                  <span className="font-display text-xl tracking-[0.1em] text-neonBlue group-hover:text-white transition-colors glitch-hover uppercase">
                    Booking Form
                  </span>
                </div>

                {/* Decorative Tech Marks */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-white skew-x-12 opacity-50"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white skew-x-12 opacity-50"></div>
              </button>

              {/* Assets Button */}
              <button
                onClick={() => setView('assets')}
                className="group relative w-64 h-20 bg-transparent focus:outline-none block"
              >
                {/* Button Glitch Layers */}
                <div className="absolute inset-0 border border-neonPink/50 skew-x-12 transition-all duration-300 group-hover:skew-x-0 group-hover:border-neonPink group-hover:shadow-[0_0_20px_rgba(255,0,153,0.5)] group-hover:bg-neonPink/10"></div>

                {/* Text Layer */}
                <div className="absolute inset-0 flex items-center justify-center skew-x-12 group-hover:skew-x-0 transition-all duration-300">
                  <span className="font-display text-xl tracking-[0.1em] text-neonPink group-hover:text-white transition-colors glitch-hover uppercase">
                    Assets
                  </span>
                </div>

                {/* Decorative Tech Marks */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-white skew-x-12 opacity-50"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white skew-x-12 opacity-50"></div>
              </button>

              {/* Pay Button */}
              <button
                onClick={() => setView('pay')}
                className="group relative w-64 h-20 bg-transparent focus:outline-none block"
              >
                {/* Button Glitch Layers - Neon Purple */}
                <div className="absolute inset-0 border border-neonPurple/50 skew-x-12 transition-all duration-300 group-hover:skew-x-0 group-hover:border-neonPurple group-hover:shadow-[0_0_20px_rgba(189,0,255,0.5)] group-hover:bg-neonPurple/10"></div>

                {/* Text Layer */}
                <div className="absolute inset-0 flex items-center justify-center skew-x-12 group-hover:skew-x-0 transition-all duration-300">
                  <span className="font-display text-xl tracking-[0.1em] text-neonPurple group-hover:text-white transition-colors glitch-hover uppercase">
                    Pay
                  </span>
                </div>

                {/* Decorative Tech Marks */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-white skew-x-12 opacity-50"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white skew-x-12 opacity-50"></div>
              </button>

            </div>
          )}

          {/* Form View */}
          {view === 'form' && (
            <div className="w-full max-w-md animate-enter">
              <div className="neon-card relative overflow-hidden backdrop-blur-xl bg-black/40 border-t border-b border-white/10 sm:border sm:rounded-2xl">
                {/* Scanline decoration */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neonBlue/5 to-transparent opacity-20 pointer-events-none bg-[length:100%_4px]"></div>

                <div className="p-8 md:p-12 relative z-10">
                  <div className="mb-10 text-center">
                    <div className="inline-block border border-neonPink/50 text-neonPink px-2 py-0.5 text-[10px] font-mono mb-3 tracking-widest uppercase">
                      Protocol 7.4
                    </div>
                    <h2 className="font-display text-3xl text-white mb-1 tracking-wide">AUTHENTICATE</h2>
                    <p className="font-mono text-[10px] text-textDim tracking-widest uppercase">Verify Credentials to Proceed</p>
                  </div>

                  <form className="space-y-6" onSubmit={handleConnect}>
                    <div className="space-y-2 group">
                      <label className="flex justify-between text-[10px] font-mono text-neonBlue uppercase tracking-wider group-focus-within:text-white transition-colors">
                        <span>VENUE</span>
                        <span className="opacity-0 group-focus-within:opacity-100">INPUT_ACTIVE</span>
                      </label>
                      <input
                        type="text"
                        autoFocus
                        value={venueName}
                        onChange={(e) => setVenueName(e.target.value)}
                        className="w-full bg-black/60 border-l-2 border-white/20 text-white font-mono px-4 py-3 focus:outline-none focus:border-neonBlue focus:bg-neonBlue/5 transition-all placeholder-white/10 uppercase"
                        placeholder="ENTER VENUE NAME"
                      />
                    </div>

                    <div className="space-y-2 group">
                      <label className="flex justify-between text-[10px] font-mono text-neonBlue uppercase tracking-wider group-focus-within:text-white transition-colors">
                        <span>PERFORMANCE DATE</span>
                        <span className="opacity-0 group-focus-within:opacity-100">INPUT_ACTIVE</span>
                      </label>
                      <input
                        type="text"
                        value={performanceDate}
                        onChange={(e) => setPerformanceDate(e.target.value)}
                        className="w-full bg-black/60 border-l-2 border-white/20 text-white font-mono px-4 py-3 focus:outline-none focus:border-neonBlue focus:bg-neonBlue/5 transition-all placeholder-white/10 uppercase"
                        placeholder="MM/DD/YYYY"
                      />
                    </div>

                    <div className="pt-6">
                      <button type="submit" className="w-full group relative py-4 bg-white/5 overflow-hidden transition-all hover:bg-neonBlue/10">
                        <div className="absolute inset-0 border border-white/20 group-hover:border-neonBlue transition-colors"></div>
                        <div className="relative z-10 flex items-center justify-center gap-3">
                          <span className="font-display text-xl tracking-widest text-white group-hover:text-neonBlue transition-colors uppercase">Connect</span>
                          <svg className="w-5 h-5 text-white/50 group-hover:text-neonBlue group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </button>
                    </div>
                  </form>

                  <div className="mt-8 text-center">
                    <button
                      onClick={() => setView('landing')}
                      className="text-[10px] font-mono text-textDim hover:text-white uppercase tracking-widest transition-colors flex items-center justify-center gap-2 mx-auto opacity-50 hover:opacity-100"
                    >
                      <span>&lt;</span> Abort Sequence
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {view === 'dashboard' && (
        /* Dashboard View */
        <div className="w-full h-full flex flex-col animate-enter">
          {/* Dashboard Header / Status Bar */}
          <div className="bg-black/40 border-b border-white/10 backdrop-blur-md py-4 px-6 lg:px-12 flex flex-col items-center justify-center relative overflow-hidden shrink-0">

            {/* Background Gradient for Header */}
            <div className="absolute inset-0 bg-gradient-to-r from-neonBlue/5 to-transparent pointer-events-none"></div>

            {/* Venue Name & Date */}
            <div className="relative z-10 flex flex-col items-center gap-1 text-center">
              <h1 className="font-display text-4xl md:text-6xl text-white uppercase tracking-tighter drop-shadow-[0_0_20px_rgba(0,240,255,0.4)] leading-none mb-1">
                {venueName}
              </h1>
              <div className="flex flex-col items-center">
                <span className="font-mono text-textDim text-[10px] uppercase tracking-[0.3em] opacity-70">PERFORMANCE DATE</span>
                <span className="font-mono text-neonBlue text-base md:text-lg uppercase tracking-[0.2em] drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]">
                  {getFormattedDate(performanceDate)}
                </span>
              </div>
            </div>
          </div>

          {/* Main Dashboard Content Area */}
          <div className="flex-1 p-4 lg:p-8 overflow-y-auto custom-scrollbar">
            <div className="max-w-4xl mx-auto w-full">

              <form className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-black/20 p-8 rounded-2xl border border-white/5 backdrop-blur-sm">
                {/* Rate / Compensation */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-neonBlue uppercase tracking-widest">Rate / Compensation</label>
                  <input
                    type="text"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    placeholder="1 MILLION DOLLARS"
                    className="w-full bg-surface/50 border border-white/10 text-white font-mono px-4 py-3 focus:outline-none focus:border-neonPink focus:bg-white/5 transition-all"
                  />
                </div>

                {/* Performance Time */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-neonBlue uppercase tracking-widest">Performance Time</label>
                  <input
                    type="text"
                    value={performanceTime}
                    onChange={(e) => setPerformanceTime(e.target.value)}
                    placeholder="8:00 PM - 9:30 PM"
                    className="w-full bg-surface/50 border border-white/10 text-white font-mono px-4 py-3 focus:outline-none focus:border-neonBlue focus:bg-white/5 transition-all"
                  />
                </div>

                {/* Load In Time */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-neonBlue uppercase tracking-widest">Load In Time</label>
                  <input
                    type="text"
                    value={loadInTime}
                    onChange={(e) => setLoadInTime(e.target.value)}
                    placeholder="4:00 PM"
                    className="w-full bg-surface/50 border border-white/10 text-white font-mono px-4 py-3 focus:outline-none focus:border-neonBlue focus:bg-white/5 transition-all"
                  />
                </div>

                {/* Point of Contact */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-neonBlue uppercase tracking-widest">Point of Contact</label>
                  <input
                    type="text"
                    value={pointOfContact}
                    onChange={(e) => setPointOfContact(e.target.value)}
                    placeholder="Joe, Bartender"
                    className="w-full bg-surface/50 border border-white/10 text-white font-mono px-4 py-3 focus:outline-none focus:border-neonBlue focus:bg-white/5 transition-all"
                  />
                </div>

                {/* Food & Drinks */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-mono text-neonBlue uppercase tracking-widest">Food & Drinks / Hospitality</label>
                  <input
                    type="text"
                    value={hospitality}
                    onChange={(e) => setHospitality(e.target.value)}
                    placeholder="Dinner buy-out, 24 waters, Tequila"
                    className="w-full bg-surface/50 border border-white/10 text-white font-mono px-4 py-3 focus:outline-none focus:border-neonBlue focus:bg-white/5 transition-all"
                  />
                </div>

                {/* Special Instructions - Full Width */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-mono text-neonBlue uppercase tracking-widest">Special Instructions</label>
                  <textarea
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    rows={4}
                    placeholder="Please enter parking details and specific load-in instructions here..."
                    className="w-full bg-surface/50 border border-white/10 text-white font-mono px-4 py-3 focus:outline-none focus:border-neonPurple focus:bg-white/5 transition-all"
                  />
                  <p className="text-[10px] text-textDim uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1 h-1 bg-neonPurple rounded-full"></span>
                    Suggestion: Include parking location & load-in ramp details
                  </p>
                </div>

                <div className="md:col-span-2 pt-4 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setView('assets')}
                    className="group relative px-8 py-3 overflow-hidden"
                  >
                    <div className="absolute inset-0 border border-neonBlue group-hover:bg-neonBlue/10 transition-all"></div>
                    <span className="font-display uppercase tracking-widest text-neonBlue relative z-10 group-hover:text-white transition-colors">
                      SUBMIT
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {view === 'assets' && (
        <div className="w-full h-full flex flex-col animate-enter">
          {/* Assets Header */}
          <div className="bg-black/40 border-b border-white/10 backdrop-blur-md p-6 lg:px-12 flex items-center justify-center min-h-[100px] relative">
            <button
              onClick={() => setView('landing')}
              className="absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/40 rounded-full border border-white/10 hover:bg-white/10 text-white transition-all z-20"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="font-display text-4xl text-white uppercase tracking-tighter drop-shadow-[0_0_15px_rgba(255,0,153,0.3)]">
              Downloads
            </h1>
          </div>

          <div className="flex-1 w-full h-full p-4 lg:p-8 flex flex-col items-center justify-center overflow-hidden">
            <div className="w-full max-w-5xl h-full border border-white/10 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.1)] relative group">

              {/* Loading State Skeleton (behind iframe) */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-0">
                <div className="flex flex-col items-center gap-3">
                  <span className="w-8 h-8 border-2 border-neonBlue border-t-transparent rounded-full animate-spin"></span>
                  <span className="font-mono text-xs text-neonBlue tracking-widest animate-pulse">ESTABLISHING UPLINK...</span>
                </div>
              </div>

              <iframe
                src={GOOGLE_DRIVE_EMBED_URL}
                className="w-full h-full relative z-10 bg-white"
                style={{ filter: 'invert(1) hue-rotate(180deg) contrast(1.2) saturate(1.2)' }}
                title="Neon Blonde Assets"
                allowFullScreen
              ></iframe>

              {/* Tech Corners */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neonBlue pointer-events-none z-20"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neonPink pointer-events-none z-20"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neonPink pointer-events-none z-20"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neonBlue pointer-events-none z-20"></div>
            </div>
          </div>
        </div>
      )}

      {view === 'pay' && (
        <div className="w-full h-full flex flex-col items-center justify-start animate-enter p-4 pt-10">

          {/* Navigation & Toggle Header */}
          <div className="w-full max-w-sm flex items-center justify-between mb-8">
            <button
              onClick={() => setView('landing')}
              className="w-10 h-10 flex items-center justify-center bg-black/40 rounded-full border border-white/10 hover:bg-white/10 text-white transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex bg-surface/80 p-1 rounded-full border border-white/10 backdrop-blur-sm">
              <div className="px-4 py-1.5 rounded-full text-xs font-mono text-textDim opacity-50">Scan code</div>
              <div className="px-4 py-1.5 rounded-full bg-white text-black text-xs font-bold font-sans shadow-lg">Venmo me</div>
            </div>

            <div className="w-10"></div> {/* Spacer */}
          </div>

          {/* Profile Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-neonPink to-neonPurple shadow-[0_0_20px_rgba(255,0,153,0.3)] mb-4">
              <img
                src={profilePic}
                alt="Neon Blonde"
                className="w-full h-full rounded-full object-cover border-4 border-black"
              />
            </div>
            <h2 className="font-display text-2xl text-white tracking-wide mb-1">Neon Blonde</h2>
            <p className="font-mono text-sm text-neonBlue/80 tracking-wide">{venmoData?.handle?.toLowerCase() || '@neonblondeband'}</p>
          </div>

          {/* QR Code Container - Removed White Card */}
          <div className="relative w-full max-w-xs flex flex-col items-center">
            <div className="relative">
              <img
                src={venmoData?.qrCode}
                alt="Venmo QR Code"
                className="w-32 h-32 object-contain rounded-xl"
              />
              {/* Center Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-neonPink to-neonPurple flex items-center justify-center text-[8px] font-black text-white leading-none">
                    NB
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 font-bold text-white text-2xl tracking-tighter italic">
              venmo
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex gap-8 mt-12">
            <button className="flex flex-col items-center gap-2 text-textDim hover:text-white transition-colors">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-black/40 hover:bg-white/5 transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
              </div>
              <span className="text-[10px] font-mono uppercase">Print</span>
            </button>
            <button className="flex flex-col items-center gap-2 text-textDim hover:text-white transition-colors">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-black/40 hover:bg-white/5 transition-all">
                <span className="font-display text-lg">$</span>
              </div>
              <span className="text-[10px] font-mono uppercase">Set Amount</span>
            </button>
            <button className="flex flex-col items-center gap-2 text-textDim hover:text-white transition-colors">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-black/40 hover:bg-white/5 transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <span className="text-[10px] font-mono uppercase">Share</span>
            </button>
          </div>

        </div>
      )}
    </Layout>
  );
};

export default App;
