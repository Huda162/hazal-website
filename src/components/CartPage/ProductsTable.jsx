import { useDispatch, useSelector } from "react-redux";
import InputQuantityCom from "../Helpers/InputQuantityCom";
import { addItem, decrementItem, removeItem } from "../../redux/cartSlice";
import image from "../../../public/assets/images/empty-cart.png";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useCartDrawer } from "../../context/CartDrawerContext";
import {
  notifyRemoveCartAr,
  notifyRemoveCartEn,
  notifyRemoveCartHe,
} from "../Helpers/Toasts/NotifyDelete";

export default function ProductsTable({ className }) {
  const { t } = useTranslation();
  const lang = localStorage.getItem("i18nextLng");
  const { closeCartDrawer } = useCartDrawer();
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  const handleRemoveCart = (index) => {
    dispatch(removeItem(index));
    lang === "ar"
      ? notifyRemoveCartAr()
      : lang === "en"
      ? notifyRemoveCartEn()
      : notifyRemoveCartHe();
  };

  const handleDecrementItem = (index) => {
    dispatch(decrementItem(index));
  };

  const handleIncrementItem = (pro) => {
    dispatch(addItem({ newItem: pro }));
  };

  return (
    <div className={`w-full ${className || ""}`}>
      {cart?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full py-8">
          <img
            src={image}
            width={200}
            className="opacity-80 mb-4"
            alt="Empty cart"
          />
          <p className="text-lg text-gray-600 font-medium mb-1">
            {t("Your shopping cart is empty!")}
          </p>
          <p className="text-sm text-gray-500">
            {t("Start adding the products you want to buy.")}
          </p>
          <Link
            to="/products"
            className="mt-4 px-6 py-2 bg-main-color text-white rounded-lg hover:bg-main-color-dark transition-colors"
            onClick={closeCartDrawer}
          >
            {t("Browse Products")}
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {cart?.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <Link
                to={`/single-product/${item.id}`}
                className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-md border border-gray-100"
                onClick={closeCartDrawer}
              >
                <img
                  src={item?.images?.[0]?.url || image}
                  alt={item.name_en}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.onError = null;
                    e.target.src = image;
                  }}
                />
              </Link>

              <div className="flex-1 flex flex-col h-full">
                <div className="flex justify-between items-start">
                  <Link
                    to={`/single-product/${item.id}`}
                    onClick={closeCartDrawer}
                    className="group"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-main-color transition-colors">
                      {lang === "ar"
                        ? item.name_ar
                        : lang === "en"
                        ? item.name_en
                        : item.name_he}
                    </h3>
                  </Link>

                  <button
                    onClick={() => handleRemoveCart(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    aria-label={t("Remove item")}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 18L18 6M6 6l12 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                {(item.selectedColor || item.selectedSize) && (
                  <div className="flex flex-wrap gap-2 mt-2 mb-3">
                    {item.selectedColor && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-md text-sm">
                        <span className="text-gray-600">{t("color")}:</span>
                        <div className="w-4 h-4 rounded-full overflow-hidden border border-gray-200">
                          {item.product_colors?.map((color) => (
                            <img
                              key={color.id}
                              src={color?.color_image}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    {item.selectedSize && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-md text-sm">
                        <span className="text-gray-600">{t("size")}:</span>
                        <span className="font-medium">{item.selectedSize}</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-auto flex items-center justify-between">
                  <span className="text-lg font-bold text-main-color">
                    ₪{item.price_nis_retail}
                  </span>
                  <InputQuantityCom
                    onDecrement={() => handleDecrementItem(index)}
                    quantity={item.quantity}
                    onIncrement={() => handleIncrementItem(item)}
                    className="ml-4"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
