const Twit = require('twit');
const config = require('../config/config');

const T = new Twit({
  consumer_key: config.twitter.consumerKey,
  consumer_secret: config.twitter.consumerSecret,
  access_token: config.twitter.accessToken,
  access_token_secret: config.twitter.accessTokenSecret,
});

try {
  T.get(
    'account/verify_credentials',
    {
      include_entities: false,
      skip_status: true,
      include_email: false,
    },
    function (err, data, response) {
      if (err) {
        throw err;
      }
      console.log('Twitter authentication successful. \r\n');
    }
  );
} catch (err) {
  console.log('Error with Twitter authentication: ', err);
}

function sendTweet(tweetText) {
  try {
    T.post(
      'statuses/update',
      { status: tweetText },
      function (err, data, response) {
        if (err) {
          throw err;
        }
        console.log('Tweet sent successfully. \r\n');
      }
    );
  } catch (err) {
    console.log('Error sending tweet: ', err);
  }
}

module.exports = {
  sendTweet: sendTweet,
};
