import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Banner from "../../components/banner/Banner";
import { useTranslation } from "react-i18next";

const NeyroImageGenerate = () => {
  const [aiImageGeneratedName, setAiImageGeneratedName] = useState("");
  const location = useLocation();
  const { t } = useTranslation();

  const { file } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (!file) {
      return navigate("/upload-image");
    }
  }, [file]);

  async function uploadImage() {
    try {
      if (file && file.name) {
        const neyroFormData = new FormData();

        neyroFormData.append("image", file);
        neyroFormData.append("overwrite", "false");
        neyroFormData.append("subfolder", "facesImages");
        neyroFormData.append("type", "input");

        const data = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/aiUpload`,
          neyroFormData
        );

        if (data.error) {
          return console.log("Smething went wrong");
        }

        return data.data;
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  }

  async function generateImage(filename) {
    try {
      const uploadImageRes = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/uploadImage`,
        { filename: `${filename}` }
      );

      if (uploadImageRes.data.images) {
        setAiImageGeneratedName(
          uploadImageRes.data.images[118][0].image.filename
        );
      }
    } catch (err) {}
  }

  async function completeGenerateFunctions() {
    const imageData = await uploadImage();
    await generateImage(imageData.name);
  }

  useEffect(() => {
    if (file && file.name) {
      completeGenerateFunctions();
    }
  }, [file]);

  useEffect(() => {
    if (aiImageGeneratedName) {
      return navigate("/image-generated", {
        state: { aiImageName: aiImageGeneratedName },
      });
    }
  }, [aiImageGeneratedName]);

  useEffect(() => {
    if (window.fbq !== undefined) {
      window.fbq("track", "ViewContent");
    }
  }, []);

  return (
    <section className={style.neyro_image_generate}>
      <div className="container">
        <div className={`wrapper ${style.neyro_image_generate__wrapper}`}>
          <div className={style.neyro_image_generate__processing}>
            <div className={style.neyro_image_generate__banner}>
              <Banner />
            </div>

            <p>{t("uploadImageWaiting")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NeyroImageGenerate;
