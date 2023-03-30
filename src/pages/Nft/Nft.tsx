import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Collection from "../../components/Collection";
import { getCollection } from "../../helpers";

interface NftProp {}

const Nft: React.FC<NftProp> = () => {
  const { address } = useParams();
  const [data, setData] = useState<Nullable<NftAssetData[]>>(null);
  const [status, setStatus] = useState<Nullable<string>>(null);
  const [name, setName] = useState<string>();

  useEffect(() => {
    if (!address) return;

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
