import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from './features/authSlice';



const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['user'], // Only persist the `auth` slice
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);


 const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// const persistor = persistStore(store);
const persistor = persistStore(store, null, () => {
  console.log('✅ Redux Persist: Rehydration Complete', store.getState());
});

export { persistor, store };
export const rootState = () => store.getState();
export const appDispatch = () => store.dispatch;
