const BallotArchiveContract = artifacts.require('BallotArchive');

contract('BallotArchive', () => {
    const zero_address = '0x0000000000000000000000000000000000000000';

    // FIXME :: This is far more complicated than assumed given validity of generated address
    function generateAddress(){
        var length = 40;
        var result = "0x";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random()*characters.length));
        }
       console.log("\tGenerated Address : " + result);
       return result;
    }

    it('Deploy archive onto chain', async() => {
        const ballotArchiveContract = await BallotArchiveContract.deployed();
        assert(ballotArchiveContract.address !== '');
    });
    it('Write and read singular ballot', async() => {
        const ballotArchiveContract = await BallotArchiveContract.deployed();

        var _creator = '0xA6E62310271Dd0f479Fb2e50cc6f4c43355280c8';
        var _ballot = '0xf48cED837d9a4aD05D137055488782853B862cDd';
        const creation = await ballotArchiveContract.createNewBallot(_creator, _ballot);

        const storedBallot = await ballotArchiveContract.getBallotByAddress(_ballot);
        assert(_ballot === storedBallot);
    });
    it('Write and read multiple ballots', async() => {
        const ballotArchiveContract = await BallotArchiveContract.deployed();
        var _creator = '0x73abcE584909D02d59cDC20Ea988277f63864A5f';
        var _ballot1 = '0x576920c331B572ffa619daAf4217049A5455848F';
        var _ballot2 = '0x2AE680fE5C8c4f6F38367C6099E7fd82cD43Bc76';
        var _ballot3 = '0x74909799BdE4c4262F9e308aB0Eb92c785A84549';

        var creation = await ballotArchiveContract.createNewBallot(_creator, _ballot1);
        creation = await ballotArchiveContract.createNewBallot(_creator, _ballot2);
        creation = await ballotArchiveContract.createNewBallot(_creator, _ballot3);

        var storedBallots = await ballotArchiveContract.getBallotsByCreator(_creator);
        
        assert(storedBallots[0] === _ballot1);
        assert(storedBallots[1] === _ballot2);
        assert(storedBallots[2] === _ballot3);
    });
    it('Write and read non-existing ballot', async() => {
        const ballotArchiveContract = await BallotArchiveContract.deployed();
        var _ballot = '0x5887D1A31C4aA418D883687FC8895736826bc65f';
        var _expectedBallot = await ballotArchiveContract.getBallotByAddress(_ballot);
        assert(_expectedBallot === zero_address, "Nonallocated Ballot was not zero-address");
    });
});
