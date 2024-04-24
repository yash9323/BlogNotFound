import CredentialsProvider from "next-auth/providers/credentials";
import { request } from "graphql-request";
import queries from "../../../../queries";

// create callback on fail login

export const options = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "your-email",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "your-password",
        },
      },
      async authorize(credentials) {
        try {
          const res = await request(
            "http://localhost:4000/",
            queries.LOGIN_USER,
            {
              email: credentials.email,
              password: credentials.password,
            }
          );
          if (res.loginUser === null) {
            return null;
          }
          return res.loginUser;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.fname = user.fname;
        token.email = user.email;
        token._id = user._id;
        token.lname = user.lname;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.fname = token.fname;
        session.user.email = token.email;
        session.user.lname = token.lname;
        session.user._id = token._id;
      }
      return session;
    },
  },
};
