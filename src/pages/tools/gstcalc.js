import React, { useState } from "react";
import Head from "next/head";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";

export default function GSTInvoice() {
  const [business, setBusiness] = useState({ name: "", gstin: "" });
  const [customer, setCustomer] = useState({
    name: "",
    invoiceNo: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [items, setItems] = useState([{ name: "", price: "", quantity: "", gst: "" }]);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => setItems([...items, { name: "", price: "", quantity: "", gst: "" }]);

  const removeItem = (index) => setItems(items.filter((_, i) => i !== index));

  const calculateItem = (item) => {
    const price = parseFloat(item.price) || 0;
    const qty = parseFloat(item.quantity) || 0;
    const gstRate = parseFloat(item.gst) || 0;
    const base = price * qty;
    const gstAmount = (base * gstRate) / 100;
    return {
      base,
      gstAmount,
      cgst: gstAmount / 2,
      sgst: gstAmount / 2,
      total: base + gstAmount,
    };
  };

  const grandTotals = items.reduce(
    (acc, item) => {
      const cal = calculateItem(item);
      acc.base += cal.base;
      acc.gst += cal.gstAmount;
      acc.total += cal.total;
      return acc;
    },
    { base: 0, gst: 0, total: 0 }
  );

  const generatePDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const { height } = page.getSize();
    let y = height - 50;

    const drawText = (text, x, y, size = 12) => {
      if (text != null && x != null && y != null) {
        page.drawText(String(text), { x, y, size, font, color: rgb(0, 0, 0) });
      }
    };
    drawText("GST Invoice", 250, y, 18);
    y -= 30;
    drawText(`Business: ${business.name}`, 50, y);
    drawText(`GSTIN: ${business.gstin}`, 350, y);
    y -= 20;
    drawText(`Customer: ${customer.name}`, 50, y);
    drawText(`Invoice No: ${customer.invoiceNo}`, 350, y);
    y -= 20;
    drawText(`Date: ${customer.date}`, 50, y);
    y -= 30;
    drawText("Items:", 50, y);
    y -= 20;

    items.forEach((item, index) => {
      const { total } = calculateItem(item);
      drawText(
        `${index + 1}. ${item.name} | Rs.${item.price} × ${item.quantity} | GST: ${item.gst}% | Total: Rs.${total.toFixed(2)}` // rupees sign ki jagah rs use karna hai

        , 50,
        y
      );
      y -= 20;
    });

    y -= 10;
    drawText(`Subtotal: Rs.${grandTotals.base.toFixed(2)}`, 50, y); // we have to use rs insteam of rupees sign for pdf works
    y -= 20;
    drawText(`Total GST: Rs.${grandTotals.gst.toFixed(2)}`, 50, y);
    y -= 20;
    drawText(`Grand Total: Rs.${grandTotals.total.toFixed(2)}`, 50, y);
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    saveAs(blob, customer.invoiceNo ? `${customer.invoiceNo}.pdf` : "invoice.pdf");
  };

  return (
    <>
      <Head>
        <title>GST Invoice Generator</title>
      </Head>
      <main className="min-h-screen bg-gray-100 py-6 px-4">
        {/* Invoice Generator */}
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
            GST Calculator
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Business Details */}
            <div>
              <h3 className="font-bold mb-2">Business Details</h3>
              <input
                className="w-full border p-2 mb-2 rounded"
                placeholder="Business Name"
                value={business.name}
                onChange={(e) => setBusiness({ ...business, name: e.target.value })}
              />
              <input
                className="w-full border p-2 rounded"
                placeholder="GSTIN"
                value={business.gstin}
                onChange={(e) => setBusiness({ ...business, gstin: e.target.value })}
              />
            </div>
            {/* Customer Details */}
            <div>
              <h3 className="font-bold mb-2">Customer Details</h3>
              <input
                className="w-full border p-2 mb-2 rounded"
                placeholder="Customer Name"
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
              />
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  className="border p-2 rounded flex-grow"
                  placeholder="Invoice No"
                  value={customer.invoiceNo}
                  onChange={(e) => setCustomer({ ...customer, invoiceNo: e.target.value })}
                />
                <input
                  type="date"
                  className="border p-2 rounded flex-grow"
                  value={customer.date}
                  onChange={(e) => setCustomer({ ...customer, date: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Invoice Items */}
          <h3 className="font-bold mb-3">Invoice Items</h3>

          {/* Make table horizontally scrollable on small screens */}
          <div className="overflow-x-auto">
            <table className="w-full border text-sm mb-4 min-w-[700px]">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">#</th>
                  <th className="border p-2">Product</th>
                  <th className="border p-2">Price</th>
                  <th className="border p-2">Qty</th>
                  <th className="border p-2">GST%</th>
                  <th className="border p-2">CGST</th>
                  <th className="border p-2">SGST</th>
                  <th className="border p-2">Total</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => {
                  const calc = calculateItem(item);
                  return (
                    <tr key={index}>
                      <td className="border p-2 text-center">{index + 1}</td>
                      <td className="border p-2">
                        <input
                          value={item.name}
                          onChange={(e) => handleItemChange(index, "name", e.target.value)}
                          className="w-full p-1 rounded border"
                          placeholder="Product name"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => handleItemChange(index, "price", e.target.value)}
                          className="w-full p-1 rounded border"
                          placeholder="Price"
                          min="0"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                          className="w-full p-1 rounded border"
                          placeholder="Qty"
                          min="0"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="number"
                          value={item.gst}
                          onChange={(e) => handleItemChange(index, "gst", e.target.value)}
                          className="w-full p-1 rounded border"
                          placeholder="GST %"
                          min="0"
                          max="100"
                        />
                      </td>
                      <td className="border p-2 text-right">₹{calc.cgst.toFixed(2)}</td>
                      <td className="border p-2 text-right">₹{calc.sgst.toFixed(2)}</td>
                      <td className="border p-2 text-right">₹{calc.total.toFixed(2)}</td>
                      <td className="border p-2 text-center">
                        <button
                          onClick={() => removeItem(index)}
                          className="text-red-500 font-bold text-lg"
                          aria-label={`Remove item ${index + 1}`}
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <button
            onClick={addItem}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full md:w-auto mt-2"
          >
            + Add Item
          </button>

          <div className="text-right mt-4 space-y-1 text-sm md:text-base">
            <p>
              <strong>Subtotal:</strong> ₹{grandTotals.base.toFixed(2)}
            </p>
            <p>
              <strong>Total GST:</strong> ₹{grandTotals.gst.toFixed(2)}
            </p>
            <p className="text-lg font-bold">
              Grand Total: ₹{grandTotals.total.toFixed(2)}
            </p>
          </div>

          <div className="text-right">
            <button
              onClick={generatePDF}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full md:w-auto"
            >
              Download PDF
            </button>
          </div>
        </div>

        {/* Blog Section Below */}
        <section className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 mt-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-6">
            Why GST Invoice Generation is Essential: Key Points
          </h1>
          <ul className="list-disc list-inside space-y-4 text-gray-700 text-base md:text-lg leading-relaxed">
            <li>
              <strong>Legal Compliance:</strong> GST invoices are mandatory under the Indian GST law for businesses registered under GST. Proper invoices help avoid penalties and audits.
            </li>
            <li>
              <strong>Transparency:</strong> Invoices provide transparency between buyers and sellers, detailing the product/service, price, quantity, GST rate, and taxes paid.
            </li>
            <li>
              <strong>Input Tax Credit (ITC):</strong> A valid GST invoice is required by buyers to claim Input Tax Credit on the GST paid, reducing their tax liability.
            </li>
            <li>
              <strong>Accurate Tax Calculation:</strong> GST invoicing ensures correct tax computation by separating CGST and SGST, preventing errors that may cause financial loss.
            </li>
            <li>
              <strong>Record Keeping:</strong> Maintaining GST invoices helps in systematic record-keeping for audits, returns filing, and dispute resolution.
            </li>
            <li>
              <strong>Professionalism:</strong> Issuing well-structured invoices reflects professionalism and builds trust with clients and customers.
            </li>
            <li>
              <strong>Easy Business Management:</strong> Digital tools and invoice generators simplify billing processes, saving time and reducing manual errors.
            </li>
            <li>
              <strong>Customizable Details:</strong> A GST invoice generator allows businesses to customize details such as business info, customer details, and itemized billing.
            </li>
            <li>
              <strong>Export & Documentation:</strong> Generating downloadable PDFs facilitates easy sharing, printing, and storing of invoices in a professional format.
            </li>
            <li>
              <strong>Audit and Compliance Readiness:</strong> Ready invoices with all mandatory fields ensure smooth audits and compliance with government tax authorities.
            </li>
          </ul>
          <p className="mt-6 text-gray-600">
            Use this tool to streamline your invoicing process and stay compliant with GST regulations effortlessly. Happy invoicing!
          </p>
        </section>
      </main>
    </>
  );
}
