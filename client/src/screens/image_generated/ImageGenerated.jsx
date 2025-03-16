import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import facobookIcon from "../../assets/icons/socials/facebook.png";
import xIcon from "../../assets/icons/socials/x.png";
import whatsappIcon from "../../assets/icons/socials/whatsapp.png";
import redditIcon from "../../assets/icons/socials/reddit.png";
import linkedInIcon from "../../assets/icons/socials/linkedin.png";
import download from "../../assets/icons/download.png";
import copy from "../../assets/icons/copy.png";

const ImageGenerated = () => {
  const [reshare, setReshare] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { aiImageName } = location.state || {};

  useEffect(() => {
    if (!aiImageName) {
      return navigate("/upload-image");
    }
  }, [aiImageName]);

  const openShareWindow = (url) => {
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=400");
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      `${process.env.REACT_APP_SERVER_URL.replace(
        "/api",
        ""
      )}/aiGet/${aiImageName}`
    )}&quote=${encodeURIComponent("")}`;
    openShareWindow(url);
  };

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      `${process.env.REACT_APP_SERVER_URL.replace(
        "/api",
        ""
      )}/aiGet/${aiImageName}`
    )}&text=${encodeURIComponent("")}`;
    openShareWindow(url);
  };

  const shareOnWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(
      ""
    )}%20${encodeURIComponent(
      `${process.env.REACT_APP_SERVER_URL.replace(
        "/api",
        ""
      )}/aiGet/${aiImageName}`
    )}`;
    openShareWindow(url);
  };

  const shareOnReddit = () => {
    const url = `https://www.reddit.com/submit?url=${encodeURIComponent(
      `${process.env.REACT_APP_SERVER_URL.replace(
        "/api",
        ""
      )}/aiGet/${aiImageName}`
    )}&title=${encodeURIComponent("")}`;
    openShareWindow(url);
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      `${process.env.REACT_APP_SERVER_URL.replace(
        "/api",
        ""
      )}/aiGet/${aiImageName}`
    )}`;
    openShareWindow(url);
  };

  const downloadImage = async () => {
    try {
      const imageUrl = `${process.env.REACT_APP_DOMAIN_NAME.replace(
        "/api",
        ""
      )}/aiGet/${aiImageName}`;

      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const downloadLink = document.createElement("a");

      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = aiImageName;
      document.body.appendChild(downloadLink);
      downloadLink.click();

      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(downloadLink.href);
    } catch (error) {
      console.error("Ошибка при скачивании изображения:", error);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        `${process.env.REACT_APP_DOMAIN_NAME.replace(
          "/api",
          ""
        )}/aiGet/${aiImageName}`
      );
      alert(t("copyNotification"));
    } catch (error) {
      console.error("Error al copiar un enlace");
    }
  };

  return (
    <section className={style.image_generation}>
      <div className="container">
        <div className={`wrapper ${style.image_generation__wrapper}`}>
          {!reshare ? (
            <img
              className={style.image_generation__image}
              src={`${process.env.REACT_APP_SERVER_URL.replace(
                "/api",
                ""
              )}/aiGet/${aiImageName}`}
              alt="ai image"
            />
          ) : (
            <div className={style.image_generation__reshare}>
              <div className={style.image_generation__top}>
                <h1>{t("gameFinalTitle")}</h1>
                <div
                  className={style.image_generation__close}
                  onClick={() => setReshare(false)}
                >
                  <div></div>
                  <div></div>
                </div>
              </div>

              <div className={style.image_generation__socials}>
                <ul>
                  <li onClick={() => shareOnFacebook()}>
                    <img src={facobookIcon} alt="facobook" />
                    <p>FaceBook</p>
                  </li>

                  <li onClick={() => shareOnTwitter()}>
                    <img src={xIcon} alt="X" />
                    <p>X (Twitter)</p>
                  </li>

                  <li onClick={() => shareOnWhatsApp()}>
                    <img src={whatsappIcon} alt="whatsapp" />
                    <p>Whatsapp</p>
                  </li>

                  <li onClick={() => shareOnReddit()}>
                    <img src={redditIcon} alt="reddit" />
                    <p>Reddit</p>
                  </li>

                  <li onClick={() => shareOnLinkedIn()}>
                    <img src={linkedInIcon} alt="LinkedIn" />
                    <p>LinkedIn</p>
                  </li>
                </ul>
              </div>

              <div className={style.image_generation__reshare__buttons}>
                <button onClick={downloadImage}>
                  <img src={download} alt="download" />
                  <p>{t("gameDownload")}</p>
                </button>

                <button onClick={copyToClipboard}>
                  <img src={copy} alt="Copy" />
                  <p>{t("gameCopy")}</p>
                </button>
              </div>
            </div>
          )}

          <div className={style.image_generation__wrapper__buttons}>
            <button onClick={() => setReshare(true)}>
              {t("imageGeneratedButton1")}
            </button>
            <Link to="/upload-image">{t("imageGeneratedButton2")}</Link>
            <Link to="/final">{t("imageGeneratedButton3")}</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageGenerated;
