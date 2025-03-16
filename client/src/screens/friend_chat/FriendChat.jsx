import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import Banner from "../../components/banner/Banner";
import friend from "../../assets/images/friend.png";
import personalImageAvatar from "../../assets/images/personal_avatar.png";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FriendChat = () => {
  const [showLink, setShowLink] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [isLoanClicked, setIsLoanClicked] = useState(false);
  const [isAdviceClicked, setIsAdviceClicked] = useState(false);
  const [showLinkButton, setShowLinkButton] = useState(false);
  const { t } = useTranslation();

  const messages = [
    {
      id: 1,
      content: t("friendMessage1"),
      avatar: personalImageAvatar,
      position: "left",
    },
    {
      id: 2,
      content: t("friendMessage2"),
      avatar: friend,
      position: "right",
    },
    {
      id: 3,
      content: t("friendMessage3"),
      avatar: personalImageAvatar,
      position: "left",
    },
    {
      id: 4,
      content: t("friendMessage4"),
      avatar: friend,
      position: "right",
    },
    {
      id: 5,
      content: t("friendMessage5"),
      avatar: personalImageAvatar,
      position: "left",
    },
    {
      id: 6,
      content: t("friendMessage6"),
      avatar: friend,
      position: "right",
    },
    {
      id: 7,
      content: t("friendMessage7"),
      avatar: personalImageAvatar,
      position: "left",
    },
    {
      id: 8,
      content: t("friendMessage8"),
      avatar: friend,
      position: "right",
    },
  ];

  const showNextMessages = (newMessages) => {
    newMessages.forEach((msg, index) => {
      setTimeout(() => {
        console.log("Rendering message:", msg); // Логирование
        setVisibleMessages((prev) => {
          if (prev.length === 2) {
            return [...prev.slice(1), msg];
          }
          return [...prev, msg];
        });
      }, index * 2500);
    });
  };

  useEffect(() => {
    const timers = messages.slice(0, 4).map((_, index) =>
      setTimeout(() => {
        setVisibleMessages((prev) => {
          if (prev.length === 2) {
            return [...prev.slice(1), messages[index]];
          }
          return [...prev, messages[index]];
        });
      }, (index + 1) * 3000)
    );

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  useEffect(() => {
    const linkTimer = setTimeout(() => {
      setShowLink(true);
    }, 13000); // Показываем кнопки после появления 4-го сообщения

    return () => {
      clearTimeout(linkTimer);
    };
  }, []);

  const handleLoanClick = () => {
    setIsLoanClicked(true); // Скрываем кнопку "Asking for a loan", но оставляем кнопку "Asking for an advice"
    showNextMessages([messages[4], messages[5]]); // Показываем 5 и 6 сообщения
  };

  // Логика для "Asking for an advice"
  const handleAdviceClick = () => {
    setIsLoanClicked(true); // Скрываем кнопку "Asking for a loan"
    setIsAdviceClicked(true); // Скрываем кнопку "Asking for an advice"
    showNextMessages([messages[6], messages[7]]); // Показываем 7 и 8 сообщения

    const linkTimer = setTimeout(() => {
      setShowLinkButton(true);
    }, 4000); // Показываем кнопки после появления 4-го сообщения

    return () => {
      clearTimeout(linkTimer);
    };
  };

  const firstMessageVariants = {
    hidden: { x: "-100vw", opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: "-100vw", opacity: 0 },
  };

  const secondMessageVariants = {
    hidden: { x: "100vw", opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: "100vw", opacity: 0 },
  };

  const transition = {
    type: "tween",
    duration: 0.5,
  };

  return (
    <section className={style.friend_chat}>
      <div className="container">
        <div className={`wrapper ${style.friend_chat__wrapper}`}>
          <Banner />

          <div className={style.friend_chat__container}>
            <div className={style.friend_chat__friend}>
              <div>
                <img src={friend} alt="friend" />
              </div>

              <h2>{t("friendName")}</h2>
            </div>

            <div className={style.friend_chat__history}>
              <AnimatePresence>
                {visibleMessages.map(
                  (message) =>
                    message &&
                    message.position && (
                      <motion.div
                        key={message.id}
                        className={`${style.friend_chat__message} ${
                          message.position === "right"
                            ? style.friend_chat__message__last
                            : ""
                        }`}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={
                          message.position === "right"
                            ? secondMessageVariants
                            : firstMessageVariants
                        }
                        transition={transition}
                      >
                        <div
                          className={style.friend_chat__message__avatar}
                          style={
                            message.position === "right"
                              ? { order: 2 }
                              : { order: 1 }
                          }
                        >
                          <img src={message.avatar} alt="avatar" />
                        </div>

                        <div
                          className={style.friend_chat__message__content}
                          style={
                            message.position === "right"
                              ? { order: 1 }
                              : { order: 2 }
                          }
                        >
                          <p>{message.content}</p>
                        </div>
                      </motion.div>
                    )
                )}
              </AnimatePresence>
            </div>

            {showLink && (
              <motion.div
                className={style.friend_chat__link}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {!isLoanClicked && (
                  <button
                    className={`${style.fadeInLink} ${showLink && style.show}`}
                    onClick={handleLoanClick}
                  >
                    {t("friendButton1")}
                  </button>
                )}

                {!isAdviceClicked && (
                  <button
                    className={`${style.fadeInLink} ${showLink && style.show}`}
                    onClick={handleAdviceClick}
                  >
                    {t("friendButton2")}
                  </button>
                )}
              </motion.div>
            )}

            {showLinkButton && (
              <motion.div
                className={`${style.friend_chat__link} ${style.friend_chat__link_2}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Link to="/after-chat">{t("friendButton3")}</Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FriendChat;
