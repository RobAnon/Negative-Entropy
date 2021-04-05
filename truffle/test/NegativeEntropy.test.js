// Load dependencies
const { accounts, contract } = require('@openzeppelin/test-environment');
const { expect } = require('chai');

// Load compiled artifacts
const NegativeEntropy = contract.fromArtifact('NegativeEntropy');
const FAKE_URI = "https://myuri.com";

// Start test block
describe('NegativeEntropy', function () {
  const [ owner, treasury, user1, user2 ] = accounts;
  
  let negativeEntropy;

  beforeEach(async function () {
    // Deploy a new Box contract for each test
    this.negEnt = (await NegativeEntropy.new(treasury, '0xf57b2c51ded3a29e6891aba85459d600256cf317'), {from: owner});
  });

  // Test case
  it('the deployer is the owner', async function () {
    expect(await this.negEnt.owner()).to.equal(owner);
  });
});