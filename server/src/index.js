import dotenv  from "dotenv"
dotenv.config("../.env");
import abi from './conf/abi.json';
import cors from 'cors';
import express from 'express';


const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const app = express();
 
//Parse JSON 
app.use(express.json());


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
	var address;
  	//TODO: Need to verify JSON somewhere in here

  	var seed = "";
  	for(var i = 0; i < req.body.attributes.length; i++){
		var attribute = req.body.attributes[i];
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
 		var signature =  web3.eth.accounts.sign(seed, process.env.PRIVATE_KEY);
 		return res.send(signature);
 		/*file_ = await ipfs.add(JSON.stringify(data));
    	const json_uri = `https://gateway.ipfs.io/ipfs/${file_.path}`;
  		provider.engine.stop();*/
 	})



	

  	



  	

  	return express.Router();
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);

function getSignature(web3, address, account, seed, jsonURL){

	const data = web3.utils.soliditySha3(
      address,
      account,
      seed,
      jsonURL
    );

    // minter sign
    const signature = web3.eth.sign(data, accounts[1]);
    const r = signature.slice(0, 66);
    const s = '0x' + signature.slice(66, 130);
    let v = '0x' + signature.slice(130, 132);

   	return { _tokenId, _account, v, r, s, jsonURL }
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

async function seedClaimed(contract, seed, address) {
	return new Promise(async (resolve, reject) => {
		console.log(typeof(seed));
		var claimed = await contract.methods.seedClaimed(seed).call({from: address})
		.then((result) => {
  			resolve(result);
		});
		//console.log(claimed);
		//resolve(claimed)
	});
}

function getURI(json_data) {
	return new Promise(async (resolve, reject) => {

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