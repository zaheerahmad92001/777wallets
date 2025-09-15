import { BankAccountPayload, DeleteBankAccountPayload, DeleteBankAccountResponse, TransactionPayload, UpdateBankAccountPayload } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../services/apiService';



export const fetchBankAccounts = createAsyncThunk(
  'fetch-bank-accounts',
  async (_, {rejectWithValue}) => {
    try {
      const response = await apiService.get('/getBankAccounts');
      // await AsyncStorage.setItem(
      //   storagekeys.authToken,
      //   response?.data?.token,
      // );
      return response?.bankAccounts; 

    } catch (error:any) {

      console.log('getting bank accounts error', error)
      if (!error.response) {
        return rejectWithValue(
          'Network error: Please check your internet connection.',
        );
      }
      const errorMessage =
        error?.response?.data?.message ||
        'getting bank accounts failed. Please try again.';
      return rejectWithValue(errorMessage);
    }
  },
);
// add transaction api call here

export const addTransaction = createAsyncThunk<any , TransactionPayload>(
  'add-transaction',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await apiService.post('/addTransaction',payload);
      console.log('add transaction response', response)
      return response; 

    } catch (error:any) {

      console.log('add transaction error', error)
      if (!error.response) {
        return rejectWithValue(
          'Network error: Please check your internet connection.',
        );
      }
      const errorMessage =
        error?.response?.data?.message ||
        'add transaction failed. Please try again.';
      return rejectWithValue(errorMessage);
    }
  },
);
//  add bank account api call here
export const addBankAccount = createAsyncThunk<any , BankAccountPayload>(
  'add-bank-account',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await apiService.post('/addBankAccount',payload);
      return response; 

    } catch (error:any) {

      console.log('add bank error', error)
      if (!error.response) {
        return rejectWithValue(
          'Network error: Please check your internet connection.',
        );
      }
      const errorMessage =
        error?.response?.data?.message ||
        'add bank account failed. Please try again.';
      return rejectWithValue(errorMessage);
    }
  },
);

// delete bank account api call here

export const deleteBankAccount = createAsyncThunk<DeleteBankAccountResponse , DeleteBankAccountPayload>(
  'delete-bank-account',
  async ({bankId}, {rejectWithValue}) => {
    try {
      console.log('delete endpoint',`/deleteBankAccount?bankId=${bankId}`)
      const response = await apiService.delete(`/deleteBankAccount?bankId=${bankId}`);
      return {response, bankId}; 

    } catch (error:any) {

      console.log('delete bank account error', error)
      if (!error.response) {
        return rejectWithValue(
          'Network error: Please check your internet connection.',
        );
      }
      const errorMessage =
        error?.response?.data?.message ||
        'delete bank account failed. Please try again.';
      return rejectWithValue(errorMessage);
    }
  },
);



// update bank account api call here

export const updateBankAccount = createAsyncThunk<any , UpdateBankAccountPayload>(
  'update-bank-account',
  async ({bankId, payload}, {rejectWithValue}) => {
    try {
      console.log('update endpoint',`/updateBankAccount?bankId=${bankId}`)
      const response = await apiService.patch(`/updateBankAccount?bankId=${bankId}`,payload);
      console.log('update bank account response', response)
      return {response, bankId}; 

    } catch (error:any) {

      console.log('update bank account error', error)
      if (!error.response) {
        return rejectWithValue(
          'Network error: Please check your internet connection.',
        );
      }
      const errorMessage =
        error?.response?.data?.message ||
        'update bank account failed. Please try again.';
      return rejectWithValue(errorMessage);
    }
  },
);