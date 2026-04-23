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

    app.listen(process.env.PORT, () => {
      console.log(`Server running`);
    });
  })
  .catch((err) => {
    console.error("DB Error:", err);
  });
console.log("DB URL:", process.env.DB_URL);