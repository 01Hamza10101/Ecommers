import { upload } from "./utils/upload";
import {app} from '../index.js'
// Upload a single file
app.post("/upload/file", upload().single("file"), async (req, res) => {
  try {
    res.status(201).json({ text: "File uploaded successfully !" });
  } catch (error) {
    res.status(400).json({
      error: { text: "Unable to upload the file", error },
    });
  }
});

app.get("/hello",async (req,res) => {
    res.status(200).json({name:"Hello"})
});