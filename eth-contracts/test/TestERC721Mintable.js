
const ERC721Mintable = artifacts.require("ERC721Mintable");

contract("TestERC721Mintable", (accounts) => {

  const SYMBOL = 'REMT';
  const NAME = "Real Estate Marketplace Token";
  const BASE_TOKEN_URI = 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/'
 
  
  const ACCOUNT_ONE   = accounts[0];
  const ACCOUNT_TWO   = accounts[1];
  const ACCOUNT_THREE = accounts[2];
  const ACCOUNT_FOUR  = accounts[3];
  const ACCOUNT_FIVE  = accounts[4];

  describe("match erc721 spec", function () {
    beforeEach(async function () {
      this.contract = await ERC721Mintable.new(NAME, SYMBOL, BASE_TOKEN_URI, { from: ACCOUNT_ONE });

      // TODO: mint multiple tokens
      await this.contract.mint(ACCOUNT_ONE, 1, { from: ACCOUNT_ONE });
      await this.contract.mint(ACCOUNT_TWO, 2, { from: ACCOUNT_ONE });
      await this.contract.mint(ACCOUNT_THREE, 3, { from: ACCOUNT_ONE });
      await this.contract.mint(ACCOUNT_FOUR, 4, { from: ACCOUNT_ONE });
      await this.contract.mint(ACCOUNT_FIVE, 4, { from: ACCOUNT_ONE });
    });

    it("should return total supply", async function () {
      let supply = await this.contract.totalSupply.call();
      assert.equal(supply, 4, "should return total supply.");
    });

    it("should get token balance", async function () {
      let balance = await this.contract.balanceOf.call(ACCOUNT_ONE);
      assert.equal(balance.toNumber(), 1, "should get token balance.");
    });

    // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
    it("should return token uri", async function () {
      let tokenURI = await this.contract.tokenURI.call(1);
      assert.equal(
        tokenURI,
        "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1",
        "should return token uri"
      );
    });

    it("should transfer token from one owner to another", async function () {
      await this.contract.transferFrom(ACCOUNT_ONE, ACCOUNT_THREE, 1);
      let owner = await this.contract.ownerOf.call(1);
      assert.equal(
        owner,
        ACCOUNT_THREE,
        "should transfer token from one owner to another."
      );
    });
  });

  describe("have ownership properties", function () {
    beforeEach(async function () {
      this.contract = await ERC721Mintable.new({ from: ACCOUNT_ONE });
    });

    it("should fail when minting when address is not contract owner", async function () {
      let exception = false;
      try {
        await this.contract.mint(ACCOUNT_THREE, 5, { from: ACCOUNT_TWO });
      } catch (e) {
        exception = true;
      }
      assert.equal(
        exception,
        true,
        "should fail when minting when address is not contract owner."
      );
    });

    it("should return contract owner", async function () {
      let contract_owner = await this.contract.getOwner.call({
        from: ACCOUNT_ONE,
      });
      assert.equal(
        contract_owner,
        ACCOUNT_ONE,
        "should return contract owner."
      );
    });
  });
});
``