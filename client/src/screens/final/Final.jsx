import React from "react";
import style from "./style.module.scss";
import { Link, useNavigate } from "react-router-dom";
import tab from "../../assets/images/Tab.png";
import { useTranslation } from "react-i18next";

const Conversion = () => {
  const { t } = useTranslation();
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
            <h1>Register at Binomo.com</h1>
            <p>
              Enter promo code GAME1000 in the deposit section and get a chance
              to win $200!
            </p>

            <div className={style.final__img}>
              <img src={tab} alt="tab" />
            </div>

            <Link onClick={() => handleLeadTracking()} to="">
              GET A CHANCE
            </Link>

            <div className={style.final__bottom}>
              <Link to="/">
                Stay in the game
              </Link>
              <Link to="/">Promotion rules</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Conversion;
