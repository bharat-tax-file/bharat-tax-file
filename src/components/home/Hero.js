import React, { useState, useEffect } from "react";
import { FaRegFileAlt, FaRegCheckCircle, FaRegLightbulb } from "react-icons/fa";
import Link from "next/link";

const slides = [
  {
    icon: <FaRegFileAlt className="text-4xl text-blue-400 drop-shadow-glow" />,
    title: "Simplify Your ITR & GST Filing",
    description:
      "Use our platform to file your Income Tax Returns and GST quickly and accurately.",
    button: true,
  },
  {
    icon: <FaRegCheckCircle className="text-5xl text-green-400 drop-shadow-glow" />,
    title: "Expert Support on Tax Matters",
    description: "Talk to certified professionals for your tax queries and filing.",
    button: false,
  },
  {
    icon: <FaRegLightbulb className="text-5xl text-yellow-300 drop-shadow-glow" />,
    title: "Trusted by Thousands",
    description: "India’s most reliable online tax filing platform.",
    button: false,
  },
];

// Calculate max heights for min-height
const maxTitleLen = Math.max(...slides.map((s) => s.title.length));
const maxDescLen = Math.max(...slides.map((s) => s.description.length));
const maxButton = slides.some((s) => s.button);

function pad(str, len) {
  return str + "\u200B".repeat(Math.max(0, len - str.length));
}

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="w-full relative overflow-hidden bg-gradient-to-br from-blue-700 via-purple-700 to-indigo-900 shadow-2xl mb-8 flex flex-col items-center justify-center transition-all duration-500"
      style={{
        minHeight: 340,
        width: "100vw",
        maxWidth: "100vw",
        margin: 0,
        borderRadius: 0,
        height: 380,
        left: "50%",
        right: "50%",
        transform: "translate(-50%, 0)",
      }}
    >
      {/* Decorative SVG Waves */}
      <svg
        className="absolute top-0 left-0 w-full h-24"
        viewBox="0 0 1440 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ zIndex: 1 }}
      >
        <path
          fill="#fff"
          fillOpacity="0.08"
          d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        />
      </svg>
      <div className="relative z-10 flex flex-col items-center w-full h-full justify-center px-4 md:px-8">
        <div className="mb-4 animate-bounce drop-shadow-glow">
          {slides[index].icon}
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2 text-center drop-shadow-lg min-h-[48px] w-full tracking-tight px-2 md:px-8">
          {pad(slides[index].title, maxTitleLen)}
        </h2>
        <p className="text-white text-lg md:text-xl text-center opacity-90 max-w-2xl min-h-[40px] w-full mb-2 px-2 md:px-8">
          {pad(slides[index].description, maxDescLen)}
        </p>
        {maxButton && (
          <div
            style={{
              minHeight: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {slides[index].button && (
              <Link href="/contact">
                <button className="btn text-lg mt-6 px-12 bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:from-purple-500 hover:to-blue-400 transition-transform transform hover:scale-105 border-0">
                  Get Started
                </button>
              </Link>
            )}
          </div>
        )}
        <div className="flex mt-6 space-x-2 justify-center">
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={`h-2 w-6 rounded-full transition-all duration-300 ${
                idx === index ? "bg-white/90" : "bg-white/40"
              }`}
              style={{
                boxShadow: idx === index ? "0 0 8px #fff" : "none",
              }}
            ></span>
          ))}
        </div>
      </div>
      {/* Decorative SVG Waves bottom */}
      <svg
        className="absolute bottom-0 left-0 w-full h-24"
        viewBox="0 0 1440 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ zIndex: 1 }}
      >
        <path
          fill="#fff"
          fillOpacity="0.08"
          d="M0,224L60,197.3C120,171,240,117,360,101.3C480,85,600,107,720,133.3C840,160,960,192,1080,197.3C1200,203,1320,181,1380,170.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        />
      </svg>
    </div>
  );
}
