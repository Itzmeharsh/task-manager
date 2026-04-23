const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ connect routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/tasks", require("./routes/task.routes"));

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

module.exports = app;