pragma solidity >=0.4.21 <0.6.0;
import "./ERC721Mintable.sol";
import "./SquareVerifier.sol";

contract SolnSquareVerifier is CustomERC721Token {
    Verifier private verifier;

    constructor(address verifierContract) public {
        verifier = Verifier(verifierContract);
    }

    struct Solution {
        uint _index;
        address _address;
    }
    Solution[] private solutions;
    mapping(bytes32 => bool) private uniqueSolutions;
    event NewSolutionAdded(address submitter);

    function addSolution(
        uint256 index,
        address submitter,
        bytes32 solutionKey
    ) public 
    {
        Solution memory newSolution = Solution(index, submitter);
        solutions.push(newSolution);
        uniqueSolutions[solutionKey] = true;
        emit NewSolutionAdded(submitter);
    }

    modifier verifySolution(
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory input
    ) {
        require(
            verifier.verifyTx(a, b, c, input),
            "ERROR: SolnSquareVerifier: Solution invalid proof"
        );
        _;
    }

    function mintNFTWithVerification(
        uint256 id,
        address to,
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory input
    ) public verifySolution(a, b, c, input) returns (bool) {
        bytes32 sKey = keccak256(abi.encodePacked(a, b, c, input));
        require(
            uniqueSolutions[sKey] == false,
            "ERROR: SolnSquareVerifier: solution must be unique"
        );
        addSolution(id, to, sKey);
        return mint(to, id);
    }
}
