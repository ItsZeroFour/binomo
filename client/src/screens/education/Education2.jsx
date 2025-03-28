import React from "react";
import style from "./style.module.scss";
import japan from "../../assets/images/education/japan.png";
import usa from "../../assets/images/education/usa.png";
import person from "../../assets/images/after-chat-2.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Education2 = () => {
  const { t } = useTranslation();

  return (
    <section className={style.education}>
      <div className="container">
        <div className={`wrapper ${style.education__wrapper}`}>
          <div className={style.education2__dates}>
            <div className={style.education2__items}>
              <div className={style.education2__item}>
                <p>{t("education2Title1")}</p>
              </div>

              <div className={style.education2__item}>
                <p>{t("education2Title2")}</p>
              </div>
            </div>

            <ul>
              <li>
                <p>Tue</p>
                <p>24</p>
              </li>

              <li>
                <p>Wed</p>
                <p>25</p>
              </li>

              <li>
                <p>Thu</p>
                <p>26</p>
              </li>

              <li>
                <p>Fri</p>
                <p>27</p>
              </li>

              <li>
                <p>Sat</p>
                <p>28</p>
              </li>

              <li>
                <p>Sun</p>
                <p>29</p>
              </li>

              <li>
                <p>Mon</p>
                <p>30</p>
              </li>
            </ul>
          </div>

          <ul className={style.education__news}>
            <li>
              <div>
                <p>{t("education2Today")}</p>
                <img src={japan} alt="japan" />
              </div>
              <p>{t("education2Text1")}</p>
            </li>

            <li>
              <div>
                <p>{t("education2Tomorrow")}</p>
                <img src={usa} alt="usa" />
              </div>
              <p>{t("education2Text2")}</p>
            </li>

            <li>
              <div>
                <p>{t("education2Tomorrow")}</p>
                <img src={usa} alt="usa" />
              </div>
              <p>{t("education2Text3")}</p>
            </li>
          </ul>

          <div
            className={`${style.education__person} ${style.education__person_2}`}
          >
            <img src={person} alt="person" />

            <div>
              <h3>Rajab Butt</h3>
              <p>
                I advise you to trade not just like that, but based on economic
                data. Binomo has a calendar for tracking important reports.
              </p>
            </div>
          </div>

          <Link
            onClick={async () => {
              if (window.ym) {
                await window.ym(100582088, "reachGoal", "Go it!");
              }
            }}
            to="/education-graphick-third"
          >
            Go it!
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Education2;
