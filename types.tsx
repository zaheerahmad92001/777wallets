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


export interface Transactions {
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
  accountType?: string;
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


export interface UpdateBankAccountPayload {
  bankId: string;
  payload: {
    bankName?: string;
    accountHolderName?: string;
    accountNumber?: string;
    iban?: string;
    bankLogoBase64?: string;
  };
}
export interface UpdateBankAccountResponse {
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
  success: boolean;
  message: string;
  userId: string;
  username: string;
  error: string;
  phone: string;
  name: string;
  role: "user" | "admin";
  imageUrl?: string | null; // can be null if no image uploaded
}

export interface DeleteUserPayload {
  userId: string;
}
export interface DeleteUserResponse {
  message: string;
  userId: string;
}

export interface updateWhatsAppPayload {
  whatsappId: string;
  whatsAppNumber: string;
}
export interface updateWhatsAppResponse {
  message: string;
  id: string;
  whatsAppNumber: string;
}
export interface AddWhatsAppPayload{
  whatsAppNumber:string
}

export interface AddWhatsResponse {
  id: string;
  whatsAppNumber: string;
  message: string;
  success: boolean;
  userId:string;
}


export interface updateWebsitePayload {
  websiteId: string;
  websiteURL: string;
}
export interface updateWebsiteResponse {
  success: boolean;
  message: string;
  id: string;
  websiteURL: string;
}

export interface AddWebsitePayload{
  websiteURL:string
}

export interface AddWebsiteResponse {
  id: string;
  message: string;
  success: boolean;
  userId:string;
  websiteURL: string;
}

export interface editBankAccountPayload {
  payload:{
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  iban: string;
  bankLogoBase64: string; // base64 encoded image
  };
  bankId:string;
}

export interface UpdateUserPayload {
  payload: {
    name: string;
    username: string;
    phone: string;
    role: "user" | "admin";
    imageBase64?: string; // optional, no null
  };
  userId: string;
}
export interface UpdateUserResponse {
  message: string;
  success: boolean;
  userId: string;
  updatedFields: {
    name?: string;
    phone?: string;
    role?: "user" | "admin";
    imageUrl?: string;
  };
}
