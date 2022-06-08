const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

// Archive-Node required as dependency given smart contract construction
describe("BallotOpenNativeTest", function () {
  const zero_address = '0x00000000000000000000000000000000000000000';

  it('Deploy archive onto chain', async function(){
    const BallotArchive_native = await hre.ethers.getContractFactory("BallotArchive_native");
    const ballotArchive = await BallotArchive_native.deploy();
    const ballotArchiveContract = await ballotArchive.deployed();
    assert(ballotArchiveContract.address !== '', "Expected non-null address on deployment, got \'\'");
});  
it('Write and read singular OpenBallot', async function(){
    const BallotArchive_native = await hre.ethers.getContractFactory("BallotArchive_native");
    const ballotArchive = await BallotArchive_native.deploy();
    const ballotArchiveContract = await ballotArchive.deployed();
        
    // Create new Ballot Contract
    _archiveAddress = ballotArchiveContract.address;
    _title = "My First Ballot";
    _metainfo = "Lorem Ipsum";
    _votingDays = 30;

    const BallotOpen_native = await hre.ethers.getContractFactory("BallotOpen_native");
    const ballotOpen = await BallotOpen_native.deploy(_archiveAddress, _title, _metainfo, _votingDays);
    const ballotOpenContract = await ballotOpen.deployed();

    // Read expected information from chain
    var storedTitle = await ballotOpenContract.title.call();
    assert(storedTitle === _title, "Stored Title was not equal given Title");

    var storedMetainfo = await ballotOpenContract.metainfo.call();
    assert(storedMetainfo === _metainfo, "Stored MetaInfo was not equal given MetaInfo");

    var storedStartTime = await ballotOpenContract.startTime.call();
    assert(storedStartTime !== 0, "Stored StartTime was Zero"); 

    var storedEndTime = await ballotOpenContract.endTime.call();
    assert(storedEndTime !== 0, "Stored EndTime was Zero");

    var storedTotalVotes = await ballotOpenContract.totalVotes.call();
    assert(storedTotalVotes == 0, "Stored TotalVotes was not zero");
    
    var storedProVotes = await ballotOpenContract.proVotes.call();
    assert(storedProVotes == 0, "Stored ProVotes was not zero");
    });

    it('Pass singular vote', async function(){
        const BallotArchive_native = await hre.ethers.getContractFactory("BallotArchive_native");
        const ballotArchive = await BallotArchive_native.deploy();
        const ballotArchiveContract = await ballotArchive.deployed();
                    
        // Create new Ballot and deploy to chain
        _archiveAddress = ballotArchiveContract.address;
        _title = "My First Ballot";
        _metainfo = "Lorem Ipsum";
        _votingDays = 30;

        
        const BallotOpen_native = await hre.ethers.getContractFactory("BallotOpen_native");
        const ballotOpen = await BallotOpen_native.deploy(_archiveAddress, _title, _metainfo, _votingDays);
        const ballotOpenContract = await ballotOpen.deployed();

        // Invoke vote
        await ballotOpenContract.vote(2);
        
        // Read expected voting information
        var storedTotalVotes = await ballotOpenContract.totalVotes.call();
        assert(storedTotalVotes == 1, "Stored TotalVotes was not one but instead " + storedTotalVotes);
        
        var storedProVotes = await ballotOpenContract.proVotes.call();
        assert(storedProVotes == 1, "Stored ProVotes was not one but instead " + storedProVotes);
    });

    it('Pass multiple votes, single voter (expected: revert)', async function(){
        const BallotArchive_native = await hre.ethers.getContractFactory("BallotArchive_native");
        const ballotArchive = await BallotArchive_native.deploy();
        const ballotArchiveContract = await ballotArchive.deployed();
                            
        // Create new Ballot and deploy to chain
        _archiveAddress = ballotArchiveContract.address;
        _title = "My First Ballot";
        _metainfo = "Lorem Ipsum";
        _votingDays = 30;
        
        const BallotOpen_native = await hre.ethers.getContractFactory("BallotOpen_native");
        const ballotOpen = await BallotOpen_native.deploy(_archiveAddress, _title, _metainfo, _votingDays);
        const ballotOpenContract = await ballotOpen.deployed();

        // Invoke double voting (forbidden)
        await ballotOpenContract.vote(1);

        await expect(ballotOpenContract.vote(2)).to.be.reverted;
    
    });

    it('Pass single votes, multiple voters', async function(){
        const BallotArchive_native = await hre.ethers.getContractFactory("BallotArchive_native");
        const ballotArchive = await BallotArchive_native.deploy();
        const ballotArchiveContract = await ballotArchive.deployed();

        _archiveAddress = ballotArchiveContract.address;
        _title = "My First Ballot";
        _metainfo = "Lorem Ipsum";
        _votingDays = 30;
        const BallotOpen_native = await hre.ethers.getContractFactory("BallotOpen_native");
        const ballotOpen = await BallotOpen_native.deploy(_archiveAddress, _title, _metainfo, _votingDays);
        const ballotOpenContract = await ballotOpen.deployed();

        // Invoke multiple votes using different accounts
        const [voter1, voter2, voter3] = await ethers.getSigners();

        await ballotOpenContract.connect(voter1).vote(2);
        await ballotOpenContract.connect(voter2).vote(1);
        await ballotOpenContract.connect(voter3).vote(2);

        // Read expected voting information
        var storedTotalVotes = await ballotOpenContract.totalVotes.call();
        assert(storedTotalVotes == 3, "Expected 3 stored total votes, got " + storedTotalVotes);

        var storedProVotes = await ballotOpenContract.proVotes.call();
        assert(storedProVotes == 2, "Expected 2 stored pro votes, got " + storedProVotes);
    });

});
