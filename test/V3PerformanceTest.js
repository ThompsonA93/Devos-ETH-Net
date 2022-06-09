const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

const generateString = (length) => Math.random().toString(32).substring(2, length);

// Archive-Node required as dependency given smart contract construction
describe("V3PerformanceTest", function () {
  const zero_address = '0x00000000000000000000000000000000000000000';

  var gasCost;

  it('Deploy Randomized: 1 Contract, Stringlength 10', async function(){
    const BallotArchiveV3 = await hre.ethers.getContractFactory("BallotArchiveV3");
    const ballotArchive = await BallotArchiveV3.deploy();
    const ballotArchiveContract = await ballotArchive.deployed();

    _archiveAddress = ballotArchiveContract.address;
    _title = generateString(10);
    _metainfo = generateString(10);
    _votingDays = 3;

    const BallotOpenV3 = await hre.ethers.getContractFactory("BallotOpenV3");
    const ballotOpen = await BallotOpenV3.deploy(_archiveAddress, _title, _metainfo, _votingDays);
    const ballotOpenContract = await ballotOpen.deployed();

    
    
    assert(ballotOpenContract.address !== '', "Expected non-null address on deployment, got \'\'");
  });  
  it('Deploy Randomized: 100 Contracts, Stringlength 10', async function(){
    const BallotArchiveV3 = await hre.ethers.getContractFactory("BallotArchiveV3");
    const ballotArchive = await BallotArchiveV3.deploy();
    const ballotArchiveContract = await ballotArchive.deployed();

    for(var i = 0; i < 100; i++){
      _archiveAddress = ballotArchiveContract.address;
      _title = generateString(10);
      _metainfo = generateString(10);
      _votingDays = 3;
  
      const BallotOpenV3 = await hre.ethers.getContractFactory("BallotOpenV3");
      const ballotOpen = await BallotOpenV3.deploy(_archiveAddress, _title, _metainfo, _votingDays);
      const ballotOpenContract = await ballotOpen.deployed();
      assert(ballotOpenContract.address !== '', "Expected non-null address on deployment, got \'\'");  
    }
  });  
  it('Deploy Randomized: 100 Contracts, Stringlength 100', async function(){
    const BallotArchiveV3 = await hre.ethers.getContractFactory("BallotArchiveV3");
    const ballotArchive = await BallotArchiveV3.deploy();
    const ballotArchiveContract = await ballotArchive.deployed();

    for(var i = 0; i < 100; i++){
      _archiveAddress = ballotArchiveContract.address;
      _title = generateString(100);
      _metainfo = generateString(100);
      _votingDays = 3;
  
      const BallotOpenV3 = await hre.ethers.getContractFactory("BallotOpenV3");
      const ballotOpen = await BallotOpenV3.deploy(_archiveAddress, _title, _metainfo, _votingDays);
      const ballotOpenContract = await ballotOpen.deployed();
      assert(ballotOpenContract.address !== '', "Expected non-null address on deployment, got \'\'");  
    }
  });  

  it('Deploy Randomized: 1000 Contracts, Stringlength 10', async function(){
    const BallotArchiveV3 = await hre.ethers.getContractFactory("BallotArchiveV3");
    const ballotArchive = await BallotArchiveV3.deploy();
    const ballotArchiveContract = await ballotArchive.deployed();

    for(var i = 0; i < 1000; i++){
      _archiveAddress = ballotArchiveContract.address;
      _title = generateString(10);
      _metainfo = generateString(10);
      _votingDays = 3;
  
      const BallotOpenV3 = await hre.ethers.getContractFactory("BallotOpenV3");
      const ballotOpen = await BallotOpenV3.deploy(_archiveAddress, _title, _metainfo, _votingDays);
      const ballotOpenContract = await ballotOpen.deployed();
      assert(ballotOpenContract.address !== '', "Expected non-null address on deployment, got \'\'");  
    }
  });  

  it('Deploy Randomized: 1000 Contracts, Stringlength 100', async function(){
    const BallotArchiveV3 = await hre.ethers.getContractFactory("BallotArchiveV3");
    const ballotArchive = await BallotArchiveV3.deploy();
    const ballotArchiveContract = await ballotArchive.deployed();

    for(var i = 0; i < 1000; i++){
      _archiveAddress = ballotArchiveContract.address;
      _title = generateString(100);
      _metainfo = generateString(100);
      _votingDays = 3;
  
      const BallotOpenV3 = await hre.ethers.getContractFactory("BallotOpenV3");
      const ballotOpen = await BallotOpenV3.deploy(_archiveAddress, _title, _metainfo, _votingDays);
      const ballotOpenContract = await ballotOpen.deployed();
      assert(ballotOpenContract.address !== '', "Expected non-null address on deployment, got \'\'");  
    }
  });  

});
