const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers, upgrades } = require("hardhat");

describe("Upgradeable Faucet Test", function (){

    let Faucet, faucet, Faucet2, faucet2

    beforeEach(async () => {
        [owner, addr1] = await ethers.getSigners();
        
        Faucet = await ethers.getContractFactory("Faucet_V1");
        faucet = await upgrades.deployProxy(Faucet, [ethers.utils.parseEther("1.0"),3],{
            initializer: "initialize",
          });
    });

    it("should get funds from Faucet V1", async ()=>{
        await faucet.requestToken(addr1.address, 100);
        const balance = await faucet.balanceOf(addr1.address);
        console.log(balance);
        expect(await faucet.balanceOf(addr1.address)).to.equal(100);
    })

    it("should fail if amount is greater then amount allowed", async ()=>{
        
        await expect(faucet.requestToken(addr1.address, ethers.utils.parseEther("2.0"))).to.be.revertedWith("Amount not allowed");
    })

    it("should fail if exceeded timesAllowed", async ()=>{
        //first three times with loop
        [100,100,100].forEach(value => {
            faucet.requestToken(addr1.address, value)
        })    
        //last without loop for error checking 
        await expect(faucet.requestToken(addr1.address, 100)).to.be.revertedWith("You have exceeded maximum withdrawal");
    })

    it("should upgrade and increase timesAllowed ", async ()=>{
        
        Faucet2 = await ethers.getContractFactory("Faucet_V2");
        faucet = await upgrades.upgradeProxy(faucet.address, Faucet2);
        let result = await faucet.increaseTimesAllowed();

        //first four times with loop
        [100,100,100,100].forEach(value => {
            faucet.requestToken(addr1.address, value)
        })    
        //last without loop for error checking 
        await expect(faucet.requestToken(addr1.address, 100)).to.be.revertedWith("You have exceeded maximum withdrawal");

    })


})
