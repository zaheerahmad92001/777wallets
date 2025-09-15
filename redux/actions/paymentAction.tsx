

import apiService from "@/services/apiService";

import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchTransactions = createAsyncThunk(
  'fetch-transaction',
  async (_, {rejectWithValue}) => {
    try {
      const response = await apiService.get('/getTransactions');
      // await AsyncStorage.setItem(
      //   storagekeys.authToken,
      //   response?.data?.token,
      // );

      console.log(response);
      return response?.Transactions; 

    } catch (error:any) {

      console.log('getting Transactions error', error)
      if (!error.response) {
        return rejectWithValue(
          'Network error: Please check your internet connection.',
        );
      }
      const errorMessage =
        error?.response?.data?.message ||
        'getting Transaction failed. Please try again.';
      return rejectWithValue(errorMessage);
    }
  },
);