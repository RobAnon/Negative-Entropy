import detectProvider from '@metamask/detect-provider';
import abi from './conf/abi.json';
import fs from 'fs'
import Web3 from 'web3';
import { web3Loaded } from './store.js';
import { gfyToken } from './store.js';
let isWeb3;
let gfyToke;

	const subscriber = web3Loaded.subscribe(value => {
		isWeb3 = value;
	});
  const subscriber2 = gfyToken.subscribe(value => {
		gfyToke = value;
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

export async function initGfy(){
  const AUTH_URL = 'https://api.gfycat.com/v1/oauth/token';
  var grant_type="client_credentials";
  var client_id = process.env.GFY_CLIENT_ID;
  var client_secret = process.env.GFY_CLIENT_SECRET;
  var payload = {
    grant_type,
    client_id,
    client_secret
  }
  var rawResponse = await fetch(AUTH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    mode: 'cors',
    body: JSON.stringify(payload)
  });
  var response = await rawResponse.json();
  gfyToke = response.access_token;
}

export const replObj = {8:"https://gateway.ipfs.io/ipfs/QmfRPu9BBCpTGyPwoToUiA6JwyyP5Y8357uqK14pejQkKm", 10:"https://gateway.ipfs.io/ipfs/QmPP6faANMriTNjCdWQKLVUaZNfpLt49nbUw5E3Mw7Hitd"};

export const ipfs = {
  ipfsclient: null,
  async connect(config) {
    this.ipfsClient = window.IpfsHttpClient(config);
  },
  async add(content) {
    if (!this.ipfsClient) {
      console.warn('IPFS not connected');
      return;
    }

    try {
      const file = await this.ipfsClient.add(content);
      return file;
    } catch (e) {
      alert("Error in uploading file!");
      throw e;
    }
  },
  client() {
    return this.ipfsClient;
  },
};

