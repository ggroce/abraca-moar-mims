const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const subscriberPhoneNumber = process.env.SUBSCRIBER_PHONE_NUMBER;

const client = require('twilio')(twilioAccountSid, twilioAuthToken);

function sendTwilioSMS(message) {
  client.messages
    .create({
      body: message,
      from: twilioPhoneNumber,
      to: subscriberPhoneNumber,
    })
    .then((message) => console.log(message.sid))
    .catch((err) => console.log('Error with Twilio SMS', err));
}

module.exports = {
  sendTwilioSMS: sendTwilioSMS,
};
