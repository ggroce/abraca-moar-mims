const config = {
  app: {
    port: 38000,
    contractQueryInterval: 20000,
  },
  db: {
    connectionString: process.env.DEV_DATABASE_URL,
  },
  contracts: {
    ethMim: '0x99D8a9C45b2ecA8864373A26D1459e3Dff1e17F3',
    ethCauldronV2: '0x59E9082E068Ddb27FC5eF1690F9a9f22B32e573f',
    ethBentoBox: '0xd96f48665a1410C0cd669A88898ecA36B9Fc2cce',
  },
  contractABIs: {
    ethBentoBoxABI: require('./bentoBoxABI.json'),
    ethCauldronV2ABI: require('./cauldronV2ABI.json'),
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
    endpoint: 'https://api.etherscan.io/api',
  },
  alchemy: {
    apiKey: process.env.ALCHEMY_API_KEY,
    endpoint: 'https://eth-mainnet.alchemyapi.io/v2/',
  },
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    fromNumber: process.env.TWILIO_PHONE_NUMBER,
    subscriberNumber: process.env.SUBSCRIBER_PHONE_NUMBER,
  },
  twitter: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  },
};

module.exports = config;
