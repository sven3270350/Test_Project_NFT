import React, { useState, useContext, ReactNode } from "react";

import Modal from "../components/Modal";

interface ModalType {
  currentNft: Nullable<NftAssetData>;
  setModal: (data: Nullable<NftAssetData>) => void;
}

const ModalContext = React.createContext<ModalType>({
  currentNft: null,
  setModal: (_data: Nullable<NftAssetData>) => {},
});

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentNft, setCurrentNft] = useState<Nullable<NftAssetData>>(null);

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
