import React, { useState } from "react";

export default function ProvidentFundCalculator() {
  const [basicSalary, setBasicSalary] = useState("");
  const [employeePercent, setEmployeePercent] = useState("12"); // Default EPF 12%
  const [employerPercent, setEmployerPercent] = useState("12"); // Employer contribution, can differ (usually 12%)
  const [interestRate, setInterestRate] = useState("8.15"); // Annual interest rate in %
  const [years, setYears] = useState("20");

  const [result, setResult] = useState(null);

  const calculatePF = () => {
    const salary = parseFloat(basicSalary);
    const empPerc = parseFloat(employeePercent) / 100;
    const empEmployer = parseFloat(employerPercent) / 100;
    const rate = parseFloat(interestRate) / 100;
    const nYears = parseFloat(years);

    if (isNaN(salary) || isNaN(empPerc) || isNaN(empEmployer) || isNaN(rate) || isNaN(nYears)) {
      alert("Please enter valid inputs");
      return;
    }

    // Monthly contributions
    const empContribution = salary * empPerc;
    const employerContribution = salary * empEmployer;
    const totalMonthlyContribution = empContribution + employerContribution;

    // Monthly interest rate
    const monthlyInterest = rate / 12;

    // Compound interest formula for monthly contributions
    // FV = P * [ ( (1 + r)^n - 1 ) / r ]
    // where P = monthly contribution, r = monthly interest rate, n = total months

    const totalMonths = nYears * 12;
    const fv = totalMonthlyContribution * ((Math.pow(1 + monthlyInterest, totalMonths) - 1) / monthlyInterest);

    const totalContributed = totalMonthlyContribution * totalMonths;
    const interestEarned = fv - totalContributed;

    setResult({
      totalCorpus: fv.toFixed(2),
      totalContribution: totalContributed.toFixed(2),
      interestEarned: interestEarned.toFixed(2),
      employeeContribution: empContribution.toFixed(2),
      employerContribution: employerContribution.toFixed(2),
      years: nYears,
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-center mb-4">Provident Fund Calculator</h2>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Basic Salary (₹)</label>
          <input
            type="number"
            value={basicSalary}
            onChange={(e) => setBasicSalary(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="e.g. 30000"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium">Employee Contribution %</label>
            <input
              type="number"
              value={employeePercent}
              onChange={(e) => setEmployeePercent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium">Employer Contribution %</label>
            <input
              type="number"
              value={employerPercent}
              onChange={(e) => setEmployerPercent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium">Annual Interest Rate %</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              step="0.01"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium">Years</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <button
          onClick={calculatePF}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-semibold"
        >
          Calculate
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-green-50 rounded border border-green-200 text-green-900 space-y-2">
          <p>
            <strong>Employee Monthly Contribution:</strong> ₹{result.employeeContribution}
          </p>
          <p>
            <strong>Employer Monthly Contribution:</strong> ₹{result.employerContribution}
          </p>
          <p>
            <strong>Total Contribution over {result.years} years:</strong> ₹{result.totalContribution}
          </p>
          <p>
            <strong>Interest Earned:</strong> ₹{result.interestEarned}
          </p>
          <p className="text-xl font-bold">
            Total Corpus: ₹{result.totalCorpus}
          </p>
        </div>
      )}
    </div>
  );
}
