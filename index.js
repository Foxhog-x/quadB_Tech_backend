const express = require("express");
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.use("/dashboard/api", require("./routes/dashboard/dashboard.js"));

app.listen(8000, () => {
  console.log("server port is listing on 8000");
});
