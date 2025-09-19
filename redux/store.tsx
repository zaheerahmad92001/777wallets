import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from './features/authSlice';
import bankAccountReducer from './features/bankAccounts';
import paymentsReducer from './features/paymentSlice';

const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['user'], // Only persist the `auth` slice
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    bankAccounts: bankAccountReducer,
    transactions:paymentsReducer
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store, null, () => {
  console.log('✅ Redux Persist: Rehydration Complete', store.getState());
});

// ✅ Correct way to type RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { configureStore } from '@reduxjs/toolkit';
// import { persistReducer, persistStore } from 'redux-persist';
// import authReducer from './features/authSlice';
// import bankAccountReducer from './features/bankAccounts';


// const persistConfig = {
//   key: 'auth',
//   storage: AsyncStorage,
//   whitelist: ['user'], // Only persist the `auth` slice
// };

// const persistedAuthReducer = persistReducer(persistConfig, authReducer);


//  const store = configureStore({
//   reducer: {
//     auth: persistedAuthReducer,
//     bankAccounts: bankAccountReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// // const persistor = persistStore(store);
// const persistor = persistStore(store, null, () => {
//   console.log('✅ Redux Persist: Rehydration Complete', store.getState());
// });

// export { persistor, store };
// export const rootState = () => store.getState();
// export const appDispatch = () => store.dispatch;