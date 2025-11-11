import { z } from "zod";
// export const loginSchema = z.object({
//     email: z.string().email(),
//     password: z.string().min(6),
// });
// const result = loginSchema.safeParse(body);
// if (!result.success) {
//     return sendError(
//         event,
//         createError({
//             statusCode: 400,
//             message: "validation flailed",
//             data: result.error.flatten(),
//         }),
//     );
// }
export const signInSchema = z.object({
    email: z
        .string({
            message: "Email is required",
            // invalid_type_error: "Email must be a string",
        })
        .email("Please provide a valid email address"),

    password: z
        .string({
            message: "Password is required",
            // invalid_type_error: "Password must be a string",
        })
        .min(6, "Password must be at least 6 characters long"),
});
export const signUpSchema = z.object({
    name: z
        .string({
            message: "Name is required",
            // invalid_type_error: "Name must be a string",
        })
        .min(3, "Name must be at least 6 characters long"),
    email: z
        .string({
            message: "Email is required",
            // invalid_type_error: "Email must be a string",
        })
        .email("Please provide a valid email address"),

    password: z
        .string({
            message: "Password is required",
            // invalid_type_error: "Password must be a string",
        })
        .min(6, "Password must be at least 6 characters long"),
});
