// migrating the appropriate contracts

var ERC721Mintable = artifacts.require("./ERC721Mintable.sol");
var Verifier = artifacts.require("./verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = async (deployer) => {
  const SYMBOL = "REMT";
  const NAME = "Real Estate Marketplace Token";
  const BASE_TOKEN_URI =
    "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";

  
  await deployer.deploy(Verifier);
  await deployer.deploy(
    SolnSquareVerifier,
    Verifier.address,
    NAME,
    SYMBOL,
    BASE_TOKEN_URI
  );
};
