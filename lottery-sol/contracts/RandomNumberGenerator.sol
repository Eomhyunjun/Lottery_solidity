// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RandomNumberGenerator {
    function generateRandomNumber(uint seed) public view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, seed))) % 45 + 1;
    }
}