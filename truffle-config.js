require('dotenv').config()

const HDWalletProvider = require('@truffle/hdwallet-provider')
const private_keys = [
  process.env.PRIVATE_KEY_1
];


module.exports = {
  networks: {
    // Localhost-Context, f.ex. ganache-cli suite
    dev: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },

    // Rinkeby-Context. TODO Setup Infura-Node
    rinkeby: {
      provider: () => new HDWalletProvider({
        privateKeys: private_keys,
        providerOrUrl: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
        numberOfAddresses: 1
      }),
      network_id: 4,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.11",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },
};
