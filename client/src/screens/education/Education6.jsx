import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import person from "../../assets/images/after-chat-6.png";
import { useTranslation } from "react-i18next";
import graphick from "../../assets/images/graphick.svg";
import { Link } from "react-router-dom";

const Education6 = () => {
  const [isFirstGraphick, setIsFirstGraphick] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsFirstGraphick(window.localStorage.getItem("firstGraphick"));
  }, [window.localStorage.getItem("firstGraphick")]);

  return (
    <section className={style.education}>
      <div className="container">
        <div className={`wrapper ${style.education__wrapper}`}>
          <div
            className={`${style.education__person} ${style.education__person_2} ${style.education__person_7}`}
          >
            <img src={person} alt="person" />

            <div>
              <h3>{t("education1Name")}</h3>
              <p>{t("education7Text")}</p>
            </div>
          </div>

          <div className={style.educatio7__balance}>
            <div className={style.educatio7__balance__demo}>
              <p>{t("education7Demo")}</p>
              <h1>{isFirstGraphick ? 9900 : 10000}₹</h1>
            </div>

            <div className={style.educatio7__balance__currency}>
              <p>USD/EUR</p>
            </div>
          </div>

          <img
            className={style.educatio7__graphick}
            src={graphick}
            alt="graphich"
          />

          {/* !!!!!!!!!!!!!!!!!!!!!! */}
          {/* <div className={style.educatio7__buttons}>
            <Link to="/education-8">{t("education7Down")}</Link>
            <Link to="/education-graphick-third">{t("education7Up")}</Link>
          </div> */}

          <div className={style.educatio12__buttons}>
            <Link
              onClick={() => window.localStorage.removeItem("firstGraphick")}
              to="/education-graphick-third"
            >
              Trade
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education6;
