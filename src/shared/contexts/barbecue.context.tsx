'use client';

import { ReactNode, createContext, useContext } from 'react';

export const BarbecueContext = createContext<any>(null);

interface IProviderProps {
  children: ReactNode;
}

export function BarbecueContextProvider({ children }: IProviderProps) {
  return <BarbecueContext.Provider value={{}}>{children}</BarbecueContext.Provider>;
}

export const useBarbecueContext = () => useContext(BarbecueContext);
