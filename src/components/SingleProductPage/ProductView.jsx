import { useCallback, useEffect, useRef, useState } from "react";
import Star from "../Helpers/icons/Star";
import Selectbox from "../Helpers/Selectbox";
import useFetchData from "../../hooks/fetchData";
import { addItem, decrementItem } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import ModalImage from "react-modal-image";
import Ads from "../Home/Ads";
import Tabs from "./tabs";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import BreadcrumbCom from "../BreadcrumbCom";
import card1 from "../../../public/assets/images/card-1.svg";
import card2 from "../../../public/assets/images/card-2.svg";
import card3 from "../../../public/assets/images/card-3.svg";
import card4 from "../../../public/assets/images/card-4.svg";
import whatsapp from "../../../public/assets/images/whatsapp.png";
import ReactImageMagnify from "react-image-magnify";
// import ReactImageZoom from "react-image-zoom";
import ReactPlayer from "react-player";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import InnerImageZoom from "react-inner-image-zoom";
import logo from "../../../public/assets/images/logo.png";
import {
  notifyAddCartAr,
  notifyAddCartEn,
  notifyAddCartHe,
  notifyAddFavoriteAr,
  notifyAddFavoriteEn,
  notifyAddFavoriteHe,
} from "../Helpers/Toasts/NotifyAdd";
import { useCartDrawer } from "../../context/CartDrawerContext";
import { addFavorite, removeFavorite } from "../../redux/favoriteSlice";
import {
  notifyRemoveFavoriteAr,
  notifyRemoveFavoriteEn,
  notifyRemoveFavoriteHe,
} from "../Helpers/Toasts/NotifyDelete";
import Slider from "react-slick";

export default function ProductView({
  className,
  reportHandler,
  data,
  onAddCart,
  onAddFavorite,
  onDecrement,
}) {
  const dispatch = useDispatch();
  const favorite = useSelector((state) => state.favorit.items);
  const [src, setSrc] = useState(data?.product?.images?.[0]?.url);
  const [qty, setQTY] = useState(1);
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [selectedPrice, setSelectedPrice] = useState("");
  const playerRef = useRef(null);
  const [videoThumbnail, setVideoThumbnail] = useState(null);
  const [actualPrice, setActualPrice] = useState("");
  const { data: data2, loading } = useFetchData("socials");
  const [colorStock, setColorStock] = useState(
    data.product?.product_colors?.length > 0
      ? data.product?.product_colors.reduce((total, e) => {
          return total + e.stock;
        }, 0)
      : 0
  );
  const openDialog = () => {
    setOpen(true);
  };
  const handleAddFavorite = (item) => {
    const isFavorite = favorite.some(
      (favoriteItem) => favoriteItem.id === item.id
    );

    if (isFavorite) {
      const itemIndex = favorite.findIndex(
        (favoriteItem) => favoriteItem.id === item.id
      );
      dispatch(removeFavorite(itemIndex));
      {
        lang === "ar"
          ? notifyRemoveFavoriteAr()
          : lang === "en"
          ? notifyRemoveFavoriteEn()
          : notifyRemoveFavoriteHe();
      }
    } else {
      dispatch(addFavorite({ newItem: item }));
      {
        lang === "ar"
          ? notifyAddFavoriteAr()
          : lang === "en"
          ? notifyAddFavoriteEn()
          : notifyAddFavoriteHe();
      }
    }
  };
  const handleDecrementItem = () => {
    if (qty > 1) {
      setQTY(qty - 1);
    }
  };
  const handleIncrementItem = (pro) => {
    setQTY(qty + 1);
  };
  const closeDialog = () => {
    setOpen(false);
  };
  const handleAddcart = (pro, quantity) => {
    console.log(selectedColor, data.product_colors?.length);
    const updatedProduct = {
      ...pro,
      price_nis_retail: selectedPrice,
    };
    if (selectedPrice) {
      if (
        (data.product.product_colors?.length > 0 && selectedColor !== "") ||
        (data.product.product_sizes?.length > 0 && selectedSize !== "")
      ) {
        dispatch(
          addItem({
            newItem: {
              ...updatedProduct,
              selectedColor,
              quantity,
              selectedSize,
            },
          })
        );
      } else {
        dispatch(addItem({ newItem: { ...updatedProduct, quantity } }));
      }
    } else {
      if (
        (data.product.product_colors?.length > 0 && selectedColor !== "") ||
        (data.product.product_sizes?.length > 0 && selectedSize !== "")
      ) {
        console.log("saluuut");
        dispatch(
          addItem({
            newItem: { ...pro, selectedColor, quantity, selectedSize },
          })
        );
      } else {
        dispatch(addItem({ newItem: { ...pro, quantity } }));
      }
    }
    {
      lang === "ar"
        ? notifyAddCartAr()
        : lang === "en"
        ? notifyAddCartEn()
        : notifyAddCartHe();
    }
    openCartDrawer();
    setQTY(1);
  };
  const changeImgHandler = useCallback((current) => {
    const scrollPosition = window.scrollY;
    if (current?.preventDefault) current.preventDefault();
    requestAnimationFrame(() => {
      setSrc(current);
      requestAnimationFrame(() => {
        window.scrollTo({
          top: scrollPosition,
          behavior: "instant",
        });
      });
    });
  }, []);

  const isButtonDisabled = () => {
    if (data?.product?.product_sizes.length > 0 && selectedSize === "")
      return true;
    if (data?.product?.product_colors.length > 0 && selectedColor === "")
      return true;
    if (data?.product?.product_stock === 0 && colorStock === 0) return true;

    return false;
  };
  const isFavorite = favorite.some((item) => item.id === data?.product?.id);
  const [activeTab, setActiveTab] = useState("first");
  const lang = localStorage.getItem("i18nextLng");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const { openCartDrawer } = useCartDrawer();
  useEffect(() => {
    if (data.product?.is_offer === "true") {
      setSelectedPrice(
        data.product?.price_nis_retail -
          (data.product?.price_nis_retail * data.product?.discount_percentage) /
            100
      );
      console.log(
        data.product?.price_nis_retail -
          (data.product?.price_nis_retail * data.product?.discount_percentage) /
            100
      );
      setActualPrice(data?.product?.price_nis_retail);
    }
  }, []);

  const [showWarning, setShowWarning] = useState(false);

  const message =
    lang === "ar"
      ? "مرحبا أنا مهتم بالمنتج التالي من موقع زيتون، هل يمكنك تزويدي بمزيد من التفاصيل أو مساعدتي في طلبي\n" +
        `${data?.product?.price_nis_retail} :السعر،${data?.product?.name_ar} :المنتج \n` +
        `تحقق من ذلك : https://hazal.ps/single-product/${data?.product?.id} \n`
      : "Hello! I am interested in the following product from Hazal Electronic Marketing website, Could you please provide me with more details or assist me with my order?\n" +
        `Product name:  ${data?.product?.name_en}, price : ${data?.product?.price_nis_retail}\n` +
        `Check it out: https://hazal.ps/single-product/${data?.product?.id} \n`;

  const encodedMessage = encodeURIComponent(message);

  const props = {
    width: 400,
    height: 650,
    zoomWidth: 600,
    img: src ?? "",
    zoomPosition: "left",
  };
  const isRTL = ["ar", "he"].includes(i18n.language);

  const totalSlides =
    (data?.product?.images?.length || 0) +
    (data?.product?.product_colors?.length || 0);
  const [currentSlide, setCurrentSlide] = useState(isRTL ? totalSlides - 1 : 0);
  const allSlides = [
    ...(data?.product?.images || []),
    ...(data?.product?.product_colors || []).map((color) => ({
      url: color.color_image,
      type: "image",
    })),
  ];
  const sliderRef = useRef();

  const slides = isRTL ? [...allSlides].reverse() : allSlides;

  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (index) => setCurrentSlide(index),
    rtl: isRTL,
  };
  useEffect(() => {
    if (sliderRef.current) {
      setCurrentSlide(sliderRef.current.innerSlider.state.currentSlide);
    }
  }, []);

  return (
    <div
      className={`product-view w-full lg:flex justify-between lg:mt-[40px]  ${
        className || ""
      }`}
    >
      <div data-aos="fade-right" className="lg:w-1/2 xl:mr-[10px] lg:mr-[10px]">
        {/* Main Image Display */}
        <div className="w-full h-[450px] lg:h-[550px] border border-qgray-border overflow-hidden relative mb-3">
          <div className="xl:hidden block h-full relative">
            <div className="relative">
              <Slider {...settings} className="h-full">
                {slides.map((item, index) => (
                  <div
                    key={`slide-${index}`}
                    className="h-[450px] lg:h-[550px] flex justify-center items-center"
                  >
                    {item.type === "video" ? (
                      <div className="w-full h-full">
                        <ReactPlayer
                          url={item.url}
                          controls
                          width="100%"
                          height="100%"
                          playing={false}
                        />
                      </div>
                    ) : (
                      <img
                        src={item.url}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-[450px] object-contain"
                        onError={(e) => {
                          e.target.onError = null;
                          e.target.src = logo;
                        }}
                      />
                    )}
                  </div>
                ))}
              </Slider>

              <div
                className={`absolute bottom-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded ${
                  isRTL ? "left-2" : "right-2"
                }`}
              >
                {isRTL ? totalSlides - currentSlide : currentSlide + 1}/
                {totalSlides}
              </div>
            </div>
          </div>

          {/* Desktop View */}
          <div className="hidden xl:flex justify-center items-center h-full">
            {data?.product?.images?.map((item, index) => (
              <div key={`desk-img-${index}`}>
                {item.type === "video" ? (
                  src === item.url && (
                    <ReactPlayer
                      url={src}
                      controls
                      width="100%"
                      height="550px"
                    />
                  )
                ) : src === item.url ? (
                  <InnerImageZoom
                    src={src}
                    zoomSrc={src}
                    zoomType="hover"
                    zoomPreload={true}
                    onError={(e) => {
                      e.target.onError = null;
                      e.target.src = logo;
                    }}
                  />
                ) : null}
              </div>
            ))}
            {data?.product?.product_colors?.map((item, index) => (
              <div key={`desk-color-${index}`}>
                {src === item.color_image && (
                  <InnerImageZoom
                    src={src}
                    zoomSrc={src}
                    zoomType="hover"
                    zoomPreload={true}
                    onError={(e) => {
                      e.target.onError = null;
                      e.target.src = logo;
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="hidden md:flex gap-2 overflow-x-auto whitespace-nowrap py-2 scrollbar-style">
          {data?.product?.images?.map((img) => (
            <div
              key={`thumb-img-${img.id}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                changeImgHandler(img.url);
              }}
              className={`inline-block w-[110px] h-[110px] p-[15px] border cursor-pointer flex-shrink-0 transition-all ${
                src === img.url
                  ? "border-main-color shadow-md"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              style={{ willChange: "transform" }} // Optimizes animations
            >
              {img.type === "video" ? (
                <img
                  src="https://cdn.pixabay.com/photo/2014/10/09/13/14/video-481821_1280.png"
                  alt="Video thumbnail"
                  className="w-full h-full object-contain opacity-70"
                  onError={(e) => {
                    e.target.onError = null;
                    e.target.src = logo;
                  }}
                />
              ) : (
                <img
                  src={img.url}
                  alt="Product thumbnail"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.onError = null;
                    e.target.src = logo;
                  }}
                />
              )}
            </div>
          ))}

          {data?.product?.product_colors?.map((color) => (
            <div
              key={`thumb-color-${color.id}`}
              onClick={() => changeImgHandler(color.color_image)}
              className={`inline-block w-[110px] h-[110px] p-[15px] border cursor-pointer flex-shrink-0 transition-all ${
                src === color.color_image
                  ? "border-main-color shadow-md"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <img
                src={color.color_image}
                alt="Color variant"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.onError = null;
                  e.target.src = logo;
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1">
        <div className="product-details w-full lg:mt-0 xl:mr-[40px]">
          <div className="breadcrumb-wrapper w-full hidden md:block">
            <div className="">
              <BreadcrumbCom
                paths={[
                  { name: t("Home Page"), path: "/" },
                  { name: t("Product"), path: "" },
                  { name: data?.product?.name, path: "" },
                ]}
              />
            </div>
          </div>
          <span
             
            className="text-qgray md:text-[15px] text-xs font-normal uppercase tracking-wider mb-2 inline-block"
          >
            {/* {t("Category")} : {data?.product?.category_name} */}
          </span>
          <p
             
            className="md:text-[30px] text-xl text-black mb-[20px] font-bold"
            style={{ lineHeight: "120%" }}
          >
            {lang === "ar"
              ? data?.product?.name_ar
              : lang === "en"
              ? data?.product?.name_en
              : data?.product?.name_he}
          </p>
          <div
             
            className="flex flex-col space-x-2  mt-[30px] mr-[20px] xl:mr-[0px]"
          >
            <span className="text-2xl font-500 text-black flex flex-col">
              {/* <h3 className="md:text-[22px] text-xl text-black mb-2  ml-[20px]">
                {t("Price")} :
              </h3> */}
              {/* <span className="text-xl font-500 text-qgray line-through ">
                {Number((data?.product?.price * 1.2).toFixed(2))}₪
              </span> */}
              {data?.product?.is_offer === "true" ? (
                <div style={{ display: "flex" }}>
                  <span className="offer-price text-qred font-600 text-[25px] ml-2 ">
                    ₪{selectedPrice}
                  </span>
                  <span className="main-price text-qgray line-through font-600 text-[18px] ml-4">
                    ₪{actualPrice}
                  </span>
                </div>
              ) : (
                <span className="text-[2.2rem]">
                  ₪
                  {selectedPrice
                    ? selectedPrice
                    : data?.product?.price_nis_retail}
                  .00
                  {/* ₪{data?.product?.price}.00 */}
                </span>
              )}
            </span>
            <span
              style={{ lineHeight: "120%" }}
              className="mt-[30px] text-qgray md:text-[18px] text-xs font-normal uppercase tracking-wider mb-2 inline-block"
            >
              {lang === "ar"
                ? data?.product?.description_ar
                : lang === "en"
                ? data?.product?.description_en
                : data?.product?.description_he}
            </span>
            {data?.product?.product_sizes.length > 0 && (
              <div>
                <div className="mt-[1rem]">{t("sizes")}:</div>

                <div className="mt-[1rem] mb-2">
                  <div className="flex flex-wrap gap-2">
                    {data.product.product_sizes.map((item, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`min-w-[40px] px-3 py-1 text-sm md:text-base font-normal uppercase tracking-wider rounded border transition-colors
          ${
            selectedSize === item.size
              ? "border-qblack text-qblack bg-gray-100"
              : "border-gray-200 text-gray-700 hover:bg-gray-50"
          }`}
                        onClick={() => {
                          setSelectedSize(item.size);
                          if (data.product?.is_offer === "true") {
                            setSelectedPrice(
                              item.size_price_nis -
                                (item.size_price_nis *
                                  data.product?.discount_percentage) /
                                  100
                            );
                            setActualPrice(item.size_price_nis);
                          } else {
                            setSelectedPrice(item.size_price_nis);
                          }
                        }}
                      >
                        {item.size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {data?.product?.product_colors.length > 0 && (
              <div>
                <div className="mt-[1rem]">{t("colors")}:</div>
                <div
                  style={{
                    maxHeight: "200px",
                    overflowY: "auto",
                    paddingRight: "8px",
                  }}
                  className="text-qgray md:text-[18px] text-xs font-normal uppercase tracking-wider mb-2"
                >
                  <div className="xl:grid grid xl:grid-cols-7 md:grid-cols-10 lg:grid-cols-7 grid-cols-5 gap-3 mb-[46px]">
                    {data.product.product_colors.map((item, index) => {
                      const isOutOfStock = item.stock === 0;
                      const isSelected = selectedColor === item.id;
                      const isLowStock = item.stock > 0 && item.stock < 10;

                      return (
                        <div
                          key={index}
                          className={`${
                            isSelected && "text-black"
                          } flex flex-col justify-center items-center text-sm group relative`}
                        >
                          <span
                            className={`rounded-md flex justify-center items-center h-[4rem] w-[4rem] m-1 relative ${
                              isOutOfStock ? "opacity-80" : ""
                            }`}
                            style={
                              isSelected
                                ? {
                                    border: isOutOfStock
                                      ? "1px solid #ef4444"
                                      : "1px solid #b58640",
                                    cursor: isOutOfStock
                                      ? "not-allowed"
                                      : "pointer",
                                  }
                                : {
                                    border: isOutOfStock
                                      ? "1px solid #fca5a5"
                                      : "1px solid #efefef",
                                    cursor: isOutOfStock
                                      ? "not-allowed"
                                      : "pointer",
                                  }
                            }
                            onClick={(e) => {
                              e.preventDefault();
                              if (!isOutOfStock) {
                                const currentScroll = window.scrollY;
                                setSelectedColor(item.id);
                                changeImgHandler(item.color_image);
                                requestAnimationFrame(() => {
                                  window.scrollTo(0, currentScroll);
                                });
                              }
                            }}
                          >
                            <img
                              src={item.color_image}
                              className={`h-[3.25rem] w-[3.25rem] rounded-md object-cover ${
                                isOutOfStock ? "grayscale-[70%]" : ""
                              }`}
                              alt="Color variant"
                              onError={(e) => {
                                e.target.onError = null;
                                e.target.src = logo;
                              }}
                            />

                            {/* Red X overlay for out of stock */}
                            {isOutOfStock && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-full h-full rounded-md bg-red-300 bg-opacity-10"></div>
                                <div className="absolute text-red-600 font-bold text-2xl"></div>
                              </div>
                            )}
                          </span>

                          {/* Tooltip */}
                          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                            <div
                              className={`text-xs px-2 py-1 rounded whitespace-nowrap ${
                                isOutOfStock
                                  ? "bg-red-100 text-red-800 border border-red-200"
                                  : isLowStock
                                  ? "bg-amber-100 text-amber-800 border border-amber-200"
                                  : "bg-green-100 text-green-800 border border-green-200"
                              }`}
                            >
                              {isOutOfStock
                                ? t("Out of stock")
                                : isLowStock
                                ? `${t("Only")} ${item.stock} ${t("left")}`
                                : t("In stock")}
                            </div>
                            <div
                              className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent ${
                                isOutOfStock
                                  ? "border-b-red-100"
                                  : isLowStock
                                  ? "border-b-amber-100"
                                  : "border-b-green-100"
                              }`}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* <div   className="colors mb-[20px] mt-[20px]">
          </div> */}
          <div className=" border border-[#EDEDED] mt-[30px] mb-[20px] m-1"></div>
          <div
             
            className="quantity-actions w-full flex flex-col sm:flex-row items-center gap-3 mb-8"
          >
            {/* Quantity Selector */}
            <div className="w-full sm:w-auto flex-shrink-0">
              <div className="w-full sm:w-[120px] h-[50px] px-4 flex items-center border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center w-full">
                  <button
                    onClick={() => handleDecrementItem(data.product.id)}
                    type="button"
                    className="text-xl text-gray-500 hover:text-main-color transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium text-gray-800">
                    {qty}
                  </span>
                  <button
                    onClick={() => handleIncrementItem(data?.product?.id)}
                    type="button"
                    className="text-xl text-gray-500 hover:text-main-color transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full grid grid-cols-6 gap-2 sm:gap-3">
              {/* Favorite Button - Narrower */}
              <div className="col-span-1 flex justify-center">
                <button
                  onClick={() => handleAddFavorite(data.product)}
                  type="button"
                  className="w-full h-[50px] flex justify-center items-center border border-gray-200 rounded-lg hover:border-main-color transition-colors min-w-[50px]"
                  aria-label={
                    isFavorite ? "Remove from favorites" : "Add to favorites"
                  }
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={isFavorite ? "#ef262c" : "none"}
                    className="transition-colors"
                  >
                    <path
                      d="M17 1C14.9 1 13.1 2.1 12 3.7C10.9 2.1 9.1 1 7 1C3.7 1 1 3.7 1 7C1 13 12 22 12 22C12 22 23 13 23 7C23 3.7 20.3 1 17 1Z"
                      stroke={isFavorite ? "#ef262c" : "#D5D5D5"}
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                  </svg>
                </button>
              </div>

              {/* Add to Cart Button - Medium Width */}
              <div className="col-span-3 sm:col-span-2 relative">
                <button
                  onMouseOver={() =>
                    data?.product?.product_colors.length > 0 &&
                    data?.product?.product_stock !== 0 &&
                    colorStock !== 0 &&
                    setShowWarning(true)
                  }
                  onMouseLeave={() =>
                    data?.product?.product_colors.length > 0 &&
                    data?.product?.product_stock !== 0 && colorStock !== 0 &&
                    setShowWarning(false)
                  }
                  disabled={isButtonDisabled()}
                  onClick={() => handleAddcart(data?.product, qty)}
                  type="button"
                  className={`w-full h-[50px] text-sm font-semibold rounded-lg transition-all duration-200 ${
                    isButtonDisabled()
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-black hover:bg-gray-800 text-white hover:scale-[1.02]"
                  }`}
                >
                  {isButtonDisabled() && data?.product?.product_stock === 0 && colorStock === 0
                    ? t("out of stock")
                    : t("Add to cart")}
                </button>

                {showWarning && isButtonDisabled() && (
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-red-500 text-white text-xs px-3 py-2 rounded-full whitespace-nowrap shadow-md animate-bounce">
                      {data?.product?.product_colors.length > 0 &&
                      data?.product?.product_sizes.length > 0
                        ? t("select color and size")
                        : data?.product?.product_colors.length > 0
                        ? t("select color")
                        : t("select size")}
                    </div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-3 h-3 bg-red-500 rotate-45"></div>
                  </div>
                )}
              </div>

              {/* WhatsApp Button - Wider */}
              <div className="col-span-2 sm:col-span-3">
                <a
                  href={`https://api.whatsapp.com/send?phone=${data2?.socials?.[2]?.url}&text=${encodedMessage}`}
                  className="w-full h-[50px] flex justify-center items-center bg-[#46c957] hover:bg-[#3aa849] text-white font-semibold rounded-lg transition-colors px-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={whatsapp}
                    width={24}
                    height={24}
                    alt="WhatsApp"
                    className="mr-2"
                  />
                  <span className="text-sm ">{t("order whatsapp")}</span>
                </a>
              </div>
            </div>
          </div>
          <div className=" border border-[#EDEDED] mt-[30px] mb-[20px]"></div>
          <div className="componentWrapper flex justify-center">
            <div className="header">{t("Payment Method")}</div>
            <div className="flex justify-center">
              {" "}
              <img
                src={card1}
                onError={(e) => {
                  e.target.onError = null;
                  e.target.src = logo;
                }}
                alt="card1"
                width={40}
                className="m-2"
              />
              <img
                src={card2}
                onError={(e) => {
                  e.target.onError = null;
                  e.target.src = logo;
                }}
                alt="card2"
                width={40}
                className="m-2"
              />
              <img
                src={card3}
                onError={(e) => {
                  e.target.onError = null;
                  e.target.src = logo;
                }}
                alt="card3"
                width={40}
                className="m-2"
              />
              <img
                src={card4}
                onError={(e) => {
                  e.target.onError = null;
                  e.target.src = logo;
                }}
                alt="card4"
                width={40}
                className="m-2"
              />
            </div>

            <div></div>
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}

      {/* {open && <Ads close={() => setOpen(false)} />} */}
    </div>
  );
}
