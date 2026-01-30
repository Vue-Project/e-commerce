// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    app: {
        head: {
            charset: "utf-8",
            viewport: "width=device-width, initial-scale=1",
            title: "Nike Store - Official Shoes, Clothing & Gear",
            titleTemplate: "%s | Nike Store",
            meta: [
                {
                    name: "description",
                    content: "Shop Nike shoes, clothing & gear. Official Nike store with the latest releases, exclusive styles, and free shipping on orders over $50.",
                },
                {
                    name: "keywords",
                    content: "Nike, Nike shoes, running shoes, sneakers, athletic wear, sports clothing, Air Force 1, Air Max, Jordan, Nike Store",
                },
                { name: "author", content: "Nike, Inc." },

                // Open Graph / Facebook
                { property: "og:type", content: "website" },
                { property: "og:site_name", content: "Nike Store" },
                { property: "og:locale", content: "en_US" },

                // Twitter
                { name: "twitter:card", content: "summary_large_image" },
                { name: "twitter:site", content: "@Nike" },
                { name: "twitter:creator", content: "@Nike" },

                // Mobile
                { name: "theme-color", content: "#111111" },
                { name: "apple-mobile-web-app-title", content: "Nike Store" },
            ],

            link: [
                // Favicon - Multiple sizes for different devices
                { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
                { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
                { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
                { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
                { rel: "manifest", href: "/site.webmanifest" },
                { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#111111" },

                // Preconnect for performance
                { rel: "preconnect", href: "https://static.nike.com" },
                { rel: "preconnect", href: "https://fonts.googleapis.com" },

                // Canonical URL (will be set dynamically per page)
            ],

            script: [
                // Schema.org structured data for better SEO
                {
                    type: "application/ld+json",
                    children: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Store",
                        name: "Nike Store",
                        description: "Official Nike online store",
                        url: "https://your-nike-store.com",
                        brand: {
                            "@type": "Brand",
                            name: "Nike",
                        },
                        priceRange: "$$",
                    }),
                },
            ],

            // Additional HTML attributes
            htmlAttrs: {
                lang: "en",
            },
            bodyAttrs: {
                class: "nike-store",
            },
        },
    },
    nitro: {
        experimental: {
            websocket: true,
        },
    },

    modules: [
        "@nuxtjs/tailwindcss",
        "nuxt-nodemailer",
        // "@prisma/nuxt",
        "@pinia/nuxt",
        "@nuxt/icon",
        "@nuxt/image",
        "@unlok-co/nuxt-stripe",
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
    pinia: {
        storesDirs: ["./stores/**"],
    },

    runtimeConfig: {
        //private: is accessible only on the server
        JWT_TOKEN_KEY: process.env.JWT_TOKEN_KEY,
        REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY,
        DATABASE_URL: process.env.DATABASE_URL,
        public: {
            FALL_BACK_IMG_URL: process.env.FALL_BACK_IMG_URL,
            DEFAULT_USER_AVATAR: process.env.DEFAULT_USER_AVATAR,
        },
    },
    stripe: {
        // Server
        server: {
            key: process.env.STRIPE_SECRET_KEY,
            options: {},
        },
        client: {
            key: process.env.STRIPE_PUBLIC_KEY,
            options: {},
        },
    },
    tailwindcss: {
        exposeConfig: true,
    },
    nitro: {
        devServer: {
            https: false,
        },
    },
});
