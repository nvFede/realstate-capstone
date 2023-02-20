// migrating the appropriate contracts

var ERC721Mintable = artifacts.require("CustomERC721Token");
var SquareVerifier = artifacts.require("./Verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = async (deployer) => {
  const SYMBOL = "REMT";
  const NAME = "Real Estate Marketplace Token";
  const BASE_TOKEN_URI =
    "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";

  
  await deployer.deploy(SquareVerifier);
  await deployer.deploy(
    SolnSquareVerifier,
    SquareVerifier.address,
  );
};
