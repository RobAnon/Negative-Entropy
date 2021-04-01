const NegativeEntropy = artifacts.require('NegativeEntropy');

module.exports = async function (deployer) {
  await deployer.deploy(NegativeEntropy, '0x4cFA5768Ca9567B922052A61FcFbd31f8d828FA1');
  const erc721_2 = await NegativeEntropy.deployed();
};
