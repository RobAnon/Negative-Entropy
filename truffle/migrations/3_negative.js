const NegativeEntropy = artifacts.require('NegativeEntropy');

module.exports = async function (deployer) {
  await deployer.deploy(NegativeEntropy);
  const erc721_2 = await NegativeEntropy.deployed();
};
