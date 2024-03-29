[![HardHat Build](https://github.com/ThompsonA93/DevoChain/actions/workflows/hardhat-ci.yml/badge.svg)](https://github.com/ThompsonA93/DevoChain/actions/workflows/hardhat-ci.yml)

# Devos-ETH-Net

| Environment      | Version          |
| ---------------- | ---------------- |
| Operating System | Ubuntu 20.04 LTS |
| Node             | 16.17.0          |
| NPM              | 8.15.0           |

| Packages | Version |
| -------- | ------- |
| dotenv   | ^16.0.3 |
| hardhat  | ^2.12.2 |
| husky    | ^8.0.1  |

| Contracts            | Network              | Address                                    |
| -------------------- | -------------------- | ------------------------------------------ |
| BallotArchive (v1.2) | Rinkeby (Deprecated) | 0xE4934b4007a417e0764F08Cbcd7F1db3EA66e69E |
| BallotArchive (v1.2) | Rinkeby (Deprecated) | 0x0A8E23242ccb792610Aa9a31e0A0c3223e5A9e90 |
| BallotArchive (v1.3) | Rinkeby (Deprecated) | 0xf96D2E0f246C9ED18e5D250D3C3Eb30E1C47f6Fd |
| BallotArchive (v1.3) | Sepolia              | 0x80fe2853D1B4aB30405A8EEb3611963EEA14a127 |

| Contracts            | Network | Address                                    |
| -------------------- | ------- | ------------------------------------------ |
| BallotArchive (v1.3) | Sepolia | 0x67299F7a686a3E4eBfC79Ea7d8B5782Cc729a060 |
| BallotOpen (v1.3)    | Sepolia | 0x2AE5d81f2BBb7Eb2e299A8a3f741c3557A5eBd0B |
| BallotOpen (v1.3)    | Sepolia | 0x0B29823524b7359C6834a2478528cFE5CdA4674e |
| BallotOpen (v1.3)    | Sepolia | 0x1Ee5da8EC9C12c03f2b61AE3F570fC298383fD59 |

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

## Troubleshooting / Errors

> Q1: Hardhat is stuck on migration with [hardhat:core:hre Creating provider for network rinkeby +76ms] using option (--verbose).\
> A1: Check if the options in .env are anotated using ' since " is buggy.

> Q2: Hardhat deployment gives back the smart contracts address as 'undefined'.\
> A2: See A1, the use of " in .env appears buggy. Use ' instead

> Q3: I Received 'Error HH110: Account disabled' on deployment\
> A3: Check if the INFURA-Environment variable has changed. On occassion the endpoint changes for the same account

# Hardhat

This Project was bootstrapped with [[HardHat](https://hardhat.org/)].

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
