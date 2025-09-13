import { createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../services/apiService";

import { storagekeys } from "@/constants/staticData";
import { AllUser, CreateUserPayload, CreateUserResponse, LoginPayload, LoginResponse } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";



export const signUp = createAsyncThunk<
  CreateUserResponse,
  CreateUserPayload,
  { rejectValue: string }
>("create-user", async (payload, { rejectWithValue }) => {
  console.log("create user api call", payload);
  try {
    const response = await apiService.post("/createUser", payload);
    console.log("here is response createUser", response);
 
    return response;
  } catch (error: any) {
    Alert.alert("createUser Failed", "Please check your credentials and try again.");
    console.log("createUser api error", error);
    if (!error.response) {
      return rejectWithValue(
        "Network error: Please check your internet connection."
      );
    }
    const errorMessage =
      error?.response?.data?.message || "createUser failed. Please try again.";
    return rejectWithValue(errorMessage);
  }
});


export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: string }
>("login-user", async (payload, { rejectWithValue }) => {
  console.log("loginUser api call", payload);
  try {
    const response = await apiService.post("/loginUser", payload);
    console.log("here is response login-user", response);
    await AsyncStorage.setItem(storagekeys.authToken, response?.token);
    return response;
  } catch (error: any) {
    Alert.alert("Login Failed", "Please check your credentials and try again.");
    console.log("login api error", error);
    if (!error.response) {
      return rejectWithValue(
        "Network error: Please check your internet connection."
      );
    }
    const errorMessage =
      error?.response?.data?.message || "Login failed. Please try again.";
    return rejectWithValue(errorMessage);
  }
});

export const fetchAllUser = createAsyncThunk<
  AllUser[],
  void,
  { rejectValue: string }>
  ("fetch-all-user", async (_, { rejectWithValue }) => {
  try {
    const response = await apiService.get("/getAllUsers");
    console.log("here is response all user", response?.users);

    return response?.users;
  } catch (error: any) {
    console.log("fetch all user api error", error);
    if (!error.response) {
      return rejectWithValue(
        "Network error: Please check your internet connection."
      );
    }
    const errorMessage =
      error?.response?.data?.message ||
      "fetch all user failed. Please try again.";
    return rejectWithValue(errorMessage);
  }
});

export const fetchWhatsApp = createAsyncThunk(
  "fetch-whatsapp",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get("/getWhatsAppNumber");
      return response;
    } catch (error: any) {
      //  Alert.alert("whatsApp number Failed", "Please check your network and try again.");
      console.log("getting whatsapp number api error", error);
      if (!error.response) {
        return rejectWithValue(
          "Network error: Please check your internet connection."
        );
      }
      const errorMessage =
        error?.response?.data?.message ||
        "getting whatsapp failed. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchWebsiteURL = createAsyncThunk(
  "fetch-website-url",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get("/getSiteURL");
      console.log("here is response web", response);
      return response;
    } catch (error: any) {
      //  Alert.alert("website url Failed", "Please check your network and try again.");
      console.log("getting website api error", error);
      if (!error.response) {
        return rejectWithValue(
          "Network error: Please check your internet connection."
        );
      }
      const errorMessage =
        error?.response?.data?.message ||
        "getting website failed. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);
