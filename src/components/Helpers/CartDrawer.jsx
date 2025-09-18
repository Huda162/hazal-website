import React, { useState, useEffect } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { useCartDrawer } from "../../context/CartDrawerContext";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductsTable from "../CartPage/ProductsTable";

export function CartDrawer() {
  const { isCartOpen, openCartDrawer, closeCartDrawer } = useCartDrawer();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const carts = useSelector((state) => state.cart.value);
  const [width, setWidth] = useState();
  const [languageChanged, setLanguageChanged] = useState(false);

  // Track language changes
  useEffect(() => {
    const handleLanguageChanged = () => {
      setLanguageChanged(true);
      closeCartDrawer();
      setTimeout(() => setLanguageChanged(false), 100);
    };

    i18n.on("languageChanged", handleLanguageChanged);
    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, [i18n, closeCartDrawer]);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  const isRTL = currentLanguage === "ar" || currentLanguage === "he";
  const placement = isRTL ? "left" : "right";

  if (languageChanged) {
    return null;
  }

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={closeCartDrawer}
          style={{
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)'
          }}
        />
      )}

      {/* Drawer */}
      <Drawer
        open={isCartOpen}
        onClose={closeCartDrawer}
        className="py-4 z-[1037] flex flex-col h-full shadow-2xl"
        size={450}
        placement={placement}
        transition={{ type: "tween", duration: 0.3 }}
        overlay={false} // We're using our custom overlay
      >
        {/* Header */}
        <div className="px-4 mt-4 flex items-center justify-between h-[10vh]">
          <Typography variant="h3" color="blue-gray">
            {t("Cart")}
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={closeCartDrawer}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>

        {/* Divider */}
        <hr className="mt-3 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />

        {/* Products Table */}
        <div className="flex-grow overflow-y-auto w-full">
          <ProductsTable />
        </div>

        {/* Divider */}
        <hr className="mb-3 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />

        {/* Footer */}
        <div className="w-full p-4 flex-shrink-0">
          {carts.length > 0 && (
            <div className="w-full flex sm:justify-end">
              <div className="w-full border-[#EDEDED] px-3 py-3 rounded-lg">
                <div className="sub-total mb-6">
                  <div className="flex justify-between mb-6">
                    <p className="text-[20px] font-bold text-qblack">
                      {t("Total")}
                    </p>
                    <p className="text-[20px] font-bold text-qred">
                      ₪
                      {carts?.reduce(
                        (acc, item) =>
                          acc +
                          Number(item.price_nis_retail) * Number(item.quantity),
                        0
                      )}
                    </p>
                  </div>
                  <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                </div>
                <Link to="/checkout" onClick={() => closeCartDrawer()}>
                  <div className="cursor-pointer w-full h-[50px] black-btn flex justify-center items-center rounded-lg">
                    <span className="text-md font-semibold">
                      {t("Click here to confirm the order")}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </Drawer>
    </>
  );
}