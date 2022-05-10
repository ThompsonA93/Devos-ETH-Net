#!/bin/bash
# NPM as prerequisite to HardHat
echo "#1 Installing Node"
apt install nodejs npm

# Hardhat
echo "#2 Installing HardHat-Suite"
npm install --save-dev hardhat

# Setup Project
echo "#3 Installing local Project"
npm i