"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import LoaderScreen from "@/components/screens/LoaderScreen";
import IntroScreen from "@/components/screens/IntroScreen";
import Birthdayscreen from "@/components/screens/Birthdayscreen";
import PhotoGalleryScreen from "@/components/screens/PhotoGalleryScreen";
import MessageScreen from "@/components/screens/MessageScreen";

// ═════════════════════════════════════════
// PURE TRANSPARENT INTEGRATED SEALED SCREEN
// ═════════════════════════════════════════
function SealedLetterScreen({ onNext, onPlayMusic }) {
  const [password, setPassword] = useState("");
  const [isRevealed, setIsRevealed] = useState(false); // Controls the up-slide and pad reveal
  const [isLightboxOpen, setIsLightboxOpen] = useState(false); // Second click opens hint
  const CORRECT_PASSWORD = "9986"; 

  const playDialTone = (digit) => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      
      const ctx = new AudioContext();
      const dtmfFreqs = {
        '1': [697, 1209], '2': [697, 1336], '3': [697, 1477],
        '4': [770, 1209], '5': [770, 1336], '6': [770, 1477],
        '7': [852, 1209], '8': [852, 1336], '9': [852, 1477],
        '0': [941, 1336]
      };

      const freqs = dtmfFreqs[digit] || [770, 1336];
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc1.frequency.value = freqs[0];
      osc2.frequency.value = freqs[1];

      gainNode.gain.setValueAtTime(0.04, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start();
      osc2.start();
      
      osc1.stop(ctx.currentTime + 0.15);
      osc2.stop(ctx.currentTime + 0.15);
    } catch (e) {
      console.log("Audio Context error:", e);
    }
  };

  const handleImageClick = (e) => {
    e.stopPropagation();
    if (!isRevealed) {
      setIsRevealed(true); // First click: slides image up and reveals passkey button/dialpad
    } else {
      setIsLightboxOpen(true); // Subsequent click: opens the 2026 hint lightbox
    }
  };

  const handleKeyClick = (digit) => {
    playDialTone(digit);
    if (password.length >= 4) return;
    
    const newPassword = password + digit;
    setPassword(newPassword);

    if (newPassword.length === 4) {
      setTimeout(() => {
        if (newPassword === CORRECT_PASSWORD) {
          onPlayMusic?.();
          onNext?.();
        } else {
          alert("Passcode incorrect, click on image again to know passkey");
          setPassword("");
        }
      }, 250);
    }
  };

  const handleClear = () => {
    playDialTone('0');
    setPassword("");
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 bg-transparent select-none z-10">
      
      {/* ── CENTRALIZED DYNAMIC CONTAINER (NO EXTRA BOX BACKGROUNDS) ── */}
      <div className="flex flex-col items-center justify-center w-full max-w-[340px] bg-transparent relative">

        {/* PROFILE IMAGE: Click leads to layout shift (Slides thoda upar) */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 140, damping: 22 }}
          className="relative z-50 cursor-pointer flex flex-col items-center mb-2"
          onClick={handleImageClick}
        >
          <div className="glass-lens-seal">
            <div className="lens-image-wrapper">
              <img src="/images/1.png" alt="Seal Trigger" className="lens-image-src" />
            </div>
          </div>
          
          <div className="glass-stamp-badge mt-1 opacity-20 text-[11px] text-red-500">
            <span>𓆩❤︎𓆪</span>
          </div>
        </motion.div>

        {/* BEFORE REVEAL: Cinematic Invitation text underneath centered image */}
        <AnimatePresence mode="wait">
          {!isRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center mt-4 flex flex-col items-center cursor-pointer bg-transparent"
              onClick={handleImageClick}
            >
              <h1 className="glass-title-cinematic">LOCKED</h1>
              <p className="glass-subtitle-warm animate-pulse">
                Click on picture above to reveal passkey entry •
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AFTER REVEAL: Dynamic layout expands cleanly from top over global background */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, height: "auto", scale: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 150, damping: 22 }}
              className="w-full overflow-hidden origin-top bg-transparent mt-2"
            >
              <div className="w-full flex flex-col bg-transparent">
                
                {/* LCD Micro Passcode Screen Module */}
                <div className="w-full mb-5 bg-transparent">
                  <div className="glass-display-label">
                    <span className="glass-line-node" />
                    <span>SECURE SYSTEM ENTRY</span>
                    <span className="glass-line-node" />
                  </div>

                  <div className="glass-lcd-screen relative">
                    <div className="glass-screen-reflection" />
                    <div className="glass-lcd-inner-shadow" />
                    <div className="glass-lcd-text">
                      {password.padEnd(4, "•")}
                    </div>
                  </div>
                </div>

                {/* SKEUOMORPHIC CONTROLS WITH RED GRADIENT FLOATING DIRECTLY ON BG */}
                <div className="glass-dialpad-grid grid grid-cols-3 gap-4 justify-items-center w-full px-2 bg-transparent">
                  {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
                    <button
                      key={num}
                      type="button"
                      className="glass-dial-btn"
                      onClick={() => handleKeyClick(num)}
                    >
                      <span className="glass-btn-content">{num}</span>
                    </button>
                  ))}
                  
                  {/* Backspace Button */}
                  <button 
                    type="button" 
                    className="glass-dial-btn glass-clear-btn" 
                    onClick={handleClear}
                  >
                    <span className="glass-btn-content">⌫</span>
                  </button>

                  {/* Zero Button */}
                  <button 
                    type="button" 
                    className="glass-dial-btn" 
                    onClick={() => handleKeyClick("0")}
                  >
                    <span className="glass-btn-content">0</span>
                  </button>

                  {/* Red Status LED indicator */}
                  <div className="glass-status-indicator flex items-center justify-center w-[56px] h-[56px]">
                    <div className="glass-led-dot" />
                  </div>
                </div>

                <div className="text-center mt-4 text-[9px] tracking-widest text-white/20 uppercase">
                  Hint: Click on image again if you forget passkey
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ====== ORIGINAL SYSTEM LIGHTBOX (REVEAL 2026 HINT) ====== */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div 
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div 
              className="lightbox-content-wrapper"
              initial={{ scale: 0.7, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              onClick={(e) => e.stopPropagation()} 
            >
              <div className="lightbox-image-container">
                <img src="/images/1.png" alt="Enlarged Hint View" className="lightbox-image" />
              </div>
              
              <div className="lightbox-meta-footer">
                <div className="meta-neon-line" />
                <span className="meta-label">PASSKEY = 9986</span>
              </div>

              <button 
                type="button" 
                className="lightbox-close-btn"
                onClick={() => setIsLightboxOpen(false)}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═════════════════════════════════════════
// MAIN BIRTHDAY SITE CONTAINER WITH ALL SCREENS
// ═════════════════════════════════════════
export default function Birthdaysite() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const audioRef = useRef(null);
  const [particles, setParticles] = useState([]);

  const createParticles = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const symbols = ["✨", "❤️", "🌹", "✨"];

    const newParticles = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      x,
      y,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      offsetX: (Math.random() - 0.5) * 140,
      offsetY: -Math.random() * 120 - 30,
      rotate: Math.random() * 360,
      size: Math.random() * 10 + 8,
      duration: Math.random() * 0.4 + 1.0,
    }));

    setParticles((prev) => [...prev, ...newParticles]);

    setTimeout(() => {
      setParticles((prev) =>
        prev.filter((p) => !newParticles.find((np) => np.id === p.id)),
      );
    }, 1000);
  };

  useEffect(() => {
    audioRef.current = new Audio("/music.mp4");
    audioRef.current.loop = true;
    return () => audioRef.current?.pause();
  }, []);

  const playMusic = async () => {
    try {
      await audioRef.current?.play();
    } catch (err) {
      console.log("Audio play blocked:", err);
    }
  };

  const screens = [
    <SealedLetterScreen
      key="sealed"
      onNext={() => setCurrentScreen(1)}
      onPlayMusic={playMusic}
    />,
    <LoaderScreen key="loader" onComplete={() => setCurrentScreen(2)} />,
    <IntroScreen key="intro" onNext={() => setCurrentScreen(3)} />,
    <Birthdayscreen key="birthday" onNext={() => setCurrentScreen(4)} />,
    <PhotoGalleryScreen key="gallery" onNext={() => setCurrentScreen(5)} />,
    <MessageScreen key="message" />,
  ];

  return (
    <main
      onClick={createParticles}
      className="w-screen h-screen overflow-hidden relative select-none"
    >
      {/* Pure background elements utilizing your global layout setups */}
      <div className="cosmic-bg absolute inset-0 z-0" />
      <div className="aurora aurora-1 absolute inset-0 z-0" />
      <div className="aurora aurora-2 absolute inset-0 z-0" />
      <div className="stars-layer absolute inset-0 z-0" />

      {/* FLOATING PARTICLES LOOP */}
      <div className="absolute inset-0 overflow-hidden z-1 pointer-events-none">
        {[...Array(30)].map((_, i) => {
          const size = 1.2 + Math.random() * 2.2;
          return (
            <span
              key={i}
              className="particle firefly"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: `-${10 + Math.random() * 20}px`,
                width: `${size}px`,
                height: `${size}px`,
                animationDuration: `${10 + Math.random() * 10}s`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: 0.15 + Math.random() * 0.35,
              }}
            />
          );
        })}
      </div>

      {/* ACTIVE SCREEN RENDERER */}
      <div className="relative z-10 flex w-full h-full items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, y: 15, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex justify-center items-center"
          >
            {screens[currentScreen]}
          </motion.div>
        </AnimatePresence>
      </div>



      {/* ═════════════════════════════════════════
         CSS ENGINE: FLOATING RED GRADIENT DIALPAD
         ═════════════════════════════════════════ */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Quicksand:wght@300;400;500;600&display=swap");

        :root {
          --primary-red: #ff1e3d;
          --primary-red-glow: rgba(255, 30, 61, 0.45);
          --deep-black: #050304;
        }

        html, body {
          margin: 0;
          padding: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          font-family: "Quicksand", sans-serif;
          background: var(--deep-black); 
        }

        /* FLOATING SEAL ROUND ENGINE */
        .glass-lens-seal {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(6, 3, 4, 0.45);
          padding: 4px;
          border: 1px solid rgba(0, 0, 0, 0.6);
          border-bottom: 1px solid rgba(255, 30, 61, 0.3);
          box-shadow: 
            inset 0 2px 5px rgba(0, 0, 0, 0.85),
            0 4px 15px rgba(0, 0, 0, 0.6);
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
        }
        .glass-lens-seal:hover {
          transform: scale(1.04);
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.8), 0 0 14px var(--primary-red-glow);
        }
        .lens-image-wrapper {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          border: 1px solid rgba(255, 30, 61, 0.25);
          background: #100b0c;
        }
        .lens-image-src {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* CLEAN MINIMALIST TEXT LAYERS */
        .glass-title-cinematic {
          margin: 0;
          font-size: 26px;
          font-weight: 300;
          font-family: "Cormorant Garamond", serif;
          letter-spacing: 3px;
          color: #ffffff;
          text-shadow: 0 0 12px rgba(255, 255, 255, 0.2);
        }
        .glass-subtitle-warm {
          margin: 5px 0 0;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.35);
          letter-spacing: 0.5px;
        }

        /* DISPLAY INTERFACE CONFIGS */
        .glass-display-label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 8px;
          letter-spacing: 2.5px;
          color: rgba(255, 30, 61, 0.45);
          font-weight: 600;
          margin-bottom: 10px;
        }
        .glass-line-node {
          flex: 1;
          height: 1px;
          background: rgba(255, 30, 61, 0.15);
        }
        .glass-lcd-screen {
          width: 100%;
          height: 52px;
          border-radius: 12px;
          background: #030102;
          border: 1px solid rgba(0, 0, 0, 0.95);
          border-bottom: 1px solid rgba(255, 30, 61, 0.18);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .glass-lcd-inner-shadow {
          position: absolute;
          inset: 0;
          box-shadow: inset 0 3px 10px rgba(0, 0, 0, 0.95);
        }
        .glass-screen-reflection {
          position: absolute;
          inset: 0;
          background: linear-gradient(115deg, rgba(255,255,255,0.01) 0%, transparent 40%);
        }
        .glass-lcd-text {
          font-family: monospace;
          font-size: 22px;
          letter-spacing: 14px;
          text-indent: 14px; 
          color: rgba(255, 255, 255, 0.9);
          filter: drop-shadow(0 0 6px var(--primary-red));
        }

        /* PREMIUM SKEUOMORPH DIALPAD WITH DARK RED GRADIENT */
        .glass-dial-btn {
          width: 56px;
          height: 56px;
          border: none;
          outline: none;
          border-radius: 14px;
          /* Luxurious gradient mixing ultra deep crimson and charcoal black */
          background: linear-gradient(135deg, rgba(35, 12, 15, 0.92) 0%, rgba(12, 6, 8, 0.95) 100%);
          
          /* Tactical metallic outlines */
          border-top: 1.2px solid rgba(255, 30, 61, 0.25);
          border-left: 1px solid rgba(255, 30, 61, 0.1);
          border-bottom: 2.5px solid rgba(0, 0, 0, 0.9);
          border-right: 1px solid rgba(0, 0, 0, 0.6);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          
          /* Warm velvet red inner shadow effect */
          box-shadow: 
            0 5px 14px rgba(0, 0, 0, 0.6),
            inset 0 1px 2px rgba(255, 30, 61, 0.15);
          transition: all 0.12s cubic-bezier(0.2, 0, 0, 1);
        }
        
        .glass-btn-content {
          color: rgba(255, 255, 255, 0.6);
          font-size: 17px;
          font-weight: 500;
          transition: color 0.1s ease, text-shadow 0.1s ease;
        }

        /* HOVER: Vibrant dynamic illumination */
        .glass-dial-btn:hover {
          border-top-color: rgba(255, 30, 61, 0.5);
          background: linear-gradient(135deg, rgba(50, 15, 20, 0.95) 0%, rgba(18, 8, 10, 0.95) 100%);
          box-shadow: 
            0 6px 16px rgba(0, 0, 0, 0.65),
            0 0 10px rgba(255, 30, 61, 0.15),
            inset 0 1px 4px rgba(255, 30, 61, 0.3);
        }
        
        .glass-dial-btn:hover .glass-btn-content {
          color: #ffffff;
          text-shadow: 0 0 6px rgba(255, 30, 61, 0.85);
        }

        /* MECHANICAL PRESS STATE */
        .glass-dial-btn:active {
          transform: translateY(2px);
          border-bottom-width: 0.5px;
          border-top-color: transparent;
          border-left-color: transparent;
          background: linear-gradient(135deg, rgba(16, 4, 6, 0.98) 0%, rgba(6, 2, 3, 0.98) 100%);
          box-shadow: 
            0 2px 4px rgba(0, 0, 0, 0.75),
            inset 0 3px 8px rgba(0, 0, 0, 0.9);
        }

        /* Action specific glow */
        .glass-clear-btn:hover .glass-btn-content {
          color: #ff334b;
        }

        /* STATE LED INDICATOR */
        .glass-led-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--primary-red);
          animation: organicRedPulse 2.4s infinite alternate ease-in-out;
        }
        @keyframes organicRedPulse {
          0% { opacity: 0.2; box-shadow: 0 0 3px var(--primary-red-glow); }
          100% { opacity: 0.95; box-shadow: 0 0 10px var(--primary-red); }
        }

        /* CINEMATIC OVERLAY LIGHTBOX SETUP */
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(3, 2, 2, 0.92);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .lightbox-content-wrapper {
          position: relative;
          width: 100%;
          max-width: 380px;
          border-radius: 20px;
          overflow: hidden;
          background: #0c0809;
          border: 1px solid rgba(255, 30, 61, 0.2);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.95);
        }
        .lightbox-image-container {
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000;
        }
        .lightbox-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .lightbox-meta-footer {
          position: relative;
          width: 100%;
          padding: 16px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #070405;
        }
        .meta-neon-line {
          position: absolute;
          top: 0;
          left: 10%;
          width: 80%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--primary-red), transparent);
        }
        .meta-label {
          font-family: monospace;
          font-size: 13px;
          color: #ffffff;
          letter-spacing: 4px;
          text-shadow: 0 0 6px var(--primary-red-glow);
        }
        .lightbox-close-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: rgba(0,0,0,0.6);
          border: 1px solid rgba(255,255,255,0.1);
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .lightbox-close-btn:hover {
          background: var(--primary-red);
          transform: rotate(90deg);
        }
      `}</style>
    </main>
  );
}