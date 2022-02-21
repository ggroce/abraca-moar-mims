const ethers = require("ethers");
const cauldronABI = require("./cauldronV2ABI.json");
const bentoBoxABI = require("./bentoBoxABI.json");

const {
  ETH_MIM_ADDRESS,
  ETH_CAULDRONV2_ADDRESS,
  ETH_BENTOBOX_ADDRESS,
} = require("../config/constants");

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

const provider = new ethers.getDefaultProvider("homestead", {
  etherscan: ETHERSCAN_API_KEY,
  alchemy: ALCHEMY_API_KEY,
});

const bentoBoxContract = new ethers.Contract(
  ETH_BENTOBOX_ADDRESS,
  bentoBoxABI,
  provider
);

async function askBentoBoxBalance() {
  const mimBalanceHex = await bentoBoxContract.balanceOf(
    ETH_MIM_ADDRESS,
    ETH_CAULDRONV2_ADDRESS
  );

  const mimBalance = ethers.utils.formatEther(mimBalanceHex.toString(), "wei");

  return mimBalance;
}

module.exports = {
  askBentoBoxBalance: askBentoBoxBalance,
};
