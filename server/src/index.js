import dotenv  from "dotenv"
dotenv.config("../.env");
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
		providerOrUrl: process.env.NETWORK, 
		pollingInterval:10000
	});
  	const web3 = new Web3(provider);

  	var seed = "";
  	for(var i = 0; i < req.body.attributes.length; i++){
  		var attribute = req.body.attributes[i];
  		if(attribute["trait_type"] == "seed") {
  			seed = attribute["value"];
  		}
 	 }




  	var response =  web3.eth.accounts.sign(seed, process.env.PRIVATE_KEY);
  	provider.engine.stop();

  	return res.send(response);
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