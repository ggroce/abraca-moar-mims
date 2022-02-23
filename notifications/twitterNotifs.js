const Twit = require('twit');
const config = require('../config/config');

const T = new Twit({
  consumer_key: config.twitter.consumerKey,
  consumer_secret: config.twitter.consumerSecret,
  access_token: config.twitter.accessToken,
  access_token_secret: config.twitter.accessTokenSecret,
});

T.get(
  'account/verify_credentials',
  {
    include_entities: false,
    skip_status: true,
    include_email: false,
  },
  function (err, data, response) {
    if (err) {
      console.log('Error with Twitter credentials, cannot login: ', err);
    } else {
      console.log(
        'Successfully logged into Twitter account: ',
        data.screen_name
      );
    }
  }
);

function sendTweet(tweetText) {
  T.post(
    'statuses/update',
    { status: tweetText },
    function (err, data, response) {
      if (err) {
        console.log('Error sending tweet: ', err);
      } else {
        console.log('Successfully sent tweet: ', data.text);
      }
    }
  );
}

module.exports = {
  sendTweet: sendTweet,
};
