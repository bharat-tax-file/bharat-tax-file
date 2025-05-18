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
    href: "/tools/gstcalc.js",
    title: "GST Calculator",
    icon: FileText,
    description: "Simplify your GST return filing process with our easy-to-use calculator.",
  },
  {
    href: "/tools/income-tax-return-calculator",
    title: "Income Tax Return Calculator",
    icon: Calculator,
    description: "Calculate your income tax liability quickly and accurately.",
  },
  {
    href: "/tools/capital-gains-calculator",
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
        <title>Creative Finance Tools - Bharat Tax File</title>
        <meta
          name="description"
          content="Explore creative and modern finance tools for Indian tax and finance sector with a fresh and engaging UI."
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-tr from-indigo-900 via-purple-800 to-pink-700 text-white overflow-x-hidden">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight leading-tight mb-6 drop-shadow-lg">
            Transform Your Finances <br />
            with <span className="text-pink-400">Powerful Tools</span>
          </h1>
          
         
          <div className="mt-12 w-72 h-72 mx-auto rounded-3xl overflow-hidden shadow-2xl ring-8 ring-pink-400/40 backdrop-blur-lg bg-white/10">
            <Image
              src="/pic1.jpg"
              alt="Finance Tools"
              width={288}
              height={288}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>

        {/* Tools Section */}
        <section className="max-w-7xl mx-auto px-6 py-12 bg-gradient-to-b from-white to-blue-50 rounded-t-3xl">
          <h2 className="text-3xl font-bold text-blue-900 mb-10 text-center drop-shadow-sm">
            Explore Our Finance Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map(({ href, title, icon: Icon, description }) => (
              <Link
                key={href}
                href={href}
                className="group flex flex-col items-center justify-center bg-white shadow-md rounded-xl p-6 cursor-pointer hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 mb-4 rounded-full bg-gradient-to-tr from-blue-500 to-blue-700 flex items-center justify-center text-white">
                  <Icon size={26} />
                </div>
                <h3 className="text-xl font-semibold text-blue-900 group-hover:text-blue-700 mb-2 text-center">
                  {title}
                </h3>
                <p className="text-blue-700 text-center text-sm">{description}</p>
                <ArrowRight
                  size={22}
                  className="mt-4 text-blue-500 group-hover:text-blue-700 transition-colors"
                />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
