#!/bin/bash
# See hardhat.config.js
NETWORK=dev
PORT=8545

echo "#1 Setting up HardHat ETH-Node"
npx hardhat node --hostname 127.0.0.1 --port $PORT &
sleep 5

echo "#2 Running Hardhat Testsuite for Contract-Network Deployment"
npx hardhat compile
npx hardhat run --network $NETWORK scripts/*.js
npx hardhat test --network $NETWORK --grep BallotArchiveNativeTest
npx hardhat test --network $NETWORK --grep BallotOpenNativeTest
echo "Testing Contract-Network Deployment completed."
sleep 5

hs=`hostname`
if [[ $hs == "thompson-VBox" ]]
then
    # To expensive to run externally
    echo "#3 Running Hardhat Testsuite for Contract Performance"
    npx hardhat test --grep NativePerformanceTest
    echo "Testing Contract Performance completed."
    sleep 5
fi

echo "#4 Killing Process & Cleanup Process"
sudo kill `sudo lsof -t -i:$PORT`