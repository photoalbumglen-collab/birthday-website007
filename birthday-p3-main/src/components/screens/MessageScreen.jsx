"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Mail, X } from "lucide-react";
import ScreenContainer from "../ScreenContainer";
import confetti from "canvas-confetti";

export default function MessageScreen() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  const romanticMessage = `Happy Birthday, Love ❤️

You are the most beautiful part of my life, and I'm so lucky to have you. Your smile makes my days better, and your presence makes everything feel special. I hope your birthday is filled with happiness, love, and endless smiles.

Always stay happy — because your happiness means a lot to me. ❤️
`;

  const handleOpen = () => {
    setEnvelopeOpen(true);
    setTimeout(() => setShowOverlay(true), 1500);
  };

  useEffect(() => {
    if (!showOverlay) return;
    setTypedText("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTypedText(romanticMessage.slice(0, i));
      if (i >= romanticMessage.length) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, [showOverlay]);

  const handleCelebrate = () => {
    confetti({
      particleCount: 160,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#dc2626", "#991b1b", "#7f1d1d", "#f87171", "#ef4444", "#b91c1c"],
    });

    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.7 },
        colors: ["#dc2626", "#991b1b", "#7f1d1d"],
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.7 },
        colors: ["#dc2626", "#991b1b", "#7f1d1d"],
      });
    }, 300);
  };

  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <ScreenContainer>
      {/* High Contrast Deep Dark Red Luxury Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap');
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        
        @keyframes neon-blink {
          0%, 100% { opacity: 1; filter: drop-shadow(0 0 8px #dc2626); }
          50% { opacity: 0.4; }
        }
        .soft-cursor {
          animation: neon-blink 0.8s infinite;
          color: #ef4444;
          font-weight: bold;
        }

        /* Velvet Red Custom Scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #dc2626, #7f1d1d);
          border-radius: 10px;
        }
      `}</style>

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 flex flex-col gap-2 text-center"
      >
        <h1
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #f87171 50%, #b91c1c 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 2px 10px rgba(220,38,38,0.5))",
          }}
          className="text-2xl md:text-3xl font-semibold font-cinzel tracking-wider"
        >
          A Letter, Just For You
        </h1>
        <p
          style={{ color: "#f87171", textShadow: "0 0 8px rgba(220,38,38,0.4)" }}
          className="text-sm md:text-base font-cormorant italic tracking-widest mt-1 animate-pulse"
        >
          Tap the heart to unseal your message...
        </p>
      </motion.div>

      {/* High Visibility Deep Red Envelope Wrapper */}
      <motion.div
        className="w-full flex justify-center mb-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <motion.div
          whileHover={{ scale: 1.03, y: -3 }}
          whileTap={{ scale: 0.98 }}
          onClick={!envelopeOpen ? handleOpen : undefined}
          style={{
            background: "linear-gradient(145deg, rgba(20, 4, 7, 0.9) 0%, rgba(5, 1, 2, 0.98) 100%)",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(220, 38, 38, 0.25)",
            border: "1.5px solid rgba(220, 38, 38, 0.4)",
          }}
          className="w-80 h-52 rounded-[36px] flex flex-col items-center justify-center relative cursor-pointer overflow-hidden transition-all duration-300"
        >
          <Mail className="absolute w-36 h-36 text-[#dc2626]/10 pointer-events-none transform -rotate-12" />

          <div className="z-10 flex flex-col items-center gap-5">
            {/* Glowing Deep Red Heart Button */}
            <motion.div
              style={{
                background: "linear-gradient(135deg, #7f1d1d 0%, #450a0a 100%)",
                boxShadow: envelopeOpen 
                  ? "inset 4px 4px 10px rgba(0,0,0,0.9)" 
                  : "0 0 20px rgba(220, 38, 38, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.15)",
                border: "1.5px solid #dc2626",
              }}
              className="w-16 h-16 rounded-full flex items-center justify-center text-[#dc2626] transition-all duration-300"
            >
              <motion.div
                animate={envelopeOpen && !showOverlay ? { rotate: 360 } : { rotate: 0 }}
                transition={
                  envelopeOpen && !showOverlay
                    ? { repeat: Infinity, duration: 1.2, ease: "linear" }
                    : { duration: 0.3 }
                }
                className="flex items-center justify-center"
              >
                <Heart
                  className={`w-7 h-7 transition-colors duration-300 ${
                    envelopeOpen ? "fill-[#dc2626] text-[#dc2626]" : "fill-transparent text-[#ef4444]"
                  }`}
                  style={{ filter: "drop-shadow(0 0 8px #dc2626)" }}
                />
              </motion.div>
            </motion.div>

            <span
              style={{ color: "#ffffff", letterSpacing: "3px", textShadow: "0 0 6px rgba(220,38,38,0.6)" }}
              className="font-cinzel text-[11px] font-bold uppercase"
            >
              {envelopeOpen ? "Opening Letter..." : "Tap To Open"}
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#dc2626]/60 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Dark Red Ribbon Divider */}
      <div className="flex items-center gap-4 justify-center w-full max-w-[180px] mb-6">
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#dc2626]" />
        <Heart className="w-3 h-3 text-[#dc2626] fill-[#dc2626] filter drop-shadow-[0_0_4px_#dc2626]" />
        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#dc2626]" />
      </div>

      {/* Fullscreen Letter Overlay */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            className="min-h-screen w-full flex flex-col items-center justify-center z-50 px-4 py-8 fixed inset-0 bg-black/92 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setShowOverlay(false);
              setEnvelopeOpen(false);
            }}
          >
            {/* Main Letter Card - PERFECTLY STABLE & DEEP VELVET RED THEME */}
            <motion.div
              style={{
                background: "linear-gradient(165deg, #1e050a 0%, #050001 100%)",
                boxShadow: "0 40px 90px rgba(0, 0, 0, 0.95), 0 0 50px rgba(220, 38, 38, 0.3)",
                border: "1.5px solid #991b1b",
              }}
              className="w-full max-w-md h-[550px] rounded-[40px] p-6 relative flex flex-col transition-all duration-300"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 26, stiffness: 170 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Velvet Crimson Rim Glow Line */}
              <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-[#dc2626] to-transparent shadow-[0_2px_15px_#dc2626]" />

              {/* Close Button */}
              <button
                onClick={() => {
                  setShowOverlay(false);
                  setEnvelopeOpen(false);
                }}
                style={{
                  background: "linear-gradient(135deg, #7f1d1d 0%, #150205 100%)",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.6)",
                  border: "1px solid #dc2626",
                }}
                className="absolute top-6 right-6 w-9 h-9 rounded-full flex items-center justify-center text-white hover:text-[#ef4444] active:scale-90 transition-all z-10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Card Title */}
              <div className="text-center mb-5 mt-2">
                <h3
                  style={{
                    background: "linear-gradient(135deg, #ffffff 0%, #f87171 60%, #dc2626 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 2px 6px rgba(220,38,38,0.6))",
                  }}
                  className="font-cinzel text-xl font-semibold tracking-wide"
                >
                  Just For You ✨
                </h3>
                <p
                  style={{ color: "#f87171", textShadow: "0 0 5px rgba(220,38,38,0.4)" }}
                  className="font-cormorant italic text-xs tracking-wider mt-1"
                >
                  From my heart to yours
                </p>
              </div>

              {/* High Contrast Crystal Clear Inner Message Board */}
              <div
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.85)",
                  boxShadow: "inset 0 10px 30px rgba(0,0,0,0.95)",
                  border: "1px solid rgba(153, 27, 27, 0.3)",
                }}
                className="flex-1 overflow-y-auto rounded-[28px] p-6 text-left custom-scrollbar"
              >
                <p
                  style={{
                    textShadow: "0 2px 4px rgba(0,0,0,0.9)",
                  }}
                  className="font-cormorant text-lg sm:text-[19px] leading-relaxed text-[#ffffff] whitespace-pre-line tracking-wide font-medium"
                >
                  {typedText}
                  <span className="soft-cursor">|</span>
                </p>
              </div>

              {/* Royal Dark Red Controls Center */}
              <div className="flex gap-5 mt-6 justify-center w-full">
                {/* Celebrate Button - Crimson/Burgundy Gradient */}
                <motion.button
                  onClick={handleCelebrate}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ 
                    scale: 0.97, 
                    y: 0,
                    boxShadow: "inset 0 4px 10px rgba(0,0,0,0.9)" 
                  }}
                  style={{
                    background: "linear-gradient(135deg, #b91c1c 0%, #450a0a 100%)",
                    boxShadow: "0 6px 20px rgba(220, 38, 38, 0.4), inset 0 1px 1px rgba(255,255,255,0.2)",
                    border: "1px solid #dc2626",
                    color: "#ffffff",
                    textShadow: "0 1px 4px rgba(0,0,0,0.5)"
                  }}
                  className="flex-1 py-3 px-4 rounded-[20px] font-cinzel text-xs font-bold tracking-widest transition-all duration-150 cursor-pointer text-center hover:brightness-110"
                >
                  Celebrate
                </motion.button>

                {/* Restart Button */}
                <motion.button
                  onClick={handleRestart}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ 
                    scale: 0.97, 
                    y: 0,
                    boxShadow: "inset 0 4px 10px rgba(0,0,0,0.9)" 
                  }}
                  style={{
                    background: "linear-gradient(135deg, #270505 0%, #0a0101 100%)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.7)",
                    border: "1px solid #991b1b",
                    color: "#f87171",
                  }}
                  className="flex-1 py-3 px-4 rounded-[20px] font-cinzel text-xs font-bold tracking-widest transition-all duration-150 cursor-pointer text-center hover:text-white hover:border-white"
                >
                  Restart ↺
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenContainer>
  );
}
