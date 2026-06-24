"use client";

import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import Image from "next/image";
import ScreenContainer from "../ScreenContainer";

export default function PhotoGalleryScreen({ onNext }) {
  const photos = ["/images/1.png", "/images/2.png","/images/3.png","/images/4.png"];

  return (
    <ScreenContainer>
      <motion.section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1rem",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div
          style={{
            maxWidth: "56rem",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* ✨ Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(1.7rem, 5vw, 3rem)",
              fontWeight: 600,
              letterSpacing: "0.07em",
              lineHeight: 1.25,
              marginBottom: "0.6rem",
              textAlign: "center",
              background:
                "linear-gradient(135deg, #ffe0e0 0%, #ff9999 40%, #ff6b6b 75%, #c41c3b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 18px rgba(255,107,107,0.55))",
            }}
          >
            Special Memories
          </motion.h1>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            style={{
              height: "1px",
              width: "140px",
              margin: "0 auto 0.9rem",
              background:
                "linear-gradient(to right, transparent, #ff6b6b, #ff9999, #ff6b6b, transparent)",
              boxShadow: "0 0 10px rgba(255,107,107,0.5)",
            }}
          />

          {/* 🌙 Hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "0.95rem",
              color: "rgba(255,150,150,0.65)",
              marginBottom: "1.2rem",
              letterSpacing: "0.06em",
            }}
          >
            Swipe for more ✦
          </motion.p>

          {/* 🖼️ Carousel */}
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 12,
              stretch: -10,
              depth: 120,
              modifier: 1,
              slideShadows: false,
            }}
            loop={false}
            modules={[EffectCoverflow]}
            style={{
              width: "100%",
              paddingTop: "10px",
              paddingBottom: "20px",
            }}
          >
            {photos.map((photo, index) => (
              <SwiperSlide
                key={index}
                style={{
                  width: "280px",
                  height: "360px",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    borderRadius: "1.25rem",
                    overflow: "hidden",
                    border: "1px solid rgba(255,107,107,0.4)",
                    boxShadow:
                      "0 0 25px rgba(211,47,47,0.3), 0 0 50px rgba(211,47,47,0.12), inset 0 0 15px rgba(255,107,107,0.08)",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      zIndex: 1,
                      background:
                        "linear-gradient(to bottom, rgba(179,28,28,0.1) 0%, transparent 40%, rgba(139,28,28,0.3) 100%)",
                      pointerEvents: "none",
                    }}
                  />

                  <Image
                    src={photo}
                    fill
                    sizes="400px"
                    alt={`Memory ${index + 1}`}
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* 🔘 Button */}
          <motion.button
            onClick={onNext}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            style={{
              position: "relative",
              marginTop: "2rem",
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
            <span
              style={{
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
                animation: "btnShimmer 3.5s ease-in-out infinite 1.5s",
                pointerEvents: "none",
              }}
            />
            <span
              style={{
                position: "absolute",
                top: 0,
                left: "10%",
                width: "80%",
                height: "40%",
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)",
                borderRadius: "0 0 50% 50%",
                pointerEvents: "none",
              }}
            />
            <span style={{ position: "relative", zIndex: 1 }}>
              ✎ᝰ.﹏Message
            </span>
          </motion.button>
        </div>
      </motion.section>
    </ScreenContainer>
  );
}