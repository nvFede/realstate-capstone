const SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
const SqVerfier = artifacts.require("Verifier");
const truffleAssertion = require("truffle-assertions");

contract("SolnSquareVerifier", (accounts) => {
  const ACCOUNT_ONE = accounts[0];
  const ACCOUNT_TWO = accounts[1];
  let proof = require("./proof.json");
  let contract;
  let verifier;

  beforeEach(async function () {
    //console.log("proof: ", proof);
    verifier = await SqVerfier.new({ from: ACCOUNT_ONE });
    contract = await SolnSquareVerifier.new(verifier.address, {
      from: ACCOUNT_ONE,
    });
  });

  // Test if a new solution can be added for contract - SolnSquareVerifier
  it("Should Test if a new solution can be added for contract SolnSquareVerifier", async function () {
    const tx = await contract.addSolution(
      5,
      ACCOUNT_TWO,
      web3.utils.fromUtf8("1111111"),
      { from: ACCOUNT_TWO }
    );
    truffleAssertion.eventEmitted(
      tx,
      "NewSolutionAdded",
      null,
      "ERROR: Invalid event emitted"
    );
  });

  // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
  it("Test if an ERC721 token can be minted for contract - SolnSquareVerifier", async function () {
    const {
      proof: { a, b, c },
      inputs: input,
    } = proof;

    console.log(proof.proof.a);

    let result = await SolnSquareVerifier.mintNFTWithVerification.call(
      1, // Id
      ACCOUNT_TWO, //Address To
      proof.proof.a, // Proof A
      proof.proof.b, // Proof B
      proof.proof.c, // Proof C
      proof.inputs // Inputs
    );
    assert.equal(result, true, "ERROR: cannot mint an ERC721 token");
  });
});
