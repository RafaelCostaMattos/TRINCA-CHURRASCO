import { NextAuthOptions, Session, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';

const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        login: { label: 'login', type: 'number' },
        senha: { label: 'senha', type: 'password' },
      },

      async authorize(credentials, req) {
        const user = { id: '1', name: 'Rafael Mattos', email: 'rafael-teste@example.com' };

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: User | AdapterUser }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }: { session: Session; token: any }) {
      session = token.user as any;
      session.expires = token.exp;
      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
