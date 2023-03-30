import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { APE_KUN_AddRESS, WANNA_PANDA_ADDRESS } from "../../config";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [address, setAddress] = useState<string>("");
  const navigate = useNavigate();

  const handleAddressInputChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value),
    [setAddress]
  );

  const handleSubmitted = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      navigate(`/${address}`);
    },
    [navigate, address]
  );

  return (
    <div className="flex">
      <div className="mx-auto my-10">
        <p className="font-medium text-gray-500 mb-5">
          Choose collection below, or enter contract address and hit "Go"
        </p>

        <Link to={WANNA_PANDA_ADDRESS} className="block text-center">
          <button className="primary w-48">WannaPanda</button>
        </Link>
        <Link to={APE_KUN_AddRESS} className="block text-center mt-2">
          <button className="primary w-48">ApeKun By Tenjin</button>
        </Link>

        <form
          className="flex items-center justify-center flex-wrap mt-2"
          onSubmit={handleSubmitted}
        >
          <label>
            Enter NFT Address
            <input
              className="ml-2 w-72"
              placeholder="NFT collection address on Ethereum"
              onChange={handleAddressInputChanged}
            />
          </label>
          <Link className="mt-2 sm:mt-0" to={`/${address}`}>
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
