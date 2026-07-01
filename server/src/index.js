import "detenv/config";
import express from "express";
import cors from "cors";
import db from "./db/connection.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get("./health ", (req, res) => {
  res.json({
    status: "ok",
    messsage: "Dev pulse sever is running.",
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhhost:${PORT}`);
  console.log(`Helth check: http://localhost:${PORT}/health`);
});
