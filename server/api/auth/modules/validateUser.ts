import { z } from "zod";
export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});
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
