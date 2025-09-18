import { useSelector } from "react-redux";
import Cart from "../../../Cart";
import Compair from "../../../Helpers/icons/Compair";
import ThinBag from "../../../Helpers/icons/ThinBag";
import ThinLove from "../../../Helpers/icons/ThinLove";
import ThinPeople from "../../../Helpers/icons/ThinPeople";
import SearchBox from "../../../Helpers/SearchBox";
import { Link } from "react-router-dom";
import i18n from "i18next";
import logo from "../../../../../public/assets/images/logo.png";
import { useState } from "react";
import Selectbox from "../../../Helpers/Selectbox";
import Arrow from "../../../Helpers/icons/Arrow";
import { useTheme } from "@material-ui/core";
import Cookies from "universal-cookie";
import { useEffect } from "react";
import LanguageSwitchIcon from "../../../Helpers/icons/Language";
import "../../../../index.css";
import language from "../../../../../public/assets/images/language.svg";
import { useCartDrawer } from "../../../../context/CartDrawerContext";
import { useTranslation } from "react-i18next";
import userIcon from "../../../../../public/assets/images/user.png";
import useFetchData from "../../../../hooks/fetchData";

export default function Middlebar({ className }) {
  // const [toggleCart, setToggle] = useState(false);
  // const cartHandler = () => {
  //   setToggle(!toggleCart);
  // };
  const { data, loading } = useFetchData(`products_offers?1`);
  const showOffersPage = data.products?.data?.length > 0 ? true : false;
  console.log(showOffersPage);

  const cart = useSelector((state) => state.cart.value);
  const favorite = useSelector((state) => state.favorit.items);
  const [toggle, setToggle] = useState(false);
  const theme = useTheme();
  const [toggleLang, setToggleLang] = useState(false);
  const lang = localStorage.getItem("i18nextLng");
  const logStatus = JSON.parse(localStorage.getItem("action_log_status"));
  console.log(logStatus === "true");
  const storedLogo = localStorage.getItem("action_logo") || logo;

  document.body.dir = i18n.dir();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.body.dir = i18n.dir();
    theme.direction = i18n.dir();
    const language = localStorage.setItem("language", lng);
    setToggleLang(false);
  };
  const { openCartDrawer, closeCartDrawer, toggleCartDrawer } = useCartDrawer();

  const datas = [
    { code: "ar", label: "العربية" },
    { code: "en", label: "English" },
    { code: "he", label: "Hebrew" },
  ];

  const { t } = useTranslation();
  return (
    <div
      className={`w-full h-[10vh] bg-white ${className} flex justify-center top-0 fixed z-40 bg-gradient-to-r from-main-color via-secondary-color to-main-color`}
    >
      <div className=" h-full w-[100%]">
        <div className=" mx-6 relative h-full ">
          <div className="flex justify-between items-center h-full">
            <div className="mx-3">
              <Link to="/">
                <img width="40" src={logo} alt="logo" />
              </Link>
            </div>
            <div className="nav">
              <ul className="nav-wrapper flex xl:space-x-5 space-x-5 text-white">
                <li className="relative">
                  <Link to="/">
                    <span className="nav-item flex items-center text-sm 2xl:text-[15px] font-600 transition-all  duration-300 ease-in-out cursor-pointer ml-[40px] mr-[40px] lg:ml-[20px] lg:mr-[20px] lg:text-xs">
                      <span>{t("Home Page")}</span>
                      <span className="ml-1.5 "></span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/all-categories">
                    <span className="nav-item flex items-center text-sm 2xl:text-[15px] font-600 cursor-pointer lg:text-xs">
                      <span>{t("Categories")}</span>
                    </span>
                  </Link>
                </li>

                <li>
                  <Link to="/all-brands">
                    <span className="nav-item flex items-center text-sm 2xl:text-[15px] font-600 cursor-pointer lg:text-xs">
                      <span>{t("brands")} </span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/products">
                    <span className="nav-item flex items-center text-sm 2xl:text-[15px] font-600 cursor-pointer lg:text-xs">
                      <span>{t("Our Products")} </span>
                    </span>
                  </Link>
                </li>
                {showOffersPage && (
                  <li>
                    <Link to="/offers">
                      <span className="nav-item flex items-center text-sm 2xl:text-[15px] font-600 cursor-pointer lg:text-xs">
                        <span>{t("Offers")} </span>
                      </span>
                    </Link>
                  </li>
                )}
                <li>
                  <Link to="/about">
                    <span className="nav-item flex items-center text-sm 2xl:text-[15px] font-600 cursor-pointer lg:text-xs">
                      <span>{t("About Us")} </span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/contact">
                    <span className="nav-item flex items-center text-sm 2xl:text-[15px] font-600 cursor-pointer lg:text-xs">
                      <span>{t("Contact Us")}</span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-[20vw] h-[44px]">
              <SearchBox className="search-com" />
            </div>
            <div className="flex space-x-6 items-center">
              {logStatus === "true" && (
                <div className="relative pl-5">
                  <Link to="/profile">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="c#ffffff"
                        viewBox="0 0 256 256"
                      >
                        <path d="M128,26A102,102,0,1,0,230,128,102.12,102.12,0,0,0,128,26ZM71.44,198a66,66,0,0,1,113.12,0,89.8,89.8,0,0,1-113.12,0ZM94,120a34,34,0,1,1,34,34A34,34,0,0,1,94,120Zm99.51,69.64a77.53,77.53,0,0,0-40-31.38,46,46,0,1,0-51,0,77.53,77.53,0,0,0-40,31.38,90,90,0,1,1,131,0Z"></path>
                      </svg>
                    </span>
                  </Link>
                </div>
              )}
              <div className="relative mx-5">
                <div
                  onClick={() => setToggleLang(!toggleLang)}
                  className="cursor-pointer"
                >
                  <span className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="#ffffff"
                      viewBox="0 0 256 256"
                    >
                      <path d="M128,26A102,102,0,1,0,230,128,102.12,102.12,0,0,0,128,26Zm81.57,64H169.19a132.58,132.58,0,0,0-25.73-50.67A90.29,90.29,0,0,1,209.57,90ZM218,128a89.7,89.7,0,0,1-3.83,26H171.81a155.43,155.43,0,0,0,0-52h42.36A89.7,89.7,0,0,1,218,128Zm-90,87.83a110,110,0,0,1-15.19-19.45A124.24,124.24,0,0,1,99.35,166h57.3a124.24,124.24,0,0,1-13.46,30.38A110,110,0,0,1,128,215.83ZM96.45,154a139.18,139.18,0,0,1,0-52h63.1a139.18,139.18,0,0,1,0,52ZM38,128a89.7,89.7,0,0,1,3.83-26H84.19a155.43,155.43,0,0,0,0,52H41.83A89.7,89.7,0,0,1,38,128Zm90-87.83a110,110,0,0,1,15.19,19.45A124.24,124.24,0,0,1,156.65,90H99.35a124.24,124.24,0,0,1,13.46-30.38A110,110,0,0,1,128,40.17Zm-15.46-.84A132.58,132.58,0,0,0,86.81,90H46.43A90.29,90.29,0,0,1,112.54,39.33ZM46.43,166H86.81a132.58,132.58,0,0,0,25.73,50.67A90.29,90.29,0,0,1,46.43,166Zm97,50.67A132.58,132.58,0,0,0,169.19,166h40.38A90.29,90.29,0,0,1,143.46,216.67Z"></path>
                    </svg>
                  </span>
                </div>
                <div
                  className={`${
                    toggleLang ? "block" : "hidden"
                  } absolute left-0 mt-2 w-36 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10 transition-all duration-300`}
                >
                  <ul className="py-1">
                    <li
                      className={`${
                        lang === "ar"
                          ? "bg-gray-50 text-gray-600"
                          : "text-gray-700"
                      } block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-600 transition-colors duration-200 cursor-pointer`}
                      onClick={() => changeLanguage("ar")}
                    >
                      العربية
                    </li>
                    <li
                      className={`${
                        lang === "en"
                          ? "bg-gray-50 text-gray-600"
                          : "text-gray-700"
                      } block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-600 transition-colors duration-200 cursor-pointer`}
                      onClick={() => changeLanguage("en")}
                    >
                      English
                    </li>
                    <li
                      className={`${
                        lang === "he"
                          ? "bg-gray-50 text-gray-600"
                          : "text-gray-700"
                      } block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-600 transition-colors duration-200 cursor-pointer`}
                      onClick={() => changeLanguage("he")}
                    >
                      עִברִית
                    </li>
                  </ul>
                </div>
              </div>

              <div className="favorite relative mx-5">
                <Link to="/wishlist">
                  <span>
                    <ThinLove />
                  </span>
                </Link>
                <span className="w-[18px] h-[18px] rounded-full bg-secondary-color absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] text-white">
                  {favorite.length}
                </span>
              </div>
              {/* {cart.length === 0 } */}
              <div className="cart-wrapper group relative py-4">
                <div className="cart relative cursor-pointer">
                  <button onClick={() => openCartDrawer()}>
                    <span>
                      <ThinBag fill="white"/>
                    </span>
                  </button>
                  <span className="w-[18px] h-[18px] rounded-full bg-secondary-color absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] text-white">
                    {cart?.length || 0}
                  </span>
                </div>
              </div>
              {/* <div className={`my-select-box ${className || ""}`}>
                <button
                  onClick={() => setToggle(!toggle)}
                  type="button"
                  className="my-select-box-btn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth=".90"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                    />
                  </svg>
                </button>
                {toggle && (
                  <div
                    className="click-away"
                    onClick={() => setToggle(!toggle)}
                  ></div>
                )}
                <div
                  className={`my-select-box-section ${toggle ? "open" : ""}`}
                >
                  <ul className="list">
                    <li>english</li>
                  </ul>
                </div>
              </div> */}
              {/* <div>
                <Link to="/profile">
                  <span>
                    <ThinPeople />
                  </span>
                </Link>
              </div> */}
              {/* <div className={`my-select-box ${className || ""}`}>
                <button
                  onClick={() => setToggle(!toggle)}
                  type="button"
                  className="my-select-box-btn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="none"
                    viewBox="0 0 256 256"
                  >
                    <path
                      fill="black"
                      d="M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm88,104a87.61,87.61,0,0,1-3.33,24H174.16a157.44,157.44,0,0,0,0-48h38.51A87.61,87.61,0,0,1,216,128ZM102,168H154a115.11,115.11,0,0,1-26,45A115.27,115.27,0,0,1,102,168Zm-3.9-16a140.84,140.84,0,0,1,0-48h59.88a140.84,140.84,0,0,1,0,48ZM40,128a87.61,87.61,0,0,1,3.33-24H81.84a157.44,157.44,0,0,0,0,48H43.33A87.61,87.61,0,0,1,40,128ZM154,88H102a115.11,115.11,0,0,1,26-45A115.27,115.27,0,0,1,154,88Zm52.33,0H170.71a135.28,135.28,0,0,0-22.3-45.6A88.29,88.29,0,0,1,206.37,88ZM107.59,42.4A135.28,135.28,0,0,0,85.29,88H49.63A88.29,88.29,0,0,1,107.59,42.4ZM49.63,168H85.29a135.28,135.28,0,0,0,22.3,45.6A88.29,88.29,0,0,1,49.63,168Zm98.78,45.6a135.28,135.28,0,0,0,22.3-45.6h35.66A88.29,88.29,0,0,1,148.41,213.6Z"
                    ></path>
                  </svg>
                </button>
                {toggle && (
                  <div
                    className="click-away"
                    onClick={() => setToggle(!toggle)}
                  ></div>
                )}
                <div
                  className={`my-select-box-section ${toggle ? "open" : ""}`}
                  style={{ width: "100px" }}
                >
                  <ul className="list">
                    {datas.map((language) => (
                      <li
                        key={language.code}
                        onClick={() => changeLanguage(language.code)}
                      >
                        {language.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div> */}
              {/* <div className="language-select flex space-x-1 items-center">
                <Selectbox
                  className="w-fit"
                  datas={["en", "ar"]}
                  onClick={changeLanguage}
                />
                <Arrow className="fill-current qblack" />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
