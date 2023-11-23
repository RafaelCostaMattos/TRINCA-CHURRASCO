import { getServerSession } from 'next-auth';
import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route';
import { AuthContextProvider } from '@/shared/contexts/auth.context';

interface IPrivateLayout {
  children: ReactNode;
}

export default async function PrivateLayout({ children }: IPrivateLayout) {
  const session = await getServerSession(nextAuthOptions);
  console.log(session);
  if (!session) redirect('/');

  return <AuthContextProvider>{children}</AuthContextProvider>;
}
