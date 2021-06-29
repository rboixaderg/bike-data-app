import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Strava({
      clientId: process.env.STRAVA_ID,
      clientSecret: process.env.STRAVA_SECRET,
      scope: 'activity:read_all',
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn(user, account) {
      user.accessToken = account.accessToken
      return true
    },

    // Getting the JWT token from API response
    async jwt(token, user) {
      if (user) {
        token.accessToken = user.accessToken
      }

      return token
    },

    async session(session, token) {
      session.accessToken = token.accessToken
      return session
    },
  },

  session: {
    maxAge: 3600 * 6,
  },
}

export default (req, res) => NextAuth(req, res, options)
