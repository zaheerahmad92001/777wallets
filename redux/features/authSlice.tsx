import { storagekeys } from "@/constants/staticData";
import { AllUser } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllUser,
  fetchWebsiteURL,
  fetchWhatsApp,
  loginUser,
  signUp
} from "../actions/authActions";

interface AuthState {
  user: any;
  allUser: AllUser[];
  contactNumber: { id: string; whatsAppNumber: string } | null;
  websiteURL: { id: string; websiteURL: string } | null;
  loading: boolean;
  inProgress: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  contactNumber: null,
  websiteURL: null,
  loading: false,
  inProgress: false,
  error: null,
  allUser: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      AsyncStorage.removeItem(storagekeys.authToken);
    },
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
   .addCase(signUp.pending, (state) => {
        state.inProgress = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        console.log("user created in slice", action.payload);
        state.inProgress = false;
        // state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.inProgress = false;
        state.error =
          (action.payload as string) ??
          action.error.message ??
          "Something went wrong";
      })
// login user cases
      .addCase(loginUser.pending, (state) => {
        state.inProgress = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.inProgress = false;
        // state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.inProgress = false;
        state.error =
          (action.payload as string) ??
          action.error.message ??
          "Something went wrong";
      })

      // fetch all user cases
      .addCase(fetchAllUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUser.fulfilled, (state, action) => {
        state.loading = false;
        state.allUser = action.payload;
      })
      .addCase(fetchAllUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ??
          action.error.message ??
          "Something went wrong";
      })

      // whatsApp number cases
      .addCase(fetchWhatsApp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWhatsApp.fulfilled, (state, action) => {
        state.loading = false;
        state.contactNumber = action.payload;
      })
      .addCase(fetchWhatsApp.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ??
          action.error.message ??
          "Something went wrong";
      })
      // website
      .addCase(fetchWebsiteURL.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWebsiteURL.fulfilled, (state, action) => {
        state.loading = false;
        state.websiteURL = action.payload;
      })
      .addCase(fetchWebsiteURL.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ??
          action.error.message ??
          "Something went wrong";
      });
  },
});

export const { logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
