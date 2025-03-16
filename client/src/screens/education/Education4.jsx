import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import imageMain from "../../assets/images/education/education-4-main.png";
import imageOther1 from "../../assets/images/education/education-4-1.png";
import imageOther2 from "../../assets/images/education/education-4-2.png";
import imageOther3 from "../../assets/images/education/education-4-3.png";
import { Link, useNavigate } from "react-router-dom";
import person from "../../assets/images/after-chat-5.png";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Education4 = () => {
  const [showButton, setShowButton] = useState(false);

  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const showButton = setTimeout(() => {
      setShowButton(true);
    }, 5000);

    return () => {
      clearTimeout(showButton);
    };
  }, []);

  return (
    <section className={style.education}>
      <div className="container">
        <div className={`wrapper ${style.education__wrapper}`}>
          <div className={style.education4__images}>
            <div
              className={style.education4__container1}
              data-text={t("education4ImageText1")}
              onClick={() => navigate("/education-5")}
            >
              <img src={imageMain} alt="image main" />
            </div>

            <div className={style.education4__images__list}>
              <div
                className={style.education4__container2}
                data-text={t("education4ImageText2")}
              >
                <img src={imageOther1} alt="image other 1" />
              </div>
              <div
                className={style.education4__container3}
                data-text={t("education4ImageText3")}
              >
                <img src={imageOther2} alt="image other 2" />
              </div>
              <div
                className={style.education4__container4}
                data-text={t("education4ImageText4")}
              >
                <img src={imageOther3} alt="image other 3" />
              </div>
            </div>
          </div>

          <div
            className={`${style.education__person} ${style.education__person_2} ${style.education__person_4}`}
          >
            <img src={person} alt="person" />

            <div>
              <h3>{t("education1Name")}</h3>
              <p>{t("education4Text")}</p>
            </div>
          </div>

          <div style={{ height: 60, width: "100%" }}>
            {showButton && (
              <motion.div
                className={style.educatio_graphick__buttons}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Link to="/education-5">{t("educationButton1")}</Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education4;
