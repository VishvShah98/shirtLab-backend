import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();
const config = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(config);
const PORT = process.env.PORT || 6001;
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.post("/api/dalle", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const image = response.data.data[0].b64_json;

    res.status(200).json({ photo: image });
  } catch (error) {
    //console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.listen(PORT, () => console.log("Server has started on ", PORT));
