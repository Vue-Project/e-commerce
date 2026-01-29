// pages/api/auth/register.ts
import { ca } from "zod/v4/locales";
import prisma from "../../../../lib/prisma";

export default defineEventHandler(async (event) => {
    // user exit in database or not

    try {
        const categories = await prisma.category.findMany();

        return { categories };
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: "Server error",
        });
    }
});
