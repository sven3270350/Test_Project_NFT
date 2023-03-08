import useModal from "../../hooks/useModal";

interface NftAssetProps extends NftAssetData {
  className?: string;
}

const Nft: React.FC<NftAssetProps> = ({
  image,
  owner,
  name,
  desc,
  tokenId,
}) => {
  const { setModal } = useModal();

  return (
    <div
      className="flex flex-col rounded-md border-4 p-2 border-gray-900 bg-gray-800 hover:cursor-pointer hover:bg-gray-500"
      onClick={() => setModal({ name, desc, image, owner, tokenId })}
    >
      <img src={image} alt={"character-image " + name} className="rounded-md" />
      <h1 className="font-bold text-white text-xl p-2 text-center flex-grow">
        {name}
      </h1>
      <div className="bg-gray-700 w-full rounded-md p-2">
        <span className="text-white text-ellipsis line-clamp-3">{desc}</span>
      </div>
    </div>
  );
};

export default Nft;
