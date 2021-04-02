// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";


/**
* @dev OpenSea utility proxy
*
*/
contract OwnableDelegateProxy {}

/**
* @dev OpenSea utility proxy
*/
contract ProxyRegistry {
    mapping(address => OwnableDelegateProxy) public proxies;
}

/**
 * @title ERC721Tradable
 * ERC721Tradable - ERC721 contract that whitelists a trading address, and has minting functionality.
 */
contract ERC721Tradable is ERC721, Ownable {

    address proxyRegistryAddress;
    uint256 private _currentTokenId = 0;

    constructor(
        string memory _name,
        string memory _symbol,
        address _proxyRegistryAddress
    ) public ERC721(_name, _symbol) {
        proxyRegistryAddress = _proxyRegistryAddress;
    }

    /**
     * Override isApprovedForAll to whitelist user's OpenSea proxy accounts to enable gas-less listings.
     */
    function isApprovedForAll(address owner, address operator)
        public
        view
        override
        returns (bool)
    {
        // Whitelist OpenSea proxy contract for easy trading.
        ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
        if (address(proxyRegistry.proxies(owner)) == operator) {
            return true;
        }

        return super.isApprovedForAll(owner, operator);
    }
}