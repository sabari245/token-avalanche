// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DegenToken is ERC20, Ownable {
    constructor() ERC20("Degen", "DGN") {}

    event Purchase(address indexed buyer, uint256 amount, string message);

    modifier positiveAmount(uint256 amount) {
        require(amount > 0, "Amount has to be greater than 0 wei");
        _;
    }

    modifier hasBalance(uint256 amount) {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        _;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function transferTokens(
        address to,
        uint256 amount
    ) public positiveAmount(amount) hasBalance(amount) {
        _transfer(msg.sender, to, amount);
    }

    function redeemAsset(
        uint256 amount,
        string memory message
    ) public positiveAmount(amount) hasBalance(amount) {
        _burn(msg.sender, amount);
        emit Purchase(msg.sender, amount, message);
    }

    function balance() public view returns (uint256) {
        return balanceOf(msg.sender);
    }

    function burnTokens(
        uint256 amount
    ) public positiveAmount(amount) hasBalance(amount) {
        _burn(msg.sender, amount);
    }
}
