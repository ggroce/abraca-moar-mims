require("dotenv").config();
const express = require("express");

const config = require("./config");
const { askBentoBoxBalance } = require("./services/getMimAmount");
const { sendTwilioSMS } = require("./services/notifications/twilio-notif");

const db = require("knex")({
  client: "pg",
  connection: {
    connectionString: config.db.connectionString,
  },
});
const app = express();
const port = config.app.port;
let currentMimValue = null;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// setup initial mim value
(async () => {
  currentMimValue = await askBentoBoxBalance();
  console.log("Current mim value: ", currentMimValue);
})();

// begin interval to check for new mim value
setInterval(async () => {
  let mimBalance = await askBentoBoxBalance();
  console.log(
    new Date().toLocaleString(),
    `-- Mim balance in cauldron: ${mimBalance}`
  );
  if (mimBalance > currentMimValue) {
    currentMimValue = mimBalance;
    console.log("MIM amound increased, sending SMS...");
    sendTwilioSMS(`Mim balance in cauldron has increased: ${mimBalance}`);
  } else {
    console.log("Mim balance in cauldron unchanged.");
  }
}, config.app.contractQueryInterval);
