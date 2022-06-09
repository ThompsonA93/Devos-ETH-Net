const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const BallotArchiveV2 = await hre.ethers.getContractFactory("BallotArchiveV2");
  console.log("Built contract. Deploying.");

  const ballotArchive = await BallotArchiveV2.deploy();
  console.log("Deployed contract. Awaiting receipt by blockchain.");

  const ballotArchiveContract = await ballotArchive.deployed();
  console.log("BallotArchiveV2 deployed to:", ballotArchiveContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
