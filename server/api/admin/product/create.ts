// pages/api/auth/register.ts
import prisma from "../../../../lib/prisma";
import { productSchema } from "./modules/product-validation";
import { generateSlug } from "./modules/slugifyProductName";

export default defineEventHandler(async (event) => {
    const { name, price, color, categoryId } = await readBody(event);
    // validation user
    const result = productSchema.safeParse({ name, price, color, categoryId });
    // validation user
    if (!result.success) {
        throw createError({
            statusCode: 400,
            statusMessage: " ",
            data: result.error.flatten(),
        });
    }

    const product = await prisma.product.create({
        data: {
            name: name,
            slug: generateSlug(name),
            color: color,
            categoryId: categoryId,
            price: price.toString(),
        },
    });

    return { message: "Created Product successfully", product };
});
