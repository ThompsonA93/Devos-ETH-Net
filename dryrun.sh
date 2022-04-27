#!/bin/sh
PORT=7545
NETWORK=dev # dev or rinkeby


npx ganache-cli --port $PORT &

sleep 5

truffle compile
truffle migrate --network $NETWORK
truffle test --network $NETWORK

sleep 5

sudo kill `sudo lsof -t -i:$PORT`