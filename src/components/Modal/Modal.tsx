import { Link } from "react-router-dom";
import useModal from "../../hooks/useModal";

interface ModalType {
  open: boolean;
}

const Modal: React.FC<ModalType> = ({ open }) => {
  const { currentNft, setModal } = useModal();
  const address = document.location.href.slice(
    document.location.href.lastIndexOf("/") + 1
  );

  if (!open) {
    return null;
  }

  return (
    <div
      className="z-10 w-full h-full fixed top-0 left-0 bg-black/75 flex justify-center items-center"
      onClick={() => setModal(null)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-900 m-5 sm:w-[50rem] p-3 rounded-lg flex flex-col max-h-[90%]"
      >
        <div className="flex flex-col lg:flex-row mb-3 overflow-auto items-center lg:items-start">
          <img
            src={currentNft?.image}
            alt={"character-image " + currentNft?.name}
            className="rounded-md w-full max-w-xs"
          />
          <div className="w-full rounded-md p-2">
            <span className="font-bold text-gray-400">Name: </span>
            <span className="text-white">{currentNft?.name}</span>
            <br />
            <span className="font-bold text-gray-400">Description: </span>
            <span className="text-white">{currentNft?.desc}</span>
            <br />
            <span className="font-bold text-gray-400">Owner: </span>
            <span className="text-white break-all">{currentNft?.owner}</span>
          </div>
        </div>
        <div className="text-right">
          <Link
            to={`https://opensea.io/assets/ethereum/${address}/${currentNft?.tokenId}`}
            target="_blank"
          >
            <button className="secondary">Purchase from Opensea</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Modal;
