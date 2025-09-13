import { LoginResponse } from "@/types"; // adjust path
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type AuthContextType = {
  user: LoginResponse | null;
  isLoading: boolean;
  signIn: (userData: LoginResponse) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const storedUser = await AsyncStorage.getItem("authUser");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const signIn = async (userData: LoginResponse) => {
    await AsyncStorage.setItem("authUser", JSON.stringify(userData));
    setUser(userData);
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("authUser");
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, isLoading, signIn, signOut }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}


// import AsyncStorage from "@react-native-async-storage/async-storage";
// import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

// type AuthContextType = {
//   userToken: string | null;
//   isLoading: boolean;
//   signIn: (token: string) => Promise<void>;
//   signOut: () => Promise<void>;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [userToken, setUserToken] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Load token on app start
//     (async () => {
//       try {
//         const token = await AsyncStorage.getItem("authToken");
//         setUserToken(token);
//       } finally {
//         setIsLoading(false);
//       }
//     })();
//   }, []);

//   const signIn = async (token: string) => {
//   //   if (token === '03321122333') {
//   //   console.log('context token', typeof token, token === '03321122333')
//   //   return <Redirect href={"/(drawer)/(admin)/users"} />;
//   // }
//     await AsyncStorage.setItem("authToken", token);
//     setUserToken(token);
//   };

//   const signOut = async () => {
//     await AsyncStorage.removeItem("authToken");
//     setUserToken(null);
//   };

//   const value = useMemo(() => ({ userToken, isLoading, signIn, signOut }), [userToken, isLoading]);

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export function useAuth() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used within AuthProvider");
//   return ctx;
// }
