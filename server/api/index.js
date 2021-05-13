import dotenv  from "dotenv"
dotenv.config("../.env");
import abi from './conf/abi.json';
import cors from 'cors';
import express from 'express';
import fileupload from 'express-fileupload'


const Web3 = require("web3");
const helmet = require("helmet");
//const HDWalletProvider = require("@truffle/hdwallet-provider");
const createClient = require('ipfs-http-client');
const app = express();
const ipfs = createClient('https://ipfs.infura.io:5001');
const nthline = require('nthline');
const stateRecorder = './public/state.json'
var Web3WsProvider = require('web3-providers-ws');
var fs = require('fs');


//Declare various other constants
const LENGTH = 611;//We know the exact length
const filePath = './public/output.txt';
const filePath2 = './public/lined.txt';

let options = {
    timeout: 30000, // ms

    clientConfig: {
      // Useful if requests are large
      maxReceivedFrameSize: 100000000,   // bytes - default: 1MiB
      maxReceivedMessageSize: 100000000, // bytes - default: 8MiB

      // Useful to keep a connection alive
      keepalive: true,
      keepaliveInterval: 60000 // ms
    },

    // Enable auto reconnection if connection drops during request
    reconnect: {
        auto: true,
        delay: 5000, // ms
        maxAttempts: 5,
        onTimeout: false
    }
};

 
//Parse JSON 
app.use(express.json());
app.use(cors());

app.use(helmet(helmet.permittedCrossDomainPolicies({
    permittedPolicies: "all",
  })));
app.use(fileupload({limits: { fileSize: 50 * 1024 * 1024 },}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get('/api', (req, res) => {
	return res.send('Received a GET HTTP method');
});


app.options('/api/tokenCount', function (req, res) {
	handleCORS(req, res);
});

app.get('/api/tokenCount', (req, res) => {
	checkLockAndUpdate();

	var provider = new Web3WsProvider(process.env.NETWORK, options);

	res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
	const web3 = new Web3(provider);
	const contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);
	getTokenCount(contract)
	.then(function(count) {
		provider.disconnect();
		return res.send(JSON.stringify({count}));
	})
	return express.Router();
});

app.options('/api/seed', function (req, res) {
	handleCORS(req, res);
});

app.get('/api/seed', (req, res) => {
	checkLockAndUpdate();
	var provider = new Web3WsProvider(process.env.NETWORK, options);
	let seed = req.query.seed;
	const web3 = new Web3(provider);
	let address = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY).address;
	res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
	//Load private seed
	const contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);;
	try{
	seedClaimed(contract, seed, address)
 	.then(function(seeded) {
		var claimed = seeded == true;
		provider.disconnect();
		return res.send(JSON.stringify({claimed}));
	});
	} catch(e) {
		console.log(e);
		res.status(500);
		provider.disconnect();
		return res.send(JSON.stringify({error:"ERROR"}));
	}

	return express.Router();
});

app.options('/api/token', function (req, res) {
	handleCORS(req, res);
});

app.post('/api/token', (req, res) => {
	checkLockAndUpdate();
	var provider = new Web3WsProvider(process.env.NETWORK, options);
	res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
	const web3 = new Web3(provider);
	const contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);
	var id = req.body.id;

	id = Number(id);
	getTokenCount(contract)
 	.then(async function(count) {
		 
		if(id < count) {
			getOwnerAndURI(contract, id)
			.then(function(payload) {
				provider.disconnect();
				res.send(JSON.stringify(payload));
			});
		} else {
			res.status(404);
			provider.disconnect();
			return res.send("Token ID not found");
		}
	 })

	
	return express.Router();
});

app.options('/api/allTokens', function (req, res) {
	handleCORS(req, res);
});

app.post('/api/allTokens', (req, res) => {
	checkLockAndUpdate();
	let provider = new Web3WsProvider(process.env.NETWORK, options);
	var start = -1;
	var end = -1;
	if(req.body.end){
		start = Number(req.body.start);
		end = Number(req.body.end);
	}
	res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
	const web3 = new Web3(provider);
	const contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);
	let tokens = [];
	buildList(contract, start, end)
	.then(function(build) {
		return res.send(JSON.stringify(build));
	 })
	provider.disconnect();
	return express.Router();
});
app.options('/api/signature', function (req, res) {
	handleCORS(req, res);
});

app.post('/api/signature', (req, res) => {
	let rena_code_uri = "https://gateway.ipfs.io/ipfs/QmUBpyF944vfHn15veF3sX4XNfWnaogxR5LuN6aK49cdmw";
	checkLockAndUpdate(); 
	var rawdata = fs.readFileSync('./public/state.json');
	const state = JSON.parse(rawdata);

	var count = Number(state.count);
	if(count > 63 && req.body.rena) {
		var payload = {};
		res.status(401);
		payload.error = "Cannot mint – All Rena NFTs have been claimed";
		payload.mintable = false;
		return res.send(JSON.stringify(payload));
	}
	
	if(req.body.rena) {
		if(!canMint()) {
			var payload = {};
			var time = getTimeToMint();
			res.status(401);
			payload.error = "Cannot mint! Time lock engaged for " + time + " additional ms";
			payload.mintable = false;
			payload.time = time;
			return res.send(JSON.stringify(payload));
		} 
		req.body.nft.interactive_nft.code_uri = rena_code_uri;
		
	}
	var provider = new Web3WsProvider(process.env.NETWORK, options);
	res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')

  	const web3 = new Web3(provider);
  	var customer = req.body.customer;
	var address = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY).address;
  	//TODO: Need to verify JSON somewhere in here

  	var seed = "";
  	for(var i = 0; i < req.body.nft.attributes.length; i++){
		var attribute = req.body.nft.attributes[i];
		if(attribute["trait_type"] == "seed") {
				seed = attribute["value"];
		}
 	}	
	const contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);;
 	//Promise chain begins
 	seedClaimed(contract, seed, address)
 	.then(function(seeded) {

 		if(seeded){
 			//Seed exists, deny request
 			provider.disconnect();
 			res.status(401);
			return res.send(JSON.stringify({error:"Seed already exists! Choose a seed that doesn't already exist!"}));
 		} else {
	    	getURI(JSON.stringify(req.body.nft))
	    	.then(function(json_uri) {

		 		var signature =  getSignature(web3, process.env.CONTRACT_ADDRESS, customer, seed, json_uri)
				provider.disconnect();
		 		return res.send(JSON.stringify(signature));
	    	});
 		}
 	});

  	return express.Router();
});

app.options('/api/file', function (req, res) {
	handleCORS(req, res);
});

app.post('/api/file', (req, res) => {
	checkLockAndUpdate();
	//TODO: Add authorization to prevent this from being abused
	var file = req.files.file.data;
	getImageURL(file)
	.then(function(url) {
		return res.send(JSON.stringify(url));
	});
	return express.Router();
});

app.options('/api/randomLine', function (req, res) {
	handleCORS(req, res);
});

app.get('/api/randomLine', (req, res) => {
	checkLockAndUpdate();
  	const rowIndex = Math.floor(Math.random() * LENGTH);
	nthline(rowIndex, filePath)
	.then(function(line) {
		return res.send(JSON.stringify({line}));
	})
	return express.Router();
});

app.options('/api/randomDuneLine', function (req, res) {
	handleCORS(req, res);
});

app.get('/api/randomDuneLine', (req, res) => {
	checkLockAndUpdate();
  	const rowIndex = Math.floor(Math.random() * 152);
	nthline(rowIndex, filePath2)
	.then(function(line) {
		return res.send(JSON.stringify({line}));
	})
	return express.Router();
});

app.listen(process.env.PORT, () =>
  console.log(`App listening on port ${process.env.PORT}!`),
);

app.options('/api/canMint', function (req, res) {
	handleCORS(req, res);
});

app.get('/api/canMint', (req, res) => {
	var resp = {};
	resp.canMint = canMint();
	res.send(JSON.stringify(resp));
})

app.options('/api/mintTime', function (req, res) {
	handleCORS(req, res);
});

app.get('/api/mintTime', (req, res) => {
	var resp = {};
	resp.mintTime = getTimeToMint();

	res.send(JSON.stringify(resp));
})


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

async function getOwnerAndURI(contract, ide) {
	let tokenURI = await getTokenURI(contract, ide);
	let ownerAdd = await getOwnerOf(contract, ide);
	var payload = {
		tokenURI,
		id:ide,
		owner:ownerAdd,
		contract:process.env.CONTRACT_ADDRESS
	};
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

async function getTokenCount(contract) {
	return new Promise(async (resolve, reject) => {
		var count = await contract.methods.getTokenCount().call();
  		resolve(Number(count));
	});	
}

async function getOwnerOf(contract, ident) {
	return new Promise(async (resolve, reject) => {
		var owner = await contract.methods.ownerOf(ident).call();
  		resolve(owner);
	});	
}

async function getTokenURI(contract, id) {
	return new Promise(async (resolve, reject) => {
		var URI = await contract.methods.tokenURI(id).call();
  		resolve(URI);
	});	
}



async function buildList(contract, start=-1, end=-1){
	const count = await getTokenCount(contract);
	let tokens = [];
	if(end > count) {
		//Error handling
		return [];
	}
	if(end == -1 && start == -1) {
		//Default behavior with no slicing
		start = 0;
		end = count;
	}
	for(let i = start; i < end; i++) {
		let tokenURI = await getTokenURI(contract, i);
		let ownerAdd = await getOwnerOf(contract, i);
		tokens.push({
			tokenURI,
			id:i,
			owner:ownerAdd,
			contract: process.env.CONTRACT_ADDRESS
		});
	}
	return tokens;
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

async function getImageURL(image) {
	return new Promise(async (resolve, reject) => {
		await ipfs.add(image)
		.then((result => {
			resolve(`https://gateway.ipfs.io/ipfs/${result.path}`)
		}))
   }); 
}

function handleCORS(req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader('Access-Control-Allow-Methods', '*');
	res.setHeader("Access-Control-Allow-Headers", "*");
	res.end();
}

function canMint() {
	var rawdata = fs.readFileSync('./public/state.json');
	const state = JSON.parse(rawdata);
	const minute = 1000*60;
	const hour = minute *120;
	if(Date.now() > Number(state.time) + hour) {

		return true;
	}

	return false;
}

function getTimeToMint() {
	var rawdata = fs.readFileSync('./public/state.json');
	const state = JSON.parse(rawdata);
	var unlock = Number(state.time) + 120*1000*60;
	return (unlock - Date.now());
}

function checkLockAndUpdate() {
	var provider = new Web3WsProvider(process.env.NETWORK, options);
	const web3 = new Web3(provider);
	const contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);

	var rawdata = fs.readFileSync('./public/state.json');
	const state = JSON.parse(rawdata);

	var prevCount = Number(state.count);
	getTokenCount(contract)
	.then(function(newCount) {
		if(newCount > prevCount) {
			state.count = newCount; //Set count to new count
			state.time = Date.now();
			fs.writeFileSync(stateRecorder, JSON.stringify(state), err => {
				if (err) throw err; 	   
			});		
		}
	});

	provider.disconnect();
	
}
