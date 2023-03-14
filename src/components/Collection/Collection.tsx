import React from "react";

import NftAsset from "../NftAsset";

interface CollectionProp {
  className?: string;
  data: NftAssetData[];
}

const Collection: React.FC<CollectionProp> = ({ className, data }) => (
  <div className={className}>
    {data.map((item, key) => (
      <React.Fragment key={key}>
        <NftAsset {...item} />
      </React.Fragment>
    ))}
  </div>
);

export default Collection;
