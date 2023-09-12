import { expect } from "chai";
import { ethers } from "hardhat";
import { DegenToken } from "../typechain-types";

describe("DegenToken Contract", () => {
    let degenContract: DegenToken;
    let owner: any;
    let addr1: any;
    let addr2: any;

    before(async () => {
        [owner, addr1, addr2] = await ethers.getSigners();

        const DegenToken = await ethers.getContractFactory("DegenToken");
        // degenContract = ethers.getContractAt("DegenToken", "0xCAb2F0Fd73d7eE3e024d122774331A1207f726a4", owner);
        // degenContract = await ethers.getContractAt("DegenToken", "0x100Fe89E27ED155C8098264b8E57c57f6249C653", owner);
        degenContract = await DegenToken.deploy();
        await degenContract.waitForDeployment();

        console.log("Contract address : ",await degenContract.getAddress());

    });

    afterEach(async ()=>{
        let ownerBalance = await degenContract.balance();
        // let addr1Balance = await degenContract.connect(addr1).balance()
        // let addr2Balance = await degenContract.connect(addr2).balance()

        if (ownerBalance > 0) {
            await degenContract.burnTokens(ownerBalance);
        }
        // if (addr1Balance > 0) {
        //     await degenContract.connect(addr1).burnTokens(addr1Balance);
        // }
        // if (addr2Balance > 0) {
        //     await degenContract.connect(addr2).burnTokens(addr2Balance);
        // }
    })

    function delay(ms?: number){
        return new Promise((resolve, reject) => setTimeout(() => { resolve(void 0) }, ms));
    }

    it("Mint Check", async function () {
        const mintAmount = 1000;
        await degenContract.mint(owner.address, mintAmount);
        
        await delay(5000);

        const balance = await degenContract.balance();
        expect(balance).to.equal(mintAmount);
    })

    it("Transfer Check", async function () {
        const mintAmount = 1000;

        await degenContract.mint(owner.address, mintAmount);
        await degenContract.transferTokens(addr2.address, mintAmount);

        await delay(5000);

        expect(await degenContract.balance()).to.equal(0);
        expect(await degenContract.connect(addr2).balance()).to.equal(mintAmount);
    })

    it("Redeem Rewards Check", async function () {
        const mintAmount = 1000;
        const redeemAmount = 500;
        const message = "Purchased items #001"

        degenContract.on(degenContract.getEvent("Purchase"), async (addr: string, amount: bigint, message: string) => {
            expect(addr).to.equal(owner.address);
            expect(amount).to.equal(redeemAmount);
            expect(message).to.equal(message);
        })

        await degenContract.mint(owner.address, mintAmount);

        await delay(5000);

        expect(await degenContract.balance()).to.equal(mintAmount);

        await degenContract.redeemAsset(redeemAmount, message);

        await delay(5000);

        expect(await degenContract.balance()).to.equal(mintAmount - redeemAmount);
    })

    it("Burn tokens Check", async function () {

        const mintAmount = 1000;
        const burnAmount = 500;

        await degenContract.mint(owner.address, mintAmount);

        await delay(5000);

        expect(await degenContract.balance()).to.equal(mintAmount);

        await degenContract.burnTokens(burnAmount);

        await delay(5000);

        expect(await degenContract.balance()).to.equal(mintAmount - burnAmount);

    })

})

// 3000000000000000
// 7740225000000000