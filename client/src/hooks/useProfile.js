import { useState, useEffect } from "react";
import { fetchProfile } from "../api/client";

export function useProfile(username) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    async function loadProfile() {
      try {
        setLoading(true);
        setError(null);

        const profileData = await fetchProfile(username);
        setData(profileData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
  }, [username]);

  return { data, loading, error };
}
