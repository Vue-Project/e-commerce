// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",

    modules: [
        "@nuxtjs/tailwindcss",
        "nuxt-nodemailer",
        // "@prisma/nuxt",
        "@pinia/nuxt",
    ],
    components: [
        {
            path: "~/components",
            pathPrefix: false,
        },
    ],
    devtools: { enabled: true },
    nodemailer: {
        from: '"E-commerce app" <noreply@app.com>',
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        secure: false,
        auth: {
            user: process.env.MAIL_TRAP_USER,
            pass: process.env.MAIL_TRAP_PASSWORD,
        },
        connectionTimeout: 15000, // Increase timeout
        socketTimeout: 15000,
    },

    runtimeConfig: {
        //private: is accessible only on the server
        JWT_TOKEN_KEY: process.env.JWT_TOKEN_KEY,
        REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY,
        DATABASE_URL: process.env.DATABASE_URL,
    },
});
