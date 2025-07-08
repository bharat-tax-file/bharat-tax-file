import React from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import {
  FileText,
  Calculator,
  TrendingUp,
  PiggyBank,
  Calendar,
  Layers,
  Percent,
  ArrowRight,
} from "lucide-react";

const tools = [
  {
    href: "/tools/gstcalc",
    title: "GST Calculator",
    icon: FileText,
    description: "Simplify your GST return filing process with our easy-to-use calculator.",
  },
  {
    href: "/tools/income-tax-calculator",
    title: "Income Tax Calculator",
    icon: Calculator,
    description: "Calculate your income tax liability quickly and accurately.",
  },
  {
    href: "/tools/capital-gain-calculator",
    title: "Capital Gains Calculator",
    icon: TrendingUp,
    description: "Track and calculate your capital gains for tax filing.",
  },
  {
    href: "/tools/epf-pf-calculator",
    title: "Provident Fund (PF/EPF) Calculator",
    icon: PiggyBank,
    description: "Manage your PF and EPF contributions and growth projections.",
  },
  {
    href: "/tools/advance-tax-calculator",
    title: "Advance Tax Calculator",
    icon: Calendar,
    description: "Plan and calculate your advance tax payments with ease.",
  },
  {
    href: "/tools/mutual-fund-sip-swp-calculator",
    title: "Mutual Fund SIP & SWP Calculator",
    icon: Layers,
    description: "Estimate your mutual fund SIP and SWP returns over time.",
  },
  {
    href: "/tools/emi-calculator",
    title: "EMI Calculator",
    icon: Percent,
    description: "Quickly calculate EMIs for your loans and repayments.",
  },
];

export default function ToolsIntro() {
  return (
    <>
      <Head>
        <title>Finance Tools - Bharat Tax File</title>
        <meta
          name="description"
          content="Explore professional finance tools for Indian tax and finance sector."
        />
      </Head>
      {/* Header */}
      <header className="w-full bg-white border-b border-gray-200 px-4 py-4 flex items-center gap-4 rounded-t-2xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-[#6c63ff] p-2 rounded-xl">
            <FileText size={32} className="text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 leading-tight">Bharat Tax File</div>
            <div className="text-gray-500 text-base font-medium -mt-1">Professional Finance Tools</div>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <main className="min-h-screen bg-gradient-to-br from-[#f5f8ff] via-[#f7f6fd] to-[#eaf1fb] flex flex-col items-center justify-start pt-10 px-4">
        <section className="w-full max-w-3xl mx-auto flex flex-col items-center text-center rounded-3xl py-12 px-6 bg-white/80 shadow-xl mt-8">
          <div className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-white border border-gray-200 rounded-full shadow text-gray-700 text-base font-medium">
              <span className="inline-block w-3 h-3 bg-green-400 rounded-full" />
              Trusted by 10,000+ users across India
            </span>
          </div>
          <h1 className="text-5xl font-extrabold text-[#232946] mb-2 leading-tight">Finance Tools</h1>
          <h2 className="text-3xl font-bold text-[#6c63ff] mb-4">Made Simple</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl">
            Professional calculators and tools designed specifically for Indian tax and finance needs. Get accurate results in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#tools-section" className="inline-flex items-center justify-center px-7 py-3 bg-[#6c63ff] hover:bg-[#5548c8] text-white font-semibold rounded-lg shadow transition-all text-lg">
              Explore Tools <ArrowRight size={20} className="ml-2" />
            </Link>
            <button className="inline-flex items-center justify-center px-7 py-3 bg-white border border-gray-300 text-gray-800 font-semibold rounded-lg shadow transition-all text-lg hover:bg-gray-50">
              Learn More
            </button>
          </div>
        </section>
        {/* Tools Grid (optional, below hero) */}
        <section id="tools-section" className="max-w-5xl mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {tools.map(({ href, title, icon: Icon, description }, idx) => (
              <Link
                key={href}
                href={href}
                className={`relative flex flex-col items-start bg-white/90 border-l-4 border-blue-400/60 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.045] hover:border-pink-400/80 transition-all duration-200 p-7 group backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-pink-300 overflow-hidden animate-cardin`}
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                {/* Floating Icon */}
                <div className="absolute -top-6 left-6 w-12 h-12 rounded-full bg-gradient-to-tr from-blue-400 to-pink-400 flex items-center justify-center shadow-lg border-4 border-white/60 z-10">
                  <Icon size={26} className="text-white" />
                </div>
                <div className="pl-0 pt-8">
                  <h3 className="text-lg font-semibold text-blue-900 group-hover:text-pink-600 mb-1 transition-colors">{title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{description}</p>
                </div>
                <ArrowRight size={22} className="text-pink-400 group-hover:text-blue-600 transition-colors mt-auto ml-1" />
              </Link>
            ))}
          </div>
        </section>
      </main>
      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 8s ease-in-out infinite;
        }
        @keyframes fadein {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fadein { animation: fadein 1.2s cubic-bezier(.4,0,.2,1) both; }
        @keyframes cardin {
          from { opacity: 0; transform: translateY(40px) scale(.97); }
          to { opacity: 1; transform: none; }
        }
        .animate-cardin { animation: cardin 0.7s cubic-bezier(.4,0,.2,1) both; }
        @keyframes blob1 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(40px, -30px) scale(1.1); }
        }
        .animate-blob1 { animation: blob1 16s infinite ease-in-out; }
        @keyframes blob2 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-40px, 30px) scale(1.1); }
        }
        .animate-blob2 { animation: blob2 18s infinite ease-in-out; }
      `}</style>
    </>
  );
}
