import { FC } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

interface SearchBarProps {
  value: string;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  handleSearch(): void;
  onClearSearch(): void;
}

const SearchBar: FC<SearchBarProps> = ({
  value,
  onChange,
  handleSearch,
  onClearSearch,
}) => {
  return (
    <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md">
      <input
        type="text"
        placeholder="Buscar nota..."
        className="w-full text-sm bg-transparent py-[11px] outline-none"
        onChange={onChange}
        value={value}
      />

      {value && (
        <IoMdClose
          className="text-xl text-slate-500 cursor-pointer hover:text-black duration-150 mr-4"
          onClick={onClearSearch}
        />
      )}

      <FaMagnifyingGlass
        className="text-slate-400 cursor-pointer hover:text-black  duration-150"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
