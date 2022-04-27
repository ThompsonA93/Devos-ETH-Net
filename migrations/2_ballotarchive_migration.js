const BallotArchive = artifacts.require("BallotArchive");

module.exports = function (deployer) {
  deployer.deploy(BallotArchive);
};
