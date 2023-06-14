// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

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
contract BallotOpen is ChainlinkClient {
    using Chainlink for Chainlink.Request;

    address private immutable oracle;
    bytes32 private immutable jobId;
    uint256 private immutable fee;

    struct Ballot {
        address archiveAddress;
        address creator;
        address ballotAddress;
        string title;
        string metainfo;
        uint startTime;
        uint endTime;
        uint totalVotes;
        uint proVotes;
    }
    Ballot ballot;

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
     */
    constructor(address _archiveAddress, string memory _title, string memory _metainfo, uint _votingDays, address _oracle, bytes32 _jobId, uint256 _fee, address _link) {
        ballot = Ballot(
            _archiveAddress,
            msg.sender,
            address(this),
            _title,
            _metainfo,
            block.timestamp,
            block.timestamp + (_votingDays * 1 days),
            0,
            0
        );

        IBallotArchive(ballot.archiveAddress).createNewBallot(
            ballot.creator,
            ballot.ballotAddress
        );

        if (_link == address(0)) {
            setPublicChainlinkToken();
        } else {
            setChainlinkToken(_link);
        }
        oracle = _oracle;
        jobId = _jobId;
        fee = _fee;
    }

    /**
     * @dev modifier requiring that given address has not passed any votes yet
     */
    modifier hasNotVoted(address _voter) {
        require(votes[_voter] != 1 && votes[_voter] != 2);
        _;
    }

    /**
     * @dev modifier requiring that following code is only executed within given time limit
     */
    modifier validVotingTime() {
        require(block.timestamp < ballot.endTime);
        _;
    }


    /**
     * @dev casts a vote given modifiers and increments voting counts
     * @param _choice as 1 (No) or 2 (Yes).
     */
    function vote(
        uint8 _choice
    ) public validVotingTime hasNotVoted(msg.sender) {
        votes[msg.sender] = _choice;
        if (_choice == 2) {
            ballot.proVotes += 1;
        }
        ballot.totalVotes += 1;
    }

    /**
     * @return Every field of the Struct as object value
     * @dev To replace oneday to return struct
     */
    function getFullBallotInformation()
        public
        view
        returns (
            address,
            address,
            address,
            string memory,
            string memory,
            uint,
            uint,
            uint,
            uint
        )
    {
        return (
            ballot.archiveAddress,
            ballot.creator,
            ballot.ballotAddress,
            ballot.title,
            ballot.metainfo,
            ballot.startTime,
            ballot.endTime,
            ballot.totalVotes,
            ballot.proVotes
        );
    }






















    /**
     * @notice Creates a Chainlink request to retrieve API response, find the target
     * data, then multiply by 1000000000000000000 (to remove decimal places from data).
     *
     * @return requestId - id of the request
     */
    function requestVolumeData() public returns (bytes32 requestId) {
        Chainlink.Request memory request = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        // Set the URL to perform the GET request on
        request.add(
            "get",
            "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD"
        );

        request.add("path", "RAW,ETH,USD,VOLUME24HOUR"); // Chainlink nodes 1.0.0 and later support this format

        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }
    
    function fulfill(
        bytes32 _requestId,
        uint256 _value
    ) public recordChainlinkFulfillment(_requestId) {
        emit eligibilityFulfilled(_value);
    }

    event eligibilityFulfilled(uint eligible);
}
