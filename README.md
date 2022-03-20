## MoarMims bot, aka AbracaMakeMeMoney, por favor

<p align="center">
  <img width="300px" height="300px" src="https://pbs.twimg.com/profile_images/1496617262253490176/uHxpN18R_400x400.jpg">
</p>

Node.js bot for alerting on MIM amounts made available on Abracadabra.money UST degenbox

An Etherscan.io API key or an Alchemy API key, (both free), will need to be acquired for ethers.js to reach out to the block chain and interact with the contract(s). Infura is another option, with a simple tweak to the provider being required.

SMS alerts in this iteration are made available through Twilio. If the user wishes to utilize these notifications, the user will need to create a Twilio account, however Twilio isn't too friendly to non US locals. If setting up a Twilio account, be sure and use a proper phone number, (not VOIP), and don't sign up for the account with a VPN activated. Not following these caveats could result in a suspended Twilio account.

Twitter notifications via tweet are issued through twit.
