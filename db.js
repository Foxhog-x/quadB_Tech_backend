const mysql = require("mysql2/promise");

const getConnection = async () => {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST || "localhost",
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "12345",
    database: process.env.MYSQL_DATABASE || "quadb",
    connectionLimit: 100,
    connectTimeout: 10000,
  });

  return connection;
};

getConnection()
  .then(() => console.log("Connection established successfully"))
  .catch((err) => console.error("Connection failed:", err));

module.exports = getConnection;
