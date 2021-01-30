import NextAuth from "next-auth";
import Providers, { Providers as ProvidersAct } from "next-auth/providers";

interface GenericObject {
  [key: string]: any;
}

type Strava = (options: ProviderStravaOptions) => GenericObject;

interface ProviderStravaOptions extends GenericObject {
  name?: string;
  clientId: string;
  clientSecret: string;
}

interface ProvidersWithStrava extends ProvidersAct {
  Strava: Strava;
}

const options = {
  // Configure one or more authentication providers
  providers: [
    (Providers as ProvidersWithStrava).Strava({
      clientId: process.env.STRAVA_ID,
      clientSecret: process.env.STRAVA_SECRET,
      scope: "activity:read_all",
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn(user, account) {
      user.accessToken = account.accessToken;
      return true;
    },

    // Getting the JWT token from API response
    async jwt(token, user) {
      if (user) {
        token.accessToken = user.accessToken;
      }

      return token;
    },

    async session(session, token) {
      session.accessToken = token.accessToken;
      return session;
    },
  },

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,
};

export default (req, res) => NextAuth(req, res, options);
