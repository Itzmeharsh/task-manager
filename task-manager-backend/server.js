require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/db");

// import models (IMPORTANT)
require("./models");

const PORT = process.env.PORT || 5000;

sequelize
  .sync()
  .then(() => {
    console.log("Tables synced ✅");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB Error:", err);
  });