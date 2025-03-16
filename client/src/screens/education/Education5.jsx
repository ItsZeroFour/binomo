import React from "react";
import style from "./style.module.scss";
import imageMain from "../../assets/images/education/education-4-main.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import person from "../../assets/images/after-chat-1.png";

const Education5 = () => {
  const { t } = useTranslation();

  return (
    <section className={style.education}>
      <div className="container">
        <div
          className={`wrapper ${style.education__wrapper} ${style.education__wrapper__1}`}
        >
          <div className={style.education4__image}>
            <div
              className={style.education4__container1}
              data-text={t("education4ImageText1")}
            >
              <img src={imageMain} alt="image main" />
            </div>
          </div>

          <div
            className={`${style.education__person} ${style.education__person_2} ${style.education__person_5}`}
          >
            <img src={person} alt="person" />

            <div>
              <h3>{t("education1Name")}</h3>
              <p>{t("education5Text")}</p>
            </div>
          </div>

          <Link to="/education-6">{t("education5Button")}</Link>
        </div>
      </div>
    </section>
  );
};

export default Education5;
