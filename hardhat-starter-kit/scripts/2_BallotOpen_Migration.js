const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance: ", (await deployer.getBalance()).toString());

  _archiveAddress = "0x..."; // FIXME :: Enter archive address here
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
  console.log("BallotOpen deployed to:", ballotOpenContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
