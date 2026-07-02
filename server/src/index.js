import "dotenv/config";
import express from "express";
import corsMiddleware from "cors";
import db from "./db/connection.js";

import profileRoutes from "./routes/profile.js";
import cacheRoutes from "./routes/cache.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(corsMiddleware);

app.use(express.json());

app.get("/health ",(req, res) => {
  res.json({
    status: "ok",
    message: "Dev pulse sever is running.",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/profile", profileRoutes);
app.use("/api/cache", cacheRoutes);
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.url} not found.` });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
