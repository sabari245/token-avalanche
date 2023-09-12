# Degen Token

This is a simple implementation of a token for a decentralized game powered by Avalanche blockchain. This token can be used to purchase in game assets, redeem rewards and so on. You can check the contract in the ```contracts``` directory and the test is written inside the ```test``` folder. This is a sample project submitted as a part of Metacrafters Assignment

## hardhat configuration

This project has been configured to work with avalanche network. The default settings will fork the fuji testnet of avalance and the localnet of development has a 2 seconds block mining delay. Kindly, set the private keys before development.

```shell
npm run node
```

> note that this will create a different set of wallets every single time. So the wallet has to be configured before every use. to get around this use some other test nets

To run the test scripts run the following command

```shell
npm run test
```

To test the contract on the fuji testnet

```shell
npm run test-fuji
```

## DISCLAIMER

DO NOT USE THIS PROJECT FOR PRODUCTION.
