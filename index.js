require('dotenv').config();
const express = require('express');

const { askBentoBoxBalance } = require('./services/getMimAmount');
const { sendTwilioSMS } = require('./services/notifications/twilio-notif');

const db = require('knex')({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
  },
});
const app = express();
const port = process.env.PORT || 38000;
let currentMimValue = null;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// setup initial mim value
(async () => {
  currentMimValue = await askBentoBoxBalance();
  console.log('Current mim value: ', currentMimValue);
})();

setInterval(async () => {
  let mimBalance = await askBentoBoxBalance();
  console.log(
    new Date().toLocaleString(),
    `-- Mim balance in cauldron: ${mimBalance}`
  );
  if (mimBalance > currentMimValue) {
    sendTwilioSMS(`Mim balance in cauldron has increased: ${mimBalance}`);
  } else {
    console.log('Mim balance in cauldron has not increased');
  }
}, 20000);
