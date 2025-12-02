import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import reportRoute from "./routes/reportRoute.js";
import pdfRoute from "./routes/pdfRoute.js";

dotenv.config();
const app = express();
app.use(cors());

// ⬇️ Add these BEFORE routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use("/api/report", reportRoute);
app.use("/api/report", pdfRoute);

app.listen(process.env.PORT, () => {
  console.log(`✅ Server running on http://localhost:${process.env.PORT}`);
});
