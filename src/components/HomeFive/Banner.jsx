import { Link } from "react-router-dom";
import { useRef } from "react";
import SimpleSlider from "../Helpers/SliderCom";
import PropTypes from "prop-types";
import i18n from "i18next";
import { useSelector } from "react-redux";

export default function Banner({ className, sliders }) {
  Banner.propTypes = {
    sliders: PropTypes.instanceOf(Array),
  };
  const sliderRef = useRef(null);
  const settings = {
    infinite: true,
    // autoplay: true,
    // fade: true,
    arrows: false,
    dots: true,
    autoplaySpeed: 3000,

    rtl: i18n.language === "ar",
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          dots: true,
        },
      },
    ],
  };
  const cart = useSelector((state) => state.cart.value);
  return (
    <>
      <div
        className={`hero-slider-wrapper hero-slider-wrapper w-[100%]${
          className || ""
        }`}
      >
        <div className="main-wrapper w-full h-full  sm:block">
          <div
            className={`${
              cart.length > 0
                ? `xl:h-full mb-10 xl:mb-0  w-full relative col-span-3 mt-[70px] xl:mt-[20px] hidden xl:block `
                : `xl:h-full mb-10 xl:mb-0  w-full relative col-span-3 mt-[70px] xl:mt-[20px] hidden xl:block`
            } `}
          >
            <SimpleSlider settings={settings} selector={sliderRef} className='w-full'>
              {sliders?.map((item, index) => (
                <div
                  className={`${
                    cart.length > 0
                      ? "w-full h-[200px] xl:h-[90vh]"
                      : "w-full xl:h-[90vh] h-[200px]"
                  }`}
                  key={index}
                >
                  <div
                    className="w-full h-full relative md:bg-center "
                    style={{
                      backgroundImage: `url(${item.image})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      textAlign: i18n.language === "en" ? "left" : "right",
                      direction: i18n.language === "ar" ? "rtl" : "ltr",
                    }}
                  >
                    <div className="container-x mx-auto flex items-center  h-full">
                      <div className="w-full h-full xl:flex items-center pt-20 xl:pt-0"></div>
                    </div>
                  </div>
                </div>
              ))}
            </SimpleSlider>
          </div>
          <div className="xl:h-full mb-10 xl:mb-0  w-full relative col-span-3  mt-[70px] xl:mt-[20px]  xl:hidden lg:mt-[100px]">
            <SimpleSlider settings={settings} selector={sliderRef}>
              {sliders?.map((item, index) => (
                <div className="item w-full xl:h-[600px] h-[300px]" key={index}>
                  <div
                    className="w-full h-full relative md:bg-center rounded-xl xl:border-8  border-main-color "
                    style={{
                      backgroundImage: `url(${item.image_mobile})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      textAlign: i18n.language === "en" ? "left" : "right",
                      direction: i18n.language === "ar" ? "rtl" : "ltr",
                    }}
                  >
                    <div className="container-x mx-auto flex items-center  h-full">
                      <div className="w-full h-full xl:flex items-center pt-20 xl:pt-0"></div>
                    </div>
                  </div>
                </div>
              ))}
            </SimpleSlider>
          </div>
        </div>
      </div>
    </>
  );
}
