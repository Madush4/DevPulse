import { useState, useEffect } from "react";
import { fetchProfile, refreshProfile } from "../api/client";

export function useProfile(username) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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
    loadProfile();
  }, [username]);

  async function reLoadProfile() {
    try {
      setRefreshing(true);
      setError(null);
      const refreshProfileData = await refreshProfile(username);
      setData(refreshProfileData.profile);
    } catch (error) {
      setError(error);
    } finally {
      setRefreshing(false);
    }
  }

  return { data, loading, error, refreshing , reLoadProfile };
}
