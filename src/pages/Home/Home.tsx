import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [address, setAddress] = useState<string>("");
  const navigate = useNavigate();

  return (
    <div className="flex">
      <div className="mx-auto my-10">
        <p className="font-medium text-gray-500 mb-5">
          Choose collection below, or enter contract address and hit "Go"
        </p>

        <Link
          to="/0xe4a3cbfa0b27db2def20bfba80905515b0855e54"
          className="block text-center"
        >
          <button className="primary w-48">WannaPanda</button>
        </Link>
        <Link
          to="/0xb2081bf7a25e7bcce263f4a80847f0b6769ded6c"
          className="block text-center mt-2"
        >
          <button className="primary w-48">ApeKun By Tenjin</button>
        </Link>

        <form
          className="flex items-center justify-center flex-wrap mt-2"
          onSubmit={() => navigate(`/${address}`)}
        >
          <label>
            Enter NFT Address
            <input
              className="ml-2 w-72"
              placeholder="NFT collection address on Ethereum"
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <Link to={`/${address}`}>
            <button className="secondary ml-2 w-16">Go</button>
          </Link>
        </form>
        <p className="text-center">
          <a
            href="https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721Enumerable.sol"
            rel="noreferrer"
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            ERC721Enumerable
          </a>
          &nbsp;tokens only
        </p>
      </div>
    </div>
  );
};

export default Home;
