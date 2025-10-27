// pages/api/auth/register.ts
import prisma from "../../../lib/prisma";
import { hashPassword } from "./modules/bcrypt";

export default defineEventHandler(async (event) => {
    const { email, password } = await readBody(event);
    const userExist = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (userExist) {
        throw createError({
            statusCode: 400,
            message: " email have been taken",
        });
    }
    const hashPwd = await hashPassword(password);
    const user = await prisma.user.create({
        data: {
            email: email,
            password: hashPwd,
        },
    });
    return { message: "created User successfully", user };
});
