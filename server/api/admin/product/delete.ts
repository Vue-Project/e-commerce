// pages/api/auth/register.ts
import prisma from "../../../../lib/prisma";
import { deleteProductSchema } from "./modules/product-validation";

export default defineEventHandler(async (event) => {
    const { id } = await readBody(event);
    // validation user
    const result = deleteProductSchema.safeParse({ id });
    // validation user
    if (!result.success) {
        throw createError({
            statusCode: 400,
            statusMessage: " ",
            data: result.error.flatten(),
        });
    }

    const product = await prisma.product.delete({
        where: { id: parseInt(id) },
    });

    return { message: "Deleted Product successfully", product };
});
