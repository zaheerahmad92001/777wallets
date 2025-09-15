import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = "https://us-central1-bpwallets.cloudfunctions.net";
// const BASE_URL = "http://127.0.0.1:5001/bpwallets/us-central1";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 40000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setToken = async (token:string) => {
  await AsyncStorage.setItem("authToken", token);
};

export const removeToken = async () => {
  await AsyncStorage.removeItem("authToken");
  await AsyncStorage.removeItem("refreshToken");
};

const getTokens = async () => {
  const accessToken = await AsyncStorage.getItem("authToken");
  console.log('access token', accessToken)
  const refreshToken = await AsyncStorage.getItem("refreshToken");
  return { accessToken, refreshToken };
};

const refreshAccessToken = async () => {
  try {
    const { refreshToken } = await getTokens();
    if (!refreshToken) throw new Error("No refresh token found");

    const response = await axios.post(`${BASE_URL}/auth/refresh`, {
      refreshToken,
    });

    if (response.data?.accessToken) {
      await setToken(response.data.accessToken);
      return response.data.accessToken;
    } else {
      throw new Error("Failed to refresh token");
    }
  } catch (error) {
    console.error("Refresh Token Failed:", error);
    await removeToken();
    throw error;
  }
};

api.interceptors.request.use(
  async (config) => {
    const { accessToken } = await getTokens();
    if (accessToken) {
      console.log("accessToken", accessToken);
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.warn("Session expired. Please log in again.");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// 🔹 API Service Functions
const apiService = {
  get: async (endpoint:string, params = {}) => {
    try {
      const response = await api.get(endpoint, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  post: async (endpoint:string, data:any) => {
    try {
      const response = await api.post(endpoint, data);
      return response.data;
    } catch (error:any) {
      console.log('here is error', error)
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }

      // Otherwise, show a generic error
      throw new Error(error.message || "Something went wrong");
      // throw error;
    }
  },

  postMultipart: async (endpoint:string, formData:unknown) => {
    try {
      const response = await api.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error:any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error(error.message || "Something went wrong");
    }
  },

  putMultipart: async (endpoint:string, formData:any) => {
    try {
      const response = await api.put(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  put: async (endpoint:string, data = {}) => {
    try {
      const response = await api.put(endpoint, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  patch: async (endpoint:string, data = {}) => {
    try {
      const response = await api.patch(endpoint, data);
      return response.data;
    } catch (error:any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error(error.message || "Something went wrong");
    }
  },

  delete: async (endpoint:string) => {
    try {
      console.log('here is endpoint ', endpoint)
      const response = await api.delete(endpoint);
      return response.data;
    } catch (error:any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error(error.message || "Something went wrong");
    }
  },
};

export default apiService;
