#!/bin/bash
# See hardhat.config.js
NETWORK=dev # or goerli
PORT=8545

npx hardhat clean

printf "#1 Testing setup of HardHat ETH-Node"
printf "! Using local port $PORT\n"
if [[ -z "$(lsof -i:$PORT)" ]]; then
    printf "! Port $PORT is not in use. Creating local Hardhat-Node\n"
    npx hardhat node --hostname 127.0.0.1 --port $PORT &
else
    printf "! Port $PORT is in use. Assuming Hardhat-Node, doing nothing\n"
fi

sleep 5
printf "#2 Running Hardhat Testsuite for Contract-Network Deployment\n"
npx hardhat compile
npx hardhat run --network $NETWORK scripts/*.js
npx hardhat test --network $NETWORK --grep BallotArchiveTest
npx hardhat test --network $NETWORK --grep BallotOpenTest
npx hardhat test --network $NETWORK --grep BallotIntegrationTest
printf "! Testing Contract-Network Deployment completed\n"

sleep 5
printf "#3 Running Hardhat Testsuite for Contract Performance\n"
npx hardhat test --network $NETWORK --grep PerformanceTest
printf "! Testing Contract Performance completed.\n"
