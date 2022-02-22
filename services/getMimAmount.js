const ethers = require("ethers");

const config = require("../config");

const provider = new ethers.getDefaultProvider("homestead", {
  etherscan: config.etherscan.apiKey,
  alchemy: config.alchemy.apiKey,
});

const bentoBoxContract = new ethers.Contract(
  config.contracts.ethBentoBox,
  config.contractABIs.ethBentoBoxABI,
  provider
);

async function askBentoBoxBalance() {
  const mimBalanceHex = await bentoBoxContract.balanceOf(
    config.contracts.ethMim,
    config.contracts.ethCauldronV2
  );

  const mimBalance = ethers.utils.formatEther(mimBalanceHex.toString(), "wei");

  return mimBalance;
}

module.exports = {
  askBentoBoxBalance: askBentoBoxBalance,
};
