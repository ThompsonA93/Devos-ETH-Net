#!/bin/sh
# See hardhat.config.js
NETWORK=dev
PORT=8545

echo "#1 Setting up HardHat ETH-Node"
npx hardhat node --hostname 127.0.0.1 --port $PORT &
sleep 5

echo "#2 Running Hardhat-Suite"
npx hardhat compile
npx hardhat run --network $NETWORK --verbose scripts/*.js
npx hardhat test --network $NETWORK
sleep 5

echo "#3 Killing Process & Cleanup Process"
sudo kill `sudo lsof -t -i:$PORT`