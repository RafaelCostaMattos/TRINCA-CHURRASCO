'use client';
import { ReactNode, createContext, useContext, useState } from 'react';
// import { EUserType } from '../enums/user.enum';

export const AuthContext = createContext<any>(null);

interface IProviderProps {
  children: ReactNode;
}

interface IAuthProvider {
  codigo: string;
  nome: string;
  route: any[];
}

export function AuthContextProvider({ children }: IProviderProps) {
  const [session, setSession] = useState<IAuthProvider>();

  return <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);
