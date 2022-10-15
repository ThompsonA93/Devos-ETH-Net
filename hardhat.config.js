require("@nomicfoundation/hardhat-toolbox");

const dotenv = require("dotenv");
dotenv.config();


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    dev: {
      url: "http://127.0.0.1:8545/",
    },
    goerli: {
      url: process.env.GOERLI_RPC_URL,
      accounts: [process.env.LOCAL_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  mocha: {
    timeout: 3600000, // 1 Hour max
  },
};
