import { useTranslation } from "react-i18next";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import LayoutHomeTwo from "../Partials/LayoutHomeTwo";

export default function TermsAndPolicies() {
  const { t } = useTranslation();
  return (
    <LayoutHomeTwo>
      <div className="terms-condition-page w-full pb-[30px]">
        <div className="w-full mb-[30px]">
          <PageTitle
            breadcrumb={[
              { name: t("Home Page"), path: "/" },
              { name: t("Terms and Policies"), path: "" },
            ]}
            title={t("Terms and Policies")}
          />
        </div>
        <div className="container-x mx-auto">
          <PageTitle solid title={t("Delivery Methods")} />
          <div className="mx-[2rem]  whitespace-pre-line">{t("delivery methods content")}</div>
          <PageTitle solid title={t("Exchange Policy")} />
          <div className="mx-[2rem]  whitespace-pre-line">{t("exchange policy content")}</div>
          <PageTitle solid title={t("Return Policy")} />
          <div className="mx-[2rem]  whitespace-pre-line">{t("return policy content")}</div>
          <PageTitle solid title={t("Payment Methods")} />
          <div className="mx-[2rem]  whitespace-pre-line">{t("payment methods content")}</div>
          <PageTitle solid title={t("Privacy Policy")} />
          <div className="mx-[2rem]  whitespace-pre-line">{t("privacy policy content")}</div>
        </div>
      </div>
    </LayoutHomeTwo>
  );
}
