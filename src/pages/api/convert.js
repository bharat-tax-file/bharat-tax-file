// /pages/api/convert.js
export default async function handler(req, res) {
  const { from, to, amount } = req.query;
  const apiKey = process.env.EXCHANGE_API_KEY;

  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amount}`
    );

    const data = await response.json();

    if (!response.ok || data.result === "error") {
      return res.status(400).json({ error: data["error-type"] || "API error" });
    }

    res.status(200).json({
      conversion_result: data.conversion_result,
      conversion_rate: data.conversion_rate,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
