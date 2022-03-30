#!/bin/sh
case "$1" in
   -[cC])         printf "Starting local Blockchain.\n"   & xterm -hold -e "npx ganache-cli -p 7545"   & ;;
   -[mM])         printf "Migrating Contracts.\n"         & xterm -hold -e "truffle migrate" & ;;
   *)             printf "No/Incorrect options were passed.\n Pass -m to run Smart Contract Migrations\n Pass -c to run the local Blockchain.\n"; 
esac
