// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

contract BallotArchive{
    address public archiveAddress;
    address public archiveOwner;

    mapping(address => address[]) creators;

    mapping(address => bool) ballots;

    constructor(){
        archiveOwner = msg.sender;
        archiveAddress = address(this);
    }

    function createNewBallot(address _creator, address _ballot) external {
        creators[_creator].push(_ballot);
        ballots[_ballot] = true;
    }

    function getBallotsByCreator(address _creator) public view returns(address[] memory){
        return creators[_creator];
    }

    function getBallotByAddress(address _ballot) public view returns(address){
        return ballots[_ballot] ? _ballot : address(0);
    }

}