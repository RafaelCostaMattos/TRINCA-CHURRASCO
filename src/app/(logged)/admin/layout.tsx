import { ReactNode } from 'react';
import UILayout from '@/shared/components/UI/layout';

interface IAdminLayout {
  children: ReactNode;
}

export default async function AdminLayout({ children }: IAdminLayout) {
  return <UILayout>{children}</UILayout>;
}
