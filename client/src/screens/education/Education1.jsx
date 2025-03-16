import React from "react";
import style from "./style.module.scss";
import screen1 from "../../assets/images/education/first-screen-1.png";
import screen2 from "../../assets/images/education/first-screen-2.png";
import person from "../../assets/images/after-chat-6.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Edication1 = () => {
  const { t } = useTranslation();

  return (
    <section className={style.education}>
      <div className="container">
        <div className={`wrapper ${style.education__wrapper} ${style.education__wrapper__1}`}>
          <div className={style.education__screens}>
            <img src={screen1} alt="screen 1" />
            <img src={screen2} alt="screen 2" />
          </div>

          <div className={`${style.education__person} ${style.education__person__1}`}>
            <img src={person} alt="person" />

            <div>
              <h3>{t("education1Name")}</h3>
              <p>{t("education1Text")}</p>
            </div>
          </div>

          <Link to="/education-2">{t("education1Button")}</Link>
        </div>
      </div>
    </section>
  );
};

export default Edication1;
