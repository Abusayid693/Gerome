import NextAuth, {NextAuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: {label: 'Email', type: 'email', placeholder: 'e@e.com'},
        password: {
          label: 'pass',
          type: 'password'
        }
      },
      authorize(credentials, req) {
        const {email, password} = credentials as {email: string; password: string};
        if (email !== 'root@gmail.com') return null;

        return {id: '123', email, name: email};
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,

  jwt: {
    // A secret to use for key generation. Defaults to the top-level `secret`.
    secret: 'dssnljkjbnjk',
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 24 * 30
  }
};

export default NextAuth(authOptions);
