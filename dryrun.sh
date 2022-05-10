#!/bin/sh
# See hardhat.config.js
#  networks: {
#    dev: {
#      url: "http://127.0.0.1:8545/"
#    }
#  }

NETWORK=dev     # dev or rinkeby
PORT=8545

echo "#1 Setting up HardHat ETH-Node"
npx hardhat node --hostname 127.0.0.1 --port $PORT &
sleep 5

echo "#2 Running Hardhat-Suite"
npx hardhat compile
npx hardhat run --network dev scripts/*.js
npx hardhat test --network dev
sleep 5

echo "#3 Killing Process & Cleanup Process"
sudo kill `sudo lsof -t -i:$PORT`