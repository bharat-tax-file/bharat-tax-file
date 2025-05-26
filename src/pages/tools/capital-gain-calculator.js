import React, { useState } from "react";
import Head from "next/head";
import { TrendingUp } from "lucide-react";

export default function CapitalGainCalculator() {
  const [purchasePrice, setPurchasePrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [saleDate, setSaleDate] = useState("");
  const [cpiBuy, setCpiBuy] = useState("");
  const [cpiSell, setCpiSell] = useState("356");
  const [result, setResult] = useState(null);

  const calculateCapitalGain = () => {
    const buy = parseFloat(purchasePrice);
    const sell = parseFloat(salePrice);
    const buyDate = new Date(purchaseDate);
    const sellDate = new Date(saleDate);
    const buyCPI = parseFloat(cpiBuy);
    const sellCPI = parseFloat(cpiSell);

    if (isNaN(buy) || isNaN(sell) || !purchaseDate || !saleDate || isNaN(buyCPI) || isNaN(sellCPI)) {
      alert("Please enter all valid fields.");
      return;
    }

    const daysHeld = (sellDate - buyDate) / (1000 * 3600 * 24);
    const isLongTerm = daysHeld > 365;
    let indexedCost = buy;
    let gain = sell - buy;
    let tax = 0;

    if (isLongTerm) {
      indexedCost = (buy * sellCPI) / buyCPI;
      gain = sell - indexedCost;
      tax = gain > 0 ? gain * 0.20 : 0;
    } else {
      tax = gain > 0 ? gain * 0.30 : 0;
    }

    setResult({
      gain: gain.toFixed(2),
      indexedCost: isLongTerm ? indexedCost.toFixed(2) : null,
      type: isLongTerm ? "Long-Term" : "Short-Term",
      daysHeld: Math.floor(daysHeld),
      tax: tax.toFixed(2),
    });
  };

  return (
    <>
      <Head>
        <title>Capital Gain Calculator - FY 2025–26</title>
        <meta name="description" content="Capital Gain Calculator with indexation and tax for FY 2025–26 - India" />
      </Head>

      <main className="min-h-screen bg-white text-gray-800 py-16 px-4">
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-6 border border-gray-200">
          <div className="text-center">
            <TrendingUp size={42} className="text-green-600 mx-auto mb-2" />
            <h1 className="text-2xl font-bold">Capital Gain Calculator</h1>
            <p className="text-sm text-gray-500">FY 2025–26 • India • With Indexation</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Purchase Price (₹)</label>
              <input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium">Sale Price (₹)</label>
              <input type="number" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Purchase Date</label>
                <input type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium">Sale Date</label>
                <input type="date" value={saleDate} onChange={(e) => setSaleDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">CPI (Purchase Year)</label>
                <input type="number" value={cpiBuy} onChange={(e) => setCpiBuy(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium">CPI (Sale Year)</label>
                <input type="number" value={cpiSell} onChange={(e) => setCpiSell(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
            </div>
            <button onClick={calculateCapitalGain} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
              Calculate
            </button>
          </div>

          {result && (
            <div className="mt-6 border-t pt-4 space-y-2 text-sm text-gray-800">
              <p><strong>Gain Type:</strong> {result.type}</p>
              <p><strong>Holding Period:</strong> {result.daysHeld} days</p>
              {result.indexedCost && <p><strong>Indexed Cost:</strong> ₹{result.indexedCost}</p>}
              <p><strong>Capital Gain:</strong> ₹{result.gain}</p>
              <p><strong>Estimated Tax:</strong> ₹{result.tax}</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
