'use strict';

var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var dotenv = require('dotenv');
var cors = require('cors');
var express = require('express');
require('fs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);
var dotenv__default = /*#__PURE__*/_interopDefaultLegacy(dotenv);
var cors__default = /*#__PURE__*/_interopDefaultLegacy(cors);
var express__default = /*#__PURE__*/_interopDefaultLegacy(express);

dotenv__default['default'].config("../.env");
var abi = [{
  inputs: [{
    internalType: "address payable",
    name: "_tA",
    type: "address"
  }, {
    internalType: "address",
    name: "_proxy",
    type: "address"
  }],
  stateMutability: "nonpayable",
  type: "constructor"
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: "address",
    name: "owner",
    type: "address"
  }, {
    indexed: true,
    internalType: "address",
    name: "approved",
    type: "address"
  }, {
    indexed: true,
    internalType: "uint256",
    name: "tokenId",
    type: "uint256"
  }],
  name: "Approval",
  type: "event"
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: "address",
    name: "owner",
    type: "address"
  }, {
    indexed: true,
    internalType: "address",
    name: "operator",
    type: "address"
  }, {
    indexed: false,
    internalType: "bool",
    name: "approved",
    type: "bool"
  }],
  name: "ApprovalForAll",
  type: "event"
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: "address",
    name: "previousOwner",
    type: "address"
  }, {
    indexed: true,
    internalType: "address",
    name: "newOwner",
    type: "address"
  }],
  name: "OwnershipTransferred",
  type: "event"
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: "bytes32",
    name: "role",
    type: "bytes32"
  }, {
    indexed: true,
    internalType: "bytes32",
    name: "previousAdminRole",
    type: "bytes32"
  }, {
    indexed: true,
    internalType: "bytes32",
    name: "newAdminRole",
    type: "bytes32"
  }],
  name: "RoleAdminChanged",
  type: "event"
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: "bytes32",
    name: "role",
    type: "bytes32"
  }, {
    indexed: true,
    internalType: "address",
    name: "account",
    type: "address"
  }, {
    indexed: true,
    internalType: "address",
    name: "sender",
    type: "address"
  }],
  name: "RoleGranted",
  type: "event"
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: "bytes32",
    name: "role",
    type: "bytes32"
  }, {
    indexed: true,
    internalType: "address",
    name: "account",
    type: "address"
  }, {
    indexed: true,
    internalType: "address",
    name: "sender",
    type: "address"
  }],
  name: "RoleRevoked",
  type: "event"
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: "address",
    name: "from",
    type: "address"
  }, {
    indexed: true,
    internalType: "address",
    name: "to",
    type: "address"
  }, {
    indexed: true,
    internalType: "uint256",
    name: "tokenId",
    type: "uint256"
  }],
  name: "Transfer",
  type: "event"
}, {
  inputs: [],
  name: "DEFAULT_ADMIN_ROLE",
  outputs: [{
    internalType: "bytes32",
    name: "",
    type: "bytes32"
  }],
  stateMutability: "view",
  type: "function",
  constant: true
}, {
  inputs: [],
  name: "MINTER_ROLE",
  outputs: [{
    internalType: "bytes32",
    name: "",
    type: "bytes32"
  }],
  stateMutability: "view",
  type: "function",
  constant: true
}, {
  inputs: [],
  name: "PRICE",
  outputs: [{
    internalType: "uint256",
    name: "",
    type: "uint256"
  }],
  stateMutability: "view",
  type: "function",
  constant: true
}, {
  inputs: [{
    internalType: "address",
    name: "to",
    type: "address"
  }, {
    internalType: "uint256",
    name: "tokenId",
    type: "uint256"
  }],
  name: "approve",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
}, {
  inputs: [{
    internalType: "address",
    name: "owner",
    type: "address"
  }],
  name: "balanceOf",
  outputs: [{
    internalType: "uint256",
    name: "",
    type: "uint256"
  }],
  stateMutability: "view",
  type: "function",
  constant: true
}, {
  inputs: [],
  name: "baseURI",
  outputs: [{
    internalType: "string",
    name: "",
    type: "string"
  }],
  stateMutability: "view",
  type: "function",
  constant: true
}, {
  inputs: [{
    internalType: "uint256",
    name: "tokenId",
    type: "uint256"
  }],
  name: "getApproved",
  outputs: [{
    internalType: "address",
    name: "",
    type: "address"
  }],
  stateMutability: "view",
  type: "function",
  constant: true
}, {
  inputs: [{
    internalType: "bytes32",
    name: "role",
    type: "bytes32"
  }],
  name: "getRoleAdmin",
  outputs: [{
    internalType: "bytes32",
    name: "",
    type: "bytes32"
  }],
  stateMutability: "view",
  type: "function",
  constant: true
}, {
  inputs: [{
    internalType: "bytes32",
    name: "role",
    type: "bytes32"
  }, {
    internalType: "uint256",
    name: "index",
    type: "uint256"
  }],
  name: "getRoleMember",
  outputs: [{
    internalType: "address",
    name: "",
    type: "address"
  }],
  stateMutability: "view",
  type: "function",
  constant: true
}, {
  inputs: [{
    internalType: "bytes32",
    name: "role",
    type: "bytes32"
  }],
  name: "getRoleMemberCount",
  outputs: [{
    internalType: "uint256",
    name: "",
    type: "uint256"
  }],
  stateMutability: "view",
  type: "function",
  constant: true
}, {
  inputs: [{
    internalType: "bytes32",
    name: "role",
    type: "bytes32"
  }, {
    internalType: "address",
    name: "account",
    type: "address"
  }],
  name: "grantRole",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
}, {
  inputs: [{
    internalType: "bytes32",
    name: "role",
    type: "bytes32"
  }, {
    internalType: "address",
    name: "account",
    type: "address"
  }],
  name: "hasRole",
  outputs: [{
    internalType: "bool",
    name: "",
    type: "bool"
  }],
  stateMutability: "view",
  type: "function",
  constant: true
}, {
  inputs: [{
    internalType: "address",
    name: "owner",
    type: "address"
  }, {
    internalType: "address",
    name: "operator",
    type: "address"
  }],
  name: "isApprovedForAll",
  outputs: [{
    internalType: "bool",
    name: "",
    type: "bool"
  }],
  stateMutability: "view",
  type: "function",
  constant: true
}, {
  inputs: [],
  name: "maxQuantity",
  outputs: [{
    internalType: "uint256",
    name: "",
    type: "uint256"
  }],
  stateMutability: "view",
  type: "function",
  constant: true
}, {
  inputs: [],
  name: "name",
  outputs: [{
    internalType: "string",
    name: "",
    type: "string"
  }],
  stateMutability: "view",
  type: "function",
  constant: true
}, {
  inputs: [],
  name: "owner",
  outputs: [{
    internalType: "address",
    name: "",
    type: "address"
  }],
  stateMutability: "view",
  type: "function",
  constant: true
}, {
  inputs: [{
    internalType: "uint256",
    name: "tokenId",
    type: "uint256"
  }],
  name: "ownerOf",
  outputs: [{
    internalType: "address",
    name: "",
    type: "address"
  }],
  stateMutability: "view",
  type: "function",
  constant: true
}, {
  inputs: [],
  name: "renounceOwnership",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
}, {
  inputs: [{
    internalType: "bytes32",
    name: "role",
    type: "bytes32"
  }, {
    internalType: "address",
    name: "account",
    type: "address"
  }],
  name: "renounceRole",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
}, {
  inputs: [{
    internalType: "bytes32",
    name: "role",
    type: "bytes32"
  }, {
    internalType: "address",
    name: "account",
    type: "address"
  }],
  name: "revokeRole",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
}, {
  inputs: [{
    internalType: "address",
    name: "from",
    type: "address"
  }, {
    internalType: "address",
    name: "to",
    type: "address"
  }, {
    internalType: "uint256",
    name: "tokenId",
    type: "uint256"
  }],
  name: "safeTransferFrom",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
}, {
  inputs: [{
    internalType: "address",
    name: "from",
    type: "address"
  }, {
    internalType: "address",
    name: "to",
    type: "address"
  }, {
    internalType: "uint256",
    name: "tokenId",
    type: "uint256"
  }, {
    internalType: "bytes",
    name: "_data",
    type: "bytes"
  }],
  name: "safeTransferFrom",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
}, {
  inputs: [{
    internalType: "address",
    name: "operator",
    type: "address"
  }, {
    internalType: "bool",
    name: "approved",
    type: "bool"
  }],
  name: "setApprovalForAll",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
}, {
  inputs: [{
    internalType: "bytes4",
    name: "interfaceId",
    type: "bytes4"
  }],
  name: "supportsInterface",
  outputs: [{
    internalType: "bool",
    name: "",
    type: "bool"
  }],
  stateMutability: "view",
  type: "function",
  constant: true
}, {
  inputs: [],
  name: "symbol",
  outputs: [{
    internalType: "string",
    name: "",
    type: "string"
  }],
  stateMutability: "view",
  type: "function",
  constant: true
}, {
  inputs: [{
    internalType: "uint256",
    name: "index",
    type: "uint256"
  }],
  name: "tokenByIndex",
  outputs: [{
    internalType: "uint256",
    name: "",
    type: "uint256"
  }],
  stateMutability: "view",
  type: "function",
  constant: true
}, {
  inputs: [{
    internalType: "address",
    name: "owner",
    type: "address"
  }, {
    internalType: "uint256",
    name: "index",
    type: "uint256"
  }],
  name: "tokenOfOwnerByIndex",
  outputs: [{
    internalType: "uint256",
    name: "",
    type: "uint256"
  }],
  stateMutability: "view",
  type: "function",
  constant: true
}, {
  inputs: [{
    internalType: "uint256",
    name: "tokenId",
    type: "uint256"
  }],
  name: "tokenURI",
  outputs: [{
    internalType: "string",
    name: "",
    type: "string"
  }],
  stateMutability: "view",
  type: "function",
  constant: true
}, {
  inputs: [],
  name: "totalSupply",
  outputs: [{
    internalType: "uint256",
    name: "",
    type: "uint256"
  }],
  stateMutability: "view",
  type: "function",
  constant: true
}, {
  inputs: [{
    internalType: "address",
    name: "from",
    type: "address"
  }, {
    internalType: "address",
    name: "to",
    type: "address"
  }, {
    internalType: "uint256",
    name: "tokenId",
    type: "uint256"
  }],
  name: "transferFrom",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
}, {
  inputs: [{
    internalType: "address",
    name: "newOwner",
    type: "address"
  }],
  name: "transferOwnership",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
}, {
  inputs: [],
  name: "treasuryAddress",
  outputs: [{
    internalType: "address payable",
    name: "",
    type: "address"
  }],
  stateMutability: "view",
  type: "function",
  constant: true
}, {
  inputs: [{
    internalType: "address payable",
    name: "to",
    type: "address"
  }, {
    internalType: "uint8",
    name: "v",
    type: "uint8"
  }, {
    internalType: "bytes32",
    name: "r",
    type: "bytes32"
  }, {
    internalType: "bytes32",
    name: "s",
    type: "bytes32"
  }, {
    internalType: "string",
    name: "tokenURI",
    type: "string"
  }, {
    internalType: "string",
    name: "seedDesired",
    type: "string"
  }],
  name: "mint",
  outputs: [],
  stateMutability: "payable",
  type: "function",
  payable: true
}, {
  inputs: [{
    internalType: "string",
    name: "seed",
    type: "string"
  }, {
    internalType: "string",
    name: "tokenURI",
    type: "string"
  }, {
    internalType: "address",
    name: "account",
    type: "address"
  }, {
    internalType: "uint8",
    name: "v",
    type: "uint8"
  }, {
    internalType: "bytes32",
    name: "r",
    type: "bytes32"
  }, {
    internalType: "bytes32",
    name: "s",
    type: "bytes32"
  }],
  name: "addressFromSignature",
  outputs: [{
    internalType: "address",
    name: "",
    type: "address"
  }],
  stateMutability: "view",
  type: "function",
  constant: true
}, {
  inputs: [{
    internalType: "uint256",
    name: "tokenId",
    type: "uint256"
  }],
  name: "burn",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
}, {
  inputs: [{
    internalType: "string",
    name: "checkSeed",
    type: "string"
  }],
  name: "seedClaimed",
  outputs: [{
    internalType: "bool",
    name: "",
    type: "bool"
  }],
  stateMutability: "view",
  type: "function",
  constant: true
}, {
  inputs: [],
  name: "getTokenCount",
  outputs: [{
    internalType: "uint256",
    name: "",
    type: "uint256"
  }],
  stateMutability: "view",
  type: "function",
  constant: true
}, {
  inputs: [{
    internalType: "uint256",
    name: "quant",
    type: "uint256"
  }],
  name: "setMaxQuantity",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
}];

var Web3 = require("web3");

var helmet = require("helmet");

var HDWalletProvider = require("@truffle/hdwallet-provider");

var createClient = require('ipfs-http-client');

var app = express__default['default']();
var ipfs = createClient('https://ipfs.infura.io:5001'); //Parse JSON 

app.use(express__default['default'].json());
app.use(cors__default['default']());
app.use(helmet());
app.get('/api', function (req, res) {
  return res.send('Received a GET HTTP method');
});
app.get('/api/tokenCount', function (req, res) {
  var provider = new HDWalletProvider({
    privateKeys: [process.env.PRIVATE_KEY],
    providerOrUrl: process.env.NETWORK
  });
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  var web3 = new Web3(provider);
  var contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);
  getTokenCount(contract).then(function (count) {
    provider.engine.stop();
    return res.send(JSON.stringify({
      count: count
    }));
  });
  return express__default['default'].Router();
});
app.post('/api/token', function (req, res) {
  var provider = new HDWalletProvider({
    privateKeys: [process.env.PRIVATE_KEY],
    providerOrUrl: process.env.NETWORK
  });
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  var web3 = new Web3(provider);
  var contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);
  var id = req.body.id;
  console.log("Id is " + id);
  getTokenCount(contract).then( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee(count) {
      return _regeneratorRuntime__default['default'].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(id < count)) {
                _context.next = 4;
                break;
              }

              getOwnerAndURI(contract, id).then(function (payload) {
                provider.engine.stop();
                res.send(JSON.stringify(payload));
              });
              _context.next = 7;
              break;

            case 4:
              res.status(404);
              provider.engine.stop();
              return _context.abrupt("return", res.send("Token ID not found"));

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  return express__default['default'].Router();
});
app.post('/api/allTokens', function (req, res) {
  var provider = new HDWalletProvider({
    privateKeys: [process.env.PRIVATE_KEY],
    providerOrUrl: process.env.NETWORK
  });
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  var web3 = new Web3(provider);
  var contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);
  buildList(contract).then(function (build) {
    return res.send(JSON.stringify(build));
  });
  provider.engine.stop();
  return express__default['default'].Router();
});
app.post('/api/signature', function (req, res) {
  var provider = new HDWalletProvider({
    privateKeys: [process.env.PRIVATE_KEY],
    providerOrUrl: process.env.NETWORK
  });
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  var web3 = new Web3(provider);
  var customer = req.body.customer;
  var address; //TODO: Need to verify JSON somewhere in here

  var seed = "";

  for (var i = 0; i < req.body.nft.attributes.length; i++) {
    var attribute = req.body.nft.attributes[i];

    if (attribute["trait_type"] == "seed") {
      seed = attribute["value"];
    }
  } //Promise chain begins


  getAccounts(web3).then(function (accounts) {
    address = accounts[0];
    var contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);
    return seedClaimed(contract, seed, address);
  }).then(function (seeded) {
    if (seeded) {
      //Seed exists, deny request
      provider.engine.stop();
      res.status(401);
      return res.send("Seed already exists! Choose a seed that doesn't already exist!");
    } else {
      //console.log(json_uri);
      getURI(JSON.stringify(req.body.nft)).then(function (json_uri) {
        var signature = getSignature(web3, process.env.CONTRACT_ADDRESS, customer, seed, json_uri);
        return res.send(JSON.stringify(signature));
      });
      provider.engine.stop();
    }
  });
  return express__default['default'].Router();
});
app.listen(process.env.PORT, function () {
  return console.log("App listening on port ".concat(process.env.PORT, "!"));
}); //TODO: Consider also signing with image we want

function getSignature(web3, address, account, seed, jsonURL) {
  //Address = contact address
  //account = signing account (THEIR account – need to get in request)
  var data = web3.utils.soliditySha3({
    type: 'address',
    value: address
  }, {
    type: 'address',
    value: account
  }, {
    type: 'string',
    value: seed
  }, {
    type: 'string',
    value: jsonURL
  }); // minter sign

  var signature = web3.eth.accounts.sign(data, process.env.PRIVATE_KEY);
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

function getOwnerAndURI(_x2, _x3) {
  return _getOwnerAndURI.apply(this, arguments);
}

function _getOwnerAndURI() {
  _getOwnerAndURI = _asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee2(contract, ide) {
    var tokenURI, ownerAdd, payload;
    return _regeneratorRuntime__default['default'].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getTokenURI(contract, ide);

          case 2:
            tokenURI = _context2.sent;
            _context2.next = 5;
            return getOwnerOf(contract, ide);

          case 5:
            ownerAdd = _context2.sent;
            payload = {
              tokenURI: tokenURI,
              id: ide,
              owner: ownerAdd,
              contract: process.env.CONTRACT_ADDRESS
            };
            return _context2.abrupt("return", payload);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getOwnerAndURI.apply(this, arguments);
}

function getAccounts(_x4) {
  return _getAccounts.apply(this, arguments);
}

function _getAccounts() {
  _getAccounts = _asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee4(web3) {
    return _regeneratorRuntime__default['default'].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", new Promise( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee3(resolve, reject) {
                var accounts;
                return _regeneratorRuntime__default['default'].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return web3.eth.getAccounts();

                      case 2:
                        accounts = _context3.sent;

                        if (accounts.length) {
                          _context3.next = 5;
                          break;
                        }

                        throw new Error('Please connect an address use for minting.');

                      case 5:
                        resolve(accounts);

                      case 6:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x15, _x16) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getAccounts.apply(this, arguments);
}

function getTokenCount(_x5) {
  return _getTokenCount.apply(this, arguments);
}

function _getTokenCount() {
  _getTokenCount = _asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee6(contract) {
    return _regeneratorRuntime__default['default'].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", new Promise( /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee5(resolve, reject) {
                var count;
                return _regeneratorRuntime__default['default'].wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return contract.methods.getTokenCount().call();

                      case 2:
                        count = _context5.sent;
                        resolve(count);

                      case 4:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));

              return function (_x17, _x18) {
                return _ref3.apply(this, arguments);
              };
            }()));

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _getTokenCount.apply(this, arguments);
}

function getOwnerOf(_x6, _x7) {
  return _getOwnerOf.apply(this, arguments);
}

function _getOwnerOf() {
  _getOwnerOf = _asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee8(contract, ident) {
    return _regeneratorRuntime__default['default'].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            console.log(ident);
            return _context8.abrupt("return", new Promise( /*#__PURE__*/function () {
              var _ref4 = _asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee7(resolve, reject) {
                var owner;
                return _regeneratorRuntime__default['default'].wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.next = 2;
                        return contract.methods.ownerOf(ident).call();

                      case 2:
                        owner = _context7.sent;
                        resolve(owner);

                      case 4:
                      case "end":
                        return _context7.stop();
                    }
                  }
                }, _callee7);
              }));

              return function (_x19, _x20) {
                return _ref4.apply(this, arguments);
              };
            }()));

          case 2:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _getOwnerOf.apply(this, arguments);
}

function getTokenURI(_x8, _x9) {
  return _getTokenURI.apply(this, arguments);
}

function _getTokenURI() {
  _getTokenURI = _asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee10(contract, id) {
    return _regeneratorRuntime__default['default'].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            return _context10.abrupt("return", new Promise( /*#__PURE__*/function () {
              var _ref5 = _asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee9(resolve, reject) {
                var URI;
                return _regeneratorRuntime__default['default'].wrap(function _callee9$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        _context9.next = 2;
                        return contract.methods.tokenURI(id).call();

                      case 2:
                        URI = _context9.sent;
                        resolve(URI);

                      case 4:
                      case "end":
                        return _context9.stop();
                    }
                  }
                }, _callee9);
              }));

              return function (_x21, _x22) {
                return _ref5.apply(this, arguments);
              };
            }()));

          case 1:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return _getTokenURI.apply(this, arguments);
}

function buildList(_x10) {
  return _buildList.apply(this, arguments);
} //NOTE: Having from in here is very important


function _buildList() {
  _buildList = _asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee11(contract) {
    var count, tokens, i, tokenURI, ownerAdd;
    return _regeneratorRuntime__default['default'].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return getTokenCount(contract);

          case 2:
            count = _context11.sent;
            tokens = [];
            i = 0;

          case 5:
            if (!(i < count)) {
              _context11.next = 17;
              break;
            }

            console.log("token " + i + " of " + count);
            _context11.next = 9;
            return getTokenURI(contract, i);

          case 9:
            tokenURI = _context11.sent;
            _context11.next = 12;
            return getOwnerOf(contract, i);

          case 12:
            ownerAdd = _context11.sent;
            tokens.push({
              tokenURI: tokenURI,
              id: i,
              owner: ownerAdd,
              contract: process.env.CONTRACT_ADDRESS
            });

          case 14:
            i++;
            _context11.next = 5;
            break;

          case 17:
            return _context11.abrupt("return", tokens);

          case 18:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));
  return _buildList.apply(this, arguments);
}

function seedClaimed(_x11, _x12, _x13) {
  return _seedClaimed.apply(this, arguments);
}

function _seedClaimed() {
  _seedClaimed = _asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee13(contract, seed, address) {
    return _regeneratorRuntime__default['default'].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            return _context13.abrupt("return", new Promise( /*#__PURE__*/function () {
              var _ref6 = _asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee12(resolve, reject) {
                return _regeneratorRuntime__default['default'].wrap(function _callee12$(_context12) {
                  while (1) {
                    switch (_context12.prev = _context12.next) {
                      case 0:
                        _context12.next = 2;
                        return contract.methods.seedClaimed(seed).call({
                          from: address
                        }).then(function (result) {
                          resolve(result);
                        });

                      case 2:
                        _context12.sent;

                      case 3:
                      case "end":
                        return _context12.stop();
                    }
                  }
                }, _callee12);
              }));

              return function (_x23, _x24) {
                return _ref6.apply(this, arguments);
              };
            }()));

          case 1:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));
  return _seedClaimed.apply(this, arguments);
}

function getURI(_x14) {
  return _getURI.apply(this, arguments);
}

function _getURI() {
  _getURI = _asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee15(data) {
    return _regeneratorRuntime__default['default'].wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            return _context15.abrupt("return", new Promise( /*#__PURE__*/function () {
              var _ref7 = _asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee14(resolve, reject) {
                return _regeneratorRuntime__default['default'].wrap(function _callee14$(_context14) {
                  while (1) {
                    switch (_context14.prev = _context14.next) {
                      case 0:
                        _context14.next = 2;
                        return ipfs.add(data).then(function (result) {
                          resolve("https://gateway.ipfs.io/ipfs/".concat(result.path));
                        });

                      case 2:
                      case "end":
                        return _context14.stop();
                    }
                  }
                }, _callee14);
              }));

              return function (_x25, _x26) {
                return _ref7.apply(this, arguments);
              };
            }()));

          case 1:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }));
  return _getURI.apply(this, arguments);
}
