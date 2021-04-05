// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;


import "../node_modules/@openzeppelin/contracts/access/AccessControl.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/utils/EnumerableMap.sol";
import "../node_modules/@openzeppelin/contracts/utils/EnumerableSet.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721Burnable.sol";
import "./ModifiedEnumerableMap.sol";
import "./ERC721Tradeable.sol";


/**
 * @dev {ERC721} token, including:
 *
 *  - ability for holders to burn (destroy) their tokens
 *  - a minter role that allows for token minting (creation)
 *  - a pauser role that allows to stop all token transfers
 *  - token ID and URI autogeneration
 *
 * This contract uses {AccessControl} to lock permissioned functions using the
 * different roles - head to its documentation for details.
 *
 * The account that deploys the contract will be granted the minter and pauser
 * roles, as well as the default admin role, which will let it grant both minter
 * and pauser roles to other accounts.
 */
contract NegativeEntropy is Context, AccessControl, ERC721Tradable {
    using EnumerableSet for EnumerableSet.Bytes32Set;
    using ModifiedEnumerableMap for ModifiedEnumerableMap.UintToBytes32Map;

    //Role to designate who has approval to mint 
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    
    //Initial maximum quantity
    uint256 public maxQuantity = 1000;
    uint256 private counter = 0;
    uint256 private ownerBalance = 0;
    //Price a constant value 
    //TODO: Consider making price variable?
    uint256 public constant PRICE = 15E16;

    //Address where transactions will be deposited

    //Set that contains all seeds, allowing for easy checks of existence of a given seed
    EnumerableSet.Bytes32Set private seedSet;

    //Map that holds mapping of tokenId to seed
    ModifiedEnumerableMap.UintToBytes32Map private seedMap;

    /**
    * @dev Primary constructor to create an instance of NegativeEntropy
    * Grants ADMIN and MINTER_ROLE to whoever creates the contract
    *
    */
    constructor(address _proxy) public ERC721Tradable("Negative Entropy", "NGTV", _proxy) {
        _setupRole(MINTER_ROLE, _msgSender());
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        proxyRegistryAddress = _proxy;
    }


    /**
     * @dev Mint a token to _to and set the URI. TokenID is automatically assigned
     * and URI is automatically generated based on whatever is passed in
     *
     * See {ERC721-_mint}.
     */
    function mint(
        uint256 _tokenId,
        address _to,
        string calldata _tokenURI
    ) internal {
        _safeMint(_to, _tokenId);
        _setTokenURI(_tokenId, _tokenURI);
    }

    /**
     * @dev Mint a token to 'to' with a configurationURI already set
     * using a minter
     * The public endpoint for performing mint operations
     *
     * See {ERC721-_mint}.
     * 
     * Requirements: 
     * 
     * - The caller must have a signature (v,r,s) that is properly signed by the minter
     * - Minting the token must not create more tokens than are allowed to exist
     * - The caller must have sufficient funds included in the transaction to afford the token
     * - The caller must not be seeking to claim a seed that is already claimed
     */
    function mint(
        address payable to,
        uint8 v,
        bytes32 r,
        bytes32 s,
        string calldata tokenURI,
        string calldata seedDesired
    ) public payable{
        //Check for signature
        require(
            _signedByMinter(seedDesired, tokenURI, to, v, r, s),
            "Negative Entropy: minter must sign URI and ID!"
        );
        //Check if we can mint based on number remaining
        require(counter < maxQuantity, "NegativeEntropy: All NFTs have been claimed for this series"); 
        require(msg.value >= PRICE, "NegativeEntropy: Insufficient funds to mint a Negative Entropy NFT");
        require(!seedClaimed(seedDesired), "NegativeEntropy: Seed has already been claimed–how did you make it this far?");

        //Where we get paid
        ownerBalance += (PRICE);
        to.transfer(msg.value.sub(PRICE));

        mint(counter, to, tokenURI);

        //Last step
        if(claimSeed(seedDesired, counter)) { 
            counter = counter + 1;
        } else {
            revert('NegativeEntropy: Unable to add seed to map or set!');
        }
    }

    /**
    * @dev Regenerates the public key of the account which created the signature (v, r, s)
    * using the URI and seed passed into the constructor. Allows for proper signing of transactions
    * to repell spoofing attacks
    *
    */
    function addressFromSignature(
        string calldata seed,
        string calldata tokenURI,
        address account,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public view returns (address) {
        if (v < 27) {
            v += 27;
        }

        address _cont = address(this);
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 checkHash = keccak256(abi.encodePacked(_cont, account, seed, tokenURI));
        bytes memory message = abi.encodePacked(prefix, checkHash);
        bytes32 signed = keccak256(message);

        return ecrecover(signed, v, r, s);
    }

    /**
    * @dev Checks if the passed in signature (v, r, s) was signed by the minter
    * 
    */
    function _signedByMinter(
        string calldata seed,
        string calldata tokenURI,
        address account,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) internal view returns (bool) {
        return hasRole(MINTER_ROLE, addressFromSignature(seed, tokenURI, account, v, r, s));
    }

    /**
    * @dev Burns a token. See {ERC721Burnable}
    *
    * Requirements:
    * 
    * - Caller must be owner or approved to burn tokens
    * - Token must exist in seedMap
    * - Token must exist in seedSet
    */ 
    function burn(uint256 tokenId) public {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721Burnable: caller is not owner nor approved");
        require(seedMap.contains(tokenId), 'NegativeEntropy: Token ID not found in storage – Are you sure it exists?');
        require(seedSet.contains(seedMap.get(tokenId)), 'NegativeEntropy: Token ID not found in storage – Are you sure it exists?');
        _burn(tokenId);
        if(!removeSeed(tokenId)) {
            revert();
        }
    }

    function ownerWithdraw() public onlyOwner() {
      uint amount = ownerBalance;
      ownerBalance = 0;
      msg.sender.transfer(amount);
    }   

    /**
    *
    * GETTERS
    *
    */

    /**
    * @dev Checks if seed is claimed by checking if it is in seedSet
    *
    */
    function seedClaimed(string memory checkSeed) public view returns (bool) {
        return seedSet.contains(keccak256(bytes (checkSeed)));
    }

   

    /**
     * @dev gets the current number of tokens that have been created (including burned tokens)
     * This behavior differs from totalSupply(), which returns tokens EXCLUDING those burned
     */
    function getTokenCount() public view returns (uint256) {
        return counter;
    }

    /**
    *
    * SETTERS
    *
    */

    /**
    * @dev Claim a seed and map it to the passed in ID
    *
    */ 
    function claimSeed(string memory clmSeed, uint256 id) internal returns (bool) {
        return seedSet.add(keccak256(bytes (clmSeed))) && seedMap.set(id, keccak256(bytes (clmSeed)));
    } 

    /**
    * @dev Remove a seed from both the map and the set
    *
    */
    function removeSeed(uint256 id) internal returns (bool) {
        if(!seedMap.contains(id)) return false;
        bytes32 seedHash = seedMap.get(id);
        if(!removeSeed(seedHash)) return false;
        if(!seedMap.remove(id)) return false;
        return true;
    }

    /**
    * @dev Remove a seed from the set only
    *
    */
    function removeSeed(bytes32 seedHash) internal returns (bool) {
        return seedSet.remove(seedHash);
    }

    /**
    * @dev increase the maximum quantity of tokens which are allowed to exist
    *
    */
    function setMaxQuantity(uint256 quant) onlyOwner() public {
        assert(hasRole(MINTER_ROLE, _msgSender()));
        maxQuantity = quant;
    }

}