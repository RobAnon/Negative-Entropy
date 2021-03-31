import dotenv  from "dotenv"
dotenv.config("../.env");
import abi from './conf/abi.json';
import cors from 'cors';
import express from 'express';
import fs from 'fs'


const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const createClient = require('ipfs-http-client')

const app = express();
const ipfs = createClient('https://ipfs.infura.io:5001');

 
//Parse JSON 
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
	let provider = new HDWalletProvider({
		privateKeys:[process.env.PRIVATE_KEY], 
		providerOrUrl: process.env.NETWORK, 
		pollingInterval:10000
	});
  	const web3 = new Web3(provider);
  	var response =  web3.eth.accounts.sign("Hello world!", process.env.PRIVATE_KEY);
  	provider.engine.stop();
  res.send(response);
});

app.post('/signature', (req, res) => {  	
	let provider = new HDWalletProvider({
		privateKeys:[process.env.PRIVATE_KEY], 
		providerOrUrl: process.env.NETWORK
	});
  	const web3 = new Web3(provider);
  	var customer = req.body.customer;
  	console.log(customer);
	var address;
  	//TODO: Need to verify JSON somewhere in here

  	var seed = "";
  	for(var i = 0; i < req.body.nft.attributes.length; i++){
		var attribute = req.body.nft.attributes[i];
		if(attribute["trait_type"] == "seed") {
				seed = attribute["value"];
		}
 	}	
 	//Promise chain begins
 	getAccounts(web3)
 	.then(function(accounts) {
 		address = accounts[0];
 		console.log(address);
 		const contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);;
		
	 	return seedClaimed(contract, seed, address)
 	})
 	.then(function(seeded) {
 		console.log("seed is claimed: " + seeded);

 		if(seeded){
 			//Seed exists, deny request
 			res.status(401);
			return res.send("Seed already exists! Choose a seed that doesn't already exist!");
 		} else {
	    	//console.log(json_uri);
	    	getURI(JSON.stringify(req.body.nft))
	    	.then(function(json_uri) {
	    		//TODO: This is where we can finally sign the message with URI + seed
	    		console.log(json_uri);
		 		var signature =  getSignature(web3, process.env.CONTRACT_ADDRESS, address, seed, json_uri)
		 		return res.send(JSON.stringify(signature));
	    	});

	  		provider.engine.stop();
 		}
 	})



	

  	



  	

  	return express.Router();
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);

function getSignature(web3, address, account, seed, jsonURL){
	//Address = contact address
	//account = signing account (THEIR account – need to get in request)
	const data = web3.utils.soliditySha3(
      address,
      account,
      seed,
      jsonURL
    );

    // minter sign
    const signature = web3.eth.accounts.sign(data, process.env.PRIVATE_KEY);
    var payload = {};
    payload["v"] = signature.v;
    payload["r"] = signature.r;
    payload["s"] = signature.s;
    payload["seed"] = seed;
    payload["customer"] = account;
    payload["URI"] = jsonURL;
   	return payload;
}

async function getAccounts(web3) {
	return new Promise(async (resolve, reject) => {
		var accounts = await web3.eth.getAccounts();
		if (!accounts.length) {
   			throw new Error('Please connect an address use for minting.');
 		}
  		resolve(accounts);
	});	
}

//NOTE: Having from in here is very important
async function seedClaimed(contract, seed, address) {
	return new Promise(async (resolve, reject) => {
		console.log(typeof(seed));
		var claimed = await contract.methods.seedClaimed(seed).call({from: address})
		.then((result) => {
  			resolve(result);
		});
	});
}

async function getURI(data) {
	return new Promise(async (resolve, reject) => {
 		await ipfs.add(data)
 		.then((result => {
 			resolve(`https://gateway.ipfs.io/ipfs/${result.path}`)
 		}))
	});
}

function formJSON() {
	//FORM PRELIMINARY JSON STRUCTURE FOR UPLOAD
	  let name = '';
	  let description = 'An NFT of Negative Entropy: Series 1: Thomas'; //TODO include minter address in here + number it is
	  let attributes = [];
	  let image = '';
	  let dependencies = [];
	  let code = defaultCode;
	  let valid = false;

	  // temp values
	  let attrKey = '';
	  let attrValue = '';
	  let dependency = '';
	  let dependencyType = 'script';
}

