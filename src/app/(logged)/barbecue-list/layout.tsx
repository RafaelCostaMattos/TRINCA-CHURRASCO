import { ReactNode } from 'react';
import UILayout from '@/shared/components/UI/layout';
import { BarbecueContextProvider } from '@/shared/contexts/barbecue.context';

interface IAdminLayout {
  children: ReactNode;
}

export default async function AdminLayout({ children }: IAdminLayout) {
  return (
    <BarbecueContextProvider>
      <UILayout>{children}</UILayout>
    </BarbecueContextProvider>
  );
}
