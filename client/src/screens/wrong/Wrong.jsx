import React from "react";
import style from "../after_chat/style.module.scss";
import afterChatPerson1 from "../../assets/images/after-chat-3.png";
import { Link } from "react-router-dom";
import Banner from "../../components/banner/Banner";
import { useTranslation } from "react-i18next";

const Wrong = () => {
  const { t } = useTranslation();

  return (
    <section className={style.after_chat}>
      <div className="container">
        <div className={`wrapper ${style.after_chat__wrapper}`}>
          <Banner />

          <div
            className={`${style.after_chat__person} ${style.after_chat__person__first}`}
          >
            <div className={style.after_chat__message}>{t("wrongText")}</div>

            <img src={afterChatPerson1} alt="after chat 1" />

            <Link to="/education-2">{t("wrongButton")}</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Wrong;
