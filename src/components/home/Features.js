"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaRegLightbulb,
  FaRocket,
  FaShieldAlt,
  FaLock,
  FaTags,
  FaHeadset,
} from "react-icons/fa";

const features = [
  {
    title: "Expert Guidance",
    desc: "Our tax experts are here to guide you every step of the way.",
    icon: <FaRegLightbulb />,
    color: "from-yellow-400 to-yellow-600",
  },
  {
    title: "Fast ITR Filing",
    desc: "File your taxes quickly and securely with minimal effort.",
    icon: <FaRocket />,
    color: "from-pink-400 to-pink-600",
  },
  {
    title: "Compliance Support",
    desc: "Never miss a deadline with proactive compliance alerts.",
    icon: <FaShieldAlt />,
    color: "from-blue-400 to-blue-600",
  },
  {
    title: "Data Encryption",
    desc: "Your sensitive data is protected with industry-standard encryption.",
    icon: <FaLock />,
    color: "from-purple-500 to-purple-700",
  },
  {
    title: "Transparent Pricing",
    desc: "High-quality service at affordable, no-hidden-fee prices.",
    icon: <FaTags />,
    color: "from-green-400 to-green-600",
  },
  {
    title: "24/7 Human Support",
    desc: "Talk to real people — not bots. We're always here for you.",
    icon: <FaHeadset />,
    color: "from-indigo-400 to-indigo-600",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, type: "spring", stiffness: 80 },
  }),
};

export default function Features() {
  return (
    <section className="relative px-6 sm:px-12 py-24 bg-gradient-to-br from-white via-blue-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
          Seamless <span className="text-blue-600">Tax Services</span>
        </h2>
        <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
          Experience smart, secure, and stress-free tax filing with real-time support and expert solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-white/60 backdrop-blur-xl border border-gray-200 hover:border-blue-400 transition-all rounded-3xl p-8 shadow-xl hover:shadow-2xl group transform hover:scale-[1.025]"
          >
            <div
              className={`w-14 h-14 flex items-center justify-center rounded-full text-white bg-gradient-to-br ${f.color} shadow-lg mb-5 group-hover:scale-110 transition-transform`}
            >
              <div className="text-xl">{f.icon}</div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:underline underline-offset-4 decoration-blue-500">
              {f.title}
            </h3>
            <p className="text-sm text-gray-600 mt-2">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Animated Background Bubbles (Optional Eye Candy) */}
      <motion.div
        className="absolute top-10 right-20 w-60 h-60 bg-blue-200 rounded-full opacity-20 blur-3xl z-0"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 bg-pink-300 rounded-full opacity-10 blur-3xl z-0"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
}
