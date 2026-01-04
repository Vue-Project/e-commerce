// pages/api/auth/register.ts
import prisma from "../../../../lib/prisma";
import { categorySchema } from "./modules/category-validation";

export default defineEventHandler(async (event) => {
    const { name } = await readBody(event);
    // validation user
    const result = categorySchema.safeParse({ name });
    // validation user
    if (!result.success) {
        throw createError({
            statusCode: 400,
            statusMessage: " the name must be at least 50 characters long",
            data: result.error.flatten(),
        });
    }

    // user exit in database or not
    const categoryExist = await prisma.category.findUnique({
        where: {
            name: name,
        },
    });
    if (categoryExist) {
        throw createError({
            statusCode: 400,
            message: "category already exist",
        });
    }

    const category = await prisma.category.create({
        data: {
            name: name,
        },
    });

    return { message: "created Category successfully", category };
});
