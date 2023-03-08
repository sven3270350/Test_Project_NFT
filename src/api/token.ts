import { ethers, Contract } from 'ethers'
import { getIpfsUrl } from '../helpers'
import erc721Abi from './abis/ERC721Enumerable.json'

const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/c1d38e3e05df4c5c9be142b6aa9bb8c7', { name: 'ethereum', chainId: 1 })

export const getContract = (address: string) => new ethers.Contract(address, erc721Abi.abi, provider)

export const getCollectionName = (contract: Contract): Promise<string> => contract.name()

export const isERC721Enumerable = (contract: Contract) => contract.totalSupply()

export const getAllTokens = async (contract: Contract, limit: number = 20) => {
  const totalSupply = await contract.totalSupply()
  const getTokenIds = Array(Math.min(totalSupply.toNumber(), limit))
    .fill(0)
    .map((_, index) => contract.tokenByIndex(index + 1)
      .then((tokenId: string) => tokenId)
      .catch(() => Promise.resolve(index + 1))
    )
  const tokenIds = await Promise.all(getTokenIds)
  const getTokenUris = tokenIds.map(tokenId => contract.tokenURI(tokenId).then((uri: string) => getIpfsUrl(uri)))
  const getOwners = tokenIds.map(tokenId => contract.ownerOf(tokenId))
  const [tokenUris, owners] = await Promise.all([
    Promise.all(getTokenUris),
    Promise.all(getOwners)
  ])

  return tokenUris.map((uri: string, index) => ({
    uri,
    owner: owners[index] as string,
    id: tokenIds[index] as string
  }))
}
