import { getBalance } from "./LedgerData";

const Header = () => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className=" flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            EquityList Ledger
          </span>
        </a>
        <div className="flex dark:text-white">
          <div className="mr-2">BALANCE</div>
          <div>{getBalance()}</div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
