import { Transactions, TransactiontState, UpdatePaymentResponse } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchSingleUserTransactions,
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
        state.error =
          (action.payload as string) ??
          action.error.message ??
          "Something went wrong";
      })

      // fetch user`s transactions
      .addCase(fetchSingleUserTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSingleUserTransactions.fulfilled,
        (state, action: PayloadAction<Transactions[]>) => {

          state.loading = false;
          state.allTransactions = action.payload;
        }
      )
      .addCase(fetchSingleUserTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ??
          action.error.message ??
          "Something went wrong";
      })

      // update payment status
      .addCase(updatePaymentStatus.pending, (state) => {
        state.inProgress = true;
        state.error = null;
      })
      .addCase(
        updatePaymentStatus.fulfilled,
        (state, action: PayloadAction<UpdatePaymentResponse>) => {
          const { transactionId, transStatus } = action.payload;
          state.inProgress = false;

          // ✅ Update the transaction in place
          const txIndex = state.allTransactions.findIndex(
            (tx) => tx.transactionId === transactionId
          );
          if (txIndex !== -1) {
            state.allTransactions[txIndex].transStatus = transStatus;
          }
        }
      )
      .addCase(updatePaymentStatus.rejected, (state, action) => {
        state.inProgress = false;
        // rejected payload defaults to `unknown` unless you use rejectWithValue
        state.error =
          (action.payload as string) ??
          action.error.message ??
          "Something went wrong";
      });
  },
});

export default transactionSlice.reducer;
