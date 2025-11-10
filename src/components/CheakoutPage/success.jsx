import { useTranslation } from "react-i18next";
import PageTitle from "../Helpers/PageTitle";
import LayoutHomeTwo from "../Partials/LayoutHomeTwo";
import groovyWalkAnimation from "../../../public/animations/Animation-1720705063338.json";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";

export default function Success() {
  const { t } = useTranslation();
  return (
    <LayoutHomeTwo>
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
        <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]">
          <Lottie animationData={groovyWalkAnimation} loop={true} />
        </div>

        <h2 className="text-2xl sm:text-3xl font-semibold mt-6 text-gray-800">
          {t("The payment was completed successfully")}
        </h2>

        <p className="mt-4 text-gray-600 max-w-md">
          {t("Thank you. we will be in contact with more details shortly")}
        </p>

        <Link
          to="/"
          className="mt-8 inline-block bg-main-color text-white px-6 py-2 rounded-full hover:bg-main-color/90 transition"
        >
          {t("Back to Home")}
        </Link>
      </div>
    </LayoutHomeTwo>
  );
}
