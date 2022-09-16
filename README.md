# Upgradeable Faucet with custom ERC20 token

This project demonstrates how we can create a simple upgradeable faucet with any custom ERC20 token. Upgradeable contracts using hardhat upgrades allows to upgrade the functionality of the deployed contract using Transparent Proxy pattern.

In this we have two contracts:-

- Faucet_V1
- Faucet_V2

## How to deploy contract:-

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



Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
GAS_REPORT=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
