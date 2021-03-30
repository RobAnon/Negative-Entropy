'use strict';

var dotenv = require('dotenv');
require('cors');
var express = require('express');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var dotenv__default = /*#__PURE__*/_interopDefaultLegacy(dotenv);
var express__default = /*#__PURE__*/_interopDefaultLegacy(express);

dotenv__default['default'].config("../.env");

var Web3 = require("web3");

var HDWalletProvider = require("@truffle/hdwallet-provider");

var app = express__default['default']();
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
  return res.send('POST HTTP method on user resource');
});
app.listen(process.env.PORT, function () {
  return console.log("Example app listening on port ".concat(process.env.PORT, "!"));
});
