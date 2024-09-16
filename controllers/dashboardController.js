const axios = require("axios");
const getConnection = require("../db");
const getCryptoData = async (req, res) => {
  const connection = await getConnection();

  function insertCryptoData(data) {
    try {
      data.forEach((item) => {
        connection.query(
          "CALL InsertCryptoData(?, ?, ?, ?, ?, ?)",
          [
            item.base_unit,
            item.last,
            item.volume,
            item.sell,
            item.buy,
            item.name,
          ],
          (error, results) => {
            if (error) {
              console.log(error);
              return res.status(500).json({
                message: "Error occurred while inserting data",
              });
            }
          }
        );
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error occurred in backend" });
    }
  }

  const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
  const cryptoCoin = response.data;
  console.log(cryptoCoin);
  const selectedCoin = Object.values(cryptoCoin)
    .slice(0, 10)
    .map((script) => {
      return {
        base_unit: script.base_unit,
        high: parseFloat(script.high),
        last: parseFloat(script.last),
        type: script.type,
        volume: parseFloat(script.volume),
        sell: parseFloat(script.sell),
        buy: parseFloat(script.buy),
        name: script.name,
      };
    });
  insertCryptoData(selectedCoin);
  res.status(200).json({ selectedCoin });
};

module.exports = { getCryptoData };
