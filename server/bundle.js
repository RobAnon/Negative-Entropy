'use strict';

var _typeof = require('@babel/runtime/helpers/typeof');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var dotenv = require('dotenv');
require('cors');
var express = require('express');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _typeof__default = /*#__PURE__*/_interopDefaultLegacy(_typeof);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);
var dotenv__default = /*#__PURE__*/_interopDefaultLegacy(dotenv);
var express__default = /*#__PURE__*/_interopDefaultLegacy(express);

dotenv__default['default'].config("../.env");
var abi = [{
  inputs: [{
    internalType: "address payable",
    name: "_tA",
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
    indexed: false,
    internalType: "address",
    name: "account",
    type: "address"
  }],
  name: "Paused",
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
  anonymous: false,
  inputs: [{
    indexed: false,
    internalType: "address",
    name: "account",
    type: "address"
  }],
  name: "Unpaused",
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
  type: "function"
}, {
  inputs: [],
  name: "MINTER_ROLE",
  outputs: [{
    internalType: "bytes32",
    name: "",
    type: "bytes32"
  }],
  stateMutability: "view",
  type: "function"
}, {
  inputs: [],
  name: "PAUSER_ROLE",
  outputs: [{
    internalType: "bytes32",
    name: "",
    type: "bytes32"
  }],
  stateMutability: "view",
  type: "function"
}, {
  inputs: [],
  name: "PRICE",
  outputs: [{
    internalType: "uint256",
    name: "",
    type: "uint256"
  }],
  stateMutability: "view",
  type: "function"
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
  type: "function"
}, {
  inputs: [],
  name: "baseURI",
  outputs: [{
    internalType: "string",
    name: "",
    type: "string"
  }],
  stateMutability: "view",
  type: "function"
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
  type: "function"
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
  type: "function"
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
  type: "function"
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
  type: "function"
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
  type: "function"
}, {
  inputs: [],
  name: "maxQuantity",
  outputs: [{
    internalType: "uint256",
    name: "",
    type: "uint256"
  }],
  stateMutability: "view",
  type: "function"
}, {
  inputs: [],
  name: "name",
  outputs: [{
    internalType: "string",
    name: "",
    type: "string"
  }],
  stateMutability: "view",
  type: "function"
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
  type: "function"
}, {
  inputs: [],
  name: "paused",
  outputs: [{
    internalType: "bool",
    name: "",
    type: "bool"
  }],
  stateMutability: "view",
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
  type: "function"
}, {
  inputs: [],
  name: "symbol",
  outputs: [{
    internalType: "string",
    name: "",
    type: "string"
  }],
  stateMutability: "view",
  type: "function"
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
  type: "function"
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
  type: "function"
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
  type: "function"
}, {
  inputs: [],
  name: "totalSupply",
  outputs: [{
    internalType: "uint256",
    name: "",
    type: "uint256"
  }],
  stateMutability: "view",
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
  name: "transferFrom",
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
  type: "function"
}, {
  inputs: [{
    internalType: "uint256",
    name: "tokenId",
    type: "uint256"
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
  type: "function"
}, {
  inputs: [{
    internalType: "address",
    name: "to",
    type: "address"
  }],
  name: "mint",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
}, {
  inputs: [{
    internalType: "uint256",
    name: "tokenId",
    type: "uint256"
  }, {
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
  }],
  name: "mint",
  outputs: [],
  stateMutability: "payable",
  type: "function"
}, {
  inputs: [{
    internalType: "uint256",
    name: "_tokenId",
    type: "uint256"
  }, {
    internalType: "address",
    name: "_to",
    type: "address"
  }, {
    internalType: "string",
    name: "_tokenURI",
    type: "string"
  }],
  name: "mint",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
}, {
  inputs: [],
  name: "pause",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
}, {
  inputs: [],
  name: "unpause",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
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
  type: "function"
}, {
  inputs: [{
    internalType: "address",
    name: "_address",
    type: "address"
  }],
  name: "isMinter",
  outputs: [{
    internalType: "bool",
    name: "",
    type: "bool"
  }],
  stateMutability: "view",
  type: "function"
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

var HDWalletProvider = require("@truffle/hdwallet-provider");

var app = express__default['default'](); //Parse JSON 

app.use(express__default['default'].json());
app.get('/', function (req, res) {
  var provider = new HDWalletProvider({
    privateKeys: [process.env.PRIVATE_KEY],
    providerOrUrl: process.env.NETWORK,
    pollingInterval: 10000
  });
  var web3 = new Web3(provider);
  var response = web3.eth.accounts.sign("Hello world!", process.env.PRIVATE_KEY);
  provider.engine.stop();
  res.send(response);
});
app.post('/signature', function (req, res) {
  var provider = new HDWalletProvider({
    privateKeys: [process.env.PRIVATE_KEY],
    providerOrUrl: process.env.NETWORK
  });
  var web3 = new Web3(provider);
  var address; //TODO: Need to verify JSON somewhere in here

  var seed = "";

  for (var i = 0; i < req.body.attributes.length; i++) {
    var attribute = req.body.attributes[i];

    if (attribute["trait_type"] == "seed") {
      seed = attribute["value"];
    }
  } //Promise chain begins


  getAccounts(web3).then(function (accounts) {
    address = accounts[0];
    console.log(address);
    var contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);
    return seedClaimed(contract, seed, address);
  }).then(function (seeded) {
    console.log("seed is claimed: " + seeded);
    var signature = web3.eth.accounts.sign(seed, process.env.PRIVATE_KEY);
    return res.send(signature);
    /*file_ = await ipfs.add(JSON.stringify(data));
     	const json_uri = `https://gateway.ipfs.io/ipfs/${file_.path}`;
    	provider.engine.stop();*/
  });
  return express__default['default'].Router();
});
app.listen(process.env.PORT, function () {
  return console.log("Example app listening on port ".concat(process.env.PORT, "!"));
});

function getAccounts(_x) {
  return _getAccounts.apply(this, arguments);
}

function _getAccounts() {
  _getAccounts = _asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee3(web3) {
    return _regeneratorRuntime__default['default'].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", new Promise( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee2(resolve, reject) {
                var accounts;
                return _regeneratorRuntime__default['default'].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return web3.eth.getAccounts();

                      case 2:
                        accounts = _context2.sent;

                        if (accounts.length) {
                          _context2.next = 5;
                          break;
                        }

                        throw new Error('Please connect an address use for minting.');

                      case 5:
                        resolve(accounts);

                      case 6:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x7, _x8) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getAccounts.apply(this, arguments);
}

function seedClaimed(_x2, _x3, _x4) {
  return _seedClaimed.apply(this, arguments);
}

function _seedClaimed() {
  _seedClaimed = _asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee5(contract, seed, address) {
    return _regeneratorRuntime__default['default'].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", new Promise( /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee4(resolve, reject) {
                return _regeneratorRuntime__default['default'].wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        console.log(_typeof__default['default'](seed));
                        _context4.next = 3;
                        return contract.methods.seedClaimed(seed).call({
                          from: address
                        }).then(function (result) {
                          resolve(result);
                        });

                      case 3:
                        _context4.sent;

                      case 4:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x9, _x10) {
                return _ref3.apply(this, arguments);
              };
            }()));

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _seedClaimed.apply(this, arguments);
}
