const NegativeEntropy = artifacts.require('NegativeEntropy');

module.exports = async function (deployer) {
  await deployer.deploy(NegativeEntropy);
  const erc721 = await NegativeEntropy.deployed();
};
