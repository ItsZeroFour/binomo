import React from "react";
import style from "./style.module.scss";
import { Link, useNavigate } from "react-router-dom";
import tab from "../../assets/images/Tab.png";
import { useTranslation } from "react-i18next";
import conversionImage from "../../assets/video/conversion.mov";

const Conversion = ({ redirectUrl }) => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const handleLeadTracking = () => {
    if (window.fbq !== undefined) {
      window.fbq("track", "CompleteRegistration");
    }

    if (window.ym) {
      window.ym(98661745, "reachGoal", "binomial_start");
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
                  {t("conversionTitle")} Binomo.com
                </React.Fragment>
              ) : (
                <React.Fragment>
                  Binomo.com
                  {t("conversionTitle")}
                </React.Fragment>
              )}
            </h1>
            <p>{t("conversionText")}</p>

            <div className={style.final__img}>
              {/* <img src={tab} alt="tab" /> */}
              <video src={conversionImage} autoPlay loop muted></video>
            </div>

            <Link
              onClick={() => handleLeadTracking()}
              to={redirectUrl}
              target="_blank"
            >
              {t("conversionLink1")}
            </Link>

            <div className={style.final__bottom}>
              {/* <Link to="/">Stay in the game</Link> */}
              <Link
                to="https://blog.binomo.com/tradinggame2025/"
                target="_blank"
              >
                {t("conversionLink3")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Conversion;
