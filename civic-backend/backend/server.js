import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import issueRoutes from "./src/routes/issue.routes.js";

dotenv.config();

const app = express();

app.use(cors());
// app.use(express.json());

app.use(express.json({ limit: "15mb" }));

app.use("/api/issues", issueRoutes);

app.get("/health", (_, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`CivicPulse backend running on http://localhost:${PORT}`));
