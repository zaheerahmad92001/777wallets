import { Transactions, TransactiontState, UpdatePaymentResponse } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchTransactions,
  updatePaymentStatus,
} from "../actions/paymentAction";



const initialState: TransactiontState = {
  allTransactions: [],
  loading: false,
  inProgress: false,
  error: null,

};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTransactions.fulfilled,
        (state, action: PayloadAction<Transactions[]>) => {

          state.loading = false;
          state.allTransactions = action.payload;
        }
      )
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        // rejected payload defaults to `unknown` unless you use rejectWithValue
        state.error =
          (action.payload as string) ??
          action.error.message ??
          "Something went wrong";
      })

      // update payment status
      .addCase(updatePaymentStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updatePaymentStatus.fulfilled,
        (state, action: PayloadAction<UpdatePaymentResponse>) => {
          const { transactionId, transStatus } = action.payload;
          console.log('payload',action.payload)
    console.log('payload transactionId ', transactionId)
    console.log('payload transStatus ', transStatus)
          state.loading = false;

          // ✅ Update the transaction in place
          const txIndex = state.allTransactions.findIndex(
            (tx) => tx.transactionId === transactionId
          );
console.log('find index', txIndex)
          if (txIndex !== -1) {
            state.allTransactions[txIndex].transStatus = transStatus;
          }
          console.log(' state.allTransactions[txIndex]', state.allTransactions[txIndex])
        }
      )
      .addCase(updatePaymentStatus.rejected, (state, action) => {
        state.loading = false;
        // rejected payload defaults to `unknown` unless you use rejectWithValue
        state.error =
          (action.payload as string) ??
          action.error.message ??
          "Something went wrong";
      });
  },
});

export default transactionSlice.reducer;
