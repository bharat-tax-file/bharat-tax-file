import React, { useState } from "react";
import Head from "next/head";

const taxSlabs = [
  { upto: 300000, rate: 0 },
  { upto: 600000, rate: 0.05 },
  { upto: 900000, rate: 0.10 },
  { upto: 1200000, rate: 0.15 },
  { upto: 1500000, rate: 0.20 },
  { upto: Infinity, rate: 0.30 },
];

function calculateTax(income) {
  let tax = 0;
  let previous = 0;

  for (const slab of taxSlabs) {
    if (income > slab.upto) {
      tax += (slab.upto - previous) * slab.rate;
      previous = slab.upto;
    } else {
      tax += (income - previous) * slab.rate;
      break;
    }
  }

  return Math.round(tax);
}

export default function IncomeTaxCalculator() {
  const [income, setIncome] = useState("");
  const [tax, setTax] = useState(null);

  const handleCalculate = () => {
    const num = parseFloat(income);
    if (!isNaN(num)) {
      setTax(calculateTax(num));
    }
  };

  return (
    <>
      <Head>
        <title>Income Tax Calculator - FY 2025–26</title>
      </Head>

      <main className="min-h-screen px-4 py-16 bg-gradient-to-b from-white to-blue-50 text-gray-800">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">
            Income Tax Calculator <br /> FY 2025–26
          </h1>

          <div className="mb-4">
            <label htmlFor="income" className="block mb-2 font-medium text-gray-700">
              Annual Income (in ₹)
            </label>
            <input
              id="income"
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 800000"
            />
          </div>

          <button
            onClick={handleCalculate}
            className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            Calculate Tax
          </button>

          {tax !== null && (
            <div className="mt-6 text-center text-blue-800">
              <p className="text-lg">Your estimated tax is:</p>
              <p className="text-2xl font-bold">₹ {tax.toLocaleString("en-IN")}</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
