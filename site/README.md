# BeyondNFT - Interactive NFTs Starter site

We are using Svelte here. It is very easy to use and understand if you ever worked with vanilla js, Vue or React.

First go in the directory and install dependencies

```bash
cd site
npm install
```

Then you can type of of theos two commands

`npm run dev`
Starts the site in `dev` mode (which means auto-reload when modifying any imported file). It will echo a local address at which you can see the site

`npm run build`
to build the website, if you want to publish it for example

## .env

You will need to create a `.env` file with 

```bash
touch .env
```

Then, copy [.env.sample] into `.env`

Edit it to set the right `CONTRACT_ADDRESS` for the network your are on

## Overview

Most requests to the blockchain are done through MetaMask (or any other web wallet). Be sure to be connected on the right Network (Mainnet, Rinkeby, Local Ganache...). The secure requests are made via backend

### List

List will list all the currently created NFT in your contract.

### Create

When you press mint:
- image will be hosted on IPFS
- code will be hosted on IPFS
- Metamask will ask to do the transaction to store the value in the contract

You can then see the NFT in the List