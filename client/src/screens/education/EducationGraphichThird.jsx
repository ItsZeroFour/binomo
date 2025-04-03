import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import person from "../../assets/images/after-chat-4.png";
import person2 from "../../assets/images/after-chat-1.png";
import { useTranslation } from "react-i18next";
import graphick from "../../assets/graphicks/third-graphick.json";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import bank from "../../assets/icons/bank.png";

const EducationGraphickThird = () => {
  const { t } = useTranslation();
  const [showNot, setShowNot] = useState(false);

  const [text, setText] = useState("");
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const changeText = setTimeout(() => {
      setText(t("educationGraphickThird"));
    }, 13000);

    const showButton = setTimeout(() => {
      setShowButton(true);
    }, 13000);

    return () => {
      clearTimeout(changeText);
      clearTimeout(showButton);
    };
  }, []);

  const fadeVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const fadeTransition = {
    duration: 0.5,
  };

  const notificationVariants = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const transition = {
    type: "tween",
    duration: 1,
  };

  return (
    <section className={style.education}>
      <div className="container">
        <div className={`wrapper ${style.education__wrapper}`}>
          {text ? (
            <div
              className={`${style.education__person} ${style.education__person_2} ${style.education__person_graphick}`}
            >
              <img src={person2} alt="person" />
              <div>
                <h3>Rajab Butt</h3>
                <h3>Rajab Butt</h3>
                <p>{t("educationGraphickThirdText")}</p>
              </div>
            </div>
          ) : (
            <div className={style.education__graphick__waiting}>
              <h1 style={{ fontSize: 52 }}>{t("graphickThirdTitle")}</h1>
              <p>🗓️</p>
            </div>
          )}

          {text && (
            <div className={style.educatio7__balance}>
              <div className={style.educatio7__balance__demo}>
                <p>{t("educationDemo")}</p>
                <h1>{text ? "145250" : "9900"}Rs</h1>
              </div>

              <div className={style.educatio7__balance__currency}>
                <p>USD/EUR</p>
              </div>
            </div>
          )}

          <Lottie
            animationData={graphick}
            loop={false}
            autoplay={true}
            style={{ width: "90%", height: 350 }}
          />

          <div
            style={{ height: 60, width: "100%" }}
            className={style.educatio__graphick__buttons__wrapper}
          >
            {showButton ? (
              <motion.div
                className={style.educatio_graphick__buttons}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Link to="/group-chat">{t("graphickThirdButton")}</Link>
              </motion.div>
            ) : (
              <motion.div
                className={style.educatio_graphick__buttons}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Link to="/group-chat">{t("graphickThirdSkip")}</Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationGraphickThird;
