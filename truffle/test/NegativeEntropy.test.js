// Load dependencies
const { accounts, contract } = require('@openzeppelin/test-environment');
const { expect } = require('chai');

// Load compiled artifacts
const NegativeEntropyContract = contract.fromArtifact('NegativeEntropy');
const FAKE_URI = "https://myuri.com";

// Start test block
describe('NegativeEntropy',  () => {
  const [ owner, treasury, user1, user2 ] = accounts;
  
  let NegativeEntropyContractInstance;

  beforeEach(async () => {
    // Deploy a new Box contract for each test
    this.NegativeEntropyContractInstance = (await NegativeEntropyContract.new(treasury, '0xf57b2c51ded3a29e6891aba85459d600256cf317'), {from: owner});
  });

  // Test case
  it('the deployer is the owner', async () => {
    expect(await this.NegativeEntropyContractInstance.owner()).to.equal(owner);
  });
});