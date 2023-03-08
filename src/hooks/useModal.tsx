import React, { useState, useContext, ReactNode } from "react";
import Modal from "../components/Modal";

interface ModalType {
  currentNft: NftAssetData | null;
  setModal: (data: NftAssetData | null) => void;
}

const ModalContext = React.createContext<ModalType>({
  currentNft: null,
  setModal: (_data: NftAssetData | null) => {},
});

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentNft, setCurrentNft] = useState<NftAssetData | null>(null);

  return (
    <ModalContext.Provider
      value={{
        currentNft,
        setModal: setCurrentNft,
      }}
    >
      {children}
      <Modal open={currentNft !== null} />
    </ModalContext.Provider>
  );
};

const useModal = () => useContext(ModalContext);

export default useModal;
