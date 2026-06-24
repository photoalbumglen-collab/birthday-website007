"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import ScreenContainer from "../ScreenContainer"

export default function LoaderScreen({ onComplete }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete()
        }, 3000)
        return () => clearTimeout(timer)
    }, [onComplete])

    return (
        <ScreenContainer>
            <div className="text-center">

                {/* 💖 GIF */}
                <motion.div
                    className="mb-8"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* Glow ring behind gif - RED PREMIUM */}
                    <div className="relative inline-block">
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: "radial-gradient(circle, rgba(211,47,47,0.45) 0%, transparent 70%)",
                                filter: "blur(16px)",
                                transform: "scale(1.4)",
                                animation: "loaderGlowPulse 2.5s ease-in-out infinite",
                            }}
                        />
                        <motion.img
                            src="/gifs/2.gif"
                            alt="loading gif"
                            className="w-36 h-36 mx-auto relative z-10"
                            style={{
                                filter: "drop-shadow(0 0 18px rgba(255,107,107,0.8)) drop-shadow(0 0 35px rgba(211,47,47,0.5))",
                            }}
                            animate={{ y: [0, -10, 0] }}
                            transition={{
                                duration: 1.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </div>
                </motion.div>

                {/* ✨ Heading - RED GRADIENT */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: "1.45rem",
                        fontWeight: 600,
                        letterSpacing: "0.15em",
                        marginBottom: "1.5rem",
                        background: "linear-gradient(135deg, #ffe0e0 0%, #ff9999 45%, #ff6b6b 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        textShadow: "none",
                        filter: "drop-shadow(0 0 12px rgba(255,107,107,0.55))",
                    }}
                >
                    Loading something special...
                </motion.h1>

                {/* 🌙 Progress Bar - RED */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                    style={{
                        width: "256px",
                        height: "6px",
                        borderRadius: "999px",
                        margin: "0 auto",
                        background: "rgba(211,47,47,0.15)",
                        border: "1px solid rgba(255,107,107,0.3)",
                        backdropFilter: "blur(8px)",
                        overflow: "hidden",
                        boxShadow: "0 0 14px rgba(211,47,47,0.3), inset 0 0 8px rgba(0,0,0,0.3)",
                    }}
                >
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 1.4, duration: 1.3, ease: "easeOut" }}
                        style={{
                            height: "100%",
                            borderRadius: "999px",
                            background: "linear-gradient(to right, #c41c3b, #ff6b6b, #ff9999)",
                            boxShadow: "0 0 10px rgba(255,107,107,0.9), 0 0 22px rgba(211,47,47,0.6)",
                        }}
                    />
                </motion.div>

                {/* Subtle subtitle - RED */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1, duration: 1 }}
                    style={{
                        marginTop: "1.2rem",
                        fontFamily: "'Cinzel', serif",
                        fontSize: "0.6rem",
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        color: "rgba(255,150,150,0.65)",
                    }}
                >
                    ✦ just for you ✦
                </motion.p>
            </div>
        </ScreenContainer>
    )
}