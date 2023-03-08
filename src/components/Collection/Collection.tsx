import NftAsset from "../NftAsset";
import React from "react";

interface CollectionProp {
  data: NftAssetData[];
  className?: string;
}

const Collection: React.FC<CollectionProp> = ({ data, className }) => (
  <div className={className}>
    {data.map((item, key) => (
      <React.Fragment key={key}>
        <NftAsset {...item} />
      </React.Fragment>
    ))}
  </div>
);

export default Collection;
