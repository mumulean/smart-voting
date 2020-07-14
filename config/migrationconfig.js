module.exports = function(temp) {
  temp.deploy(artifacts.require("./votingContract.sol"), "A", "B", "C");
}
