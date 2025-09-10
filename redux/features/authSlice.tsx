import { storagekeys } from '@/constants/staticData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';
import { loginUser, } from '../actions/authActions';

const initialState = {
  user: null,
  loading: false,
  inProgress:false,
  error: null,

};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      AsyncStorage.removeItem(storagekeys.authToken);
    },
    updateUser: (state, action) => {
      if (state.user) {
        state.user = {...state.user, ...action.payload};
      }
    },
    
  },
  extraReducers: builder => {
    builder
    
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        // state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const {logout , updateUser ,} = authSlice.actions;
export default authSlice.reducer;
