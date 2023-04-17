# Udacity Blockchain Capstone

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product. 

# Contract addresses on Goerli Network
Deploying 'Verifier'
   --------------------
   > transaction hash:    0xb7710bb7daa703734bac0f99a7c57a84d87822cd8122dd71cea89ed0f8dc3fa9
   > Blocks: 1            Seconds: 8
   > contract address:    0xf4F7940bE8aD2fEde4820e7c79E2ee31136c08fE
   > block number:        8844734
   > block timestamp:     1681730136
   > account:             0x0d4497361C0aEd5F94c901Bec14807Fdbd2eeE1E
   > balance:             0.276011393137475936
   > gas used:            992729 (0xf25d9)
   > gas price:           15.524395554 gwei
   > value sent:          0 ETH
   > total cost:          0.015411517673926866 ETH


Deploying 'SolnSquareVerifier'
   ------------------------------
   > transaction hash:    0x1cf38284c4e00191df76e837cfa369295cafc46856b63894879875086e7ad86c
   > Blocks: 1            Seconds: 8
   > contract address:    0xC9A893ce6af86BB70D6682f47CceC8f2f772DF2d
   > block number:        8844735
   > block timestamp:     1681730148
   > account:             0x0d4497361C0aEd5F94c901Bec14807Fdbd2eeE1E
   > balance:             0.224399401190108822
   > gas used:            3429474 (0x345462)
   > gas price:           15.049535861 gwei
   > value sent:          0 ETH
   > total cost:          0.051611991947367114 ETH

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.06702350962129398 ETH


# Contract ABI 

Can be found on eth-contracts/build/contracts folder on this repository

# Tests

```
  Contract: TestERC721Mintable
    match erc721 spec
      ✔ Should return total supply
      ✔ Should get token balance
      ✔ Should return token uri
      ✔ Should transfer token from one owner to another (157ms)
    have ownership properties
      ✔ Should fail when minting address is not the contract owner (158ms)
      ✔ Should return the contract owner

  Contract: SolnSquareVerifier
    ✔ Should Test if a new solution can be added for contract SolnSquareVerifier (145ms)
    ✔ Test if an ERC721 token can be minted for contract - SolnSquareVerifier (559ms)

  Contract: SquareVerifier Test
    ✔ test verification with correct proof (486ms)
    ✔ test verification with incorrect proof (492ms)


  10 passing (9s)
```

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
