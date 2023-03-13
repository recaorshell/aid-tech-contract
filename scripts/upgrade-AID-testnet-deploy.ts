import {ethers, upgrades} from "hardhat";
import * as fs from "fs";

async function main() {
    const deployedProxyAddress = fs.readFileSync(
        "./deployed/testnet-aid-proxy.txt",
        {
            encoding: "utf8",
        }
    );
    console.log("AID Contract Proxy Address: " + deployedProxyAddress);

    const UpgradedAIDV2 = await ethers.getContractFactory("AID");

    console.log("Upgrading AID Contract to V2...");

    await upgrades.upgradeProxy(deployedProxyAddress, UpgradedAIDV2);
    console.log("AID Proxy upgraded");
}

main();
