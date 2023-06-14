const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance: ", (await deployer.getBalance()).toString());

  const BallotArchive = await hre.ethers.getContractFactory("BallotArchive");
  console.log("Built contract. Deploying.");

  const ballotArchive = await BallotArchive.deploy();
  console.log("Deployed contract. Awaiting receipt by blockchain.");

  const ballotArchiveContract = await ballotArchive.deployed();
  console.log("BallotArchive deployed to:", ballotArchiveContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
