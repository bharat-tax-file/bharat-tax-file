import React from "react";
import Link from "next/link";
import Head from "next/head";
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
      <header className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-[#6c63ff] p-2 rounded-xl">
            <FileText size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Bharat Tax File</h1>
            <p className="text-gray-500 text-sm sm:text-base -mt-1">Professional Finance Tools</p>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="min-h-screen bg-gradient-to-br from-[#f5f8ff] via-[#f7f6fd] to-[#eaf1fb] px-4 pt-12 pb-20">
        <section className="max-w-4xl mx-auto text-center bg-white/90 backdrop-blur-md rounded-3xl shadow-lg px-8 py-12 mb-16">
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 px-5 py-1.5 bg-white border border-gray-200 rounded-full text-gray-700 text-sm shadow-sm">
              <span className="w-2.5 h-2.5 bg-green-400 rounded-full"></span>
              Trusted by 10,000+ users across India
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#232946] mb-2">Finance Tools</h2>
          <p className="text-xl text-[#6c63ff] font-semibold mb-4">Made Simple</p>
          <p className="text-gray-600 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
            Professional calculators and tools designed specifically for Indian tax and finance needs.
            Get accurate results in seconds.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="#tools-section"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#6c63ff] text-white text-lg font-medium rounded-lg hover:bg-[#5548c8] transition-all"
            >
              Explore Tools <ArrowRight size={20} className="ml-2" />
            </Link>
            <button className="inline-flex items-center justify-center px-6 py-3 bg-white border border-gray-300 text-gray-800 font-medium text-lg rounded-lg shadow-sm hover:bg-gray-50">
              Learn More
            </button>
          </div>
        </section>

        {/* Tools Section */}
        <section id="tools-section" className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-0">
            {tools.map(({ href, title, icon: Icon, description }, idx) => (
              <Link
                key={href}
                href={href}
                className="group bg-white border-l-4 border-blue-300 hover:border-pink-400 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-transform hover:scale-[1.035] duration-200 flex flex-col space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-gradient-to-tr from-blue-400 to-pink-400 text-white rounded-full flex items-center justify-center shadow border-4 border-white">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-semibold text-blue-900 group-hover:text-pink-600">
                    {title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600">{description}</p>
                <ArrowRight size={18} className="text-pink-400 group-hover:text-blue-600 ml-auto" />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
