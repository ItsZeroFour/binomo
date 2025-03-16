import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import { ComfyUIClient } from "comfy-ui-client";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";

dotenv.config({ path: "./.env" });
const app = express();

/* CONSTANTS */
const PORT = process.env.PORT || 5000;
/* MIDDLEWARES */
app.use(express.json({ limit: "5mb" }));
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
    parameterLimit: 1000000,
  })
);
app.use("/uploads", express.static("uploads"));
app.use("/savedAi", express.static("savedAi"));

/* IMAGE UPLOAD */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Сохраняем оригинальное имя файла
  },
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

let prompt;

app.post("/api/upload", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      res.json({ message: "Ошибка при загрузке файла" });
    } else {
      prompt = {
        1: {
          inputs: {
            measurement: "Pixels",
            left: 0,
            right: ["110", 0],
            top: 0,
            bottom: 0,
            image: ["63", 0],
          },
          class_type: "Image Inset Crop (rgthree)",
          _meta: {
            title: "Image Inset Crop (rgthree)",
          },
        },
        2: {
          inputs: {
            measurement: "Pixels",
            left: ["33", 0],
            right: 0,
            top: 0,
            bottom: 0,
            image: ["63", 0],
          },
          class_type: "Image Inset Crop (rgthree)",
          _meta: {
            title: "Image Inset Crop (rgthree)",
          },
        },
        3: {
          inputs: {
            enabled: true,
            swap_model: "inswapper_128.onnx",
            facedetection: "retinaface_resnet50",
            face_restore_model: "GFPGANv1.4.pth",
            face_restore_visibility: 1,
            codeformer_weight: 0.5,
            detect_gender_input: "no",
            detect_gender_source: "no",
            input_faces_index: "0",
            source_faces_index: "0",
            console_log_level: 1,
            input_image: ["2", 0],
            source_image: ["15", 0],
          },
          class_type: "ReActorFaceSwap",
          _meta: {
            title: "ReActor 🌌 Fast Face Swap",
          },
        },
        12: {
          inputs: {
            clip_name: "CLIP-ViT-H-fp16.safetensors",
          },
          class_type: "CLIPVisionLoader",
          _meta: {
            title: "Load CLIP Vision",
          },
        },
        14: {
          inputs: {
            weight: 0.7000000000000001,
            weight_type: "strong style transfer",
            combine_embeds: "concat",
            start_at: 0,
            end_at: 0.8,
            embeds_scaling: "V only",
            model: ["122", 0],
            ipadapter: ["30", 0],
            image: ["15", 0],
            clip_vision: ["12", 0],
          },
          class_type: "IPAdapterAdvanced",
          _meta: {
            title: "IPAdapter Advanced",
          },
        },
        15: {
          inputs: {
            image: `facesImages/${req.file.filename}`,
            upload: "image",
          },
          class_type: "LoadImage",
          _meta: {
            title: "Load Image",
          },
        },
        18: {
          inputs: {
            positive: ["60", 0],
            negative: ["61", 0],
            vae: ["27", 2],
            pixels: ["19", 0],
            mask: ["72", 0],
          },
          class_type: "InpaintModelConditioning",
          _meta: {
            title: "InpaintModelConditioning",
          },
        },
        19: {
          inputs: {
            image: "main_v1.png",
            upload: "image",
          },
          class_type: "LoadImage",
          _meta: {
            title: "Load Image",
          },
        },
        21: {
          inputs: {
            direction: "left",
            match_image_size: false,
            image1: ["3", 0],
            image2: ["1", 0],
          },
          class_type: "ImageConcanate",
          _meta: {
            title: "Image Concatenate",
          },
        },
        27: {
          inputs: {
            ckpt_name: "realisticVisionV60B1_v51HyperVAE.safetensors",
          },
          class_type: "CheckpointLoaderSimple",
          _meta: {
            title: "Load Checkpoint",
          },
        },
        30: {
          inputs: {
            ipadapter_file: "ip-adapter-plus-face_sd15.safetensors",
          },
          class_type: "IPAdapterModelLoader",
          _meta: {
            title: "IPAdapter Model Loader",
          },
        },
        33: {
          inputs: {
            value: 440,
          },
          class_type: "Int-🔬",
          _meta: {
            title: "Int",
          },
        },
        57: {
          inputs: {
            model: ["14", 0],
          },
          class_type: "DifferentialDiffusion",
          _meta: {
            title: "Differential Diffusion",
          },
        },
        60: {
          inputs: {
            text: ["95", 0],
            clip: ["27", 1],
          },
          class_type: "CLIPTextEncode",
          _meta: {
            title: "CLIP Text Encode (Prompt)",
          },
        },
        61: {
          inputs: {
            text: "(deformed iris, deformed pupils, semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime, mutated hands and fingers:1.4), (deformed, distorted, disfigured:1.3), poorly drawn, bad anatomy, wrong anatomy, extra limb, missing limb, floating limbs, disconnected limbs, mutation, mutated, ugly, disgusting, amputation",
            clip: ["27", 1],
          },
          class_type: "CLIPTextEncode",
          _meta: {
            title: "CLIP Text Encode (Prompt)",
          },
        },
        62: {
          inputs: {
            seed: 746971534258503,
            steps: 6,
            cfg: 2,
            sampler_name: "dpmpp_sde",
            scheduler: "normal",
            denoise: 0.8200000000000001,
            model: ["57", 0],
            positive: ["18", 0],
            negative: ["18", 1],
            latent_image: ["18", 2],
          },
          class_type: "KSampler",
          _meta: {
            title: "KSampler",
          },
        },
        63: {
          inputs: {
            samples: ["62", 0],
            vae: ["27", 2],
          },
          class_type: "VAEDecode",
          _meta: {
            title: "VAE Decode",
          },
        },
        71: {
          inputs: {
            image: "mask_v1.png",
            upload: "image",
          },
          class_type: "LoadImage",
          _meta: {
            title: "Load Image",
          },
        },
        72: {
          inputs: {
            method: "intensity",
            image: ["71", 0],
          },
          class_type: "Image To Mask",
          _meta: {
            title: "Image To Mask",
          },
        },
        74: {
          inputs: {
            model: "wd-v1-4-moat-tagger-v2",
            threshold: 0.35,
            character_threshold: 0.85,
            replace_underscore: false,
            trailing_comma: false,
            exclude_tags: "",
            image: ["15", 0],
          },
          class_type: "WD14Tagger|pysssss",
          _meta: {
            title: "WD14 Tagger 🐍",
          },
        },
        76: {
          inputs: {
            action: "replace",
            tidy_tags: "no",
            text_a: ["74", 0],
            text_b:
              "/(?!pink_hair|blue_hair|white_hair|black_hair|brown_hair|blonde_hair|orange_hair|bald)\\b\\w+\\b/",
            text_c: "",
          },
          class_type: "StringFunction|pysssss",
          _meta: {
            title: "String Function 🐍",
          },
        },
        80: {
          inputs: {
            text: ["82", 0],
            blacklist_words: ",\n-",
            replacement_text: "",
          },
          class_type: "CR Text Blacklist",
          _meta: {
            title: "🔤 Text Blacklist",
          },
        },
        82: {
          inputs: {
            text: ["83", 0],
            operation: "remove_spaces",
          },
          class_type: "CR Text Operation",
          _meta: {
            title: "🔤 CR Text Operation",
          },
        },
        83: {
          inputs: {
            text: ["76", 0],
            blacklist_words: "",
            replacement_text: "",
          },
          class_type: "CR Text Blacklist",
          _meta: {
            title: "🔤 Text Blacklist",
          },
        },
        95: {
          inputs: {
            delimiter: ", ",
            clean_whitespace: "true",
            text_a: ["97", 0],
            text_b: ["80", 0],
          },
          class_type: "Text Concatenate",
          _meta: {
            title: "Text Concatenate",
          },
        },
        97: {
          inputs: {
            prompt:
              "highly detailed 3D cartoon, realistic yet stylized human face with exaggerated proportions, soft and realistic lighting, smooth shading, reflective surface,  smile",
          },
          class_type: "CR Prompt Text",
          _meta: {
            title: "Color Hint",
          },
        },
        110: {
          inputs: {
            value: 584,
          },
          class_type: "Int-🔬",
          _meta: {
            title: "Int",
          },
        },
        118: {
          inputs: {
            images: ["21", 0],
          },
          class_type: "PreviewImage",
          _meta: {
            title: "Preview Image",
          },
        },
        122: {
          inputs: {
            unet_name: "STAT_16_2080-b-1-h-1024-w-1024_00001_.engine",
            model_type: "sd1.x",
          },
          class_type: "TensorRTLoader",
          _meta: {
            title: "TensorRT Loader",
          },
        },
      };

      res.status(200).json({ url: req.file.filename });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Ошибка" });
  }
});

app.post("/api/aiUpload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Файл не загружен." });
    }

    const formData = new FormData();

    formData.append(
      "image",
      fs.createReadStream(req.file.path),
      req.file.originalname
    );
    formData.append("overwrite", req.body.overwrite);
    formData.append("subfolder", req.body.subfolder);
    formData.append("type", req.body.type);

    await axios
      .post(`${process.env.NEYRO_SERVER_URL}/upload/image`, formData)
      .then((response) => {
        return res.status(200).json(response.data);
      })
      .catch((err) => {
        return res.status(500).json({ error: true });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось загрузить изображение на удаленный сервер",
    });
  }
});

app.get("/api/getQueue", async (req, res) => {
  try {
    await axios
      .get(`${process.env.NEYRO_SERVER_URL}/queue`)
      .then((response) => {
        return res.status(200).json(response.data);
      })
      .catch((err) => {
        return res.status(500).json({ error: true, errLogs: err });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: true,
    });
  }
});

/* NEYRO CONNECT */
app.post("/api/uploadImage", async (req, res) => {
  try {
    const serverAddress = "62.68.146.215:35525";

    /* Generate client id from filename (file name = client id) */
    const filePath = `${req.body.filename}`;
    const filename = filePath.split("/").pop();
    const clientId = filename.split(".").shift();

    const client = new ComfyUIClient(serverAddress, clientId);

    await client.connect();

    const images = await client.getImages(prompt);

    const outputDir = "./savedAi";
    await client.saveImages(images, outputDir);

    // Disconnect
    await client.disconnect();

    res.status(200).json({ images, filePath, prompt });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Ошибка",
    });
  }
});

/* START FUNCTION */
async function start() {
  try {
    app.listen(PORT, (err) => {
      if (err) return console.log("App crashed: ", err);
      console.log(`Server started successfully! Port: ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

start();
