const config = require("../../config");

const client = require("twilio")(
  config.twilio.accountSid,
  config.twilio.authToken
);

function sendTwilioSMS(message) {
  client.messages
    .create({
      body: message,
      from: config.twilio.fromNumber,
      to: config.twilio.subscriberNumber,
    })
    .then((message) => console.log(message.sid))
    .catch((err) => console.log("Error with Twilio SMS", err));
}

module.exports = {
  sendTwilioSMS: sendTwilioSMS,
};
