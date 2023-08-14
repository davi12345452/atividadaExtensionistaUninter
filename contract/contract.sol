// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/interfaces/IERC165.sol"; // Import the IERC165 interface

contract ArquivosCombateFraude is ERC721, Ownable, ERC721URIStorage {
    using Strings for uint256;

    constructor() ERC721("ArquivosCombateFraude", "ACF") {}

    // Override the supportsInterface function
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    struct Arquivo {
        string hashTexto;
        uint256 data;
    }

    Arquivo[] private arquivos;

    function mint(string memory hash, string memory tokenURI) external onlyOwner{
        arquivos.push(Arquivo({
            hashTexto: hash,
            data: block.timestamp
        }));
        uint256 tokenId = arquivos.length - 1;
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }

    function getArq(uint256 tokenId) external view returns (string memory hashText, uint256 data) {
        require(_exists(tokenId), "Token does not exist");
        Arquivo storage arquivo = arquivos[tokenId];
        return (arquivo.hashTexto, arquivo.data);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
}