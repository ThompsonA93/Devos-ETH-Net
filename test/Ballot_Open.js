const BallotOpenContract = artifacts.require('Ballot_Open');

contract('Ballot_Open', () => {
    it('Check deployment', async() => {
        const ballotOpenContract = await BallotOpenContract.deployed();    // Returns deployed contract
        console.log(ballotOpenContract.address);
        assert(ballotOpenContract.address !== '');
    });
});
