require('babel-register');
require('babel-polyfill');

// const {  mnemonic } = require('./secrets.json'); //projectId,
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
     },
    // ropsten: {
    //   provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${projectId}`),
    //   network_id: 3,       // Ropsten's id
    //   gas: 5500000,        // Ropsten has a lower block limit than mainnet
    //   confirmations: 2,    // # of confs to wait between deployments. (default: 0)
    //   timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
    //   skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    // },
    // ropsten: {
    //   provider: function() {
    //     return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/your-api-key");
    //   },
    //   network_id: 3,
    //   gasPrice: 20000000000,
    //   gas: 3716887
    // },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider("orchard enlist fringe just praise dignity spatial zone fiscal trumpet base oblige", "https://rinkeby.infura.io/v3/2abc36c951364f55a455e518555d68b9");
      },
      network_id: 4,
      gasPrice: 20000000000,
      gas: 3716887
    }
    // ,
    // kovan: {
    //   provider: function() {
    //     return new HDWalletProvider(mnemonic, "https://kovan.infura.io/your-api-key");
    //   },
    //   network_id: 42,
    //   gasPrice: 20000000000,
    //   gas: 3716887
    // },
    // main: {
    //   provider: function() {
    //     return new HDWalletProvider(mnemonic, "https://mainnet.infura.io/your-api-key");
    //   },
    //   network_id: 1,
    //   gasPrice: 20000000000, // 20 GWEI
    //   gas: 3716887    // gas limit, set any number you want
    // }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}






