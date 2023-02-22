# Automated-blockchain-lottery

Built using Solidity and Nextjs. This software is built to automate decentralization in lotteries.

## README: How to run a solidity smart contract repository with Next.js

This repository contains a Solidity smart contract initialized with Hardhat and a frontend built with Next.js. Follow the steps below to run the repository on your local machine.

## Prerequisites

Before running this repository, you need to have the following tools installed on your machine:

- Node.js (version 14 or later)
- npm or yarn package manager
- Hardhat (installed globally using npm install -g hardhat)

## Steps

1. Clone the repository to your local machine.

2. Navigate to the root directory of the project using the terminal.

3. Install the required packages for the backend and the frontend by running the command npm install or yarn install.

4. Compile the smart contract by running the command npx hardhat compile. This command will compile the contract and generate the necessary artifacts for the frontend to interact with the smart contract.

5. Start the local blockchain network by running the command npx hardhat node.

6. In a new terminal window, deploy the smart contract to the local network by running the command npx hardhat run --network localhost scripts/deploy.js.

7. Run the frontend by navigating to the Next.js folder located in /Next, and running the command yarn dev.

8. Open your web browser and navigate to http://localhost:3000 to interact with the smart contract using the frontend.

## Available Scripts

In the root directory of the project, you can run the following scripts:

- npm run test: Runs the unit tests for the smart contract using Hardhat.
- npm run lint: Lints the codebase using ESLint.
- npm run build: Builds the Next.js frontend for production.
- npm run start: Starts the Next.js server in production mode.
