[![HardHat CI](https://github.com/ThompsonA93/DevoChain/actions/workflows/hardhat-ci.yml/badge.svg)](https://github.com/ThompsonA93/DevoChain/actions/workflows/hardhat-ci.yml)

# Devochain
| Environment      | Version            |
| ---------------- | ------------------ |
| Operating System | Ubuntu 20.04.4 LTS |
| Hardhat          | 2.9.3              |

| Packages                  | Version |
| ------------------------- | ------- |
| @nomiclabs/hardhat-ethers | ^2.0.5, |
| @nomiclabs/hardhat-waffle | ^2.0.3, |
| chai                      | ^4.3.6, |
| ethereum-waffle           | ^3.4.4, |
| ethers                    | ^5.6.5, |
| hardhat                   | ^2.9.3  |

| Contract             | Network | Address                                    |
| -------------------- | ------- | ------------------------------------------ |
| BallotArchive (v1.2) | Rinkeby | 0xE4934b4007a417e0764F08Cbcd7F1db3EA66e69E |
| BallotArchive (v1.2) | Rinkeby | 0x0A8E23242ccb792610Aa9a31e0A0c3223e5A9e90 |
| BallotArchive (v1.2) | Rinkeby | 0x2319D79949e0760f4045593E9d2C9b476B333Cd9 |
## Installation
Refer to 'install.sh'

## Execution
The HardHat suite performs as Node, Compiler, Migrator and Tester - Refer to dryrun.sh

Quickstart:
```sh
npx hardhat node                # Deploy Node

npx hardhat compile             # Compile ./contracts/*.sol

npx hardhat run scripts/*.js    # Migrate compiled contracts

npx hardhat test                # Test deployed contracts via ./test/*.js
```

### Deploying to Network
To deploy a new node to the network, run
```sh
npx hardhat clean
npx hardhat compile
npx hardhat run scripts/1_BallotArchive_Migration.js --network rinkeby --verbose
```
To verify the contract, run
```sh
npx hardhat verify --network rinkeby $ArchiveAddress
```

# Basic Sample Hardhat Project

This Project was bootstrapped with [[HardHat](https://hardhat.org/)].

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

# Troubleshooting / Errors
> Q1: Hardhat is stuck on migration with [hardhat:core:hre Creating provider for network rinkeby +76ms] using option (--verbose).\
> A1: Check if the options in .env are anotated using '. " is buggy.

> Q2: Hardhat deployment gives back the smart contracts address as 'undefined'.
> A2: As with A1, the use of " in .env appears buggy. Use ' instead