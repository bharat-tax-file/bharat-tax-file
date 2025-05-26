import React, { useState } from "react";
import Head from "next/head";

export default function SIPSWPCalculator() {
  const [sipAmount, setSipAmount] = useState("");
  const [sipYears, setSipYears] = useState("");
  const [sipRate, setSipRate] = useState("");
  const [sipResult, setSipResult] = useState(null);

  const [swpAmount, setSwpAmount] = useState("");
  const [swpYears, setSwpYears] = useState("");
  const [swpRate, setSwpRate] = useState("");
  const [swpCorpus, setSwpCorpus] = useState("");
  const [swpResult, setSwpResult] = useState(null);

  const calculateSIP = () => {
    const P = parseFloat(sipAmount);
    const r = parseFloat(sipRate) / 100 / 12;
    const n = parseFloat(sipYears) * 12;
    if (!P || !r || !n) return;

    const futureValue = P * (((Math.pow(1 + r, n) - 1) * (1 + r)) / r);
    setSipResult(futureValue.toFixed(2));
  };

  const calculateSWP = () => {
    let corpus = parseFloat(swpCorpus);
    const withdrawal = parseFloat(swpAmount);
    const r = parseFloat(swpRate) / 100 / 12;
    const n = parseFloat(swpYears) * 12;
    if (!corpus || !withdrawal || !r || !n) return;

    let totalWithdrawn = 0;
    for (let i = 0; i < n && corpus > 0; i++) {
      totalWithdrawn += withdrawal;
      corpus = corpus - withdrawal;
      corpus = corpus + corpus * r;
    }
    setSwpResult({
      remaining: corpus > 0 ? corpus.toFixed(2) : "0.00",
      totalWithdrawn: totalWithdrawn.toFixed(2),
    });
  };

  return (
    <>
      <Head>
        <title>SIP & SWP Calculator</title>
      </Head>
      <main className="min-h-screen bg-slate-50 text-slate-800 py-12 px-4">
        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
          {/* SIP Calculator */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-blue-700">📈 SIP Calculator</h2>
            <input
              type="number"
              placeholder="Monthly Investment (₹)"
              value={sipAmount}
              onChange={(e) => setSipAmount(e.target.value)}
              className="w-full p-3 mb-3 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Expected Return (% p.a)"
              value={sipRate}
              onChange={(e) => setSipRate(e.target.value)}
              className="w-full p-3 mb-3 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Time Period (Years)"
              value={sipYears}
              onChange={(e) => setSipYears(e.target.value)}
              className="w-full p-3 mb-3 border rounded-lg"
            />
            <button
              onClick={calculateSIP}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Calculate SIP Value
            </button>
            {sipResult && (
              <div className="mt-4 text-center text-blue-800 font-medium">
                Estimated Maturity: ₹{sipResult}
              </div>
            )}
          </div>

          {/* SWP Calculator */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-green-700">💸 SWP Calculator</h2>
            <input
              type="number"
              placeholder="Initial Corpus (₹)"
              value={swpCorpus}
              onChange={(e) => setSwpCorpus(e.target.value)}
              className="w-full p-3 mb-3 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Monthly Withdrawal (₹)"
              value={swpAmount}
              onChange={(e) => setSwpAmount(e.target.value)}
              className="w-full p-3 mb-3 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Expected Return (% p.a)"
              value={swpRate}
              onChange={(e) => setSwpRate(e.target.value)}
              className="w-full p-3 mb-3 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Withdrawal Period (Years)"
              value={swpYears}
              onChange={(e) => setSwpYears(e.target.value)}
              className="w-full p-3 mb-3 border rounded-lg"
            />
            <button
              onClick={calculateSWP}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Calculate SWP Result
            </button>
            {swpResult && (
              <div className="mt-4 text-center text-green-800 font-medium space-y-1">
                <div>Total Withdrawn: ₹{swpResult.totalWithdrawn}</div>
                <div>Remaining Corpus: ₹{swpResult.remaining}</div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
