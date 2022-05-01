// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

interface IBallotArchive {
    function createNewBallot(address _creator, address _ballot) external;
}

contract BallotOpen{
    address public archiveAddress;

    address public creator;
    address public ballotAddress;

    string public title;
    string public metainfo;
    uint public startTime;
    uint public endTime;
    
    uint public totalVotes = 0;
    uint public proVotes = 0;

    // 0 - Has not voted
    // 1 - Has voted 'No'
    // 2 - Has voted 'Yes'
    mapping(address => uint8) public votes;

    constructor(address _archiveAddress, string memory _title, string memory _metainfo, uint _votingDays){
        archiveAddress = _archiveAddress;

        creator = msg.sender;
        ballotAddress = address(this);

        title = _title;
        metainfo = _metainfo;
        startTime = block.timestamp;
        endTime = startTime + (_votingDays * 1 days);

        IBallotArchive(archiveAddress).createNewBallot(creator, ballotAddress);
    }

    modifier hasNotVoted(address _voter){
        require(votes[_voter] != 1 && votes[_voter] != 2);
        _;
    }

    modifier validVotingTime(){
        require(block.timestamp < endTime);
        _;
    }

    function vote(uint8 _choice) public validVotingTime() hasNotVoted(msg.sender){        
        votes[msg.sender] = _choice;
        if(_choice == 2){ proVotes += 1; }
        totalVotes += 1;
    }


}