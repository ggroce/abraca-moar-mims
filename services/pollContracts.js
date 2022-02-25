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
  oldMimBalance = await getBentoBoxBalance();
  console.log('Current mim value: ', oldMimBalance);
})();

// begin interval to check for new mim value
function watchContractForMoreMim() {
  setInterval(async () => {
    let refreshedMimBalance = await getBentoBoxBalance();
    console.log(
      new Date().toLocaleString(),
      `-- Mim balance in cauldron: ${refreshedMimBalance}`
    );

    if (Math.trunc(refreshedMimBalance) > Math.trunc(oldMimBalance)) {
      oldMimBalance = refreshedMimBalance;
      const notification = `Mim balance available to the cauldron has increased: ${refreshedMimBalance.toFixed(
        2
      )}, get to cookin!`;
      console.log(notification);
      // sendTwilioSMS(notification);
      sendTweet(notification);
    } else if (Math.trunc(refreshedMimBalance) < Math.trunc(oldMimBalance)) {
      console.log('Somebody got those MIMs!');
      oldMimBalance = refreshedMimBalance;
    } else {
      console.log('Mim balance in cauldron unchanged. \r\n');
    }
  }, config.app.contractQueryInterval);
}

module.exports = {
  watchContractForMoreMim: watchContractForMoreMim,
};
