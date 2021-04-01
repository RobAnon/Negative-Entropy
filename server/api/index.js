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

app.get('/api', (req, res) => {
	return res.send('Received a GET HTTP method');
});


app.post('/api/signature', (req, res) => {  	
	let provider = new HDWalletProvider({
		privateKeys:[process.env.PRIVATE_KEY], 
		providerOrUrl: process.env.NETWORK
	});
	res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')

  	const web3 = new Web3(provider);
  	var customer = req.body.customer;
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
 		const contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);;
		
	 	return seedClaimed(contract, seed, address)
 	})
 	.then(function(seeded) {

 		if(seeded){
 			//Seed exists, deny request
 			provider.engine.stop();
 			res.status(401);
			return res.send("Seed already exists! Choose a seed that doesn't already exist!");
 		} else {
	    	//console.log(json_uri);
	    	getURI(JSON.stringify(req.body.nft))
	    	.then(function(json_uri) {

		 		var signature =  getSignature(web3, process.env.CONTRACT_ADDRESS, customer, seed, json_uri)
		 		return res.send(JSON.stringify(signature));
	    	});

	  		provider.engine.stop();
 		}
 	});



	

  	



  	

  	return express.Router();
});

app.listen(process.env.PORT, () =>
  console.log(`App listening on port ${process.env.PORT}!`),
);

//TODO: Consider also signing with image we want
function getSignature(web3, address, account, seed, jsonURL){
	//Address = contact address
	//account = signing account (THEIR account – need to get in request)
	const data = web3.utils.soliditySha3(
      {type: 'address', value: address},
      {type: 'address', value: account},
      {type: 'string', value: seed},
      {type: 'string', value: jsonURL}
    );

    // minter sign
    const signature = web3.eth.accounts.sign(data, process.env.PRIVATE_KEY);

    var payload = {};
    payload.v = signature.v;
    payload.r = signature.r;
    payload.s = signature.s;
    payload.URI = jsonURL;
    payload.seed = seed;
    payload.hash = signature.messageHash;
    payload.signature = signature;
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

