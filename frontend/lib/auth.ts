import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

const URL = process.env.NEXT_PUBLIC_API_URL + "/auth/login";
const JWT_SECRET = process.env.NEXTAUTH_SECRET;

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        try {
          if (!credentials) {
            throw new Error("Credentials not provided");
          }

          const response = await fetch(URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          });

          if (!response) {
            throw new Error("Incorrect username or password");
          }

          const { token, user } = await response.json();

          const loggedUser = {
            id: user.ID,
            username: user.username,
            email: user.email,
            accessToken: token,
          };

          console.log(loggedUser);

          return loggedUser;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.accessToken = token.accessToken;
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.accessToken = user.accessToken;
      }
      return token
    },
  },
}
