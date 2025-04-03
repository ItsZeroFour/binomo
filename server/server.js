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

app.post("/upload", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      res.json({ message: "Ошибка при загрузке файла" });
    } else {
      prompt = {
        5: {
          inputs: {
            enabled: true,
            swap_model: "reswapper_256.onnx",
            facedetection: "retinaface_resnet50",
            face_restore_model: "GFPGANv1.4.pth",
            face_restore_visibility: 1,
            codeformer_weight: 0.5,
            detect_gender_input: "no",
            detect_gender_source: "no",
            input_faces_index: "0",
            source_faces_index: "0",
            console_log_level: 1,
            input_image: ["59", 0],
            source_image: ["50", 0],
          },
          class_type: "ReActorFaceSwap",
          _meta: {
            title: "ReActor 🌌 Fast Face Swap",
          },
        },
        6: {
          inputs: {
            images: ["21", 0],
          },
          class_type: "PreviewImage",
          _meta: {
            title: "Preview Image",
          },
        },
        12: {
          inputs: {
            noise: ["13", 0],
            guider: ["15", 0],
            sampler: ["14", 0],
            sigmas: ["16", 0],
            latent_image: ["30", 2],
          },
          class_type: "SamplerCustomAdvanced",
          _meta: {
            title: "SamplerCustomAdvanced",
          },
        },
        13: {
          inputs: {
            noise_seed: 653251254682503,
          },
          class_type: "RandomNoise",
          _meta: {
            title: "RandomNoise",
          },
        },
        14: {
          inputs: {
            sampler_name: "dpmpp_2m",
          },
          class_type: "KSamplerSelect",
          _meta: {
            title: "KSamplerSelect",
          },
        },
        15: {
          inputs: {
            cfg: 5,
            positive: ["30", 0],
            negative: ["30", 1],
            model: ["19", 0],
          },
          class_type: "CFGGuider",
          _meta: {
            title: "CFGGuider",
          },
        },
        16: {
          inputs: {
            scheduler: "karras",
            steps: 35,
            denoise: 0.46,
            model: ["19", 0],
          },
          class_type: "BasicScheduler",
          _meta: {
            title: "BasicScheduler",
          },
        },
        17: {
          inputs: {
            ckpt_name: "realvisxlV50_v50Bakedvae.safetensors",
          },
          class_type: "CheckpointLoaderSimple",
          _meta: {
            title: "Load Checkpoint",
          },
        },
        18: {
          inputs: {
            vae_name: "SDXL/sdxl_vae.safetensors",
          },
          class_type: "VAELoader",
          _meta: {
            title: "Load VAE",
          },
        },
        19: {
          inputs: {
            model: ["28", 0],
          },
          class_type: "DifferentialDiffusion",
          _meta: {
            title: "Differential Diffusion",
          },
        },
        20: {
          inputs: {
            MODEL: ["19", 0],
            CLIP: ["17", 1],
            VAE: ["18", 0],
          },
          class_type: "Anything Everywhere3",
          _meta: {
            title: "Anything Everywhere3",
          },
        },
        21: {
          inputs: {
            rescale_algorithm: "bislerp",
            stitch: ["23", 0],
            inpainted_image: ["22", 0],
          },
          class_type: "InpaintStitch",
          _meta: {
            title: "✂️ Inpaint Stitch",
          },
        },
        22: {
          inputs: {
            samples: ["12", 0],
            vae: ["18", 0],
          },
          class_type: "VAEDecode",
          _meta: {
            title: "VAE Decode",
          },
        },
        23: {
          inputs: {
            context_expand_pixels: 128,
            context_expand_factor: 1.1500000000000001,
            fill_mask_holes: true,
            blur_mask_pixels: 16,
            invert_mask: false,
            blend_pixels: 16,
            rescale_algorithm: "bislerp",
            mode: "forced size",
            force_width: 1024,
            force_height: 1024,
            rescale_factor: 1,
            min_width: 512,
            min_height: 512,
            max_width: 1024,
            max_height: 1024,
            padding: 64,
            image: ["60", 0],
            mask: ["70", 0],
          },
          class_type: "InpaintCrop",
          _meta: {
            title: "✂️ Inpaint Crop",
          },
        },
        25: {
          inputs: {
            text: "smiling face, highly detailed, (3D cartoon:1.15)",
            clip: ["17", 1],
          },
          class_type: "CLIPTextEncode",
          _meta: {
            title: "PositivePrompt",
          },
        },
        26: {
          inputs: {
            text: "worst quality, bad quality, jpeg artifacts",
            clip: ["17", 1],
          },
          class_type: "CLIPTextEncode",
          _meta: {
            title: "Negative Prompt",
          },
        },
        28: {
          inputs: {
            object_to_patch: "diffusion_model",
            residual_diff_threshold: 0.12,
            start: 0,
            end: 1,
            max_consecutive_cache_hits: -1,
            model: ["35", 0],
          },
          class_type: "ApplyFBCacheOnModel",
          _meta: {
            title: "Apply First Block Cache",
          },
        },
        30: {
          inputs: {
            noise_mask: true,
            positive: ["25", 0],
            negative: ["26", 0],
            pixels: ["23", 1],
            mask: ["33", 0],
            vae: ["18", 0],
          },
          class_type: "InpaintModelConditioning",
          _meta: {
            title: "InpaintModelConditioning",
          },
        },
        33: {
          inputs: {
            amount: 6,
            device: "gpu",
            mask: ["23", 2],
          },
          class_type: "MaskBlur+",
          _meta: {
            title: "🔧 Mask Blur",
          },
        },
        35: {
          inputs: {
            method: "fidelity",
            weight: 0.85,
            start_at: 0,
            end_at: 1,
            model: ["17", 0],
            pulid: ["36", 0],
            eva_clip: ["37", 0],
            face_analysis: ["38", 0],
            image: ["50", 0],
          },
          class_type: "ApplyPulid",
          _meta: {
            title: "Apply PuLID",
          },
        },
        36: {
          inputs: {
            pulid_file: "ip-adapter_pulid_sdxl_fp16.safetensors",
          },
          class_type: "PulidModelLoader",
          _meta: {
            title: "Load PuLID Model",
          },
        },
        37: {
          inputs: {},
          class_type: "PulidEvaClipLoader",
          _meta: {
            title: "Load Eva Clip (PuLID)",
          },
        },
        38: {
          inputs: {
            provider: "CUDA",
          },
          class_type: "PulidInsightFaceLoader",
          _meta: {
            title: "Load InsightFace (PuLID)",
          },
        },
        49: {
          inputs: {
            image: "main3.png",
          },
          class_type: "LoadImage",
          _meta: {
            title: "Load Image",
          },
        },
        50: {
          inputs: {
            image: `facesImages/${req.file.filename}`,
          },
          class_type: "LoadImage",
          _meta: {
            title: "Load Image",
          },
        },
        52: {
          inputs: {
            image: "mask3.png",
          },
          class_type: "LoadImage",
          _meta: {
            title: "Load Image",
          },
        },
        56: {
          inputs: {
            value: 512,
          },
          class_type: "Int-🔬",
          _meta: {
            title: "Int",
          },
        },
        57: {
          inputs: {
            value: 512,
          },
          class_type: "Int-🔬",
          _meta: {
            title: "Int",
          },
        },
        58: {
          inputs: {
            measurement: "Pixels",
            left: 0,
            right: ["57", 0],
            top: 0,
            bottom: 0,
            image: ["49", 0],
          },
          class_type: "easy imageInsetCrop",
          _meta: {
            title: "Left side",
          },
        },
        59: {
          inputs: {
            measurement: "Pixels",
            left: ["56", 0],
            right: 0,
            top: 0,
            bottom: 0,
            image: ["49", 0],
          },
          class_type: "easy imageInsetCrop",
          _meta: {
            title: "Right side",
          },
        },
        60: {
          inputs: {
            direction: "left",
            match_image_size: false,
            image1: ["5", 0],
            image2: ["58", 0],
          },
          class_type: "ImageConcanate",
          _meta: {
            title: "Image Concatenate",
          },
        },
        64: {
          inputs: {
            rgthree_comparer: {
              images: [
                {
                  name: "A",
                  selected: true,
                  url: "/api/view?filename=rgthree.compare._temp_kmsgc_00003_.png&type=temp&subfolder=&rand=0.7956293757408723",
                },
                {
                  name: "B",
                  selected: true,
                  url: "/api/view?filename=rgthree.compare._temp_kmsgc_00004_.png&type=temp&subfolder=&rand=0.8652503887726214",
                },
              ],
            },
            image_a: ["21", 0],
            image_b: ["60", 0],
          },
          class_type: "Image Comparer (rgthree)",
          _meta: {
            title: "Image Comparer (rgthree)",
          },
        },
        70: {
          inputs: {
            method: "intensity",
            image: ["52", 0],
          },
          class_type: "Image To Mask",
          _meta: {
            title: "Image To Mask",
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

app.post("/aiUpload", upload.single("image"), async (req, res) => {
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
        console.log(response.data);

        return res.status(200).json(response.data);
      })
      .catch((err) => {
        console.log(err);

        return res.status(500).json({ error: true });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось загрузить изображение на удаленный сервер",
    });
  }
});

app.get("/getQueue", async (req, res) => {
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
app.post("/uploadImage", async (req, res) => {
  try {
    const serverAddress = "81.94.158.192:8283";

    /* Generate client id from filename (file name = client id) */
    const filePath = `${req.body.filename}`;
    const filename = filePath.split("/").pop();
    const clientId = filename.split(".").shift();

    console.log(filePath);

    const client = new ComfyUIClient(serverAddress, clientId);

    await client.connect();

    const images = await client.getImages(prompt);

    console.log(images);

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
