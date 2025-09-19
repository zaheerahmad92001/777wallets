import { AccountState, BankAccount, DeleteBankAccountResponse } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addBankAccount,
  addTransaction,
  deleteBankAccount,
  editBankAccount,
  fetchBankAccounts,
  fetchPayments,
} from "../actions/bankAccountActions";

const initialState: AccountState = {
  bankAccounts: [],
  transactions: [],
  loading: false,
  inProgress: false,
  error: null,
};

const accountSlice = createSlice({
  name: "bankAccounts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBankAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchBankAccounts.fulfilled,
        (state, action: PayloadAction<BankAccount[]>) => {
          state.loading = false;
          state.bankAccounts = action.payload;
        }
      )
      .addCase(fetchBankAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ??
          action.error.message ??
          "Something went wrong";
      })

      // edit bank account
      .addCase(editBankAccount.pending, (state) => {
        state.inProgress = true;
        state.error = null;
      })
      .addCase(
        editBankAccount.fulfilled,
        (state,action: PayloadAction<{id: string;updatedFields: Partial<BankAccount>}>) => {
          state.inProgress = false;
          const { id, updatedFields } = action.payload;
          const index = state.bankAccounts.findIndex((bank) => bank.id === id);
          if (index !== -1) {
            state.bankAccounts[index] = {
              ...state.bankAccounts[index],
              ...updatedFields,
            };
          }
        }
      )
      .addCase(editBankAccount.rejected, (state, action) => {
        state.inProgress = false;
        state.error =
          (action.payload as string) ??
          action.error.message ??
          "Something went wrong";
      })

      // add transaction cases
      .addCase(addTransaction.pending, (state) => {
        state.inProgress = true;
        state.error = null;
      })
      .addCase(
        addTransaction.fulfilled,
        (state, action: PayloadAction<BankAccount[]>) => {
          state.inProgress = false;
        }
      )
      .addCase(addTransaction.rejected, (state, action) => {
        state.inProgress = false;
        state.error =
          (action.payload as string) ??
          action.error.message ??
          "Something went wrong";
      })

      // get all transactions
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPayments.fulfilled,
        (state, action: PayloadAction<BankAccount[]>) => {
          state.loading = false;
        }
      )
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ??
          action.error.message ??
          "Something went wrong";
      })

      // add bank account cases
      .addCase(addBankAccount.pending, (state) => {
        state.inProgress = true;
        state.error = null;
      })
      .addCase(addBankAccount.fulfilled, (state, action) => {
        const newAccount = {
          ...action.payload,
          id: action.payload.bankAccountId, // ✅ rename
        };

        delete (newAccount as any).bankAccountId; // ✅ remove old field

        state.bankAccounts = [...state.bankAccounts, newAccount];
        state.inProgress = false;
      })
      .addCase(addBankAccount.rejected, (state, action) => {
        state.inProgress = false;
        state.error =
          (action.payload as string) ??
          action.error.message ??
          "Something went wrong";
      })

      // delete bank account cases
      .addCase(deleteBankAccount.pending, (state) => {
        state.inProgress = true;
        state.error = null;
      })
      .addCase(
        deleteBankAccount.fulfilled,
        (state, action: PayloadAction<DeleteBankAccountResponse>) => {
          const bankId = action.payload.bankId;
          state.inProgress = false;
          state.bankAccounts = state.bankAccounts.filter(
            (account) => account.id !== bankId
          );
        }
      )
      .addCase(deleteBankAccount.rejected, (state, action) => {
        state.inProgress = false;
        state.error =
          (action.payload as string) ??
          action.error.message ??
          "Something went wrong";
      })

  },
});

export default accountSlice.reducer;
