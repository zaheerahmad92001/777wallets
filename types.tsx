export interface BankAccount {
  accountHolderName: string;
  accountNumber: string;
  bankLogoPath: string | null;
  bankLogoUrl: string | null;
   logo: string | null;
  bankName: string;
  iban: string;
  userId: string;
  id: string;
}
export interface BankAccountPayload {
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  iban: string;
  bankLogoBase64: string; // base64 encoded image
}

export interface AccountState {
  bankAccounts: BankAccount[];
  loading: boolean;
  inProgress: boolean;
  error: string | null;
}
export interface TransactionPayload {
  username?: string;
  phoneNumber?: string;
  amount?: string;
  accountType?:string;
  bankName?: string;
  accountNumber?: string;
  accountTitle?: string;
  transactionType?: string; 
  imageBase64?: string;
}

export interface DeleteBankAccountPayload {
  bankId: string;
}
export interface DeleteBankAccountResponse {
  bankId: string;
  response: {
    message: string;
  };
}

export interface WhatsAppNumberResponse {
  updatedAt: string;   
  userId: string;     
  whatsAppNumber: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  userId: string;
  name: string;
  phone: string;
  username: string;
  role: "admin" | "user" | string;
  imageUrl: string | null;
}

export interface AllUser {
  userId: string;
  name: string;
  phone: string;
  username: string;
  role: "user" | "admin"; // restrict to valid roles
  imageUrl: string | null;
}

export interface FetchAllUsersResponse {
  users: AllUser[];
}

export interface CreateUserPayload {
  name: string;
  username: string;
  phone: string;
  password: string;
  role: "user" | "admin"; // only allowed roles
  imageBase64?: string | null; // optional
}
export interface CreateUserResponse {
  message: string;
  userId: string;
  username: string;
  role: "user" | "admin";
  imageUrl?: string | null; // can be null if no image uploaded
}