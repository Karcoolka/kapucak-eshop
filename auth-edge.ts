/**
 * Edge-safe auth config for middleware only.
 * No Node-only deps (no prisma, no bcrypt) so middleware can run in Edge runtime.
 * Sign-in and DB updates use the full auth in auth.ts (API route runs in Node).
 */
import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextResponse } from 'next/server';

export const edgeConfig = {
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      // Not used in middleware; sign-in runs in API route (auth.ts)
      async authorize() {
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, trigger, token }: any) {
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.name = token.name;
      if (trigger === 'update') {
        session.user.name = user?.name ?? session.user.name;
      }
      return session;
    },
    async jwt({ token, user, trigger, session }: any) {
      if (user) {
        token.role = user.role;
        if (user.name === 'NO_NAME') {
          token.name = user.email!.split('@')[0];
          // DB update happens in full auth (auth.ts) on sign-in, not here
        }
      }
      if (session?.user?.name && trigger === 'update') {
        token.name = session.user.name;
      }
      return token;
    },
    authorized({ request, auth }: any) {
      const protectedPaths = [
        /^\/shipping-address/,
        /^\/payment-method/,
        /^\/place-order/,
        /^\/profile/,
        /^\/user(\/|$)/,
        /^\/order(\/|$)/,
        /^\/admin/,
      ];
      const { pathname } = request.nextUrl;

      if (!auth && protectedPaths.some((p) => p.test(pathname))) {
        return false;
      }

      if (!request.cookies.get('sessionCartId')) {
        const sessionCartId = globalThis.crypto.randomUUID();
        const newRequestHeaders = new Headers(request.headers);
        const response = NextResponse.next({
          request: { headers: newRequestHeaders },
        });
        response.cookies.set('sessionCartId', sessionCartId);
        return response;
      }
      return true;
    },
  },
} satisfies NextAuthConfig;

export const { auth } = NextAuth(edgeConfig);
