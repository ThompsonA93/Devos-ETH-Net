#!/bin/bash
# See hardhat.config.js
NETWORK=dev # or goerli
PORT=8545

npx hardhat clean

echo "#1 Testing setup of HardHat ETH-Node"
npx hardhat node --hostname 127.0.0.1 --port $PORT &
sleep 5

echo "#2 Running Hardhat Testsuite for Contract-Network Deployment"
npx hardhat compile
npx hardhat run --network $NETWORK scripts/*.js
npx hardhat test --network $NETWORK --grep BallotArchiveTest
npx hardhat test --network $NETWORK --grep BallotOpenTest
npx hardhat test --network $NETWORK --grep BallotIntegrationTest
echo "Testing Contract-Network Deployment completed."
sleep 5


echo "#3 Running Hardhat Testsuite for Contract Performance"
npx hardhat test --network $NETWORK --grep PerformanceTest
echo "Testing Contract Performance completed."
