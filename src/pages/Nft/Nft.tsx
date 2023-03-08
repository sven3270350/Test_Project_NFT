import { useEffect, useState } from "react";
import { Contract } from "ethers";
import { useParams } from "react-router-dom";
import Collection from "../../components/Collection";
import {
  getAllTokens,
  getCollectionName,
  isERC721Enumerable,
  getContract,
} from "../../api/token";
import { getIpfsUrl } from "../../helpers";

interface NftProp {}

const getAllTokenMeta = async (contract: Contract): Promise<NftAssetData[]> => {
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

const getCollection = async (address: string) => {
  const contract = getContract(address);

  try {
    const res = await isERC721Enumerable(contract);
    if (!res) {
      throw Error("This contract is not ERC721 Enumerable");
    }
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

const Nft: React.FC<NftProp> = () => {
  const { address } = useParams();
  const [data, setData] = useState<Nullable<NftAssetData[]>>(null);
  const [status, setStatus] = useState<Nullable<string>>(null);
  const [name, setName] = useState<string>();

  useEffect(() => {
    if (!address) {
      return;
    }

    setStatus("Loading...");
    getCollection(address)
      .then((res) => {
        setName(res.name);
        setData(res.data);
        setStatus(null);
      })
      .catch((e: Error) => setStatus(e.message));
  }, [address]);

  return (
    <div>
      <div className="flex justify-between items-center flex-wrap">
        {name && (
          <p className="text-2xl font-medium text-gray-400 mb-3">
            Collection Name: {name}
          </p>
        )}
      </div>
      {status ? (
        <div className="text-lg font-medium text-gray-400 text-center">
          {status}
        </div>
      ) : (
        data && (
          <Collection
            data={data}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2"
          />
        )
      )}
    </div>
  );
};

export default Nft;
