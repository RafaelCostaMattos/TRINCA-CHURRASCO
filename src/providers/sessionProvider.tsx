'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface INextAuthSessionProvider {
  children: ReactNode;
}
export default function NextAuthSessionProvider({ children }: INextAuthSessionProvider) {
  return <SessionProvider>{children}</SessionProvider>;
}
