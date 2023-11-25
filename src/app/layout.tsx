import { Raleway } from 'next/font/google';

import NextAuthSessionProvider from '@/providers/sessionProvider';
import ThemeRegistry from '@/shared/configs/ThemeRegistry';
import { Metadata } from 'next';
import StyledComponentsRegistry from '@/shared/configs/StyledComponentRegistry';
import './globals.css';

const raleway = Raleway({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Trinca churrasco',
  description: 'Gerencimento de churrasco da equipe trinca',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={raleway.className}>
        <ThemeRegistry>
          <StyledComponentsRegistry>
            <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
          </StyledComponentsRegistry>
        </ThemeRegistry>
      </body>
    </html>
  );
}
