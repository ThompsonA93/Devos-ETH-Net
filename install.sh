#!/bin/bash
# NPM as prerequisite to HardHat
echo "Installing Node"
apt install nodejs npm

# Hardhat
echo "Installing HardHat-Suite"
npm install --save-dev hardhat

# Setup Project
echo "Installing local Project"
npm i