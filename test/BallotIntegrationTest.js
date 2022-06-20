const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("BallotIntegrationTest", function () {
    const zero_address = '0x0000000000000000000000000000000000000000';

    it('Deploy archive onto chain', async() => {
        const BallotArchive = await hre.ethers.getContractFactory("BallotArchive");
        const ballotArchive = await BallotArchive.deploy();
        const ballotArchiveContract = await ballotArchive.deployed();
        assert(ballotArchiveContract.address !== '', "Expected non-null address on deployment, got \'\'");
    });
    it('Deploy and emit singular OpenBallot and read from ballots', async() => {
        const [voter1] = await ethers.getSigners();

        const BallotArchive = await hre.ethers.getContractFactory("BallotArchive");
        const ballotArchive = await BallotArchive.deploy();
        const ballotArchiveContract = await ballotArchive.deployed();
        
        // Create new Ballot Contract
        _archiveAddress = ballotArchive.address;
        _title = "My First Ballot";
        _metainfo = "Lorem Ipsum";
        _votingDays = 30;
        const BallotOpen = await hre.ethers.getContractFactory("BallotOpen");
        const ballotOpen = await BallotOpen.connect(voter1).deploy(_archiveAddress, _title, _metainfo, _votingDays);
        const ballotOpenContract = await ballotOpen.deployed();

        var ballotOpenAddress = await ballotArchiveContract.getBallotByAddress(ballotOpenContract.address);
        assert(ballotOpenAddress == ballotOpenContract.address);
    });
    it('Deploy and emit singular OpenBallot and read from creators', async() => {
        const [voter1] = await ethers.getSigners();

        const BallotArchive = await hre.ethers.getContractFactory("BallotArchive");
        const ballotArchive = await BallotArchive.deploy();
        const ballotArchiveContract = await ballotArchive.deployed();
        
        // Create new Ballot Contract
        _archiveAddress = ballotArchive.address;
        _title = "My First Ballot";
        _metainfo = "Lorem Ipsum";
        _votingDays = 30;
        const BallotOpen = await hre.ethers.getContractFactory("BallotOpen");
        const ballotOpen = await BallotOpen.connect(voter1).deploy(_archiveAddress, _title, _metainfo, _votingDays);
        const ballotOpenContract = await ballotOpen.deployed();

        var ballotOpenAddress = await ballotArchiveContract.getBallotsByCreator(voter1.address);
        assert(ballotOpenAddress == ballotOpenContract.address);
    });
    it('Deploy and emit multiple OpenBallot and read from ballots', async() => {
        const [voter1, voter2] = await ethers.getSigners();

        const BallotArchive = await hre.ethers.getContractFactory("BallotArchive");
        const ballotArchive = await BallotArchive.deploy();
        const ballotArchiveContract = await ballotArchive.deployed();
        
        // Create new Ballot Contract
        _archiveAddress = ballotArchive.address;
        _title = "My First Ballot";
        _metainfo = "Lorem Ipsum";
        _votingDays = 30;
        const BallotOpen1 = await hre.ethers.getContractFactory("BallotOpen");
        const ballotOpen1 = await BallotOpen1.connect(voter1).deploy(_archiveAddress, _title, _metainfo, _votingDays);
        const ballotOpenContract1 = await ballotOpen1.deployed();

        _archiveAddress = ballotArchive.address;
        _title = "My Second";
        _metainfo = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.";
        _votingDays = 14;
        const BallotOpen2 = await hre.ethers.getContractFactory("BallotOpen");
        const ballotOpen2 = await BallotOpen2.connect(voter2).deploy(_archiveAddress, _title, _metainfo, _votingDays);
        const ballotOpenContract2 = await ballotOpen2.deployed();

        var ballotOpenAddress1 = await ballotArchiveContract.getBallotByAddress(ballotOpenContract1.address);
        assert(ballotOpenAddress1 == ballotOpenContract1.address);

        var ballotOpenAddress2 = await ballotArchiveContract.getBallotByAddress(ballotOpenContract2.address);
        assert(ballotOpenAddress2 == ballotOpenContract2.address);
    });
    it('Deploy and emit multiple OpenBallot and read from ballots', async() => {
        const [voter1, voter2] = await ethers.getSigners();

        const BallotArchive = await hre.ethers.getContractFactory("BallotArchive");
        const ballotArchive = await BallotArchive.deploy();
        const ballotArchiveContract = await ballotArchive.deployed();
        
        // Create new Ballot Contract
        _archiveAddress = ballotArchive.address;
        _title = "My First Ballot";
        _metainfo = "Lorem Ipsum";
        _votingDays = 30;
        const BallotOpen1 = await hre.ethers.getContractFactory("BallotOpen");
        const ballotOpen1 = await BallotOpen1.connect(voter1).deploy(_archiveAddress, _title, _metainfo, _votingDays);
        const ballotOpenContract1 = await ballotOpen1.deployed();

        _archiveAddress = ballotArchive.address;
        _title = "My Second";
        _metainfo = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.";
        _votingDays = 14;
        const BallotOpen2 = await hre.ethers.getContractFactory("BallotOpen");
        const ballotOpen2 = await BallotOpen2.connect(voter2).deploy(_archiveAddress, _title, _metainfo, _votingDays);
        const ballotOpenContract2 = await ballotOpen2.deployed();

        var ballotOpenAddress1 = await ballotArchiveContract.getBallotsByCreator(voter1.address);
        assert(ballotOpenAddress1 == ballotOpenContract1.address);

        var ballotOpenAddress2 = await ballotArchiveContract.getBallotsByCreator(voter2.address);
        assert(ballotOpenAddress2 == ballotOpenContract2.address);
    });
});