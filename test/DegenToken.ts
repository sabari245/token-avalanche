import { expect } from "chai";
import { ethers } from "hardhat";

describe("DegenToken Contract", () => {

    async function deployStorage() {
        const [owner, addr1, addr2] = await ethers.getSigners();

        const degenContract = await ethers.deployContract("DegenToken");
        await degenContract.waitForDeployment();

        return { degenContract, owner, addr1, addr2 };
    }

    it("Mint Check", async function () {

        const { degenContract, addr1 } = await deployStorage();

        const mintAmount = ethers.parseEther("1");
        await degenContract.mint(addr1.address, mintAmount);

        expect(await degenContract.connect(addr1).balance()).to.equal(mintAmount);
    })
})