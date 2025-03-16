import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import logo from "../../assets/images/logo_2.svg";
import afterChatImg from "../../assets/images/after_chat.png";
import afterChatPerson1 from "../../assets/images/after-chat-1.png";
import afterChatPerson2 from "../../assets/images/after-chat-2.png";
import afterChatPerson3 from "../../assets/images/after-chat-3.png";
import afterChatPerson4 from "../../assets/images/after-chat-4.png";
import afterChatPerson5 from "../../assets/images/after-chat-5.png";
import popularItem1 from "../../assets/images/popular/item1.png";
import popularItem2 from "../../assets/images/popular/item2.png";
import popularItem3 from "../../assets/images/popular/item3.png";
import popularItem4 from "../../assets/images/popular/item4.png";
import popularItemQr from "../../assets/images/popular/qr.png";
import tabImg from "../../assets/images/Tab.png";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const preloadImages = (sources) => {
  sources.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

const handleLeadTracking = () => {
  if (window.fbq !== undefined) {
    window.fbq("track", "CompleteRegistration");
  }

  if (window.ym) {
    window.ym(98661745, "reachGoal", "binomial_start");
  }
};

const AfterChat = () => {
  const [searchParams] = useSearchParams();
  const [showScreenIndex, setShowScreenIndex] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    if (+searchParams.get("index")) {
      setShowScreenIndex(+searchParams.get("index"));
    }
  }, [searchParams.get("index")]);

  useEffect(() => {
    preloadImages([
      logo,
      afterChatImg,
      afterChatPerson1,
      afterChatPerson2,
      afterChatPerson3,
      afterChatPerson4,
      afterChatPerson5,
      popularItem1,
      popularItem2,
      popularItem3,
      popularItem4,
      popularItemQr,
      tabImg,
    ]);
  }, []);

  return (
    <section className={style.after_chat}>
      <div className="container">
        <div className={`wrapper ${style.after_chat__wrapper}`}>
          {showScreenIndex !== 4 && (
            <div className={style.after_chat__header}>
              <img src={logo} alt="logo" />
            </div>
          )}

          {showScreenIndex === 0 ? (
            <div
              className={`${style.after_chat__person} ${style.after_chat__person__first}`}
            >
              <div className={style.after_chat__message}>
                Hey, it's Rajab Butt! Didn't expect to see me here? <br /> I
                know you want to buy a PSL season ticket but you don't have
                enough money, right? I'll tell you how you can make some money.
              </div>

              <img src={afterChatPerson1} alt="after chat 1" />

              <button onClick={() => setShowScreenIndex(1)}>
                Wow! Where am I?
              </button>
            </div>
          ) : showScreenIndex === 1 ? (
            <div
              className={`${style.after_chat__person} ${style.after_chat__person__second}`}
            >
              <div className={style.after_chat__message}>
                <p>
                  We are on Binomo website! Binomo is a  high-end trading
                  platform with a wide range of financial assets.{" "}
                </p>
              </div>

              <img src={afterChatPerson2} alt="after chat 2" />

              <button onClick={() => setShowScreenIndex(2)}>
                Can I earn money here?
              </button>
            </div>
          ) : showScreenIndex === 2 ? (
            <div
              className={`${style.after_chat__person} ${style.after_chat__person__third}`}
            >
              <div className={style.after_chat__message}>
                <p>
                  Yes! Trade amount starting from 3000Rs so you won't lose a
                  large amount of funds while you're still learning how to
                  trade.
                </p>
              </div>

              <img src={afterChatPerson3} alt="after chat 3" />

              <Link to="/education-7">Let’s train!</Link>
            </div>
          ) : showScreenIndex === 3 ? (
            <div
              className={`${style.after_chat__person} ${style.after_chat__person__fourth}`}
            >
              <div className={style.after_chat__person__say}>
                <img src={afterChatPerson5} alt="personal img" />

                <div>
                  <h3>{t("afterChat5Name")}</h3>
                  <p>{t("afterChat5Text")}</p>
                </div>
              </div>

              <div className={style.after_chat__popular}>
                <p>Popular</p>
                <ul>
                  <li>
                    <img src={popularItem1} alt="popular item" />
                    <p>Upi</p>
                  </li>

                  <li>
                    <img src={popularItem1} alt="popular item" />
                    <img src={popularItemQr} alt="popular item" />
                    <p>Upi QR</p>
                  </li>

                  <li>
                    <img src={popularItem2} alt="popular item" />
                    <img src={popularItem1} alt="popular item" />
                    <p>PhonePe by UPI</p>
                  </li>

                  <li>
                    <div
                      style={{
                        padding: "5px 10px",
                        background: "#fff",
                        borderRadius: 20,
                      }}
                    >
                      <img src={popularItem3} alt="popular item" />
                    </div>
                    <img src={popularItem1} alt="popular item" />
                    <p>Google Pay by UPI</p>
                  </li>

                  <li>
                    <img src={popularItem4} alt="popular item" />
                    <img src={popularItem1} alt="popular item" />
                    <p>Paytm by UPI</p>
                  </li>
                </ul>
              </div>

              <button onClick={() => setShowScreenIndex(5)}>
                {t("afterChat5Button")}
              </button>
            </div>
          ) : showScreenIndex === 4 ? (
            <div
              className={`${style.after_chat__person} ${style.after_chat__person__second} ${style.after_chat__person__fifth}`}
            >
              <h2>
                {t("afterChat6Title")}{" "}
                <Link
                  onClick={() => handleLeadTracking()}
                  to="https://binomo.com/auth?a=bfbfde47c861&ac=trading_game&utm_source=trading_game&utm_medium=trading_game&utm_campaign=trading_game#SignUp"
                >
                  Binomo.com
                </Link>
              </h2>

              {/* <div className={style.after_chat__promo}>
                <p>{t("afterChat6Text")}</p>
              </div> */}

              <img src={tabImg} alt="after chat 2" />

              <div className={style.after_chat__links}>
                <Link
                  onClick={() => handleLeadTracking()}
                  to="https://binomo.com/auth?a=bfbfde47c861&ac=trading_game&utm_source=trading_game&utm_medium=trading_game&utm_campaign=trading_game#SignUp"
                  target="_blank"
                >
                  {t("afterChat6Button2")}
                </Link>
                {!+searchParams.get("index") && (
                  <button onClick={() => setShowScreenIndex(6)}>
                    {t("afterChat6Button1")}
                  </button>
                )}

                {/* <Link
                  onClick={() => handleLeadTracking()}
                  to="https://blog.binomo.com/tradinggame2024/"
                >
                  {t("afterChat6Button3")}
                </Link> */}
              </div>
            </div>
          ) : (
            <div
              className={`${style.after_chat__person} ${style.after_chat__person__third} ${style.after_chat__person__sixth}`}
            >
              <div
                className={`${style.after_chat__message} ${style.after_chat__message__6}`}
              >
                <p>{t("afterChat7Text")}</p>
              </div>

              <img src={afterChatPerson2} alt="after chat 3" />

              <div className={style.after_chat__buttons}>
                <Link to="/education-7">{t("afterChaT7Button1")}</Link>
                <Link to="/education-1">{t("afterChaT7Button2")}</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AfterChat;

// - Географическое положение
// - Природные климатические условия
// - Форма полит. устройства
// - Основные Князья
// - Экономика
// - Рост городов
// - Развитие культуры
// - Особенности
