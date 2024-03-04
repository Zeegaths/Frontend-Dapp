require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { SEPOLIA_ALCHEMY_RPC_U, KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: SEPOLIA_ALCHEMY_RPC_U,
      accounts: [`0x${KEY}`]
    }
  }
};