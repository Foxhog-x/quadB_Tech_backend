const axios = require("axios");
const getConnection = require("../db");
const getCryptoData = async (req, res) => {
  const connection = await getConnection();
  function insertCryptoData(data) {
    const query = `INSERT INTO crypto_data 
          (base_unit, quote_unit, low, high, last, type, open, volume, sell, buy, timestamp, name)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    try {
      data.forEach((item) => {
        connection.query(
          "CALL InsertCryptoData(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            item.base_unit,
            item.quote_unit,
            item.low,
            item.high,
            item.last,
            item.type,
            item.open,
            item.volume,
            item.sell,
            item.buy,
            item.timestamp,
            item.name,
          ]
        );
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error occured in backend" });
    }
  }

  const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
  const cryptoCoin = response.data;

  const selectedCoin = Object.values(cryptoCoin)
    .slice(0, 10)
    .map((ticker) => {
      return {
        base_unit: ticker.base_unit,
        quote_unit: ticker.quote_unit,
        low: parseFloat(ticker.low),
        high: parseFloat(ticker.high),
        last: parseFloat(ticker.last),
        type: ticker.type,
        open: parseFloat(ticker.open),
        volume: parseFloat(ticker.volume),
        sell: parseFloat(ticker.sell),
        buy: parseFloat(ticker.buy),
        timestamp: ticker.at,
        name: ticker.name,
      };
    });
  insertCryptoData(selectedCoin);
  res.status(200).json({ result: selectedCoin });
};

module.exports = { getCryptoData };
