const config = require('../config/config');
const {
  getBentoBoxBalance: getBentoBoxBalance,
} = require('./bentoBoxContract');
const { sendTwilioSMS } = require('../notifications/twilioNotif');
const { sendTweet } = require('../notifications/twitterNotifs');

let currentMimValue = null;
// bentoBox must increase by at least this value for notifications to be sent
let thresholdValue = 10;

// setup initial mim value
(async () => {
  currentMimValue = await getBentoBoxBalance();
  console.log('Current mim value: ', currentMimValue);
})();

// begin interval to check for new mim value
function watchContractForMoreMim() {
  setInterval(async () => {
    let mimBalance = await getBentoBoxBalance();
    console.log(
      new Date().toLocaleString(),
      `-- Mim balance in cauldron: ${mimBalance}`
    );
    if (mimBalance > currentMimValue) {
      currentMimValue = mimBalance;
      const notification = `Mim balance in cauldron has increased: ${mimBalance}`;
      console.log(notification);
      sendTwilioSMS(notification);
      sendTweet(notification);
    } else {
      console.log('Mim balance in cauldron unchanged.');
    }
  }, config.app.contractQueryInterval);
}

module.exports = {
  watchContractForMoreMim: watchContractForMoreMim,
};
