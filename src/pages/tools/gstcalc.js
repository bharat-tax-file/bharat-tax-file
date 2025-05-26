import React, { useState } from "react";
import Head from "next/head";
import { ChevronDown, Calculator } from "lucide-react";

export default function GSTCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState(18);
  const [mode, setMode] = useState("add");
  const [gstAmount, setGstAmount] = useState(null);
  const [finalAmount, setFinalAmount] = useState(null);

  const calculateGST = () => {
    const amt = parseFloat(amount);
    if (isNaN(amt)) return;

    let gst = 0, final = 0;
    if (mode === "add") {
      gst = (amt * rate) / 100;
      final = amt + gst;
    } else {
      gst = (amt * rate) / (100 + rate);
      final = amt - gst;
    }

    setGstAmount(gst.toFixed(2));
    setFinalAmount(final.toFixed(2));
  };

  return (
    <>
      <Head>
        <title>GST Calculator - Bharat Tax File</title>
        <meta name="description" content="Easily calculate GST for your products or services with our simple and intuitive GST calculator." />
      </Head>

      <main className="min-h-screen bg-gradient-to-tr from-white to-blue-50 text-blue-900 py-16 px-4">
        <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl p-8 space-y-6">
          <div className="text-center">
            <Calculator size={48} className="text-blue-600 mx-auto mb-2" />
            <h1 className="text-3xl font-bold mb-1">GST Calculator</h1>
            <p className="text-blue-600 text-sm">Instantly calculate GST on any amount</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Enter Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="e.g. 1000"
              />
            </div>


            <div>
              <label className="block text-sm font-medium mb-1">GST Rate</label>
              <select
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))} 
                className="w-full p-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value={5}>5%</option>
                <option value={12}>12%</option>
                <option value={18}>18%</option>
                <option value={28}>28%</option>
              </select>
            </div>
        
            <div className="flex gap-4">
              <button
                onClick={() => setMode("add")}  
                className={`flex-1 px-4 py-2 rounded-xl border ${
                  mode === "add"
                    
                    ? "bg-blue-600 text-white"
                    : "bg-white border-blue-300 text-blue-700"
                } transition`}
              >
                Add GST
              </button>
              <button
                onClick={() => setMode("remove")}
                className={`flex-1 px-4 py-2 rounded-xl border ${
                  mode === "remove"
                    ? "bg-blue-600 text-white"
                    : "bg-white border-blue-300 text-blue-700"
                } transition`}
              >
                Remove GST
              </button>
            </div>

            <button
              onClick={calculateGST}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Calculate
            </button>
          </div>

          {gstAmount && finalAmount && (
            <div className="bg-blue-50 p-4 rounded-xl text-center space-y-2 border border-blue-200 mt-6">
              <p className="text-blue-800 font-medium">
                <span className="font-semibold">GST Amount:</span> ₹{gstAmount}
              </p>
              <p className="text-blue-800 font-medium">
                <span className="font-semibold">Final Amount:</span> ₹{finalAmount}
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
