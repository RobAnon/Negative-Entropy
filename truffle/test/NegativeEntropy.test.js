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
    this.contract = (await NegativeEntropy.new(treasury.getAddress(), '0xa5409ec958C83C3f309868babACA7c86DCB077c1'), {from: owner});
  });

  // Test case
  it('retrieve returns a value previously stored', async function () {
    // Store a value - recall that only the owner account can do this!
    await this.contract.store(42, { from: owner });

    // Test if the returned value is the same one
    // Note that we need to use strings to compare the 256 bit integers
    expect((await this.contract.retrieve()).toString()).to.equal('42');
  });
});