"use client"

import { motion } from "framer-motion"
import ScreenContainer from "../ScreenContainer"

export default function IntroScreen({ onNext }) {
    return (
        <ScreenContainer>
            <div className="text-center max-w-2xl mx-auto">

                {/* ✨ Heading */}
                <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <motion.h1
                        style={{
                            fontFamily: "'Cinzel', serif",
                            fontSize: "clamp(2.2rem, 6vw, 3.5rem)",
                            fontWeight: 600,
                            letterSpacing: "0.08em",
                            marginBottom: "0.5rem",
                            background: "linear-gradient(135deg, #ffe0e0 0%, #ff9999 40%, #ff6b6b 75%, #c41c3b 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            filter: "drop-shadow(0 0 18px rgba(255,107,107,0.6))",
                            lineHeight: 1.25,
                        }}
                    >
                        It's Your Special Day ꫂ❁
                    </motion.h1>

                    {/* Decorative line */}
                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                        style={{
                            height: "1px",
                            width: "160px",
                            margin: "0.75rem auto 0",
                            background: "linear-gradient(to right, transparent, #ff6b6b, #ff9999, #ff6b6b, transparent)",
                            boxShadow: "0 0 10px rgba(255,107,107,0.5)",
                        }}
                    />
                </motion.div>

                {/* 💖 GIF Container */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                >
                    <div
                        style={{
                            width: "152px",
                            height: "152px",
                            margin: "0 auto",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "radial-gradient(circle at 35% 30%, rgba(211,47,47,0.22) 0%, rgba(179,28,28,0.15) 60%, transparent 100%)",
                            border: "1px solid rgba(255,107,107,0.4)",
                            backdropFilter: "blur(12px)",
                            boxShadow: "0 0 30px rgba(211,47,47,0.3), 0 0 60px rgba(211,47,47,0.12), inset 0 0 20px rgba(255,107,107,0.1)",
                            position: "relative",
                        }}
                    >
                        {/* Outer glow ring */}
                        <div style={{
                            position: "absolute", inset: "-6px",
                            borderRadius: "50%",
                            border: "1px solid rgba(255,107,107,0.2)",
                            animation: "introRingPulse 3s ease-in-out infinite",
                        }} />
                        <div style={{
                            position: "absolute", inset: "-14px",
                            borderRadius: "50%",
                            border: "1px solid rgba(211,47,47,0.1)",
                            animation: "introRingPulse 3s ease-in-out infinite 1s",
                        }} />

                        <motion.img
                            src="/gifs/1.gif"
                            alt="Cute romantic illustration"
                            style={{
                                width: "112px",
                                objectFit: "cover",
                                filter: "drop-shadow(0 0 12px rgba(255,107,107,0.7))",
                                position: "relative",
                                zIndex: 1,
                            }}
                            animate={{ y: [0, -7, 0] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                </motion.div>

                {/* 🌙 Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
                        fontStyle: "italic",
                        fontWeight: 300,
                        letterSpacing: "0.04em",
                        color: "rgba(255,150,150,0.8)",
                        marginBottom: "2.8rem",
                        textShadow: "0 0 20px rgba(255,107,107,0.3)",
                    }}
                >
                    I made something special for you...
                </motion.p>

                {/* 🔘 Button */}
                <motion.button
                    onClick={onNext}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        position: "relative",
                        padding: "0.85rem 2.4rem",
                        borderRadius: "999px",
                        border: "1px solid rgba(255,107,107,0.5)",
                        background: "radial-gradient(circle at 40% 30%, rgba(211,47,47,0.4) 0%, rgba(179,28,28,0.28) 50%, rgba(139,28,28,0.5) 100%)",
                        backdropFilter: "blur(14px)",
                        color: "#ffe0e0",
                        fontFamily: "'Cinzel', serif",
                        fontSize: "0.92rem",
                        fontWeight: 600,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        boxShadow: "0 0 20px rgba(211,47,47,0.4), 0 0 45px rgba(211,47,47,0.15), inset 0 1px 0 rgba(255,255,255,0.12)",
                        overflow: "hidden",
                        animation: "btnIdleGlow 3s ease-in-out infinite",
                    }}
                >
                    {/* Shimmer sweep */}
                    <span style={{
                        position: "absolute",
                        top: 0, left: "-100%",
                        width: "100%", height: "100%",
                        background: "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
                        animation: "btnShimmer 3s ease-in-out infinite 2s",
                        pointerEvents: "none",
                    }} />

                    {/* Glass top highlight */}
                    <span style={{
                        position: "absolute",
                        top: 0, left: "10%",
                        width: "80%", height: "40%",
                        background: "linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)",
                        borderRadius: "0 0 50% 50%",
                        pointerEvents: "none",
                    }} />

                    <span style={{ position: "relative", zIndex: 1 }}>
                        Start ⁠◕⁠ᴗ⁠◕⁠
                    </span>
                </motion.button>

            </div>
        </ScreenContainer>
    )
}