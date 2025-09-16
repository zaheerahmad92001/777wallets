import { storagekeys } from "@/constants/staticData";
import { AllUser } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import {
  addWhatsAppNum,
  deleteUser,
  fetchAllUser,
  fetchWebsiteURL,
  fetchWhatsApp,
  loginUser,
  signUp,
  updateUser,
  updateWebsite,
  updateWhatsApp,
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
    // updateUser: (state, action) => {
    //   if (state.user) {
    //     state.user = { ...state.user, ...action.payload };
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.inProgress = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        const { userId, name, phone, username, role, imageUrl } =
          action.payload;

        state.inProgress = false;
        const newUser: AllUser = {
          userId,
          name: name || "",
          phone: phone || "",
          username,
          role: role as "user" | "admin",
          imageUrl: imageUrl || null,
        };

        state.allUser = [...state.allUser, newUser];
      })
      .addCase(signUp.rejected, (state, action) => {
        state.inProgress = false;
        state.error =
          (action.payload as string) ??
          action.error.message ??
          "Something went wrong";
      })

      // update user
      .addCase(updateUser.pending, (state) => {
        state.inProgress = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const { userId, updatedFields } = action.payload;

        state.inProgress = false;

        const index = state.allUser.findIndex((u) => u.userId === userId);

        if (index !== -1) {
          state.allUser[index] = {
            ...state.allUser[index],
            ...updatedFields, // merge only updated fields
            // userId, // keep ID
          };
        }
      })

      .addCase(updateUser.rejected, (state, action) => {
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

      // fetch all user cases
      .addCase(deleteUser.pending, (state) => {
        state.inProgress = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const userId = action.payload.userId;
        state.inProgress = false;
        state.allUser = state.allUser.filter((user) => user.userId !== userId);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.inProgress = false;
        state.error =
          (action.payload as string) ??
          action.error.message ??
          "Something went wrong";
      })

      // whatsApp number cases

      .addCase(addWhatsAppNum.pending, (state) => {
        state.inProgress = true;
        state.error = null;
      })
      .addCase(addWhatsAppNum.fulfilled, (state, action) => {
        const { id, whatsAppNumber } = action.payload;
        const newNumber = {
          id: id,
          whatsAppNumber: whatsAppNumber,
        };
        state.inProgress = false;
        state.contactNumber = newNumber;
      })
      .addCase(addWhatsAppNum.rejected, (state, action) => {
        state.inProgress = false;
        state.error =
          (action.payload as string) ??
          action.error.message ??
          "Something went wrong";
      })
      // fetch whatsApp number
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

      // update whatsApp number cases
      .addCase(updateWhatsApp.pending, (state) => {
        state.inProgress = true;
        state.error = null;
      })
      .addCase(updateWhatsApp.fulfilled, (state, action) => {
        const { id, whatsAppNumber } = action.payload;
        const newWhatsAppNum = {
          id,
          whatsAppNumber,
        };
        state.inProgress = false;
        state.contactNumber = newWhatsAppNum;
      })
      .addCase(updateWhatsApp.rejected, (state, action) => {
        state.inProgress = false;
        state.error =
          (action.payload as string) ??
          action.error.message ??
          "Something went wrong";
      })

      // update website url cases
      .addCase(updateWebsite.pending, (state) => {
        state.inProgress = true;
        state.error = null;
      })
      .addCase(updateWebsite.fulfilled, (state, action) => {
        const { id, websiteURL } = action.payload;
        const newSiteURL = {
          id,
          websiteURL,
        };
        state.inProgress = false;
        state.websiteURL = newSiteURL;
      })
      .addCase(updateWebsite.rejected, (state, action) => {
        state.inProgress = false;
        state.error =
          (action.payload as string) ??
          action.error.message ??
          "Something went wrong";
      })

      // fetch website

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

export const { logout } = authSlice.actions;
export default authSlice.reducer;
