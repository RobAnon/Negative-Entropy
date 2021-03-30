const NegativeEntropy = artifacts.require('NegativeEntropy');

module.exports = async function (deployer) {
  await deployer.deploy(NegativeEntropy, '0x745ff5eCF724A55CE63e9bED61f774AdCD894A71');
  const erc721_2 = await NegativeEntropy.deployed();
};
