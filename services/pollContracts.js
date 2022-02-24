const config = require('../config/config');
const {
  getBentoBoxBalance: getBentoBoxBalance,
} = require('./bentoBoxContract');
const { sendTwilioSMS } = require('../notifications/twilioNotif');
const { sendTweet } = require('../notifications/twitterNotifs');

let oldMimBalance = 0;
// bentoBox must increase by at least this value for notifications to be sent
let thresholdValue = 10;

// setup initial mim value
(async () => {
  oldMimBalance = Number(await getBentoBoxBalance());
  console.log('Current mim value: ', oldMimBalance);
})();

// begin interval to check for new mim value
function watchContractForMoreMim() {
  setInterval(async () => {
    let refreshedMimBalance = Number(await getBentoBoxBalance());
    console.log(
      new Date().toLocaleString(),
      `-- Mim balance in cauldron: ${refreshedMimBalance}`
    );
    if (refreshedMimBalance > oldMimBalance) {
      oldMimBalance = refreshedMimBalance;
      const notification = `Mim balance in cauldron has increased: ${refreshedMimBalance.toFixed(
        2
      )}`;
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
