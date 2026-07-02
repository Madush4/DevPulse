import express from "express";
import { refreshCache } from "../services/cache.js";
import { getFullProfile, getUserId, logCacheFetch } from "../db/queries.js";

const router = express.Router();

router.post("/refresh/:username", async (req, res) => {
  const { username } = req.params;
  if (!/^[a-zA-Z0-9-]+$/.test(username)) {
    return res.status(400).json({
      error: "Invalid username format",
    });
  }

  try {
    console.log(`Manual refresh triggered for ${username}`);

    await refreshCache(username);
    const profile = getFullProfile(username);

    return res.status(200).json({
      message: "Cache refreshed successfully",
      profile,
    });
  } catch (error) {
    console.error(`Error refreshing cache for ${username}:`, error.message);

    if (error.status === 404) {
      return res.status(404).json({
        error: `GitHub user ${username} not found`,
      });
    }

    if (error.status === 403) {
      return res.status(429).json({
        error: "Rate limit exceeded. Please try again later.",
      });
    }
    return res.status(500).json({
      error: "Refresh failed. Try again later.",
    });
  }
});

export default router;
