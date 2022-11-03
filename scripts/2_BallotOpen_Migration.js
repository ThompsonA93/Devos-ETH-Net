const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance: ", (await deployer.getBalance()).toString());

  _archiveAddress = "0xf96D2E0f246C9ED18e5D250D3C3Eb30E1C47f6Fd";
  _title = "Make Avocado Toast an austrian national dish";
  _metainfo = "Austria for Avocados #avocado @avocado_toast";
  _votingDays = 45;

  const BallotOpen = await hre.ethers.getContractFactory("BallotOpen");
  console.log("Created ContractFactory for BallotOpen");

  const ballotOpen = await BallotOpen.connect(deployer).deploy(
    _archiveAddress,
    _title,
    _metainfo,
    _votingDays
  );
  console.log("Deployed contract. Awaiting receipt by blockchain.");

  const ballotOpenContract = await ballotOpen.deployed();
  console.log("BallotArchive deployed to:", ballotOpenContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
