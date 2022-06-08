// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

/**
 * @title BallotArchive
 * @author ThompsonA93
 * @notice Stores ballots and their creators in form of mappings
 * @dev Storing data by external smart contract calls.
 */
contract BallotArchive_native{
    address public archiveAddress;
    address public archiveOwner;

    /**
     * @dev Map a creators address to all his deployed ballots
     */
    mapping(address => address[]) creators;

    /**
     * @dev If the address was ever saved (true), return the address. Preferable than maintaining a sorted array.
     */
    mapping(address => bool) ballots;

    /**
     * @dev Setup contract with ownership. TODO -- May be relevant later
     */
    constructor(){
        archiveOwner = msg.sender;
        archiveAddress = address(this);
    }

    /**
     * @param _creator as specified wallet ID
     * @param _ballot as specified smart contract address
     */
    function createNewBallot(address _creator, address _ballot) external {
        creators[_creator].push(_ballot);
        ballots[_ballot] = true;
    }

    /**
     * @param _creator wallet id to scan for
     * @return address[] as set of deployed contracts from _creator
     */
    function getBallotsByCreator(address _creator) public view returns(address[] memory){
        return creators[_creator];
    }

    /**
     * @param _ballot smart contract to scan for
     * @return address of deployed contract or null-address
     */
    function getBallotByAddress(address _ballot) public view returns(address){
        return ballots[_ballot] ? _ballot : address(0);
    }

}