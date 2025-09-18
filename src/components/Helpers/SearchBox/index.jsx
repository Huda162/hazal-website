import { useState } from "react";
import useFetchData from "../../../hooks/fetchData";
import { useNavigate } from "react-router-dom";
import {useTranslation} from 'react-i18next'
import { useCartDrawer } from "../../../context/CartDrawerContext";

export default function SearchBox({ className, type }) {
  const [value, setValue] = useState("");
  const navigate = useNavigate("");
  const { isCartOpen, openCartDrawer, closeCartDrawer } = useCartDrawer();
  const handleSearchProduct = () => {
    closeCartDrawer()
    navigate(`/search-products/${value}`);
  };
  const lang = localStorage.getItem("i18nextLng");

  const {t} = useTranslation()
  return (
    <>
      <div
        className={`w-full h-full flex items-center  border border-qgray-border bg-white rounded-lg ${
          className || ""
        }`}
      >
        <div className="flex-1 bg-white rounded-lg h-full">
          <form onSubmit={handleSearchProduct} className="h-full">
            <input
              type="text"
              className="search-input rounded-lg pr-[10px]"
              placeholder={`${t("Search Product")}...`}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </form>
        </div>
        <div className="w-[1px] h-[22px] bg-qgray-border"></div>
        <button
          className={`w-[50px] md:w-[93px] h-full text-sm font-600 bg-secondary-color text-white  ${lang === 'en' ? 'rounded-r-lg' : 'rounded-l-lg'}`}
          type="button"
          onClick={handleSearchProduct}
        >
          {t("Search")}
        </button>
      </div>
    </>
  );
}
