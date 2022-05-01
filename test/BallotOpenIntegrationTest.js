const BallotArchiveContract = artifacts.require('BallotArchive');
const BallotOpenContract = artifacts.require('BallotOpen');

contract('BallotOpenIntegration', () => {
    const zero_address = '0x0000000000000000000000000000000000000000';

    it('Deploy archive onto chain', async() => {
        const ballotArchiveContract = await BallotArchiveContract.deployed();
        assert(ballotArchiveContract.address !== '', "Expected non-null address on deployment, got \'\'");
    });
    it('Deploy and emit singular OpenBallot and read from archive contract', async() => {
        const ballotArchiveContract = await BallotArchiveContract.deployed();
        
        // Create new Ballot Contract
        _archiveAddress = ballotArchiveContract.address;
        _title = "My First Ballot";
        _metainfo = "Lorem Ipsum";
        _votingDays = 30;
        const ballotOpenContract = await BallotOpenContract.new(_archiveAddress, _title, _metainfo, _votingDays);

        // Read emitted new ballot contract from archive node
        const storedBallot = await ballotArchiveContract.getBallotByAddress(ballotOpenContract.address);
        assert(storedBallot == ballotOpenContract.address);
    });
});
