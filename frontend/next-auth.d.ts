import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            username: number;
            username: string;
            email: string;
            accessToken: string;
        } & Session['user'];
    }
}