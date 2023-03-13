import {ethers, network, upgrades} from "hardhat";

import * as fs from "fs";

async function main() {
    var dir = "./deployed";

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    // Obtain reference to contract and ABI.
    const DefaultAIDContract = await ethers.getContractFactory("DefaultAID");
    console.log("DefaultAID Contract is deploying to ", network.name);

    //  Deploy logic contract using the proxy pattern.
    const DefaultAIDContract_ = await upgrades.deployProxy(
        DefaultAIDContract,

        //Since the logic contract has an initialize() function
        // we need to pass in the arguments to the initialize()
        // function here.
        [50000000],

        // We don't need to expressly specify this
        // as the Hardhat runtime will default to the name 'initialize'
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
