import React, { useState, useRef } from "react";
import Head from "next/head";
import { TrendingUp, Printer } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function CapitalGainCalculator() {
  const [purchasePrice, setPurchasePrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [saleDate, setSaleDate] = useState("");
  const [cpiBuy, setCpiBuy] = useState("");
  const [cpiSell, setCpiSell] = useState("356"); // CPI for FY 2025–26 (assumed)
  const [result, setResult] = useState(null);
  const printRef = useRef();

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
      tax = gain > 0 ? gain * 0.30 : 0; // Assume non-equity STCG
    }

    setResult({
      gain: gain.toFixed(2),
      indexedCost: isLongTerm ? indexedCost.toFixed(2) : null,
      type: isLongTerm ? "Long-Term" : "Short-Term",
      daysHeld: Math.floor(daysHeld),
      tax: tax.toFixed(2),
    });
  };

  const downloadPDF = async () => {
    const canvas = await html2canvas(printRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("capital-gain-report.pdf");
  };

  return (
    <>
      <Head>
        <title>Capital Gain Calculator - FY 2025–26</title>
        <meta name="description" content="Capital Gain Calculator with indexation and tax for FY 2025–26 - India" />
      </Head>

      <main className="min-h-screen bg-gradient-to-tr from-white to-green-50 text-green-900 py-16 px-4">
        <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl p-8 space-y-6">
          <div className="text-center">
            <TrendingUp size={48} className="text-green-600 mx-auto mb-2" />
            <h1 className="text-3xl font-bold mb-1">Capital Gain Calculator</h1>
            <p className="text-green-600 text-sm">FY 2025–26 • India • With Indexation</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Purchase Price (₹)</label>
              <input
                type="number"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                className="w-full p-3 border border-green-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Sale Price (₹)</label>
              <input
                type="number"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                className="w-full p-3 border border-green-200 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Purchase Date</label>
                <input
                  type="date"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                  className="w-full p-3 border border-green-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Sale Date</label>
                <input
                  type="date"
                  value={saleDate}
                  onChange={(e) => setSaleDate(e.target.value)}
                  className="w-full p-3 border border-green-200 rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">CPI in Purchase Year</label>
                <input
                  type="number"
                  value={cpiBuy}
                  onChange={(e) => setCpiBuy(e.target.value)}
                  placeholder="e.g. 254"
                  className="w-full p-3 border border-green-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">CPI in Sale Year</label>
                <input
                  type="number"
                  value={cpiSell}
                  onChange={(e) => setCpiSell(e.target.value)}
                  className="w-full p-3 border border-green-200 rounded-xl"
                />
              </div>
            </div>

            <button
              onClick={calculateCapitalGain}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700"
            >
              Calculate Capital Gain
            </button>
          </div>

          {result && (
            <div ref={printRef} className="bg-green-50 p-4 rounded-xl text-center space-y-2 border border-green-200 mt-6">
              <p className="text-green-800 font-medium">
                <span className="font-semibold">Gain Type:</span> {result.type}
              </p>
              <p className="text-green-800 font-medium">
                <span className="font-semibold">Holding Period:</span> {result.daysHeld} days
              </p>
              {result.indexedCost && (
                <p className="text-green-800 font-medium">
                  <span className="font-semibold">Indexed Cost:</span> ₹{result.indexedCost}
                </p>
              )}
              <p className="text-green-800 font-medium">
                <span className="font-semibold">Capital Gain:</span> ₹{result.gain}
              </p>
              <p className="text-green-800 font-medium">
                <span className="font-semibold">Estimated Tax:</span> ₹{result.tax}
              </p>
              <button
                onClick={downloadPDF}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Printer size={16} />
                Export as PDF
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
