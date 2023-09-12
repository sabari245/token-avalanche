import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const FORK_FUJI = true
const FORK_MAINNET = false
let forkingData = undefined;

if (FORK_MAINNET) {
  forkingData = {
    url: 'https://api.avax.network/ext/bc/C/rpcc',
  }
}
if (FORK_FUJI) {
  forkingData = {
    url: 'https://api.avax-test.network/ext/bc/C/rpc',
  }
}


const config: HardhatUserConfig = {
    solidity: "0.8.18",
  networks: {
    hardhat: {
      gasPrice: 225000000000,
      // chainId: !forkingData ? 43112 : undefined, //Only specify a chainId if we are not forking
      forking: forkingData,
      mining: {
        auto: false,
        interval: 2000,
      }
    },
    fuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      gasPrice: 225000000000,
      chainId: 43113,
      accounts: [
        "4cd9b8db8d2c37876f57c6e1b5c2540c65fecf8ad7b68f09ab45359d9f3d591d",
        "21f1e9f05c09604fb6f514f5e57f88e6023fdfecdc348f94269fa7a0d7c2271e",
        "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
      ]
    },
    mainnet: {
      url: 'https://api.avax.network/ext/bc/C/rpc',
      gasPrice: 225000000000,
      chainId: 43114,
      accounts: [
        // "YOUR PRIVATE KEY HERE"
      ]
    }
  },
  etherscan: {
    apiKey: "TZ4CNIFXWBF5Z5JT7CH66ATNAIHWWR94YD",
  }
};

export default config;