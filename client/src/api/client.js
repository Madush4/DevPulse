import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function fetchProfile(username) {
  try {
    const response = await api.get(`/api/profile/${username}`);
    return response.data;
  } catch (error) {
    const customError = new Error("Faliled to fetch profile");
    customError.status = error.response?.status;
    customError.message = error.response?.data?.error || "Something went wrong";
    throw customError;
  }
}

export async function refreshProfile(username) {
  try {
    const response = await api.post(`/api/cache/refresh/${username}`);
    return response.data;
  } catch (error) {
    console.error("Refresh route error:", error);
    const customError = new Error("Failed to fetch profile.");
    customError.status = error.response?.status;
    customError.message = error.response?.data?.error || "Something went wrong";

    throw customError;
  }
}
