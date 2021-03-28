// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "./ERC721Configurable.sol";

contract InteractiveNFT is ERC721Configurable {

    address payable owner;
    constructor() public ERC721("InteractiveNFT", "INFT") {
        address payable msgSender = msg.sender;
        owner = msgSender;
    }

    function sendValue(address payable recipient, uint256 amount) public onlyOwner returns(bool){
        require(address(this).balance >= amount, "Address: insufficient balance");

        // solhint-disable-next-line avoid-low-level-calls, avoid-call-value
        (bool success, ) = recipient.call{ value: amount }("");
        require(success, "Address: unable to send value, recipient may have reverted");
    }

    /**
     * Mint a token to _to
     */

    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }

    function mint(
        uint256 _tokenId,
        address _to,
        string calldata _tokenURI
    ) internal virtual {
        _safeMint(_to, _tokenId);
        _setTokenURI(_tokenId, _tokenURI);
    }

    /**
     * Mint a token to _to with a _interactiveConfURI already set
     */
    function mint(
        uint256 _tokenId,
        address _to,
        string calldata _tokenURI,
        string calldata _interactiveConfURI
    ) internal virtual {
        _safeMint(_to, _tokenId);
        _setTokenURI(_tokenId, _tokenURI);
        _setInteractiveConfURI(_tokenId, _interactiveConfURI);
    }


    /**
        Function to let Owner set configurationURI
     */
    function setInteractiveConfURI(
        uint256 _tokenId,
        string calldata _interactiveConfURI
    ) public {
        require(
            _isApprovedOrOwner(_msgSender(), _tokenId),
            "ERC721Configurable: Operator is not approved"
        );
        _setInteractiveConfURI(_tokenId, _interactiveConfURI);
    }

    struct Payment {
        uint256 amount;
        uint256 date;
    }

    // Log of payments
    mapping(address=>Payment[]) private payments;

    // Event to notify payments
    event Pay(address, uint);

    event Received(address, uint);

    // Optional. Fallback function to receive funds
    fallback() external payable {
        require (msg.data.length == 0, 'The called function does not exist');
    }
    receive() external payable {
        // custom function code
        emit Received(msg.sender, msg.value);
    }


    /**
     * @dev `pay` Payment in wei
     * Emits `Pay` on success with payer account, purchase reference and amount.
     * @param  value Amount in wei of the payment
     */
    function pay(uint value,
                uint256 _tokenId,
                address _to,
                string calldata _tokenURI) public payable {
        require(msg.value == value, 'The payment does not match the value of the transaction');
        owner.transfer(value);
        payments[msg.sender].push(Payment(msg.value, block.timestamp));
        mint(_tokenId, _to, _tokenURI);
        emit Pay(msg.sender, msg.value);

    }

    /**
     * @dev `withdraw` Withdraw funds to the owner of the contract
     */
    function withdraw(uint value) public payable onlyOwner returns(bool) {
        owner.transfer(value);
        return true;
    }

    /**
     * @dev `paymentsOf` Number of payments made by an account
     * @param  buyer Account or address
     * @return number of payments
     */
    function paymentsOf(address buyer) public view returns (uint) {
        return payments[buyer].length;
    }

    // /**
    //  * @dev `paymentOfAt` Returns the detail of a payment of an account
    //  * @param  buyer Account or addres
    //  * @param  index Index of the payment
    //  * @return {0: "Purchase reference", 1: "Payment amount", 2: "Payment date"}
    //  */
    // function paymentOfAt(address buyer, uint256 index) public view returns (string memory, uint256 amount, uint256 date) {
    //     Payment[] memory pays = payments[buyer];
    //     require(pays.length > index, "Payment does not exist");
    //     Payment memory payment = pays[index];
    //     return (payment.amount, payment.date);
    // }
}
