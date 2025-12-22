// pages/api/auth/register.ts
import prisma from "../../../../lib/prisma";
import { productSchema } from "./modules/product-validation";
import slugify from "slugify";

export default defineEventHandler(async (event) => {
    const { id, name, price, color, categoryId } = await readBody(event);
    // validation user
    const result = productSchema.safeParse({ id, name, price, color, categoryId });
    // validation user
    if (!result.success) {
        throw createError({
            statusCode: 400,
            statusMessage: " ",
            data: result.error.flatten(),
        });
    }

    const product = await prisma.product.update({
        where: {
            id: id,
        },
        data: {
            name: name,
            slug: slugify(name),

            color: color,
            categoryId: categoryId,
            price: price.toString(),
        },
    });

    return { message: "Updated Product successfully", product };
});
