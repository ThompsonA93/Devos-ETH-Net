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

| Deployed Contract     | Network | Address                                    |
| --------------------- | ------- | ------------------------------------------ |
| Ballot Archive (v1.1) | Rinkeby | 0xd223f3F15a0E4992D1D83C3d4B8fD3bf0Ba2cBD6 | 
| Ballot Archive (v1.2) | Rinkeby | 0x38Cde40B482e5EC928728195066D9E28C0252898 |


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