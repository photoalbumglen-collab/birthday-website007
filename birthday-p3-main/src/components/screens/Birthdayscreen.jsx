"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ScreenContainer from "../ScreenContainer"

export default function BirthdayScreen({ onNext }) {
    const [timeData, setTimeData] = useState({
        years: 0,
        months: 0,
        days: 0,
    })

    const specialDate = new Date("1996-06-27")

    useEffect(() => {
        const today = new Date()

        let years = today.getFullYear() - specialDate.getFullYear()
        let months = today.getMonth() - specialDate.getMonth()
        let days = today.getDate() - specialDate.getDate()

        if (days < 0) {
            months -= 1
            const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0)
            days += prevMonth.getDate()
        }

        if (months < 0) {
            years -= 1
            months += 12
        }

        const target = { years, months, days }

        const duration = 2500
        const startTime = performance.now()

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const easeOut = 1 - Math.pow(1 - progress, 3)

            setTimeData({
                years: Math.floor(easeOut * target.years),
                months: Math.floor(easeOut * target.months),
                days: Math.floor(easeOut * target.days),
            })

            if (progress < 1) {
                requestAnimationFrame(animate)
            }
        }

        requestAnimationFrame(animate)
    }, [])

    return (
        <ScreenContainer>
            <div className="text-center max-w-3xl mx-auto">

                {/* 💖 GIF */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div style={{
                        width: "152px",
                        height: "152px",
                        margin: "0 auto",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background:
                            "radial-gradient(circle at 35% 30%, rgba(211,47,47,0.22) 0%, rgba(179,28,28,0.15) 60%, transparent 100%)",
                        border: "1px solid rgba(255,107,107,0.4)",
                        backdropFilter: "blur(12px)",
                        boxShadow:
                            "0 0 30px rgba(211,47,47,0.3), 0 0 60px rgba(211,47,47,0.12), inset 0 0 20px rgba(255,107,107,0.1)",
                        overflow: "hidden",
                        position: "relative",
                    }}>
                        <div style={{
                            position: "absolute",
                            inset: "-6px",
                            borderRadius: "50%",
                            border: "1px solid rgba(255,107,107,0.2)",
                            animation: "annivRingPulse 3s ease-in-out infinite",
                        }} />

                        <div style={{
                            position: "absolute",
                            inset: "-14px",
                            borderRadius: "50%",
                            border: "1px solid rgba(211,47,47,0.1)",
                            animation: "annivRingPulse 3s ease-in-out infinite 1.1s",
                        }} />

                        <motion.img
                            src="/gifs/try1.gif"
                            alt="img"
                            style={{
                                width: "135px",
                                objectFit: "cover",
                                borderRadius: "50%",
                                filter: "drop-shadow(0 0 12px rgba(255,107,107,0.7))",
                                position: "relative",
                                zIndex: 1,
                            }}
                            animate={{ y: [0, -7, 0] }}
                            transition={{
                                duration: 2.2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </div>
                </motion.div>

                {/* ✨ Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: "clamp(1.9rem, 5.5vw, 3.2rem)",
                        fontWeight: 600,
                        letterSpacing: "0.07em",
                        lineHeight: 1.25,
                        marginBottom: "2rem",
                        background:
                            "linear-gradient(135deg, #ffe0e0 0%, #ff9999 40%, #ff6b6b 75%, #c41c3b 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        filter: "drop-shadow(0 0 18px rgba(255,107,107,0.55))",
                    }}
                >
                    Happy Birthday{" "}
                    <span style={{
                        background:
                            "linear-gradient(135deg, #ffe0e0 0%, #ffc6c6 50%, #ff9999 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        filter: "drop-shadow(0 0 14px rgba(255,107,107,0.7))",
                    }}>
                    Nikhila 𐙚
                    </span>
                </motion.h1>

                {/* 📊 AGE COUNTER */}
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >

                    <p style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
                        fontStyle: "italic",
                        fontWeight: 300,
                        color: "rgba(255,150,150,0.8)",
                        marginBottom: "2rem",
                        letterSpacing: "0.04em",
                    }}>
                        You have completed
                    </p>

                    <div className="flex gap-8 justify-center flex-wrap">

                        {[
                            { label: "Years", value: timeData.years },
                            { label: "Months", value: timeData.months },
                            { label: "Days", value: timeData.days },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    delay: 0.9 + index * 0.2,
                                    duration: 0.6,
                                    type: "spring",
                                    bounce: 0.4,
                                }}
                                style={{
                                    position: "relative",
                                    minWidth: "100px",
                                }}
                            >
                                {/* Glow */}
                                <div style={{
                                    position: "absolute",
                                    inset: "-15px",
                                    borderRadius: "50%",
                                    background:
                                        "radial-gradient(circle, rgba(211,47,47,0.32) 0%, transparent 70%)",
                                    filter: "blur(16px)",
                                    animation: "counterGlow 2.5s ease-in-out infinite",
                                }} />

                                <div style={{
                                    fontFamily: "'Cinzel', serif",
                                    fontSize: "clamp(3rem, 10vw, 5rem)",
                                    fontWeight: 600,
                                    lineHeight: 1,
                                    background:
                                        "linear-gradient(135deg, #ffffff 0%, #ffe0e0 35%, #ff9999 65%, #ff6b6b 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                    filter:
                                        "drop-shadow(0 0 30px rgba(255,107,107,0.8))",
                                    position: "relative",
                                    zIndex: 1,
                                }}>
                                    {item.value}
                                </div>

                                <p style={{
                                    fontFamily: "'Cinzel', serif",
                                    fontSize: "0.75rem",
                                    letterSpacing: "0.25em",
                                    textTransform: "uppercase",
                                    color: "rgba(255,150,150,0.65)",
                                    marginTop: "0.8rem",
                                }}>
                                    {item.label}
                                </p>
                            </motion.div>
                        ))}

                    </div>
                </motion.div>

                {/* 🔘 Button */}
                <motion.button
                    onClick={onNext}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 1.5,
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        position: "relative",
                        padding: "0.85rem 2.4rem",
                        borderRadius: "999px",
                        border: "1px solid rgba(255,107,107,0.5)",
                        background:
                            "radial-gradient(circle at 40% 30%, rgba(211,47,47,0.4) 0%, rgba(179,28,28,0.28) 50%, rgba(139,28,28,0.5) 100%)",
                        backdropFilter: "blur(14px)",
                        color: "#ffe0e0",
                        fontFamily: "'Cinzel', serif",
                        fontSize: "0.92rem",
                        fontWeight: 600,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        boxShadow:
                            "0 0 20px rgba(211,47,47,0.4), 0 0 45px rgba(211,47,47,0.15), inset 0 1px 0 rgba(255,255,255,0.12)",
                        overflow: "hidden",
                        animation: "btnIdleGlow 3s ease-in-out infinite",
                    }}
                >
                    <span style={{
                        position: "absolute",
                        top: 0,
                        left: "-100%",
                        width: "100%",
                        height: "100%",
                        background:
                            "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
                        animation: "btnShimmer 3.5s ease-in-out infinite 1.5s",
                        pointerEvents: "none",
                    }} />

                    <span style={{
                        position: "absolute",
                        top: 0,
                        left: "10%",
                        width: "80%",
                        height: "40%",
                        background:
                            "linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)",
                        borderRadius: "0 0 50% 50%",
                        pointerEvents: "none",
                    }} />

                    <span style={{ position: "relative", zIndex: 1 }}>
                        Nextજ⁀➴
                    </span>
                </motion.button>

            </div>
        </ScreenContainer>
    )
}