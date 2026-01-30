import { USER_EMAIL_TYPE } from "./modules/user-constant";
// pages/api/auth/register.ts
import prisma from "../../../lib/prisma";
import { comparePassword } from "./modules/bcrypt";
import { signAccessToken, signRefreshToken } from "../../../utils/jwtToken";
import { signInSchema } from "./modules/validateUser";

export default defineEventHandler(async (event) => {
    const { email, password } = await readBody(event);
    // validation user
    const result = signInSchema.safeParse({ email, password });
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
            email: email,
            isValidEmail: USER_EMAIL_TYPE.VALID_EMAIL,
        },
    });
    if (!userExist) {
        throw createError({
            statusCode: 422,
            message: "Email does not exist",
        });
    }
    // hash password
    const isMatch = await comparePassword(password, userExist?.password);
    if (isMatch) {
        const [accessToken, refreshToken] = await Promise.all([signAccessToken(userExist?.id), signRefreshToken(userExist.id)]);
        const data = {
            token: {
                accessToken: accessToken,
                refreshToken: refreshToken,
            },
            user: { name: userExist.name, email: userExist.email, id: userExist.id, role: userExist.role },
            isLoggedIn: true,
        };
        return { message: " User logged successfully", data };
    } else {
        throw createError({
            statusCode: 422,
            message: "Email  and password do not match",
        });
    }
});
