import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import cameraImg from "../../assets/icons/camera.svg";
import imageImg from "../../assets/icons/image.svg";
import { Link, useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
import axios from "axios";
import { useTranslation } from "react-i18next";

const UploadImage = () => {
  const [check, setCheck] = useState(false);
  const [isCamera, setIsCamera] = useState(false);
  const [image, setImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  async function checkCamera() {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        console.error("API not supported.");
        setIsCamera(false);
      }

      const devices = await navigator.mediaDevices.enumerateDevices();

      const videoInputDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      if (videoInputDevices.length > 0) {
        setIsCamera(true);
      } else {
        setIsCamera(false);
      }
    } catch (error) {
      console.error(error);
      setIsCamera(false);
    }
  }

  useEffect(() => {
    checkCamera();
  }, []);

  const handleChangeFile = async (event) => {
    try {
      const file = event.target.files[0];

      const options = {
        maxSizeMB: 1, // Максимальный размер изображения после сжатия в MB
        maxWidthOrHeight: 800, // Максимальная ширина или высота изображения
        useWebWorker: true, // Использовать Web Worker для улучшения производительности
      };

      const maxSizeInBytes = 5 * 1024 * 1024;

      if (file.size > maxSizeInBytes) {
        return alert("You have reached the image size limit. Maximum: 5MB");
      }

      setImageLoading(true);

      const compressedFile = await imageCompression(file, options);

      setImageLoading(false);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(compressedFile);
    } catch (err) {
      console.log(err);
    }
  };

  const uploadImage = async () => {
    if (!image) return;
    const response = await fetch(image);
    const blob = await response.blob();

    const imageName = Date.now();

    const file = new File([blob], `${imageName}.jpeg`, {
      type: "image/jpeg",
    });

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/upload`,
        formData
      );

      if (res.data.url) {
        if (window.ym) {
          await window.ym(100582088, "reachGoal", "Ок sent photo");
        }

        return navigate("/neyro-image-generate", {
          state: { file: file },
        });
      } else {
        throw new Error("Ошибка при загрузке изображения");
      }
    } catch (err) {
      console.log(err);
      alert("Ошибка при загрузке файла");
    }
  };
  return (
    <section className={style.upload_image}>
      <div className="container">
        <div className={`wrapper ${style.upload_image__wrapper}`}>
          {!imageLoading ? (
            <>
              {" "}
              {!image ? (
                <>
                  <h1>{t("uploadImageTitle")}</h1>

                  <div
                    className={style.upload_image__checkbox}
                    onClick={() => setCheck(!check)}
                  >
                    <div className={style.upload_image__checkbox__item}>
                      {check ? <div></div> : ""}
                    </div>
                    {i18n.language === "en" ? (
                      <p>
                        {t("uploadImageRules")}{" "}
                        <Link to="https://blog.binomo.com/celebrityphoto/">
                          {t("uploadImageRulesLink")}.
                        </Link>
                      </p>
                    ) : (
                      <p>
                        {t("uploadImageRules")}{" "}
                        <Link to="https://blog.binomo.com/celebrityphoto/">
                          {t("uploadImageRulesLink")}.
                        </Link>{" "}
                        {t("uploadImageRules2")}
                      </p>
                    )}
                  </div>

                  <div
                    className={style.upload_image__buttons}
                    style={!check ? { opacity: 0.5 } : { opacity: 1 }}
                  >
                    <button
                      disabled={!check}
                      onClick={async () => {
                        check &&
                          (isCamera
                            ? navigate("/upload-image/camera")
                            : navigate("/upload-image"));

                        if (window.ym) {
                          await window.ym(
                            100582088,
                            "reachGoal",
                            "Take a photo"
                          );
                        }
                      }}
                    >
                      <img src={cameraImg} alt="camera" />
                      <h2>{t("uploadImagePhoto")}</h2>
                      <p>{t("uploadImageText")}</p>
                    </button>

                    <input
                      id="create-post-img"
                      type="file"
                      hidden
                      onChange={handleChangeFile}
                      accept=".jpg, .png, .jpeg"
                    />

                    <label
                      disabled={!check}
                      htmlFor={check && "create-post-img"}
                      onClick={async () => {
                        if (window.ym) {
                          await window.ym(
                            100582088,
                            "reachGoal",
                            "Upload image"
                          );
                        }
                      }}
                    >
                      <img src={imageImg} alt="image" />
                      <h2>{t("uploadImageUpload")}</h2>
                      <p>{t("uploadImageText")}</p>
                    </label>
                  </div>
                </>
              ) : (
                <div className={style.camera__result}>
                  <img src={image} alt="camera image" />

                  <div className={style.camera__buttons}>
                    <button onClick={uploadImage}>{t("uploadButton1")}</button>
                    <button onClick={() => setImage("")}>
                      {t("uploadButton2")}
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className={style.upload_image__loading}>
              <p>Loading...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UploadImage;
