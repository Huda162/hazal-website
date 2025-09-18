import { Link } from "react-router-dom";
import Facebook from "../../../Helpers/icons/Facebook";
import Instagram from "../../../Helpers/icons/Instagram";
import Youtube from "../../../Helpers/icons/Youtube";
import logo from "../../../../../public/assets/images/logo-white.png";
import useFetchData from "../../../../hooks/fetchData";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { data } = useFetchData("socials");
  const { t } = useTranslation();
  return (
    <footer className="footer-section-wrapper bg-gradient-to-r from-main-color via-secondary-color to-main-color">
      <div className="container-x block mx-auto pt-[83px]">
        <div className="lg:flex justify-between mb-[95px]">
          <div className="lg:w-4/10 w-full mb-10 lg:mb-0">
            {/* logo area */}
            <div className="mb-14">
              <Link to="/">
                <img src={`${logo}`} alt="logo" />
              </Link>
            </div>
          </div>
          <div className="lg:w-2/10 w-full mb-10 lg:mb-0 mr-[20px] ml-[20px]">
            <div className="mb-5">
              <h6 className="text-[18] font-extrabold text-[white]">
                {" "}
                {t("About Us")}
              </h6>
            </div>
            <div className="text-white">
              {t(
                "Our mission is to provide our customers with quality products, exceptional service, and an enjoyable shopping experience. We strive to meet the diverse needs of our community by offering a wide range of products."
              )}
            </div>
          </div>
          <div className="lg:w-2/10 w-full mb-10 lg:mb-0 ">
            <div className="mb-5">
              <h6 className="text-[18] font-bold text-[white]">
                Hazal Electronic Marketing
              </h6>
            </div>
            <div>
              <ul className="flex flex-col space-y-5 ">
                <li>
                  <Link to="/latest-products">
                    <span className="text-[white] text-[13px] hover:text-white border-b border-transparent hover:border-white">
                      {t("New Arrivals")}
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/best-seller-products">
                    <span className="text-[white] text-[13px] hover:text-white border-b border-transparent hover:border-white">
                      {t("Most popular sales")}
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/all-categories">
                    <span className="text-[white] text-[13px] hover:text-white border-b border-transparent hover:border-white">
                      {t("Our Products")}
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="lg:w-2/10 w-full mb-10 lg:mb-0">
            <div className="mb-5">
              <h6 className="text-[18] font-bold text-[white]">
                {t("Useful Links")}{" "}
              </h6>
            </div>
            <div>
              <ul className="flex flex-col space-y-5 ">
                <li>
                  <Link to="/">
                    <span className="text-[white] text-[13px] hover:text-white border-b border-transparent hover:border-white">
                      {t("Secure payment")}
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <span className="text-[white] text-[13px] hover:text-white border-b border-transparent hover:border-white">
                      {t("privacy policy")}
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container-x block mx-auto pt-[]">
        <div className="bottom-bar border-t border-qgray-border lg:h-[82px] lg:flex justify-between items-center">
          <div className="flex lg:space-x-5 justify-between items-center mb-3">
            <div className="flex space-x-5 items-center">
              {data?.socials?.map((social) => (
                <Link to={social.url}>
                  {social.name == "instagram" && (
                    <Instagram className="fill-current text-qgray hover:text-white m-4" />
                  )}
                  {social.name == "facebook" && (
                    <Facebook className="fill-current text-qgray hover:text-white" />
                  )}{" "}
                  {social.name == "tiktok" && (
                    <div className="fill-current text-qgray hover:text-white cursor-pointer">
                      <span className="[&>svg]:h-5 [&>svg]:w-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="gray"
                          viewBox="0 0 448 550"
                        >
                          <path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z" />
                        </svg>
                      </span>
                    </div>
                  )}
                </Link>
              ))}
            </div>
            <span className="sm:text-base text-[10px] text-white font-300">
              ©2024
              <a
                href="https://quomodosoft.com/"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-white mx-1"
              ></a>
              {t("All rights reserved")}
            </span>
          </div>
          <span className="sm:text-base text-[10px] text-white font-300">
            <a
              href="https://perfectadv.ps/"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-white mx-1"
            >
              Powered By Perfect Co
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
