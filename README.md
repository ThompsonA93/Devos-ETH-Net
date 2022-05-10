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

## Installation
Refer to 'install.sh'

## Execution
The HardHat suite performs as Node, Compiler, Migrator and Tester - Refer to dryrun.sh

Quickstart:
```sh
npx hardhat node        # Deploy Node

npx hardhat compile     # Compile ./contracts/*.sol

npx hardhat run scripts/*.js    # Migrate compiled contracts

npx hardhat test        # Test deployed contracts via ./test/*.js
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
