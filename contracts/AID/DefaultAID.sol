// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";

contract DefaultAID is
    OwnableUpgradeable,
    ERC20Upgradeable,
    ERC20BurnableUpgradeable
{
    function initialize(uint256 amount) public initializer {
        __Ownable_init();
        __ERC20Burnable_init();
        __ERC20_init("AID Token", "AID");

        _mint(msg.sender, amount * 1e18);
    }
}
