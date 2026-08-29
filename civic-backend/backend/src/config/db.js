import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let connected = false;

export async function connectDB() {
  if (connected) {
    console.log("Database already connected");
    return;
  }

  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/civicpulse";
    await mongoose.connect(mongoUri);
    connected = true;
    console.log("✓ MongoDB connected successfully");
  } catch (error) {
    console.error("✗ MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

export async function disconnectDB() {
  if (!connected) return;
  try {
    await mongoose.disconnect();
    connected = true;
    console.log("✓ MongoDB disconnected");
  } catch (error) {
    console.error("✗ MongoDB disconnection failed:", error.message);
  }
}
