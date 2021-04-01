// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;


import "../node_modules/@openzeppelin/contracts/access/AccessControl.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/utils/EnumerableMap.sol";
import "../node_modules/@openzeppelin/contracts/utils/EnumerableSet.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721Burnable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721Pausable.sol";
import "./ModifiedEnumerableMap.sol";

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
contract NegativeEntropy is Context, AccessControl, ERC721Burnable, ERC721Pausable {
    using Counters for Counters.Counter;
    using EnumerableSet for EnumerableSet.Bytes32Set;
    using ModifiedEnumerableMap for ModifiedEnumerableMap.UintToBytes32Map;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
   	
   	//TODO: Add SIGNER_ROLE

   	//Initial maximum quantity
   	uint256 public maxQuantity = 1000;
   	//Price a constant value 
   	//TODO: Consider making price variable?
   	uint256 public constant PRICE = 15E16;
   	//This should be set in the constructor
   	address payable public treasuryAddress;



    Counters.Counter private tokenCounter;
    EnumerableSet.Bytes32Set private seedSet;

    ModifiedEnumerableMap.UintToBytes32Map private seedMap;

    

    constructor(address payable _tA) public ERC721("Negative Entropy", "NGTV") {
        _setupRole(MINTER_ROLE, _msgSender());
		_setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
		_setupRole(PAUSER_ROLE, _msgSender());
		treasuryAddress = _tA;
    }

    modifier onlyOwner() {
        require(hasRole(MINTER_ROLE, _msgSender()), 'Role: not Admin');
        _;
    }



    /**
     * Mint a token to _to and set the URI
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
     * Mint a token to to with a configurationURI already set
     * using a minter
     * Primary endpoing for performing mint operations
     * 
     * 
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
        require(tokenCounter.current() < maxQuantity, "NegativeEntropy: All NFTs have been claimed for this series"); 
        require(msg.value >= PRICE, "NegativeEntropy: Insufficient funds to mint a Negative Entropy NFT");
        require(!seedClaimed(seedDesired), "NegativeEntropy: Seed has already been claimed–how did you make it this far?");

        //Where we get paid
        treasuryAddress.transfer(PRICE);
    	to.transfer(msg.value.sub(PRICE));

        mint(tokenCounter.current(), to, tokenURI);

        //Last step
        if(claimSeed(seedDesired, tokenCounter.current())) { 
       		tokenCounter.increment();
        } else {
        	revert('NegativeEntropy: Unable to add seed to map or set!');
        }
    }

    // Minter detection helper
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

    // signer helper
    function _signedByMinter(
    	string calldata seed,
        string calldata tokenURI,
        address account,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) internal view returns (bool) {
        return
            isMinter(
                addressFromSignature(seed, tokenURI, account, v, r, s) 
            );
    }

    
    /**
     * @dev Pauses all token transfers.
     *
     * See {ERC721Pausable} and {Pausable-_pause}.
     *
     * Requirements:
     *
     * - the caller must have the `PAUSER_ROLE`.
     */
    function pause() public virtual {
        require(hasRole(PAUSER_ROLE, _msgSender()), "ERC721PresetMinterPauserAutoId: must have pauser role to pause");
        _pause();
    }

    /**
     * @dev Unpauses all token transfers.
     *
     * See {ERC721Pausable} and {Pausable-_unpause}.
     *
     * Requirements:
     *
     * - the caller must have the `PAUSER_ROLE`.
     */
    function unpause() public virtual {
        require(hasRole(PAUSER_ROLE, _msgSender()), "ERC721PresetMinterPauserAutoId: must have pauser role to unpause");
        _unpause();
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal virtual override(ERC721, ERC721Pausable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function burn(uint256 tokenId) public override {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721Burnable: caller is not owner nor approved");
        require(seedMap.contains(tokenId), 'NegativeEntropy: Token ID not found in storage – Are you sure it exists?');
        require(seedSet.contains(seedMap.get(tokenId)), 'NegativeEntropy: Token ID not found in storage – Are you sure it exists?');
        _burn(tokenId);
        //If we burn a token, decrease the counter
        if(removeSeed(tokenId)) {
            tokenCounter.decrement();
        } else {
        	revert();
        }
    }

    /**
    *
    * GETTERS
    *
    */
    function seedClaimed(string memory checkSeed) public view returns (bool) {
    	return seedSet.contains(keccak256(bytes (checkSeed)));
    }

    function isMinter(address _address) public view returns (bool) {
        return hasRole(MINTER_ROLE, _address);
    }


    /**
    *
    * SETTERS
    *
    */
    function claimSeed(string memory clmSeed, uint256 id) internal returns (bool) {
    	return seedSet.add(keccak256(bytes (clmSeed))) && seedMap.set(id, keccak256(bytes (clmSeed)));
    } 

    function removeSeed(uint256 id) internal returns (bool) {
    	if(!seedMap.contains(id)) return false;
    	bytes32 seedHash = seedMap.get(id);
    	if(!removeSeed(seedHash)) return false;
    	if(!seedMap.remove(id)) return false;
    	return true;
    }

    function removeSeed(bytes32 seedHash) internal returns (bool) {
    	return seedSet.remove(seedHash);
    }

	//Admin Function    
    function setMaxQuantity(uint256 quant) onlyOwner() public {
    	assert(hasRole(MINTER_ROLE, _msgSender()));
    	maxQuantity = quant;
    }


}