

import apiService from "@/services/apiService";
import { UpdatePaymentPayload } from "@/types";

import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchTransactions = createAsyncThunk<any , string>(
  'fetch-transaction',
  async (username, {rejectWithValue}) => {
    let url = ''
    if(username){
      url = `/getTransactions?userName=${username}`
    }else{
      url = `/getTransactions`
    }
    console.log('url', url)

    try {
      const response = await apiService.get(url);
      return response?.transactions; 

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


export const fetchSingleUserTransactions = createAsyncThunk<any , string>(
  'fetch-user-transaction',
  async (status, {rejectWithValue}) => {
    let url = ''
    if(status){
      url = `/getTransactions?transStatus=${status}`
    }else{
      url = `/getTransactions`
    }
    console.log('url', url)

    try {
      const response = await apiService.get(url);
      return response?.transactions; 

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

// update bank account api call here

export const updatePaymentStatus = createAsyncThunk<any , UpdatePaymentPayload>(
  'update-transaction-status',
  async (payload, {rejectWithValue}) => {
    console.log("update Transaction payload",payload);
    try {
      const response = await apiService.patch(`/updateTransactionStatus`,payload);
      return response; 

    } catch (error:any) {

      console.log('transaction status  account error', error)
      if (!error.response) {
        return rejectWithValue(
          'Network error: Please check your internet connection.',
        );
      }
      const errorMessage =
        error?.response?.data?.message ||
        'transaction status  account failed. Please try again.';
      return rejectWithValue(errorMessage);
    }
  },
);