import dotenv from 'dotenv';
dotenv.config();

const config = {
    server: {
        secretSession: process.env.SECRET_SESSION
    },
    mongo: {
        url: process.env.MONGO_URL
    },
    github: {
        callbackUrl: process.env.GITHUB_CALLBACK_URL,
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET
    },
    jwt: {
        jwtSecret: process.env.JWT_SECRET
    },
    nodemailer: {
        gmaccount: process.env.GMAIL_ACC,
        gmpassword: process.env.GMAIL_PASS
    }
}

export { config };
