const { ethers, upgrades } = require("hardhat");

async function main() {
  const Faucet = await ethers.getContractFactory("Faucet_V1");
  console.log("Deploying Faucet...");
  const faucet = await upgrades.deployProxy(Faucet, [ethers.utils.parseEther("1.0"),3],{
    initializer: "initialize",
  });
  await faucet.deployed();
  console.log("Contract deployed to:", faucet.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

