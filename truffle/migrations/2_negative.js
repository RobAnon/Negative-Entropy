const NegativeEntropy = artifacts.require('NegativeEntropy');

const RINKEBY_PROXY = '0xf57b2c51ded3a29e6891aba85459d600256cf317';
const MAIN_PROXY = '0xa5409ec958c83c3f309868babaca7c86dcb077c1';
module.exports = async function (deployer) {
  await deployer.deploy(NegativeEntropy, '0x4cFA5768Ca9567B922052A61FcFbd31f8d828FA1', RINKEBY_PROXY);
  const erc721_2 = await NegativeEntropy.deployed();
};
