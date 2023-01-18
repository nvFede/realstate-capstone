// migrating the appropriate contracts

var ERC721Mintable = artifacts.require("./ERC721Mintable.sol");
var Verifier = artifacts.require("./Verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports =  function(deployer) {

  const SYMBOL = 'REMT';
  const NAME = "Real Estate Marketplace Token";
  const BASE_TOKEN_URI = 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/'
  deployer.deploy(ERC721Mintable, name, sysmbol, baseTokenURI);
  deployer.deploy(Verifier)
    .then(() => {
      return deployer.deploy(SolnSquareVerifier, Verifier.address, NAME, SYMBOL, BASE_TOKEN_URI)
    });

};
