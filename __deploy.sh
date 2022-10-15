#!/bin/bash
ETH_ENDPOINT=goerli

npx hardhat clean
npx hardhat compile
npx hardhat run scripts/1_BallotArchive_Migration.js --network $ETH_ENDPOINT

# Manually: npx hardhat verify --network $ETH_ENDPOINT $ContractAddress
