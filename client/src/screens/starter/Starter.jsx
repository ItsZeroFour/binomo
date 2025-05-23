import React from "react";
import style from "./style.module.scss";
import manImg from "../../assets/images/first-img.png";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Starter = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <section className={style.starter}>
      <div className="container">
        <div className={`wrapper ${style.starter__wrapper}`}>
          <div className={style.starter__head}>
            <svg
              width="96"
              height="18"
              viewBox="0 0 96 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M57.3992 4.96004C54.3121 4.96004 51.4565 7.20558 51.4565 10.6227C51.4565 14.0398 54.3121 16.2854 57.3992 16.2854C60.4863 16.2854 63.3419 14.0398 63.3419 10.6227C63.3419 7.20558 60.4863 4.96004 57.3992 4.96004ZM57.3992 13.3954C55.8749 13.3954 54.6401 12.1458 54.6401 10.6032C54.6401 9.06059 55.8749 7.8109 57.3992 7.8109C58.9234 7.8109 60.1583 9.06059 60.1583 10.6032C60.1583 12.1458 58.9234 13.3954 57.3992 13.3954ZM33.4354 5.21389H36.7926V16.012H33.4354V5.21389ZM37.1014 1.87487C37.1014 2.9293 36.1945 3.74941 35.114 3.74941C34.0335 3.74941 33.1267 2.9293 33.1267 1.87487C33.1267 0.820444 34.0335 0.000335693 35.114 0.000335693C36.1945 0.0198621 37.1014 0.820444 37.1014 1.87487ZM50.0866 10.6227V16.012H46.7293V10.8765C46.7293 9.06059 46.0347 8.00616 44.5297 8.00616C43.0248 8.00616 42.3302 9.06059 42.3302 10.8765V16.012H38.9729V10.6227C38.9729 7.20558 41.1339 4.96004 44.5297 4.96004C47.9256 4.96004 50.0866 7.20558 50.0866 10.6227ZM82.7136 10.5251V16.012H79.3563V10.5251C79.3563 8.88485 78.681 8.00616 77.369 8.00616C76.057 8.00616 75.3817 8.88485 75.3817 10.5251V16.012H72.0244V10.5251C72.0244 8.88485 71.3491 8.00616 70.0371 8.00616C68.725 8.00616 68.0497 8.88485 68.0497 10.5251V16.012H64.7311V10.5251C64.7311 7.10795 67.0271 4.96004 70.0757 4.96004C71.6385 4.96004 72.8927 5.52631 73.7416 6.54168C74.5906 5.52631 75.8447 4.96004 77.4076 4.96004C80.4175 4.96004 82.7136 7.10795 82.7136 10.5251ZM90.0455 4.96004C86.9583 4.96004 84.1028 7.20558 84.1028 10.6227C84.1028 14.0398 86.9583 16.2854 90.0455 16.2854C93.1326 16.2854 95.9882 14.0398 95.9882 10.6227C95.9882 7.20558 93.1326 4.96004 90.0455 4.96004ZM90.0455 13.3954C88.5212 13.3954 87.2864 12.1458 87.2864 10.6032C87.2864 9.06059 88.5212 7.8109 90.0455 7.8109C91.5697 7.8109 92.8046 9.06059 92.8046 10.6032C92.8046 12.1458 91.5697 13.3954 90.0455 13.3954ZM25.9298 4.96004C24.7722 4.96004 23.8075 5.25294 23.055 5.8192V0.156547H19.7749V10.0174C19.7749 13.9812 22.4568 16.2854 25.6597 16.2854C28.8626 16.2854 31.6796 14.0398 31.6796 10.6227C31.6989 7.20558 29.017 4.96004 25.9298 4.96004ZM25.7755 13.3954C24.2512 13.3954 23.0164 12.1458 23.0164 10.6032C23.0164 9.06059 24.2512 7.8109 25.7755 7.8109C27.2998 7.8109 28.5346 9.06059 28.5346 10.6032C28.5346 12.1458 27.2998 13.3954 25.7755 13.3954Z"
                fill="#353535"
              />
              <path
                d="M7.41565 0.335581C6.23332 -0.355241 4.72149 0.0547209 4.03887 1.25125L0.331599 7.74915C-0.351024 8.9457 0.0540709 10.4757 1.2364 11.1665C2.41873 11.8574 3.93057 11.4474 4.61319 10.2509L8.32046 3.75296C9.00307 2.55641 8.59798 1.0264 7.41565 0.335581Z"
                fill="#353535"
              />
              <path
                d="M11.1279 6.83347C9.94554 6.14265 8.4337 6.55261 7.75108 7.74914L4.04382 14.247C3.36119 15.4436 3.76629 16.9736 4.94862 17.6644C6.13095 18.3552 7.64279 17.9453 8.3254 16.7487L12.0327 10.2508C12.7153 9.0543 12.3102 7.52429 11.1279 6.83347Z"
                fill="#353535"
              />
            </svg>
          </div>

          <h1>Binomo trading game</h1>
          <p>
            Complete our game and get a chance to
            win DARAZ $100 certificate!
          </p>

          <img src={manImg} alt="manImg" />

          <div className={style.starter__buttons}>
            <button
              onClick={() => {
                changeLanguage("en");
                navigate("/main");

                if (window.ym) {
                  window.ym(100582088, "reachGoal", "eng");
                }
              }}
            >
              English
            </button>
            <button
              onClick={() => {
                changeLanguage("urdu");
                navigate("/main");

                if (window.ym) {
                  window.ym(100582088, "reachGoal", "pakistan");
                }
              }}
            >
              Roman Urdu
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Starter;
