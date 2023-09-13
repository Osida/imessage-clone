import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        // add more providers as needed
    ],
    adapter: PrismaAdapter(prisma),
    callbacks: {
        async session({session, user, token}) {
            return session;
        },
    },
    debug: true,
});

export {handler as GET, handler as POST};