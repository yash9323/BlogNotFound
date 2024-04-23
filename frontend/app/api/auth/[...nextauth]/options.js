import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
  pages : {
    signIn: '/login',
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
          if (
            credentials.email === "test@test.com" &&
            credentials.password === "12345"
          ) {
            return {
              email: credentials.email,
              role: "User",
            };
          }
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user){
        token.name = "yash"
        token.email = user.email
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token){
        session.user.name = token.name
        session.user.email = token.email
      }
      return session;
    },
  },
};