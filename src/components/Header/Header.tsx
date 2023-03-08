interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => (
  <div className="sticky top-0 bg-white bg-opacity-95	z-10 backdrop-filter backdrop-blur-sm	shadow-md flex py-6 px-4 justify-between items-center flex-wrap">
    <a href="/">
      <p className="text-3xl font-medium text-gray-400 hover:text-gray-300">
        Alturanft Assignment
      </p>
    </a>
  </div>
);

export default Header;
