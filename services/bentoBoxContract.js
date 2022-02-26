const ethers = require('ethers');

const config = require('../config/config');

const provider = new ethers.getDefaultProvider('homestead', {
  etherscan: config.etherscan.apiKey,
  alchemy: config.alchemy.apiKey,
});

const bentoBoxContract = new ethers.Contract(
  config.contracts.ethBentoBox,
  config.contractABIs.ethBentoBoxABI,
  provider
);

async function getBentoBoxBalance() {
  try {
    const mimBalanceHex = await bentoBoxContract.balanceOf(
      config.contracts.ethMim,
      config.contracts.ethCauldronV2
    );
    const mimBalance = Number(
      ethers.utils.formatEther(mimBalanceHex.toString(), 'wei')
    );
    return Number(mimBalance.toFixed(2));
  } catch (err) {
    console.log('Error getting mim balance: ', err);
  }
}

module.exports = {
  getBentoBoxBalance: getBentoBoxBalance,
};
