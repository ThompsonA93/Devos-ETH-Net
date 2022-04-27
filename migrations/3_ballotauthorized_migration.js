const Ballot_Authorized = artifacts.require("Ballot_Authorized");

module.exports = function (deployer) {
  deployer.deploy(Ballot_Authorized);
};
