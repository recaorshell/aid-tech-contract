import {ethers, network, upgrades} from "hardhat";

import * as fs from "fs";

async function main() {
    var dir = "./deployed";

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    const DefaultAIDContract = await ethers.getContractFactory("DefaultAID");
    console.log("DefaultAID Contract is deploying to ", network.name);

    const DefaultAIDContract_ = await upgrades.deployProxy(
        DefaultAIDContract,
        [50000000],
        {initializer: "initialize"}
    );
    await DefaultAIDContract_.deployed();
    await fs.writeFileSync(
        `${dir}/testnet-aid-proxy.txt`,
        DefaultAIDContract_.address
    );

    console.log(
        "DefaultAID Contract deployed to:",
        DefaultAIDContract_.address
    );
}

main();
