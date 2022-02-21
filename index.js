require("dotenv").config();
const express = require("express");

const contract = require("./services/getMimAmount");
const app = express();
const port = process.env.PORT || 38000;
const db = require("knex")({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

setInterval(async () => {
  let mimBalance = await contract.askBentoBoxBalance();
  console.log(
    new Date().toLocaleString(),
    `-- Mim balance in cauldron: ${mimBalance}`
  );
}, 5000);
