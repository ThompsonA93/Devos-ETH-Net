#!/bin/sh
PORT=7545   # Same port as truffle-config.js
NETWORK=dev # dev or rinkeby

# Run Ganache as Daemon
npx ganache-cli --port $PORT &
sleep 5

# Run Truffle suite
truffle compile
truffle migrate --network $NETWORK
truffle test --network $NETWORK
sleep 5

# Kill ganache-cli daemon
sudo kill `sudo lsof -t -i:$PORT`