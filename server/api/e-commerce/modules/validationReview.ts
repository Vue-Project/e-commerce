import { z } from "zod";

export const reviewSchema = z.object({
    comment: z
        .string({
            message: "Comment is required",
        })
        .min(7, "Comment must be at least 7 characters long")
        .max(15, "Comment must not exceed 15 characters long"),
});
