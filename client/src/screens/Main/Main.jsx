import React, { useEffect } from "react";
import style from "./style.module.scss";
import phoneDown from "../../assets/icons/phone_down.svg";
import phoneUp from "../../assets/icons/phone_up.svg";
import handImage from "../../assets/images/hand.png";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Main = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/sister-chat");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const fadeVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const fadeTransition = {
    duration: 0.5,
  };

  return (
    <motion.section
      className={style.main}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeVariants}
      transition={fadeTransition}
    >
      <div className="container">
        <div className={`wrapper ${style.main__wrapper}`}>
          <div className={style.main__hand__image}>
            <img src={handImage} alt="hand" />
          </div>

          <div className={style.main__content}>
            <h2>{t("sister")}</h2>

            <div className={style.main__content__navigation}>
              <div className={style.main__button__down}>
                <div className={style.main__button__down__icon}>
                  <img src={phoneDown} alt="Down phone" />
                </div>

                <p>{t("reset")}</p>
              </div>
              <div className={style.main__button__up}>
                <Link to="/sister-chat">
                  <div className={style.main__button__up__icon}>
                    <img src={phoneUp} alt="Up phone" />
                  </div>

                  <p>{t("reply")}</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Main;
