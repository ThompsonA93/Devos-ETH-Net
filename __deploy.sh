#!/bin/bash
npx hardhat clean
npx hardhat compile
npx hardhat run scripts/1_BallotArchive_Migration.js --network sepolia
npx hardhat run scripts/2_BallotOpen_Migration.js --network sepolia
# Manually: npx hardhat verify --network $ETH_ENDPOINT $ContractAddress
