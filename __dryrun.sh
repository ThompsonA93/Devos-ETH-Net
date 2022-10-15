#!/bin/bash
# See hardhat.config.js
NETWORK=dev # or goerli
PORT=8545

yarn clean

printf "! Using local port $PORT\n"
if [[ -z "$(lsof -i:$PORT)" ]]; then
    printf "Port $PORT is not in use. Creating local Hardhat-Node.\n"
    yarn local-node
else
    printf "Port $PORT is in use. Assuming Hardhat-Node, doing nothing.\n"
fi

echo "#! Running Hardhat Testsuite for Contract-Network Deployment"
yarn compile
yarn test