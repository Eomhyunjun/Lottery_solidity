var RandomNumberGenerator = artifacts.require("RandomNumberGenerator");
var Lottery = artifacts.require("Lottery");

module.exports = function(deployer) {
  // deployment steps
  // deployer.deploy(RandomNumberGenerator);
  deployer.deploy(Lottery);
};
