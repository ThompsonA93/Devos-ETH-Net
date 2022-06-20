// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

/**
 * @dev Interface to call functionality of archive smart contract
 */
interface IBallotArchive {
    function createNewBallot(address _creator, address _ballot) external;
}

/**
 * @title BallotOpen
 * @author ThompsonA93
 * @notice Stores information on a single ballot. Anyone may cast a vote
 * @dev Dependant on primary smart contract "BallotArchive", @see constructor()
 */
contract BallotOpenV3{
    string public archiveAddress;
    string public creator;
    string public ballotAddress;
    string public title;
    string public metainfo;

    // Refactoring of values majorly unbeneficial due checks
    uint public startTime;
    uint public endTime;
    uint public totalVotes = 0;
    uint public proVotes = 0;

    /**
     * @dev map voters to given votes.
     * 0 - Has not voted
     * 1 - Has voted 'No'
     * 2 - Has voted 'Yes'
     */
    mapping(address => uint8) public votes;

    /**
     * @param _archiveAddress On-Chain location of Archive smart contract. See: "./BallotArchive.sol"
     * @param _title as ballot title
     * @param _metainfo as information on the ballot
     * @param _votingDays as time limit to cast votes.
     * TODO:: Aggregate votes on expiration
     * TODO:: Check if saving archiveAddress is necessary
     */
    constructor(address _archiveAddress, string memory _title, string memory _metainfo, uint _votingDays){
        archiveAddress = toAsciiString(_archiveAddress);
        creator = toAsciiString(msg.sender);
        ballotAddress = toAsciiString(address(this));

        title = _title;
        metainfo = _metainfo;
        startTime = block.timestamp;
        endTime = startTime + (_votingDays * 1 days);

        IBallotArchive(_archiveAddress).createNewBallot(msg.sender, address(this));
    }

    /**
     * @dev modifier requiring that given address has not passed any votes yet
     */
    modifier hasNotVoted(address _voter){
        require(votes[_voter] != 1 && votes[_voter] != 2);
        _;
    }

    /**
     * @dev modifier requiring that following code is only executed within given time limit
     */
    modifier validVotingTime(){
        require(block.timestamp < endTime);
        _;
    }

    /**
     * @dev casts a vote given modifiers and increments voting counts
     * @param _choice as 1 (No) or 2 (Yes). 
     */
    function vote(uint8 _choice) public validVotingTime() hasNotVoted(msg.sender){        
        votes[msg.sender] = _choice;
        if(_choice == 2){ proVotes += 1; }
        totalVotes += 1;
    }

    function getBallotInformation() public view returns (string[8] memory){

    }

    function toAsciiString(address x) internal pure returns (string memory) {
        bytes memory s = new bytes(40);
        for (uint i = 0; i < 20; i++) {
            bytes1 b = bytes1(uint8(uint(uint160(x)) / (2**(8*(19 - i)))));
            bytes1 hi = bytes1(uint8(b) / 16);
            bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
            s[2*i] = char(hi);
            s[2*i+1] = char(lo);            
        }
        return string(s);
    }

    function char(bytes1 b) internal pure returns (bytes1 c) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    }

    // TODO Refactor: This is Openzeppelin's String-Contract
    function uintToString(uint256 value) internal pure returns (string memory) {
        // Inspired by OraclizeAPI's implementation - MIT licence
        // https://github.com/oraclize/ethereum-api/blob/b42146b063c7d6ee1358846c198246239e9360e8/oraclizeAPI_0.4.25.sol

        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}