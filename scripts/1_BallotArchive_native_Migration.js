const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const BallotArchive_native = await hre.ethers.getContractFactory("BallotArchive_native");
  console.log("Built contract. Deploying.");

  const ballotArchive = await BallotArchive_native.deploy();
  console.log("Deployed contract. Awaiting receipt by blockchain.");

  const ballotArchiveContract = await ballotArchive.deployed();
  console.log("BallotArchive_native deployed to:", ballotArchiveContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
