import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Nft from "./pages/Nft";
import { ModalProvider } from "./hooks/useModal";

const App: React.FC<{}> = () => {
  return (
    <ModalProvider>
      <Header />
      <div className="container mx-auto px-4 my-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:address" element={<Nft />} />
        </Routes>
      </div>
    </ModalProvider>
  );
};

export default App;
