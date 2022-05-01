[![Truffle/Ganache CI](https://github.com/ThompsonA93/DevoChain/actions/workflows/truffle.yml/badge.svg)](https://github.com/ThompsonA93/DevoChain/actions/workflows/truffle.yml)

# Devochain
| Environment| Version|
|-|-|
Operating System    | Ubuntu 20.04.4 LTS
Node                | v16.14.2
Solidity            | 0.8.11 (solc-js)
Web3.js             | v1.5.3
Truffle             | v5.4.29 (core: 5.4.29)
Ganache CLI         | v6.12.2 (ganache-core: 2.13.2)

| Packages | Version |
|-|-|
@truffle/hdwallet-provider  | ^2.0.7,
dotenv                      | ^16.0.0    

## Installation
Run the following command for local project setup.
```sh
npm install       # Fetch project dependencies
truffle compile   # Create project artifacts
```


## Execution
### Ganache
To deploy the local chain, run the following command. 

```sh
npx ganache-cli --port 7545
```
_Note_: The port must be equal to the port specified in truffle-config.js.


### Truffle
To compile, migrate and test the smart contracts in __./contracts__, run one of the following commands

[1.] Compile __./contracts/*.sol__ files and create artifacts saved to __./build__ 
```sh
truffle compile
``` 
[2.] (Compile and) Migrate artifacts in __./build__ to a given network-endpoint specified in __truffle-config.js__
```sh
truffle migrate --network dev
```
[3.] Test smart contracts given as per artifacts in __./build__ on a specified network-endpoint.
```sh
truffle test --network dev
```