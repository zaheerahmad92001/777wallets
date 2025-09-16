import { createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../services/apiService";

import { storagekeys } from "@/constants/staticData";
import { AddWebsitePayload, AddWebsiteResponse, AddWhatsAppPayload, AddWhatsResponse, AllUser, CreateUserPayload, CreateUserResponse, DeleteUserPayload, DeleteUserResponse, LoginPayload, LoginResponse, UpdateUserPayload, updateWebsitePayload, updateWebsiteResponse, updateWhatsAppPayload, updateWhatsAppResponse } from "@/types";
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

// update user

export const updateUser = createAsyncThunk<
  UpdateUserResponse,
  UpdateUserPayload,
  { rejectValue: string }
>("update-user", async ({payload,userId}, { rejectWithValue }) => {
  // console.log("create user api call", payload);
  try {
    const response = await apiService.put(`/updateUser?userId=${userId}`, payload);
    console.log("here is response update user", response);
 
    return response;
  } catch (error: any) {
    console.log("update api error", error);
    if (!error.response) {
      return rejectWithValue(
        "Network error: Please check your internet connection."
      );
    }
    const errorMessage =
      error?.response?.data?.message || "update failed. Please try again.";
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


export const deleteUser = createAsyncThunk<DeleteUserResponse , DeleteUserPayload>(
  'delete-bank-account',
  async ({userId}, {rejectWithValue}) => {
  try {
    const response = await apiService.delete(`/deleteUser?userId=${userId}`);
    console.log("here is response delete", response);

    return response;
  } catch (error: any) {
    console.log("delete user api error", error);
    if (!error.response) {
      return rejectWithValue(
        "Network error: Please check your internet connection."
      );
    }
    const errorMessage =
      error?.response?.data?.message ||
      "delete user failed. Please try again.";
    return rejectWithValue(errorMessage);
  }
});

// add whatsApp Number

export const addWhatsAppNum = createAsyncThunk<AddWhatsResponse , AddWhatsAppPayload>(
  "add-whatsapp-number",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiService.post("/addWhatsAppNumber",payload);
      return response;
    } catch (error: any) {
      console.log("add whatsapp number api error", error);
      if (!error.response) {
        return rejectWithValue(
          "Network error: Please check your internet connection."
        );
      }
      const errorMessage =
        error?.response?.data?.message ||
        "add whatsapp failed. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
)


export const fetchWhatsApp = createAsyncThunk(
  "fetch-whatsapp",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get("/getWhatsAppNumber");
      return response;
    } catch (error: any) {
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

export const updateWhatsApp = createAsyncThunk<updateWhatsAppResponse, updateWhatsAppPayload>(
  "update-whatsapp",
  async (payload, { rejectWithValue }) => {
    console.log('here is payload', payload)
    try {
      const response = await apiService.put("/updateWhatsAppNumber",payload);
      return response;
    } catch (error: any) {
      console.log("update whatsapp number api error", error?.response?.data);
      if (!error.response) {
        return rejectWithValue(
          "Network error: Please check your internet connection."
        );
      }
      const errorMessage =
        error?.response?.data?.message ||
        "update whatsapp failed. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);




export const addWebsite = createAsyncThunk<AddWebsiteResponse, AddWebsitePayload>(
  "add-website-url",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiService.post("/addSiteURL",payload);
      return response;
    } catch (error: any) {
      console.log("add website url api error", error);
      if (!error.response) {
        return rejectWithValue(
          "Network error: Please check your internet connection."
        );
      }
      const errorMessage =
        error?.response?.data?.message ||
        "add website url failed. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
)

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

export const updateWebsite = createAsyncThunk<updateWebsiteResponse, updateWebsitePayload>(
  "update-website",
  async (payload, { rejectWithValue }) => {
    console.log('here is payload', payload)
    try {
      const response = await apiService.put("/updateSiteURL",payload);
      return response;
    } catch (error: any) {
      console.log("update website URL api error", error?.response?.data);
      if (!error.response) {
        return rejectWithValue(
          "Network error: Please check your internet connection."
        );
      }
      const errorMessage =
        error?.response?.data?.message ||
        "update website failed. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);
