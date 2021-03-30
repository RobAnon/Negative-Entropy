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