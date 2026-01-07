// pages/api/auth/register.ts
import prisma from "../../../lib/prisma";
import { hashPassword } from "./modules/bcrypt";
import { generateOTP } from "./modules/genratedOptCode";
import { sendEmailVerification } from "./modules/send-email.verification";
import { USER_EMAIL_TYPE, USER_ROLE } from "./modules/user-constant";
import { signUpSchema } from "./modules/validateUser";

export default defineEventHandler(async (event) => {
    const { email, name, password } = await readBody(event);
    // validation user
    const result = signUpSchema.safeParse({ email, name, password });
    if (!result.success) {
        throw createError({
            statusCode: 400,
            statusMessage: "validation flailed",
            data: result.error.flatten(),
        });
    }

    // user exit in database or not
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
    // hash password
    const otpCode = generateOTP();
    const hashPwd = await hashPassword(password);
    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            isValidEmail: USER_EMAIL_TYPE.INVALID_EMAIL,
            otpCode: otpCode,
            password: hashPwd,
            role: USER_ROLE.CUSTOMER,
        },
    });

    await sendEmailVerification(email, otpCode);
    return { message: "created User successfully", user, redirect: true };
});
