'use strict';

require('fs');

/**
 * Returns a Promise that resolves to the value of window.ethereum if it is
 * set within the given timeout, or null.
 * The Promise will not reject, but an error will be thrown if invalid options
 * are provided.
 *
 * @param options - Options bag.
 * @param options.mustBeMetaMask - Whether to only look for MetaMask providers.
 * Default: false
 * @param options.silent - Whether to silence console errors. Does not affect
 * thrown errors. Default: false
 * @param options.timeout - Milliseconds to wait for 'ethereum#initialized' to
 * be dispatched. Default: 3000
 * @returns A Promise that resolves with the Provider if it is detected within
 * given timeout, otherwise null.
 */
function detectEthereumProvider({ mustBeMetaMask = false, silent = false, timeout = 3000, } = {}) {
    _validateInputs();
    let handled = false;
    return new Promise((resolve) => {
        if (window.ethereum) {
            handleEthereum();
        }
        else {
            window.addEventListener('ethereum#initialized', handleEthereum, { once: true });
            setTimeout(() => {
                handleEthereum();
            }, timeout);
        }
        function handleEthereum() {
            if (handled) {
                return;
            }
            handled = true;
            window.removeEventListener('ethereum#initialized', handleEthereum);
            const { ethereum } = window;
            if (ethereum && (!mustBeMetaMask || ethereum.isMetaMask)) {
                resolve(ethereum);
            }
            else {
                const message = mustBeMetaMask && ethereum
                    ? 'Non-MetaMask window.ethereum detected.'
                    : 'Unable to detect window.ethereum.';
                !silent && console.error('@metamask/detect-provider:', message);
                resolve(null);
            }
        }
    });
    function _validateInputs() {
        if (typeof mustBeMetaMask !== 'boolean') {
            throw new Error(`@metamask/detect-provider: Expected option 'mustBeMetaMask' to be a boolean.`);
        }
        if (typeof silent !== 'boolean') {
            throw new Error(`@metamask/detect-provider: Expected option 'silent' to be a boolean.`);
        }
        if (typeof timeout !== 'number') {
            throw new Error(`@metamask/detect-provider: Expected option 'timeout' to be a number.`);
        }
    }
}
var dist = detectEthereumProvider;

var abi = [
	{
		inputs: [
			{
				internalType: "address payable",
				name: "_tA",
				type: "address"
			},
			{
				internalType: "address",
				name: "_proxy",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "approved",
				type: "address"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "operator",
				type: "address"
			},
			{
				indexed: false,
				internalType: "bool",
				name: "approved",
				type: "bool"
			}
		],
		name: "ApprovalForAll",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "OwnershipTransferred",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "role",
				type: "bytes32"
			},
			{
				indexed: true,
				internalType: "bytes32",
				name: "previousAdminRole",
				type: "bytes32"
			},
			{
				indexed: true,
				internalType: "bytes32",
				name: "newAdminRole",
				type: "bytes32"
			}
		],
		name: "RoleAdminChanged",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "role",
				type: "bytes32"
			},
			{
				indexed: true,
				internalType: "address",
				name: "account",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			}
		],
		name: "RoleGranted",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "role",
				type: "bytes32"
			},
			{
				indexed: true,
				internalType: "address",
				name: "account",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			}
		],
		name: "RoleRevoked",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event"
	},
	{
		inputs: [
		],
		name: "DEFAULT_ADMIN_ROLE",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		stateMutability: "view",
		type: "function",
		constant: true
	},
	{
		inputs: [
		],
		name: "MINTER_ROLE",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		stateMutability: "view",
		type: "function",
		constant: true
	},
	{
		inputs: [
		],
		name: "PRICE",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function",
		constant: true
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function",
		constant: true
	},
	{
		inputs: [
		],
		name: "baseURI",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function",
		constant: true
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "getApproved",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function",
		constant: true
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32"
			}
		],
		name: "getRoleAdmin",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		stateMutability: "view",
		type: "function",
		constant: true
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32"
			},
			{
				internalType: "uint256",
				name: "index",
				type: "uint256"
			}
		],
		name: "getRoleMember",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function",
		constant: true
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32"
			}
		],
		name: "getRoleMemberCount",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function",
		constant: true
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "grantRole",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "hasRole",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function",
		constant: true
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "operator",
				type: "address"
			}
		],
		name: "isApprovedForAll",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function",
		constant: true
	},
	{
		inputs: [
		],
		name: "maxQuantity",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function",
		constant: true
	},
	{
		inputs: [
		],
		name: "name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function",
		constant: true
	},
	{
		inputs: [
		],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function",
		constant: true
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "ownerOf",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function",
		constant: true
	},
	{
		inputs: [
		],
		name: "renounceOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "renounceRole",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "revokeRole",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "safeTransferFrom",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			},
			{
				internalType: "bytes",
				name: "_data",
				type: "bytes"
			}
		],
		name: "safeTransferFrom",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "operator",
				type: "address"
			},
			{
				internalType: "bool",
				name: "approved",
				type: "bool"
			}
		],
		name: "setApprovalForAll",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes4",
				name: "interfaceId",
				type: "bytes4"
			}
		],
		name: "supportsInterface",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function",
		constant: true
	},
	{
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function",
		constant: true
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "index",
				type: "uint256"
			}
		],
		name: "tokenByIndex",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function",
		constant: true
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "index",
				type: "uint256"
			}
		],
		name: "tokenOfOwnerByIndex",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function",
		constant: true
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "tokenURI",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function",
		constant: true
	},
	{
		inputs: [
		],
		name: "totalSupply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function",
		constant: true
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "transferOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "treasuryAddress",
		outputs: [
			{
				internalType: "address payable",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function",
		constant: true
	},
	{
		inputs: [
			{
				internalType: "address payable",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			},
			{
				internalType: "string",
				name: "tokenURI",
				type: "string"
			},
			{
				internalType: "string",
				name: "seedDesired",
				type: "string"
			}
		],
		name: "mint",
		outputs: [
		],
		stateMutability: "payable",
		type: "function",
		payable: true
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "seed",
				type: "string"
			},
			{
				internalType: "string",
				name: "tokenURI",
				type: "string"
			},
			{
				internalType: "address",
				name: "account",
				type: "address"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "addressFromSignature",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function",
		constant: true
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "burn",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "checkSeed",
				type: "string"
			}
		],
		name: "seedClaimed",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function",
		constant: true
	},
	{
		inputs: [
		],
		name: "getTokenCount",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function",
		constant: true
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "quant",
				type: "uint256"
			}
		],
		name: "setMaxQuantity",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	}
];

async function initProvider(app) {
  // detect provider
  const provider = await dist();

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



  console.log(contract);

  app.set({
    web3,
    contract,
    provider,
    account,
  });
  app = app;
}

const ipfs = {
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
      throw e;
    }
  },
  client() {
    return this.ipfsClient;
  },
};

exports.initProvider = initProvider;
exports.ipfs = ipfs;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMtMWE4Y2M2NWIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AbWV0YW1hc2svZGV0ZWN0LXByb3ZpZGVyL2Rpc3QvaW5kZXguanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy91dGlscy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogUmV0dXJucyBhIFByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgdmFsdWUgb2Ygd2luZG93LmV0aGVyZXVtIGlmIGl0IGlzXG4gKiBzZXQgd2l0aGluIHRoZSBnaXZlbiB0aW1lb3V0LCBvciBudWxsLlxuICogVGhlIFByb21pc2Ugd2lsbCBub3QgcmVqZWN0LCBidXQgYW4gZXJyb3Igd2lsbCBiZSB0aHJvd24gaWYgaW52YWxpZCBvcHRpb25zXG4gKiBhcmUgcHJvdmlkZWQuXG4gKlxuICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25zIGJhZy5cbiAqIEBwYXJhbSBvcHRpb25zLm11c3RCZU1ldGFNYXNrIC0gV2hldGhlciB0byBvbmx5IGxvb2sgZm9yIE1ldGFNYXNrIHByb3ZpZGVycy5cbiAqIERlZmF1bHQ6IGZhbHNlXG4gKiBAcGFyYW0gb3B0aW9ucy5zaWxlbnQgLSBXaGV0aGVyIHRvIHNpbGVuY2UgY29uc29sZSBlcnJvcnMuIERvZXMgbm90IGFmZmVjdFxuICogdGhyb3duIGVycm9ycy4gRGVmYXVsdDogZmFsc2VcbiAqIEBwYXJhbSBvcHRpb25zLnRpbWVvdXQgLSBNaWxsaXNlY29uZHMgdG8gd2FpdCBmb3IgJ2V0aGVyZXVtI2luaXRpYWxpemVkJyB0b1xuICogYmUgZGlzcGF0Y2hlZC4gRGVmYXVsdDogMzAwMFxuICogQHJldHVybnMgQSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgUHJvdmlkZXIgaWYgaXQgaXMgZGV0ZWN0ZWQgd2l0aGluXG4gKiBnaXZlbiB0aW1lb3V0LCBvdGhlcndpc2UgbnVsbC5cbiAqL1xuZnVuY3Rpb24gZGV0ZWN0RXRoZXJldW1Qcm92aWRlcih7IG11c3RCZU1ldGFNYXNrID0gZmFsc2UsIHNpbGVudCA9IGZhbHNlLCB0aW1lb3V0ID0gMzAwMCwgfSA9IHt9KSB7XG4gICAgX3ZhbGlkYXRlSW5wdXRzKCk7XG4gICAgbGV0IGhhbmRsZWQgPSBmYWxzZTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgaWYgKHdpbmRvdy5ldGhlcmV1bSkge1xuICAgICAgICAgICAgaGFuZGxlRXRoZXJldW0oKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdldGhlcmV1bSNpbml0aWFsaXplZCcsIGhhbmRsZUV0aGVyZXVtLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBoYW5kbGVFdGhlcmV1bSgpO1xuICAgICAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlRXRoZXJldW0oKSB7XG4gICAgICAgICAgICBpZiAoaGFuZGxlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGhhbmRsZWQgPSB0cnVlO1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2V0aGVyZXVtI2luaXRpYWxpemVkJywgaGFuZGxlRXRoZXJldW0pO1xuICAgICAgICAgICAgY29uc3QgeyBldGhlcmV1bSB9ID0gd2luZG93O1xuICAgICAgICAgICAgaWYgKGV0aGVyZXVtICYmICghbXVzdEJlTWV0YU1hc2sgfHwgZXRoZXJldW0uaXNNZXRhTWFzaykpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGV0aGVyZXVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBtdXN0QmVNZXRhTWFzayAmJiBldGhlcmV1bVxuICAgICAgICAgICAgICAgICAgICA/ICdOb24tTWV0YU1hc2sgd2luZG93LmV0aGVyZXVtIGRldGVjdGVkLidcbiAgICAgICAgICAgICAgICAgICAgOiAnVW5hYmxlIHRvIGRldGVjdCB3aW5kb3cuZXRoZXJldW0uJztcbiAgICAgICAgICAgICAgICAhc2lsZW50ICYmIGNvbnNvbGUuZXJyb3IoJ0BtZXRhbWFzay9kZXRlY3QtcHJvdmlkZXI6JywgbWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGZ1bmN0aW9uIF92YWxpZGF0ZUlucHV0cygpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBtdXN0QmVNZXRhTWFzayAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEBtZXRhbWFzay9kZXRlY3QtcHJvdmlkZXI6IEV4cGVjdGVkIG9wdGlvbiAnbXVzdEJlTWV0YU1hc2snIHRvIGJlIGEgYm9vbGVhbi5gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHNpbGVudCAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEBtZXRhbWFzay9kZXRlY3QtcHJvdmlkZXI6IEV4cGVjdGVkIG9wdGlvbiAnc2lsZW50JyB0byBiZSBhIGJvb2xlYW4uYCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB0aW1lb3V0ICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBAbWV0YW1hc2svZGV0ZWN0LXByb3ZpZGVyOiBFeHBlY3RlZCBvcHRpb24gJ3RpbWVvdXQnIHRvIGJlIGEgbnVtYmVyLmApO1xuICAgICAgICB9XG4gICAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBkZXRlY3RFdGhlcmV1bVByb3ZpZGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYVc1a1pYZ3Vhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOXpjbU12YVc1a1pYZ3VkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanRCUVZsQk96czdPenM3T3pzN096czdPenM3UjBGbFJ6dEJRVU5JTEZOQlFWTXNjMEpCUVhOQ0xFTkJRVU1zUlVGRE9VSXNZMEZCWXl4SFFVRkhMRXRCUVVzc1JVRkRkRUlzVFVGQlRTeEhRVUZITEV0QlFVc3NSVUZEWkN4UFFVRlBMRWRCUVVjc1NVRkJTU3hIUVVObUxFZEJRVWNzUlVGQlJUdEpRVVZLTEdWQlFXVXNSVUZCUlN4RFFVRkRPMGxCUld4Q0xFbEJRVWtzVDBGQlR5eEhRVUZITEV0QlFVc3NRMEZCUXp0SlFVVndRaXhQUVVGUExFbEJRVWtzVDBGQlR5eERRVUZETEVOQlFVTXNUMEZCVHl4RlFVRkZMRVZCUVVVN1VVRkROMElzU1VGQlNTeE5RVUZOTEVOQlFVTXNVVUZCVVN4RlFVRkZPMWxCUlc1Q0xHTkJRV01zUlVGQlJTeERRVUZETzFOQlJXeENPMkZCUVUwN1dVRkZUQ3hOUVVGTkxFTkJRVU1zWjBKQlFXZENMRU5CUTNKQ0xITkNRVUZ6UWl4RlFVTjBRaXhqUVVGakxFVkJRMlFzUlVGQlJTeEpRVUZKTEVWQlFVVXNTVUZCU1N4RlFVRkZMRU5CUTJZc1EwRkJRenRaUVVWR0xGVkJRVlVzUTBGQlF5eEhRVUZITEVWQlFVVTdaMEpCUTJRc1kwRkJZeXhGUVVGRkxFTkJRVU03V1VGRGJrSXNRMEZCUXl4RlFVRkZMRTlCUVU4c1EwRkJReXhEUVVGRE8xTkJRMkk3VVVGRlJDeFRRVUZUTEdOQlFXTTdXVUZGY2tJc1NVRkJTU3hQUVVGUExFVkJRVVU3WjBKQlExZ3NUMEZCVHp0aFFVTlNPMWxCUTBRc1QwRkJUeXhIUVVGSExFbEJRVWtzUTBGQlF6dFpRVVZtTEUxQlFVMHNRMEZCUXl4dFFrRkJiVUlzUTBGQlF5eHpRa0ZCYzBJc1JVRkJSU3hqUVVGakxFTkJRVU1zUTBGQlF6dFpRVVZ1UlN4TlFVRk5MRVZCUVVVc1VVRkJVU3hGUVVGRkxFZEJRVWNzVFVGQlRTeERRVUZETzFsQlJUVkNMRWxCUVVrc1VVRkJVU3hKUVVGSkxFTkJRVU1zUTBGQlF5eGpRVUZqTEVsQlFVa3NVVUZCVVN4RFFVRkRMRlZCUVZVc1EwRkJReXhGUVVGRk8yZENRVU40UkN4UFFVRlBMRU5CUVVNc1VVRkJVU3hEUVVGRExFTkJRVU03WVVGRGJrSTdhVUpCUVUwN1owSkJSVXdzVFVGQlRTeFBRVUZQTEVkQlFVY3NZMEZCWXl4SlFVRkpMRkZCUVZFN2IwSkJRM2hETEVOQlFVTXNRMEZCUXl4M1EwRkJkME03YjBKQlF6RkRMRU5CUVVNc1EwRkJReXh0UTBGQmJVTXNRMEZCUXp0blFrRkZlRU1zUTBGQlF5eE5RVUZOTEVsQlFVa3NUMEZCVHl4RFFVRkRMRXRCUVVzc1EwRkJReXcwUWtGQk5FSXNSVUZCUlN4UFFVRlBMRU5CUVVNc1EwRkJRenRuUWtGRGFFVXNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8yRkJRMlk3VVVGRFNDeERRVUZETzBsQlEwZ3NRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkZTQ3hUUVVGVExHVkJRV1U3VVVGRGRFSXNTVUZCU1N4UFFVRlBMR05CUVdNc1MwRkJTeXhUUVVGVExFVkJRVVU3V1VGRGRrTXNUVUZCVFN4SlFVRkpMRXRCUVVzc1EwRkJReXc0UlVGQk9FVXNRMEZCUXl4RFFVRkRPMU5CUTJwSE8xRkJRMFFzU1VGQlNTeFBRVUZQTEUxQlFVMHNTMEZCU3l4VFFVRlRMRVZCUVVVN1dVRkRMMElzVFVGQlRTeEpRVUZKTEV0QlFVc3NRMEZCUXl4elJVRkJjMFVzUTBGQlF5eERRVUZETzFOQlEzcEdPMUZCUTBRc1NVRkJTU3hQUVVGUExFOUJRVThzUzBGQlN5eFJRVUZSTEVWQlFVVTdXVUZETDBJc1RVRkJUU3hKUVVGSkxFdEJRVXNzUTBGQlF5eHpSVUZCYzBVc1EwRkJReXhEUVVGRE8xTkJRM3BHTzBsQlEwZ3NRMEZCUXp0QlFVTklMRU5CUVVNN1FVRnNSa1FzYVVKQlFWTXNjMEpCUVhOQ0xFTkJRVU1pZlE9PSIsImltcG9ydCBkZXRlY3RQcm92aWRlciBmcm9tICdAbWV0YW1hc2svZGV0ZWN0LXByb3ZpZGVyJztcbmltcG9ydCBmcyBmcm9tICdmcydcbmltcG9ydCBhYmkgZnJvbSAnLi4vY29uZi9hYmkuanNvbic7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbml0UHJvdmlkZXIoYXBwKSB7XG4gIC8vIGRldGVjdCBwcm92aWRlclxuICBjb25zdCBwcm92aWRlciA9IGF3YWl0IGRldGVjdFByb3ZpZGVyKCk7XG5cbiAgaWYgKCFwcm92aWRlcikge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdQbGVhc2UgaW5zdGFsbCBNZXRhbWFzay5pbyBvciBhbnkgb3RoZXIgd2FsbGV0IGluIHRoZSBicm93c2VyLidcbiAgICApO1xuICB9XG5cbiAgaWYgKHByb3ZpZGVyICE9PSB3aW5kb3cuZXRoZXJldW0pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb3ZpZGVyIHByb2JsZW0uJyk7XG4gIH1cblxuICAvLyBsZWdhY3lcbiAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBwcm92aWRlci5lbmFibGUpIHtcbiAgICBhd2FpdCBwcm92aWRlci5lbmFibGUoKTtcbiAgfVxuXG4gIC8vIGNyZWF0ZSB3ZWIzXG4gIGNvbnN0IHdlYjMgPSBuZXcgV2ViMyhwcm92aWRlcik7XG5cbiAgY29uc3QgYWNjb3VudHMgPSBhd2FpdCB3ZWIzLmV0aC5nZXRBY2NvdW50cygpO1xuICBpZiAoIWFjY291bnRzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIGNvbm5lY3QgYW4gYWRkcmVzcyB1c2UgZm9yIG1pbnRpbmcuJyk7XG4gIH1cblxuICBjb25zdCBhY2NvdW50ID0gYWNjb3VudHNbMF07XG5cbiAgLy8gY3JlYXRlIGNvbnRyYWN0IGluc3RhbmNlXG4gIGNvbnN0IGNvbnRyYWN0ID0gbmV3IHdlYjMuZXRoLkNvbnRyYWN0KGFiaSwgcHJvY2Vzcy5lbnYuQ09OVFJBQ1RfQUREUkVTUywge1xuICAgIGZyb206IGFjY291bnQsXG4gIH0pO1xuXG5cblxuICBjb25zb2xlLmxvZyhjb250cmFjdClcblxuICBhcHAuc2V0KHtcbiAgICB3ZWIzLFxuICAgIGNvbnRyYWN0LFxuICAgIHByb3ZpZGVyLFxuICAgIGFjY291bnQsXG4gIH0pO1xuICBhcHAgPSBhcHA7XG59XG5cbmV4cG9ydCBjb25zdCBpcGZzID0ge1xuICBpcGZzY2xpZW50OiBudWxsLFxuICBhc3luYyBjb25uZWN0KGNvbmZpZykge1xuICAgIHRoaXMuaXBmc0NsaWVudCA9IHdpbmRvdy5JcGZzSHR0cENsaWVudChjb25maWcpO1xuICB9LFxuICBhc3luYyBhZGQoY29udGVudCkge1xuICAgIGlmICghdGhpcy5pcGZzQ2xpZW50KSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0lQRlMgbm90IGNvbm5lY3RlZCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBmaWxlID0gYXdhaXQgdGhpcy5pcGZzQ2xpZW50LmFkZChjb250ZW50KTtcbiAgICAgIHJldHVybiBmaWxlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuICB9LFxuICBjbGllbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXBmc0NsaWVudDtcbiAgfSxcbn07XG4iXSwibmFtZXMiOlsiZGV0ZWN0UHJvdmlkZXIiXSwibWFwcGluZ3MiOiI7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsc0JBQXNCLENBQUMsRUFBRSxjQUFjLEdBQUcsS0FBSyxFQUFFLE1BQU0sR0FBRyxLQUFLLEVBQUUsT0FBTyxHQUFHLElBQUksR0FBRyxHQUFHLEVBQUUsRUFBRTtBQUNsRyxJQUFJLGVBQWUsRUFB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
