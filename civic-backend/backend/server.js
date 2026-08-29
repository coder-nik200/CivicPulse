import express from "express";
import cors from "cors";
import dotenv from "dotenv";
<<<<<<< HEAD
import { connectDB } from "./src/config/db.js";
=======
>>>>>>> a291098 (Commit changes)
import issueRoutes from "./src/routes/issue.routes.js";

dotenv.config();

const app = express();

app.use(cors());
<<<<<<< HEAD
=======
// app.use(express.json());

>>>>>>> a291098 (Commit changes)
app.use(express.json({ limit: "15mb" }));

app.use("/api/issues", issueRoutes);

app.get("/health", (_, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 5001;
<<<<<<< HEAD

// Start server with database connection
async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✓ CivicPulse backend running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("✗ Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();

=======
app.listen(PORT, () => console.log(`CivicPulse backend running on http://localhost:${PORT}`));
>>>>>>> a291098 (Commit changes)
