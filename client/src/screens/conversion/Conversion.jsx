import React from "react";
import style from "./style.module.scss";
import { Link, useNavigate } from "react-router-dom";
import tab from "../../assets/images/Tab.png";
import { useTranslation } from "react-i18next";
import conversionImage from "../../assets/video/conversion.mov";

const ConversionFirst = ({ redirectUrl }) => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const handleLeadTracking = () => {
    if (window.ym) {
      window.ym(100582088, "reachGoal", "Binomo go");
    }
  };

  return (
    <section className={style.final}>
      <div className="container">
        <div className={`wrapper ${style.final__wrapper}`}>
          <div className={style.final__content}>
            <h1>
              {i18n.language === "en" ? (
                <React.Fragment>
                  {t("conversionTitle")}{" "}
                  <Link to="binomo.com" target="_blank">
                    Binomo.com
                  </Link>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Link to="binomo.com" target="_blank">
                    Binomo.com
                  </Link>{" "}
                  {t("conversionTitle")}
                </React.Fragment>
              )}
            </h1>
            <p>{t("conversionText")}</p>

            <div className={style.final__img}>
              {/* <img src={tab} alt="tab" /> */}
              <video src={conversionImage} autoPlay loop muted></video>
            </div>

            <Link onClick={() => handleLeadTracking()} to="">
              {t("conversionLink1")}
            </Link>

            <div className={style.final__bottom}>
              <Link to="/main">{t("conversionLink2")}</Link>
              <Link to="/">{t("conversionLink3")}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConversionFirst;
