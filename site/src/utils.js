import detectProvider from '@metamask/detect-provider';
import abi from './conf/abi.json';
import fs from 'fs'
import Web3 from 'web3';
import { web3Loaded } from './store.js';
let isWeb3;

	const subscriber = web3Loaded.subscribe(value => {
		isWeb3 = value;
	});

export async function initProvider(app) {
  // detect provider
  const provider = await detectProvider();

  if (!provider) {
    throw new Error(
      'Please install Metamask.io or any other wallet in the browser.'
    );
  }

  if (provider !== window.ethereum) {
    throw new Error('Provider problem.');
  }

  // legacy
  if ('function' === typeof provider.enable) {
    await provider.enable();
  }

  // create web3
  const web3 = new Web3(provider);

  const accounts = await web3.eth.getAccounts();
  if (!accounts.length) {
    throw new Error('Please connect an address use for minting.');
  }

  const account = accounts[0];

  // create contract instance
  const contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS, {
    from: account,
  });

  console.log(contract)

  app.set({
    web3,
    contract,
    provider,
    account,
  });
  app = app;
  web3Loaded.set(1);
}

export function isEthAddress(addr) {
  return Web3.utils.isAddress(addr);
}

