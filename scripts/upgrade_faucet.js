const { ethers, upgrades } = require("hardhat");

const PROXY =  "0xf9f98D77356ae2c5387AE417cC3512Fb26a10724";

async function main () {

    const Faucet_V2 = await ethers.getContractFactory("Faucet_V2");
    await upgrades.upgradeProxy(PROXY, Faucet_V2);
    console.log("Faucet Upgraded");

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});