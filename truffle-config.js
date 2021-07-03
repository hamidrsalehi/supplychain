require('./client/node_modules/dotenv').config();
const path = require("path");
const HDWalletProvider = require('@truffle/hdwallet-provider');
var mnemonic = process.env.MNEMONIC;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "wss://rinkeby.infura.io/ws/v3/8b0faa13300946fabe9e480c21995e95");
      },
      network_id: '4',
      networkCheckTimeout: 1000000,
      timeoutBlocks: 200,
      addressIndex: 2
    }
  },
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  }
};
