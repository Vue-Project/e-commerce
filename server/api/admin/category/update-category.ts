// pages/api/auth/register.ts
import prisma from "../../../../lib/prisma";
import { categorySchema } from "./modules/category-validation";

export default defineEventHandler(async (event) => {
    const { name, id } = await readBody(event);
    // validation user
    const result = categorySchema.safeParse({ name });
    // validation user
    if (!result.success) {
        throw createError({
            statusCode: 400,
            statusMessage: "validation flailed",
            data: result.error.flatten(),
        });
    }

    // user exit in database or not

    const category = await prisma.category.update({
        where: {
            id: id,
        },
        data: {
            name: name,
        },
    });

    return { message: "update Category successfully", category };
});
