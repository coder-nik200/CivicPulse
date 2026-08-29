<<<<<<< HEAD
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
=======
// In-memory store — no DB needed for testing
let issues = [];
let counter = 1001;

export const db = {
  collection: () => ({
    insertOne: (doc) => {
      const id = `CIV-${counter++}`;
      issues.push({ _id: id, ...doc });
      return { insertedId: id };
    },
    find: (query) => ({
      sort: () => ({
        toArray: () => {
          let result = [...issues];
          if (query.status) result = result.filter((i) => i.status === query.status);
          if (query.category) result = result.filter((i) => i.category === query.category);
          if (query.area) result = result.filter((i) => i.area === query.area);
          return result.sort((a, b) => b.priority - a.priority);
        },
      }),
    }),
    findOne: ({ _id }) => issues.find((i) => i._id === _id) || null,
    updateOne: ({ _id }, { $set }) => {
      const idx = issues.findIndex((i) => i._id === _id);
      if (idx !== -1) issues[idx] = { ...issues[idx], ...$set };
    },
  }),
};
>>>>>>> a291098 (Commit changes)
