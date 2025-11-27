import { z } from "zod";

export const productSchema = z.object({
    name: z
        .string({
            message: "Name is required",
            // invalid_type_error: "Name must be a string",
        })
        .min(4, "Name must be at least 4 characters long"),
    color: z
        .string({
            message: "color is required",
            // invalid_type_error: "Name must be a string",
        })
        .min(3, "Color must be at least 3 characters long"),
    price: z.number().positive("Price should be greater than 0"),
    categoryId: z.number().positive("Category should be greater than 0"),
});
export const deleteProductSchema = z.object({
    id: z.number().positive("id should be a  number"),
});
