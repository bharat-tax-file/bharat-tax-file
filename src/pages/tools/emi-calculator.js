import React, { useState } from "react";
import Head from "next/head";

export default function EMICalculator() {
  const [principal, setPrincipal] = useState("");
  const [annualRate, setAnnualRate] = useState("");
  const [tenureYears, setTenureYears] = useState("");
  const [result, setResult] = useState(null);

  const calculateEMI = () => {
    const P = parseFloat(principal);
    const R = parseFloat(annualRate) / 12 / 100;
    const N = parseFloat(tenureYears) * 12;

    if (!P || !R || !N) return;

    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalPayable = emi * N;
    const interestPayable = totalPayable - P;

    setResult({
      emi: emi.toFixed(2),
      total: totalPayable.toFixed(2),
      interest: interestPayable.toFixed(2),
    });
  };

  return (
    <>
      <Head>
        <title>EMI Calculator - Bharat Tax Suite</title>
      </Head>

      <main className="min-h-screen bg-slate-50 text-slate-800 py-12 px-4">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">💳 EMI Calculator</h2>

          <input
            type="number"
            placeholder="Loan Amount (₹)"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="w-full p-3 mb-3 border rounded-lg"
          />
          <input
            type="number"
            placeholder="Interest Rate (% p.a)"
            value={annualRate}
            onChange={(e) => setAnnualRate(e.target.value)}
            className="w-full p-3 mb-3 border rounded-lg"
          />
          <input
            type="number"
            placeholder="Loan Tenure (Years)"
            value={tenureYears}
            onChange={(e) => setTenureYears(e.target.value)}
            className="w-full p-3 mb-3 border rounded-lg"
          />

          <button
            onClick={calculateEMI}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
          >
            Calculate EMI
          </button>

          {result && (
            <div className="mt-6 bg-indigo-50 text-indigo-800 p-4 rounded-lg space-y-2 text-center">
              <div><strong>Monthly EMI:</strong> ₹{result.emi}</div>
              <div><strong>Total Payable:</strong> ₹{result.total}</div>
              <div><strong>Total Interest:</strong> ₹{result.interest}</div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
