require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');
require('dotenv').config();

const { MATIC_API_URL, PRIVATE_KEY, SCAN_API_KEY } =
  process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.9',
  networks: {
    hardhat: {
      cahinId: 1337
    },
    mumbai: {
      url: MATIC_API_URL,
      accounts: [PRIVATE_KEY],
    }
    // polygonscan: {
    //   url: "https://api-testnet.polygonscan.com",
    //   accounts: [PRIVATE_KEY],
    // }
  },
  etherscan: {
    apiKey: SCAN_API_KEY,
  },
};