import axios from 'axios';
import { ethers } from 'ethers';

import ETHERSCAN_ENDPOINT from '.././config/constants';
import ETH_MIM_ADDRESS from '.././config/constants';
import ETH_CAULDRONV2_ADDRESS from '.././config/constants';
import ALCHEMY_ENDPOINT from '.././config/constants';

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

export async function askCauldronForBalance() {}
