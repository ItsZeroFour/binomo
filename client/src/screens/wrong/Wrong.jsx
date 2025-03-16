import React from "react";
import style from "../after_chat/style.module.scss";
import afterChatPerson1 from "../../assets/images/after-chat-3.png";
import { Link } from "react-router-dom";

const Wrong = () => {
  return (
    <section className={style.after_chat}>
      <div className="container">
        <div className={`wrapper ${style.after_chat__wrapper}`}>
          <div
            className={`${style.after_chat__person} ${style.after_chat__person__first}`}
          >
            <div className={style.after_chat__message}>
              No, you are wrong! But I have some advice on how to trade.
            </div>

            <img src={afterChatPerson1} alt="after chat 1" />

            <Link to="/education-2">And what I have to do?</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Wrong;
