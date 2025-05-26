import React, { useState } from "react";

export default function AdvanceTaxCalculator() {
  const [income, setIncome] = useState("");
  const [ageGroup, setAgeGroup] = useState("below60");
  const [taxRegime, setTaxRegime] = useState("old");
  const [taxDetails, setTaxDetails] = useState(null);

  const oldRegimeSlabs = {
    below60: [
      { limit: 250000, rate: 0 },
      { limit: 500000, rate: 0.05 },
      { limit: 1000000, rate: 0.20 },
      { limit: Infinity, rate: 0.30 },
    ],
    senior60to80: [
      { limit: 300000, rate: 0 },
      { limit: 500000, rate: 0.05 },
      { limit: 1000000, rate: 0.20 },
      { limit: Infinity, rate: 0.30 },
    ],
    verySenior80plus: [
      { limit: 500000, rate: 0 },
      { limit: 1000000, rate: 0.20 },
      { limit: Infinity, rate: 0.30 },
    ],
  };

  const newRegimeSlabs = [
    { limit: 300000, rate: 0 },
    { limit: 600000, rate: 0.05 },
    { limit: 900000, rate: 0.10 },
    { limit: 1200000, rate: 0.15 },
    { limit: 1500000, rate: 0.20 },
    { limit: 2000000, rate: 0.25 },
    { limit: Infinity, rate: 0.30 },
  ];

  const getSurcharge = (taxableIncome, tax) => {
    if (taxableIncome > 50000000) return tax * 0.37;
    else if (taxableIncome > 20000000) return tax * 0.25;
    else if (taxableIncome > 10000000) return tax * 0.15;
    else if (taxableIncome > 5000000) return tax * 0.10;
    else return 0;
  };

  const calculateTaxOldRegime = (income, slabs) => {
    let tax = 0;
    let prevLimit = 0;

    for (const slab of slabs) {
      if (income > slab.limit) {
        tax += (slab.limit - prevLimit) * slab.rate;
        prevLimit = slab.limit;
      } else {
        tax += (income - prevLimit) * slab.rate;
        break;
      }
    }
    return tax;
  };

  const calculateTaxNewRegime = (income, slabs) => {
    let tax = 0;
    let prevLimit = 0;

    for (const slab of slabs) {
      if (income > slab.limit) {
        tax += (slab.limit - prevLimit) * slab.rate;
        prevLimit = slab.limit;
      } else {
        tax += (income - prevLimit) * slab.rate;
        break;
      }
    }
    return tax;
  };

  const calculateTax = (income) => {
    let tax = 0;
    if (taxRegime === "old") {
      tax = calculateTaxOldRegime(income, oldRegimeSlabs[ageGroup]);
    } else {
      tax = calculateTaxNewRegime(income, newRegimeSlabs);
    }

    const surcharge = getSurcharge(income, tax);
    const cess = 0.04 * (tax + surcharge);
    const totalTax = tax + surcharge + cess;

    return { tax, surcharge, cess, totalTax };
  };

  const calculateInstallments = (totalTax) => {
    const installments = [
      { due: "15 Jun", percent: 0.15 },
      { due: "15 Sep", percent: 0.45 },
      { due: "15 Dec", percent: 0.75 },
      { due: "15 Mar", percent: 1.0 },
    ];

    return installments.map((inst) => ({
      due: inst.due,
      amount: (totalTax * inst.percent).toFixed(2),
    }));
  };

  const handleCalculate = () => {
    const inc = parseFloat(income);
    if (isNaN(inc) || inc < 0) {
      alert("Please enter a valid income");
      return;
    }
    const taxInfo = calculateTax(inc);
    const installments = calculateInstallments(taxInfo.totalTax);
    setTaxDetails({ ...taxInfo, installments });
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Advance Tax Calculator</h2>

      <label className="block text-gray-700 font-medium mb-2">Estimated Annual Income (₹)</label>
      <input
        type="number"
        value={income}
        onChange={(e) => setIncome(e.target.value)}
        placeholder="e.g. 1200000"
        className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
      />

      <label className="block text-gray-700 font-medium mb-2">Select Age Group</label>
      <select
        value={ageGroup}
        onChange={(e) => setAgeGroup(e.target.value)}
        className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        <option value="below60">Below 60 years</option>
        <option value="senior60to80">60 to 80 years (Senior Citizen)</option>
        <option value="verySenior80plus">Above 80 years (Very Senior Citizen)</option>
      </select>

      <label className="block text-gray-700 font-medium mb-2">Select Tax Regime</label>
      <select
        value={taxRegime}
        onChange={(e) => setTaxRegime(e.target.value)}
        className="w-full px-4 py-3 mb-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        <option value="old">Old Regime</option>
        <option value="new">New Regime</option>
      </select>

      <button
        onClick={handleCalculate}
        className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition duration-300"
      >
        Calculate
      </button>

      {taxDetails && (
        <div className="mt-8 bg-green-50 p-6 rounded-md border border-green-200 text-green-900">
          <p className="mb-1">
            <strong>Tax (Before Surcharge & Cess):</strong> ₹{taxDetails.tax.toFixed(2)}
          </p>
          <p className="mb-1">
            <strong>Surcharge:</strong> ₹{taxDetails.surcharge.toFixed(2)}
          </p>
          <p className="mb-1">
            <strong>Health & Education Cess (4%):</strong> ₹{taxDetails.cess.toFixed(2)}
          </p>
          <p className="text-xl font-bold mt-4 mb-4">Total Tax Liability: ₹{taxDetails.totalTax.toFixed(2)}</p>

          <h3 className="text-lg font-semibold mb-2">Advance Tax Installments</h3>
          <ul className="list-disc list-inside space-y-1">
            {taxDetails.installments.map(({ due, amount }) => (
              <li key={due}>
                <span className="font-medium">{due}:</span> ₹{amount}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
