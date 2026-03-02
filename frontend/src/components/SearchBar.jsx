import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { showSearch, setShowSearch, searchQuery, setSearchQuery } =
    useContext(ShopContext);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.pathname.includes("products")) {
      setShowSearch(false);
      setSearchQuery("");
    }
  }, [location]);

  if (!showSearch || !location.pathname.includes("products")) return null;


  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center border border-(--main-text-color) bg-(--main-text-color) px-5 py-2 my-5 mx-3 w-3/4 sm:w-1/2">
        <input
          autoFocus
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 outline-none bg-(--main-text-color) text-sm text-(--second-text-color)"
          type="text"
          placeholder="Search products..."
        />
      </div>

      <svg
        onClick={() => {
          setShowSearch(false);
          setSearchQuery("");
        }}
        className="inline w-3 cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="var(--main-text-color)"
      >
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
      </svg>
    </div>
  );
};

export default SearchBar;