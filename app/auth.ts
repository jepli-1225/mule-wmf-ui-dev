import NextAuth from "next-auth";
import Cognito from "next-auth/providers/cognito";
import Okta from "next-auth/providers/okta";

import type { Provider } from "next-auth/providers";
import { authConfig } from "@/app/auth.config";

const providers: Provider[] = [Okta, Cognito];

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      token.primaryRole = user?.primaryRole ?? "User"; //should be User but for now...
      return token;
    },
    async session({ session, token }) {
      if (session && session.user) {
        session.user.primaryRole = token.primaryRole;
      }
      return session;
    },
  },
  providers,
});
