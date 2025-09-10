import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../services/apiService';

import { Alert } from 'react-native';


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, {rejectWithValue}) => {
    console.log('loginUser api call',userData )
    try {
      const response = await apiService.post('/auth/salon-login', userData);
      console.log('here is response login-user', response?.data)
      // await AsyncStorage.setItem(
      //   storagekeys.authToken,
      //   response?.data?.token,
      // );
      return response?.data; 

    } catch (error) {
     Alert.alert("Login Failed", "Please check your credentials and try again.");
      console.log('login api error', error)
      if (!error.response) {
        return rejectWithValue(
          'Network error: Please check your internet connection.',
        );
      }
      const errorMessage =
        error?.response?.data?.message ||
        'Login failed. Please try again.';
      return rejectWithValue(errorMessage);
    }
  },
);