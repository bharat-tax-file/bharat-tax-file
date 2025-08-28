import { getConnection } from '@/utils/db'; // Your DB connection utility

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const invoice = req.body;

    try {
      const db = await getConnection();
      // Example for MySQL: adjust table/fields as needed
      await db.query(
        'INSERT INTO invoices (invoice_no, date, customer_name, total, data) VALUES (?, ?, ?, ?, ?)',
        [
          invoice.invoiceData.invoiceNo,
          invoice.invoiceData.dateOfInvoice,
          invoice.invoiceData.customerName,
          invoice.totals.grandTotal,
          JSON.stringify(invoice), // store full invoice as JSON
        ]
      );
      res.status(200).json({ message: 'Invoice saved!' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}