// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract Faucet_V2 is Initializable, ERC20Upgradeable, OwnableUpgradeable {

    using Counters for Counters.Counter;
    Counters.Counter private _withdrawlCount;

    uint public amountAllowed;
    uint public timesAllowed;


    mapping(address => uint) public count;

    function requestToken (address _requestor, uint amount) external {

        require(count[msg.sender] < timesAllowed, "You have excedeed maximum withdrawl");

        require(amount < amountAllowed, "Amount not allowed");

        _mint(_requestor, amount);

        _withdrawlCount.increment();

        count[msg.sender] = _withdrawlCount.current();
    }

    function increaseTimesAllowed () external {

        timesAllowed += 1; 
    }

}