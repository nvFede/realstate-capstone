var ERC721MintableComplete = artifacts.require("CustomERC721Token");

contract("TestERC721Mintable", (accounts) => {
  const ACCOUNT_ONE = accounts[0];
  const ACCOUNT_TWO = accounts[1];
  const ACCOUNT_THREE = accounts[2];
  const ACCOUNT_FOUR = accounts[3];

  let contract;

  // const symbol = "REMT";
  // const name = "Real Estate Marketplace Token";
  // const baseUri =
  //   "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";

  describe("match erc721 spec", function () {
    beforeEach(async function () {
      // contract = await ERC721MintableComplete.new(symbol, name, baseUri, {
      //   from: ACCOUNT_ONE,
      // });
      contract = await ERC721MintableComplete.new({ from: ACCOUNT_ONE});

      // TODO: mint multiple tokens
      try {
        await contract.mint(ACCOUNT_ONE, 1, { from: ACCOUNT_ONE });
        await contract.mint(ACCOUNT_TWO, 2, { from: ACCOUNT_ONE });
        await contract.mint(ACCOUNT_THREE, 3, { from: ACCOUNT_ONE });
        await contract.mint(ACCOUNT_FOUR, 4, { from: ACCOUNT_ONE });
      } catch (error) {
        console.log(error);
      }
    });

    it("Should return total supply", async function () {
      let totalSupply = await contract.totalSupply.call();
      assert.equal(totalSupply, 4, "Do not match total Supply");
    });

    it("Should get token balance", async function () {
      let balance = await contract.balanceOf.call(ACCOUNT_ONE);
      assert.equal(balance.toNumber(), 1, "Should display token balance.");
    });

    // // token uri Should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
    it("Should return token uri", async function () {
      let tokenURI = await contract.tokenURI.call(1);
      assert.equal(
        tokenURI,
        "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1",
        "Should return the token uri"
      );
    });

    it("Should transfer token from one owner to another", async function () {
      await contract.transferFrom(ACCOUNT_ONE, ACCOUNT_THREE, 1);
      let owner = await contract.ownerOf.call(1);
      assert.equal(
        owner,
        ACCOUNT_THREE,
        "ERROR: Should transfer token from one owner to another owner."
      );
    });
  });

  describe("have ownership properties", function () {
    beforeEach(async function () {
      contract = await ERC721MintableComplete.new({ from: ACCOUNT_ONE});
    });

    it("Should fail when minting address is not the contract owner", async function () {
      let revert = false;
      try {
        await contract.mint(ACCOUNT_TWO, 3, { from: ACCOUNT_TWO });
        // contract = await ERC721MintableComplete.new(symbol, name, baseUri, {
        //   from: ACCOUNT_ONE,
        // });
      } catch (err) {
        revert = true;
      }
      assert.equal(revert, true, "ERROR: The contract should fail");
    });

    it("Should return the contract owner", async function () {
      let contract_owner = await contract.owner.call();
      assert.equal(
        contract_owner,
        ACCOUNT_ONE,
        "ERROR: Should return the contract owner."
      );
    });
  });
});
