const express = require("express");
const app = express();
app.use(express.json());
app.use("/dashboard", require("./routes/dashboard/dashboard.js"));

app.listen(8000, () => {
  console.log("server port is listing on 8000");
});
