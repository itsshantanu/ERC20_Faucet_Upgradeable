# Upgradeable Faucet with custom ERC20 token

This project demonstrates how we can create a simple upgradeable faucet with any custom ERC20 token. Upgradeable contracts using hardhat upgrades allows to upgrade the functionality of the deployed contract using Transparent Proxy pattern.

In this we have two contracts:-

- Faucet_V1
- Faucet_V2

## How contract works:-

In this user uses the requestToken function to request the token to their address. They pass their address and amount of token needed as argument if all the condition like number of times allowed and amount allowed are satisfied then it mints the amount to the users account otherwise it reverts with an error.

## How to deploy/upgrade contract:-

### For deploying contract:- 

1. We first create a Faucet_V1 contract and define the initialize function in it. Which initializes the ERC20, Ownable, mint and variables in proxy contract and also generates proxy admin.

2. Then we create a deploy_faucetV1.js script for deploying the Faucet_V1. In this we use Hardhat Upgrades deployProxy method. For more info refer to [OpenZeppelin Hardhat Upgrades API](https://docs.openzeppelin.com/upgrades-plugins/1.x/api-hardhat-upgrades).

3. Once deployed we get three contracts:- 
   - Transparent Upgradeable Proxy
   - Proxy Admin
   - Faucet_V1
   
   We need to verify the Faucet_V1 contact using hardhat: 
   ```
   npx hardhat verify --network <network name> <contract address>
   ```

4. Then we need to go to polygon scan and open Transparent Upgradeable Proxy and go to contract tab -> more options menu -> and click Is this a proxy? and click verify and save for the proxy contract prefilled, one can also change it if needed.

Now we can access the contract from Faucet_V1 and read all the variables that are initialized from the Transparent Upgradeable Proxy contract.

### For upgrading contract:- 

1. We first create a Faucet_V2 contract but this time we don't need to write initialize function. Add any functionality wanted.

2. Then we create a upgrade_faucet.js script for deploying the Faucet_V2. In this we use Hardhat Upgrades upgradeProxy method with proxy contract address as the argument. For more info refer to [OpenZeppelin Hardhat Upgrades API](https://docs.openzeppelin.com/upgrades-plugins/1.x/api-hardhat-upgrades).

3. Once Upgraded we get two contracts:- 
   - Proxy Admin
   - Faucet_V2

   We need to verify the Faucet_V2 contact using hardhat: 
   ```
   npx hardhat verify --network <network name> <contract address>
   ```
4. Then we need to go to polygon scan and open Transparent Upgradeable Proxy and go to contract tab -> more options menu -> and click Is this a proxy? and click verify and save for the proxy contract prefilled for the new contract deployed.

Now we can call the functions in Faucet_V2 and see the update's in Transparent Upgradeable Proxy contract.

This is how we upgrade the contracts.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```
    MATIC_API_URL = "https://polygon-mumbai.g.alchemy.com/v2/YOUR_API_KEY"
    SCAN_API_KEY = "YOUR-POLYGON-SCAN-API_KEY"
    PRIVATE_KEY = "YOUR-METAMASK-PRIVATE_KEY"
```

## NPM Packages:

 - [Openzeppelin](https://docs.openzeppelin.com/)
 - [OpenZeppelin Hardhat Upgrades API](https://docs.openzeppelin.com/upgrades-plugins/1.x/api-hardhat-upgrades)
 - [Hardhat Upgrades](https://www.npmjs.com/package/@openzeppelin/hardhat-upgrades)
 - [Hardhat Ethers](https://www.npmjs.com/package/hardhat-ethers)
 - [Chai](https://www.npmjs.com/package/chai)
 - [Ethers](https://www.npmjs.com/package/ethers)
 - [ethereum-waffle](https://www.npmjs.com/package/ethereum-waffle)
 - [dotenv](https://www.npmjs.com/package/dotenv)

## Tech Stack:
 - [Node](https://nodejs.org/en/)
 - [Hardhat](https://hardhat.org/tutorial/)
 - [Solidity](https://docs.soliditylang.org/en/v0.8.13)


## Run Locally:

Clone the github repo:
```
https://github.com/itsshantanu/ERC20_Faucet_Upgradeable.git
```

Install Node Modules
```
npm install
```

Compile
```
npx hardhat compile
```

Test
```
npx hardhat test
```

Deploy on Localhost
```
npx hardhat node
npx hardhat run scripts/deploy_faucetV1.js --network localhost
```

Upgrade on Localhost
```
npx hardhat node
npx hardhat run scripts/upgrade_faucet.js --network localhost
```

Deploy on Mumbai Testnet
```
npx hardhat run scripts/deploy_faucetV1.js --network mumbai
```

Help
```
npx hardhat help
```

## Check at Polygon Mumbai Test Net:
 - [Faucet_V1](https://mumbai.polygonscan.com/address/0xe6725eead86ed6139d99940fb15c84813608781b)
 - [Proxy Admin](https://mumbai.polygonscan.com/address/0xf262b95ddc2da5738c842b7cd39c51889717696f)
 - [Faucet_V2](https://mumbai.polygonscan.com/address/0x8b85f1720a7e143e056ead2d1d2ace8d68590e57)
 - [Upgrade on Proxy admin](https://mumbai.polygonscan.com/address/0xf262b95ddc2da5738c842b7cd39c51889717696f)
 - [Transparent Upgradeable Proxy](https://mumbai.polygonscan.com/address/0xf9f98d77356ae2c5387ae417cc3512fb26a10724#code)
