// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    modules: [
        "@nuxtjs/tailwindcss",
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
    runtimeConfig: {
        //private: is accessible only on the server
        JWT_TOKEN_KEY: process.env.JWT_TOKEN_KEY,
        REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY,
        DATABASE_URL: process.env.DATABASE_URL,
    },
});
