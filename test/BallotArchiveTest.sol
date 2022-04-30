// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
import "../contracts/BallotArchive.sol";
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";

// Deprecated: Sol-tests seem buggy as hell in terms of compiling/running.
// Kept for reference
contract BallotArchiveTest {
    function accessTest_CreateAndCheckNewBallot() public {
        BallotArchive ba = BallotArchive(DeployedAddresses.BallotArchive());
        address _creator = 0x3793be1ec62fB96B0D4A5a9F7966bd51Ee32c5d0;
        address _ballot = 0x4349c933cc179ef18723B2acd946B3751dA7C8E5;
        ba.createNewBallot(_creator, _ballot);
        Assert.equal(ba.getBallotByAddress(_ballot), _ballot, "Returned Ballot was not equal to expected ballot");
    }

    function accessTest_CreateAndCheckMultipleBallots() public {
        BallotArchive ba = BallotArchive(DeployedAddresses.BallotArchive());
        address _creator = 0x73abcE584909D02d59cDC20Ea988277f63864A5f;
        address _ballot1 = 0x576920c331B572ffa619daAf4217049A5455848F;
        address _ballot2 = 0x2AE680fE5C8c4f6F38367C6099E7fd82cD43Bc76;
        address _ballot3 = 0x74909799BdE4c4262F9e308aB0Eb92c785A84549;
        ba.createNewBallot(_creator, _ballot1);
        ba.createNewBallot(_creator, _ballot2);
        ba.createNewBallot(_creator, _ballot3);

        address[] memory ballots = ba.getBallotsByCreator(_creator);
        Assert.equal(ballots[0], _ballot1, "First Ballot was not equal to first expected ballot");
        Assert.equal(ballots[1], _ballot2, "Second Ballot was not equal to second expected ballot");
        Assert.equal(ballots[2], _ballot3, "Third Ballot was not equal to third expected ballot");
    }

    function accessTest_CheckNonExistingBallot() public {
        BallotArchive ba = BallotArchive(DeployedAddresses.BallotArchive());
        address _ballot = 0x5887D1A31C4aA418D883687FC8895736826bc65f;
        Assert.equal(ba.getBallotByAddress(_ballot), address(0), "Returned Ballot was not equal to received ballot");
    }
}