import { Transactions } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    fetchTransactions,
} from "../actions/paymentAction";

interface TransactionState {
  allTransactions: Transactions[];
  loading: boolean;
  inProgress: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  loading: false,
  inProgress: false,
  error: null,
  allTransactions: [],
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
      });
    },
});

export default transactionSlice.reducer;
