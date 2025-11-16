// pages/api/auth/register.ts
import prisma from "../../../../lib/prisma";

export default defineEventHandler(async (event) => {
    // user exit in database or not
    const categories = await prisma.category.findMany();

    return { categories };
});
