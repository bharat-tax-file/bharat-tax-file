import React, { useState, useEffect } from 'react';

// Import your actual DashboardLayout component from your project's components folder
import DashboardLayout from '../../../containers/DashboardLayout';
import { requireAuth } from '@/utils/requireAuth';

export async function getServerSideProps(context) {
  const auth = await requireAuth(context);

  if (!auth) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      userName: auth.user.name || 'User',
    },
  };
}

const InvoicesPage = () => {
  const [invoiceType, setInvoiceType] = useState('tax_invoice');
  const [invoiceData, setInvoiceData] = useState({
    invoiceNo: '1',
    dateOfInvoice: new Date().toISOString().slice(0, 10),
    customerGSTIN: '',
    placeOfSupply: 'DELHI',
    customerName: '',
    customerAddress: '',
    customerMobileNumber: '',
    deliveryTo: '',
    deliveryAddress: '',
    purchaseOrderNo: '',
  });

  const [invoiceItems, setInvoiceItems] = useState([
    {
      id: 1,
      itemName: '',
      hsnSac: '',
      quantity: 0,
      rate: 0,
      value: 0,
      discount: 0,
      discountAmount: 0,
      taxableValue: 0,
      taxRate: 18,
      cgst: 0,
      sgst: 0,
      igst: 0,
      amount: 0
    },
  ]);

  const [otherCharges, setOtherCharges] = useState({
    packaging: 0,
    shipping: 0,
    insurance: 0,
    handling: 0,
    other: 0
  });

  const [showPrefillModal, setShowPrefillModal] = useState(false);
  const userName = 'User';
  const companyState = 'DELHI';

  const [totals, setTotals] = useState({
    subtotal: 0,
    totalDiscount: 0,
    totalTaxableValue: 0,
    totalCGST: 0,
    totalSGST: 0,
    totalIGST: 0,
    totalTax: 0,
    totalOtherCharges: 0,
    grandTotal: 0
  });

  const indianStates = [
    "ANDHRA PRADESH", "ARUNACHAL PRADESH", "ASSAM", "BIHAR", "CHHATTISGARH",
    "GOA", "GUJARAT", "HARYANA", "HIMACHAL PRADESH", "JHARKHAND",
    "KARNATAKA", "KERALA", "MADHYA PRADESH", "MAHARASHTRA", "MANIPUR",
    "MEGHALAYA", "MIZORAM", "NAGALAND", "ODISHA", "PUNJAB",
    "RAJASTHAN", "SIKKIM", "TAMIL NADU", "TELANGANA", "TRIPURA",
    "UTTAR PRADESH", "UTTARAKHAND", "WEST BENGAL",
    "ANDAMAN AND NICOBAR ISLANDS", "CHANDIGARH", "DADRA AND NAGAR HAVELI AND DAMAN AND DIU",
    "LAKSHADWEEP", "DELHI", "PUDUCHERRY", "LADAKH", "JAMMU AND KASHMIR"
  ];

  const calculateItemValues = (item) => {
    const value = parseFloat(item.quantity || 0) * parseFloat(item.rate || 0);
    const discountAmount = (value * parseFloat(item.discount || 0)) / 100;
    const taxableValue = value - discountAmount;
    const taxAmount = (taxableValue * parseFloat(item.taxRate || 0)) / 100;
    const isInterState = invoiceData.placeOfSupply !== companyState;

    return {
      value: Number.isFinite(value) ? value.toFixed(2) : (0).toFixed(2),
      discountAmount: Number.isFinite(discountAmount) ? discountAmount.toFixed(2) : (0).toFixed(2),
      taxableValue: Number.isFinite(taxableValue) ? taxableValue.toFixed(2) : (0).toFixed(2),
      cgst: isInterState ? (0).toFixed(2) : (Number.isFinite(taxAmount) ? (taxAmount / 2).toFixed(2) : (0).toFixed(2)),
      sgst: isInterState ? (0).toFixed(2) : (Number.isFinite(taxAmount) ? (taxAmount / 2).toFixed(2) : (0).toFixed(2)),
      igst: isInterState ? (Number.isFinite(taxAmount) ? taxAmount.toFixed(2) : (0).toFixed(2)) : (0).toFixed(2),
      amount: Number.isFinite(taxableValue) && Number.isFinite(taxAmount) ? (taxableValue + taxAmount).toFixed(2) : (0).toFixed(2)
    };
  };

  const updateAllItemCalculations = () => {
    setInvoiceItems(prevItems =>
      prevItems.map(item => ({ ...item, ...calculateItemValues(item) }))
    );
  };

  // run whenever place of supply changes so taxes change to IGST/CGST-SGST properly
  useEffect(() => {
    updateAllItemCalculations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceData.placeOfSupply]);

  const handleItemChange = (id, e) => {
    const { name, value } = e.target;
    setInvoiceItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [name]: value };
          const calculations = calculateItemValues(updatedItem);
          return { ...updatedItem, ...calculations };
        }
        return item;
      })
    );
  };

  const handleAddItem = () => {
    const newItemId = invoiceItems.length > 0 ? invoiceItems[invoiceItems.length - 1].id + 1 : 1;
    setInvoiceItems((prevItems) => [
      ...prevItems,
      {
        id: newItemId,
        itemName: '',
        hsnSac: '',
        quantity: 0,
        rate: 0,
        value: 0,
        discount: 0,
        discountAmount: 0,
        taxableValue: 0,
        taxRate: 18,
        cgst: 0,
        sgst: 0,
        igst: 0,
        amount: 0
      },
    ]);
  };

  const handleRemoveItem = (id) => {
    setInvoiceItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOtherChargesChange = (e) => {
    const { name, value } = e.target;
    setOtherCharges(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handlePrefillGSTIN = () => {
    setShowPrefillModal(true);
    setInvoiceData((prevData) => ({
      ...prevData,
      customerName: 'ABC Enterprises Pvt Ltd',
      customerAddress: '123 Business Park, Sector 15, Gurgaon - 122001',
      customerMobileNumber: '+91-9876543210',
    }));
  };

  const closeModal = () => {
    setShowPrefillModal(false);
  };

  // Keep computed variables (useful if you want quick values)
  const subtotal = invoiceItems.reduce((sum, item) => sum + parseFloat(item.value || 0), 0);
  const totalDiscount = invoiceItems.reduce((sum, item) => sum + parseFloat(item.discountAmount || 0), 0);
  const totalTaxableValue = invoiceItems.reduce((sum, item) => sum + parseFloat(item.taxableValue || 0), 0);
  const totalCGST = invoiceItems.reduce((sum, item) => sum + parseFloat(item.cgst || 0), 0);
  const totalSGST = invoiceItems.reduce((sum, item) => sum + parseFloat(item.sgst || 0), 0);
  const totalIGST = invoiceItems.reduce((sum, item) => sum + parseFloat(item.igst || 0), 0);
  const totalTax = totalCGST + totalSGST + totalIGST;
  const totalOtherCharges = Object.values(otherCharges).reduce((sum, charge) => sum + charge, 0);
  const grandTotal = totalTaxableValue + totalTax + totalOtherCharges;

  // Keep the UI-updating totals in a small state so they re-render instantly whenever items or charges change
  useEffect(() => {
    setTotals({
      subtotal,
      totalDiscount,
      totalTaxableValue,
      totalCGST,
      totalSGST,
      totalIGST,
      totalTax,
      totalOtherCharges,
      grandTotal
    });
    // run whenever the numeric data that yields totals changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceItems, otherCharges, invoiceData.placeOfSupply]);

  return (
    <DashboardLayout userName={userName}>
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full">
        {/* Prefill Modal */}
        {showPrefillModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Prefill Customer Details</h3>
              <p className="text-gray-700 mb-6">
                Customer details have been prefilled based on the entered GSTIN.
              </p>
              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
                >
                  Got It!
                </button>
              </div>
            </div>
          </div>
        )}

        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-10 text-center tracking-tight">
          Invoicy
        </h1>

        {/* Invoice Type and Options */}
        <div className="flex flex-col lg:flex-row items-center justify-center mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-inner">
  <div className="flex items-center space-x-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Type</label>
      <select
        value={invoiceType}
        onChange={(e) => setInvoiceType(e.target.value)}
        className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-800 font-semibold min-w-48"
      >
        <option value="tax_invoice">Tax Invoice</option>
        <option value="proforma">Proforma Invoice</option>
        <option value="credit_note">Credit Note</option>
        <option value="debit_note">Debit Note</option>
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
      <div className="flex items-center bg-white border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all duration-200">
        <span className="bg-gray-50 px-4 py-3 text-gray-700 font-semibold border-r border-gray-200">₹ INR</span>
        <div className="px-4 py-[10px] bg-white text-gray-800 border rounded min-w-20">₹ INR</div>
      </div>
    </div>
  </div>
</div>


        {/* Invoice Details */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            Invoice Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Invoice No</label>
              <input
                type="text"
                name="invoiceNo"
                value={invoiceData.invoiceNo}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 group-hover:border-gray-300"
                placeholder="Auto-generated"
                readOnly
              />
            </div>
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Invoice</label>
              <div className="relative">
                <input
                  type="date"
                  name="dateOfInvoice"
                  value={invoiceData.dateOfInvoice}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 group-hover:border-gray-300"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Customer GSTIN</label>
              <div className="relative">
                <input
                  type="text"
                  name="customerGSTIN"
                  value={invoiceData.customerGSTIN}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-20 border-2 border-gray-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 group-hover:border-gray-300"
                  placeholder="Enter GSTIN"
                />
                <button
                  type="button"
                  onClick={handlePrefillGSTIN}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md transform hover:scale-105"
                >
                  Prefill
                </button>
              </div>
            </div>
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Place of Supply</label>
              <select
                name="placeOfSupply"
                value={invoiceData.placeOfSupply}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 group-hover:border-gray-300 bg-white"
              >
                {indianStates.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Customer Name</label>
              <input
                type="text"
                name="customerName"
                value={invoiceData.customerName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 group-hover:border-gray-300"
                placeholder="Enter customer name"
              />
            </div>
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Customer Mobile</label>
              <input
                type="text"
                name="customerMobileNumber"
                value={invoiceData.customerMobileNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 group-hover:border-gray-300"
                placeholder="Enter mobile number"
              />
            </div>
            <div className="md:col-span-2 group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Customer Address</label>
              <textarea
                name="customerAddress"
                value={invoiceData.customerAddress}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 group-hover:border-gray-300 resize-none"
                placeholder="Enter customer address"
              />
            </div>
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Purchase Order No.</label>
              <input
                type="text"
                name="purchaseOrderNo"
                value={invoiceData.purchaseOrderNo}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 group-hover:border-gray-300"
                placeholder="Enter PO number (optional)"
              />
            </div>
          </div>
        </div>

        {/* Invoice Items */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              Invoice Items
            </h2>
            <button
              onClick={handleAddItem}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg transform hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Item
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border-2 border-gray-100">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  <th className="py-4 px-3 min-w-40">Item Name</th>
                  <th className="py-4 px-3 w-24">HSN/SAC</th>
                  <th className="py-4 px-3 w-28">Qty</th>
                  <th className="py-4 px-3 w-32">Rate</th>
                  <th className="py-4 px-3 w-28">Value</th>
                  <th className="py-4 px-3 w-28">Disc%</th>
                  <th className="py-4 px-3 w-28">Taxable</th>
                  <th className="py-4 px-3 w-20">Tax%</th>


                  {invoiceData.placeOfSupply === companyState ? (
                    <>
                      <th className="py-4 px-3 w-24 text-green-600">CGST</th>
                      <th className="py-4 px-3 w-24 text-green-600">SGST</th>
                    </>
                  ) : (
                    <th className="py-4 px-3 w-24 text-blue-600">IGST</th>
                  )}
                  <th className="py-4 px-3 w-28">Amount</th>
                  <th className="py-4 px-3 w-12"></th>
                </tr>
              </thead>
              <tbody>
                {invoiceItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-150">
                    <td className="py-3 px-3">
                      <input
                        type="text"
                        name="itemName"
                        value={item.itemName}
                        onChange={(e) => handleItemChange(item.id, e)}
                        className="w-full px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                        placeholder="Item Name"
                      />
                    </td>
                    <td className="py-3 px-3">
                      <input
                        type="text"
                        name="hsnSac"
                        value={item.hsnSac}
                        onChange={(e) => handleItemChange(item.id, e)}
                        className="w-full px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                        placeholder="HSN/SAC"
                      />
                    </td>
                    <td className="py-3 px-3">
                      <input
                        type="number"
                        name="quantity"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(item.id, e)}
                        className="w-full px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                        min="0"
                      />
                    </td>
                    <td className="py-3 px-3">
                      <input
                        type="number"
                        name="rate"
                        value={item.rate}
                        onChange={(e) => handleItemChange(item.id, e)}
                        className="w-full px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                        min="0"
                        step="0.01"
                      />
                    </td>
                    <td className="py-3 px-3 text-sm font-medium text-gray-800">₹{item.value}</td>
                    <td className="py-3 px-3">
                      <input
                        type="number"
                        name="discount"
                        value={item.discount}
                        onChange={(e) => handleItemChange(item.id, e)}
                        className="w-full px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                        min="0"
                        max="100"
                        step="0.01"
                      />
                    </td>
                    <td className="py-3 px-3 text-sm font-medium text-gray-800">₹{item.taxableValue}</td>
                    <td className="py-3 px-3">
                      <input
                        type="number"
                        name="taxRate"
                        value={item.taxRate}
                        onChange={(e) => handleItemChange(item.id, e)}
                        className="w-full px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                        min="0"
                        step="0.01"
                      />
                    </td>
                    {invoiceData.placeOfSupply === companyState ? (
                      <>
                        <td className="py-3 px-3 text-sm font-medium text-green-600">₹{item.cgst}</td>
                        <td className="py-3 px-3 text-sm font-medium text-green-600">₹{item.sgst}</td>
                      </>
                    ) : (
                      <td className="py-3 px-3 text-sm font-medium text-blue-600">₹{item.igst}</td>
                    )}
                    <td className="py-3 px-3 text-sm font-bold text-gray-800">₹{item.amount}</td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={handleAddItem}
            className="flex items-center mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg transform hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Item
          </button>
        </div>

        {/* Other Charges */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c1.657 0 3 .895 3 2s-1.343 2-3 2-3-.895-3-2 1.343-2 3-2zM4 16v-1a2 2 0 012-2h12a2 2 0 012 2v1m-6-10h-2m2 4h-2m2 4h-2" />
              </svg>
            </div>
            Other Charges
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {Object.entries(otherCharges).map(([key, value]) => (
              <div key={key} className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">
                  {key === 'other' ? 'Other Charges' : key}
                </label>
                <input
                  type="number"
                  name={key}
                  value={value}
                  onChange={handleOtherChargesChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 group-hover:border-gray-300"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Totals Summary */}
        <div className="flex justify-end mt-8">
          <div className="w-full md:w-2/3 lg:w-1/2 bg-gray-50 p-6 rounded-2xl shadow-inner border border-gray-200">
            <div className="space-y-3 text-gray-800">
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold">Subtotal:</span>
                <span className="font-bold">₹{totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-red-600 text-lg">
                <span className="font-semibold">Total Discount:</span>
                <span className="font-bold">-₹{totals.totalDiscount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold border-t pt-2 border-gray-200">
                <span>Taxable Amount:</span>
                <span>₹{totals.totalTaxableValue.toFixed(2)}</span>
              </div>
              {invoiceData.placeOfSupply === companyState ? (
                <>
                  <div className="flex justify-between items-center text-lg text-green-600">
                    <span className="font-semibold">CGST:</span>
                    <span className="font-bold">₹{totals.totalCGST.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg text-green-600">
                    <span className="font-semibold">SGST:</span>
                    <span className="font-bold">₹{totals.totalSGST.toFixed(2)}</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between items-center text-lg text-blue-600">
                  <span className="font-semibold">IGST:</span>
                  <span className="font-bold">₹{totals.totalIGST.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold">Other Charges:</span>
                <span className="font-bold">₹{totals.totalOtherCharges.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-4xl font-extrabold border-t-2 border-gray-300 pt-4 text-indigo-700">
                <span>Grand Total:</span>
                <span>₹{totals.grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-4 justify-end">
          <button className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 shadow-lg font-semibold">
            Save as Draft
          </button>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg font-semibold">
            Preview
          </button>
          <button className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 shadow-xl font-bold text-lg transform hover:scale-105">
            Generate Invoice
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InvoicesPage;
