require('dotenv').config();
const express = require('express');

const config = require('./config/config');
const db = require('knex')({
  client: 'pg',
  connection: {
    connectionString: config.db.connectionString,
  },
});
const { watchContractForMoreMim } = require('./services/pollContracts');
const app = express();
const port = config.app.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// begin polling interval
watchContractForMoreMim();
