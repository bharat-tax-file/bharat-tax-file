"use client";
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
    color: "from-yellow-400 to-yellow-500",
  },
  {
    title: "Fast ITR Filing",
    desc: "File your taxes quickly and securely with minimal effort.",
    icon: <FaRocket />,
    color: "from-pink-400 to-pink-500",
  },
  {
    title: "Compliance Support",
    desc: "Never miss a deadline with proactive compliance alerts.",
    icon: <FaShieldAlt />,
    color: "from-blue-400 to-blue-500",
  },
  {
    title: "Data Encryption",
    desc: "Your sensitive data is protected with industry-standard encryption.",
    icon: <FaLock />,
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Transparent Pricing",
    desc: "High-quality service at affordable, no-hidden-fee prices.",
    icon: <FaTags />,
    color: "from-green-400 to-green-500",
  },
  {
    title: "24/7 Human Support",
    desc: "Talk to real people — not bots. We're always here for you.",
    icon: <FaHeadset />,
    color: "from-indigo-400 to-indigo-500",
  },
];

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white border border-gray-100 hover:border-blue-300 rounded-2xl p-6 shadow-sm hover:shadow-md transition ease-in-out duration-200"
          >
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full text-white bg-gradient-to-br ${f.color} shadow-md mb-4`}
            >
              <div className="text-lg">{f.icon}</div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {f.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
