import { Contract } from "ethers";

import {
  getAllTokens,
  getCollectionName,
  isERC721Enumerable,
  getContract,
} from "../api/token";
import { getIpfsUrl } from "../helpers";

export const getAllTokenMeta = async (
  contract: Contract
): Promise<NftAssetData[]> => {
  const tokens = await getAllTokens(contract);
  const meta = await Promise.all(
    tokens.map((token) =>
      fetch(token.uri)
        .then((res) => res.json())
        .catch((error) => console.error(error))
    )
  );

  return meta.map((item, index) => ({
    image: getIpfsUrl(item.image),
    name: item.name,
    desc: item.description,
    owner: tokens[index].owner,
    tokenId: tokens[index].id,
  }));
};

export const getCollection = async (address: string) => {
  const contract = getContract(address);

  try {
    const res = await isERC721Enumerable(contract);
    if (!res) throw Error("This contract is not ERC721 Enumerable");
  } catch (e) {
    throw Error("This contract is not ERC721 Enumerable");
  }

  try {
    const name = await getCollectionName(contract);
    const data = await getAllTokenMeta(contract);

    return { name, data };
  } catch (e) {
    throw Error(JSON.stringify(e));
  }
};
