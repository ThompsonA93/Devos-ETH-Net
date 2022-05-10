#!/bin/bash
echo "#1 Installing Node"
apt install nodejs npm

echo "#2 Installing HardHat-Suite"
npm install --save-dev hardhat

echo "#3 Installing local Project"
npm i