import { PrismaAdapter } from '@auth/prisma-adapter'
import { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import bcrypt from 'bcryptjs'
import { verifySync } from 'otplib'
import { prisma } from '@/lib/db/prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        totpCode: { label: 'TOTP Code', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.password) {
          throw new Error('Invalid credentials')
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          throw new Error('Invalid credentials')
        }

        // Check 2FA if enabled
        if (user.totpEnabled && user.totpSecret) {
          if (!credentials.totpCode) {
            throw new Error('2FA_REQUIRED')
          }

          const isValidToken = verifySync({
            token: credentials.totpCode,
            secret: user.totpSecret,
          })

          if (!isValidToken) {
            throw new Error('Invalid 2FA code')
          }
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
        session.user.totpEnabled = token.totpEnabled
        session.user.twoFactorVerified = token.twoFactorVerified
      }
      return session
    },
    async jwt({ token, user, account }) {
      // Initial sign in
      if (user) {
        token.sub = user.id

        // Fetch 2FA status from database
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { totpEnabled: true },
        })

        token.totpEnabled = dbUser?.totpEnabled ?? false

        // For credentials login, 2FA was already verified in authorize()
        // For OAuth login, 2FA needs to be verified if enabled
        if (account?.provider === 'credentials') {
          token.twoFactorVerified = true
        } else {
          // OAuth login - needs 2FA verification if enabled
          token.twoFactorVerified = !token.totpEnabled
        }
      }

      return token
    },
  },
}